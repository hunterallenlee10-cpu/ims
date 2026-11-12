import "server-only";
import Stripe from "stripe";
import { lookupKeyFor, type Billing, type TierId } from "@/lib/tiers";

let client: Stripe | null = null;

/** Server-side Stripe client. The secret key only ever comes from the environment. */
export function stripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(key, { appInfo: { name: "ims-website" }, httpClient: Stripe.createFetchHttpClient() });
  }
  return client;
}

const priceCache = new Map<string, { id: string; at: number }>();
const PRICE_TTL_MS = 10 * 60 * 1000;

/** Resolve a tier and billing period to its active Stripe Price id by lookup_key (cached for 10 minutes). */
export async function priceIdFor(tier: TierId, billing: Billing): Promise<string> {
  const key = lookupKeyFor(tier, billing);
  if (!key) throw new Error(`No ${billing} price for tier ${tier}`);
  const hit = priceCache.get(key);
  if (hit && Date.now() - hit.at < PRICE_TTL_MS) return hit.id;
  const { data } = await stripe().prices.list({ lookup_keys: [key], active: true, limit: 1 });
  const price = data[0];
  if (!price) throw new Error(`No active Stripe price for lookup_key ${key}`);
  priceCache.set(key, { id: price.id, at: Date.now() });
  return price.id;
}
