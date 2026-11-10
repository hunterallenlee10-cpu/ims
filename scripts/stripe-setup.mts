// Idempotent Stripe setup for Investing Mastery Signals.
//
//   node scripts/stripe-setup.mts --dry-run   # show what would change, write nothing
//   node scripts/stripe-setup.mts             # create anything missing
//
// Needs Node 22.18+ (runs TypeScript directly). Reads:
//   STRIPE_SECRET_KEY   secret key for the target mode (never hard-coded, never logged)
//   SITE_URL            public site URL, e.g. https://example.com (portal links to /terms and /privacy)
//   EXPECTED_ACCOUNT    defaults to acct_1Ua6qPRj5B5P2Oab; the script stops if the key belongs elsewhere
//   PRORATION           portal proration for Core <-> Pro: create_prorations (default) | none | always_invoice
//   STRIPE_TAX_CODE     product tax code. Default txcd_10701411 (Electronically Delivered Information
//                       Services - Personal Use), which Managed Payments accepts
//
// Prices are found by lookup_key, so running this twice creates nothing new.
// Going from test to live means running it again with the live key. No code changes.

import Stripe from "stripe";
import { LOOKUP_KEYS, TIER_IDS, type TierId } from "../lib/tiers.ts";

const DRY = process.argv.includes("--dry-run");
const EXPECTED_ACCOUNT = process.env.EXPECTED_ACCOUNT ?? "acct_1Ua6qPRj5B5P2Oab";
const SITE_URL = (process.env.SITE_URL ?? "").replace(/\/$/, "");
const PRORATION = (process.env.PRORATION ?? "create_prorations") as "create_prorations" | "none" | "always_invoice";
const TAX_CODE = process.env.STRIPE_TAX_CODE || "txcd_10701411";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) throw new Error("Set STRIPE_SECRET_KEY");
if (!SITE_URL.startsWith("https://")) throw new Error("Set SITE_URL to the public https URL of the site");
// fetch-based client: respects HTTPS_PROXY when run with NODE_USE_ENV_PROXY=1.
const stripe = new Stripe(key, { appInfo: { name: "ims-setup-script" }, httpClient: Stripe.createFetchHttpClient() });

// Facts only. Champion wording confirmed by Hunter on 2026-11-10.
const PRODUCTS: Record<TierId, { name: string; description: string; amount: number }> = {
  core: {
    name: "IMS Core",
    description: 'The Portfolio Signal only, in the read-only "Core Members - SIGNAL ONLY" Telegram group.',
    amount: 2500,
  },
  pro: {
    name: "IMS Pro",
    description:
      'All IMS signals (Portfolio Signal, IMS Signals, BTC DCA Signal, Trend Probability), a weekly research note, a macro and liquidity briefing, method notes, and full access to the main "Investing Mastery Signals" Telegram group.',
    amount: 5000,
  },
  champion: { name: "IMS Champion", description: "Everything in Pro, plus we manage your portfolio for you.", amount: 39900 },
};

const log = (msg: string) => console.log(`${DRY ? "[dry run] " : ""}${msg}`);

async function checkAccount() {
  const account = await stripe.accounts.retrieveCurrent();
  const balance = await stripe.balance.retrieve();
  log(`Account ${account.id} (${balance.livemode ? "LIVE" : "test"} mode), charges_enabled=${account.charges_enabled}`);
  if (account.id !== EXPECTED_ACCOUNT) {
    throw new Error(`Key belongs to ${account.id}, expected ${EXPECTED_ACCOUNT}. Stopping.`);
  }
  return balance.livemode;
}

async function findProduct(tier: TierId): Promise<Stripe.Product | undefined> {
  for await (const p of stripe.products.list({ limit: 100 })) {
    if (p.metadata.ims === "true" && p.metadata.tier === tier) return p;
  }
  return undefined;
}

