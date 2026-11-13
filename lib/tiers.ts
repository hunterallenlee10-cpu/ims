// Tier ids and their Stripe price lookup keys. Shared by the checkout route and the setup script.
export const TIER_IDS = ["core", "pro"] as const;
export type TierId = (typeof TIER_IDS)[number];

export const LOOKUP_KEYS: Record<TierId, string> = {
  core: "ims_core_monthly",
  pro: "ims_pro_monthly",
};

export const BILLING_PERIODS = ["monthly", "yearly"] as const;
export type Billing = (typeof BILLING_PERIODS)[number];

/** Yearly prices exist only for the tiers listed here. */
export const YEARLY_LOOKUP_KEYS: Partial<Record<TierId, string>> = {
  pro: "ims_pro_yearly",
};

/** The Stripe lookup_key for a tier and billing period, or undefined if that combination isn't sold. */
export function lookupKeyFor(tier: TierId, billing: Billing): string | undefined {
  return billing === "yearly" ? YEARLY_LOOKUP_KEYS[tier] : LOOKUP_KEYS[tier];
}

export function isBilling(value: unknown): value is Billing {
  return typeof value === "string" && (BILLING_PERIODS as readonly string[]).includes(value);
}

export function isTierId(value: unknown): value is TierId {
  return typeof value === "string" && (TIER_IDS as readonly string[]).includes(value);
}
