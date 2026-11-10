import "server-only";
import Stripe from "stripe";
import { LOOKUP_KEYS, type TierId } from "@/lib/tiers";

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

const priceCache = new Map<TierId, { id: string; at: number }>();
const PRICE_TTL_MS = 10 * 60 * 1000;

/** Resolve a tier to its active Stripe Price id by lookup_key (cached for 10 minutes). */
export async function priceIdForTier(tier: TierId): Promise<string> {
  const hit = priceCache.get(tier);
  if (hit && Date.now() - hit.at < PRICE_TTL_MS) return hit.id;
  const { data } = await stripe().prices.list({ lookup_keys: [LOOKUP_KEYS[tier]], active: true, limit: 1 });
  const price = data[0];
  if (!price) throw new Error(`No active Stripe price for lookup_key ${LOOKUP_KEYS[tier]}`);
  priceCache.set(tier, { id: price.id, at: Date.now() });
  return price.id;
}