async function ensureTier(tier: TierId) {
  const spec = PRODUCTS[tier];
  const lookup_key = LOOKUP_KEYS[tier];
  const existing = (await stripe.prices.list({ lookup_keys: [lookup_key], expand: ["data.product"], limit: 1 })).data[0];

  if (existing) {
    const product = existing.product as Stripe.Product;
    const ok = existing.unit_amount === spec.amount && existing.currency === "usd" && existing.recurring?.interval === "month";
    if (!ok) throw new Error(`${lookup_key} exists but is not ${spec.amount / 100} USD/month. Fix it in the Dashboard.`);
    const taxCode = typeof product.tax_code === "string" ? product.tax_code : product.tax_code?.id;
    if (product.description !== spec.description || product.name !== spec.name || taxCode !== TAX_CODE) {
      log(`${spec.name}: updating name/description/tax code`);
      if (!DRY) await stripe.products.update(product.id, { name: spec.name, description: spec.description, tax_code: TAX_CODE });
    }
    if (!existing.active) {
      log(`${lookup_key}: reactivating price`);
      if (!DRY) await stripe.prices.update(existing.id, { active: true });
    }
    log(`${spec.name}: exists (product ${product.id}, price ${existing.id})`);
    return { product: product.id, price: existing.id };
  }

  let product = await findProduct(tier);
  if (!product) {
    log(`${spec.name}: creating product`);
    if (DRY) return { product: "(new)", price: "(new)" };
    product = await stripe.products.create(
      {
        name: spec.name,
        description: spec.description,
        metadata: { ims: "true", tier },
        tax_code: TAX_CODE,
      },
      { idempotencyKey: `ims-product-${tier}-v1` },
    );
  }
  log(`${spec.name}: creating price ${lookup_key} (${spec.amount / 100} USD/month)`);
  if (DRY) return { product: product.id, price: "(new)" };
  const price = await stripe.prices.create(
    {
      product: product.id,
      currency: "usd",
      unit_amount: spec.amount,
      recurring: { interval: "month" },
      lookup_key,
      metadata: { tier },
    },
    { idempotencyKey: `ims-price-${tier}-v1` },
  );
  return { product: product.id, price: price.id };
}

async function ensurePortal(ids: Record<TierId, { product: string; price: string }>) {
  const params: Stripe.BillingPortal.ConfigurationCreateParams = {
    business_profile: {
      headline: "Investing Mastery Signals: manage your membership",
      terms_of_service_url: `${SITE_URL}/terms`,
      privacy_policy_url: `${SITE_URL}/privacy`,
    },
    default_return_url: `${SITE_URL}/`,
    login_page: { enabled: true },
    metadata: { ims_portal: "v1" },
    features: {
      invoice_history: { enabled: true },
      payment_method_update: { enabled: true },
      customer_update: { enabled: true, allowed_updates: ["email"] },
      subscription_cancel: { enabled: true, mode: "at_period_end", cancellation_reason: { enabled: true, options: ["too_expensive", "unused", "other"] } },
      // Core <-> Pro only. Champion is not offered here.
      subscription_update: {
        enabled: true,
        default_allowed_updates: ["price"],
        proration_behavior: PRORATION,
        products: [
          { product: ids.core.product, prices: [ids.core.price] },
          { product: ids.pro.product, prices: [ids.pro.price] },
        ],
        // Downgrades (Pro -> Core) wait until the end of the period.
        schedule_at_period_end: { conditions: [{ type: "decreasing_item_amount" }] },
      },
    },
  };

  let existing: Stripe.BillingPortal.Configuration | undefined;
  for await (const c of stripe.billingPortal.configurations.list({ limit: 100 })) {
    if (c.metadata?.ims_portal === "v1") existing = c;
  }
  if (DRY) {
    log(`Customer portal: would ${existing ? `update ${existing.id}` : "create a configuration"} (proration: ${PRORATION})`);
    return existing?.login_page.url ?? null;
  }
  const config = existing
    ? await stripe.billingPortal.configurations.update(existing.id, params)
    : await stripe.billingPortal.configurations.create(params);
  log(`Customer portal: ${existing ? "updated" : "created"} ${config.id} (proration: ${PRORATION})`);
  return config.login_page.url;
}

async function main() {
  const live = await checkAccount();
  const ids = {} as Record<TierId, { product: string; price: string }>;
  for (const tier of TIER_IDS) ids[tier] = await ensureTier(tier);
  const portalUrl = DRY && ids.core.price === "(new)" ? null : await ensurePortal(ids);

  console.log("\nRecord these in STRIPE.md (IDs only):");
  for (const tier of TIER_IDS) console.log(`  ${PRODUCTS[tier].name}: product ${ids[tier].product}, price ${ids[tier].price} (${LOOKUP_KEYS[tier]})`);
  console.log(`  Mode: ${live ? "LIVE" : "test"}`);
  if (portalUrl) console.log(`  Portal login link (set as NEXT_PUBLIC_STRIPE_PORTAL_URL): ${portalUrl}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
