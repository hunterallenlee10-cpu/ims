// Tier ids and their Stripe price lookup keys. Shared by the checkout route and the setup script.
export const TIER_IDS = ["core", "pro", "champion"] as const;
export type TierId = (typeof TIER_IDS)[number];

export const LOOKUP_KEYS: Record<TierId, string> = {
  core: "ims_core_monthly",
  pro: "ims_pro_monthly",
  champion: "ims_champion_monthly",
};

export function isTierId(value: unknown): value is TierId {
  return typeof value === "string" && (TIER_IDS as readonly string[]).includes(value);
}

/** Champion checkout stays off unless CHAMPION_CHECKOUT_ENABLED is exactly "true". */
export function championCheckoutEnabled(): boolean {
  return process.env.CHAMPION_CHECKOUT_ENABLED === "true";
}
