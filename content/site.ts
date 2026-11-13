// Site-wide copy and settings. Edit text here; components read from this file.
// Anything in [TODO: ...] brackets is missing information. See PLACEHOLDERS.md.

export type NavLink = { label: string; href: string };

export const site = {
  name: "Investing Mastery Signals",
  shortName: "IMS",
  description:
    "Rules-based crypto valuation and trend signals, each with its reasoning written out, delivered in private Telegram groups. Core or Pro by card, or a full year of Pro access paid in Bitcoin.",
  // Set NEXT_PUBLIC_SITE_URL in Vercel to the production domain, e.g. https://example.com
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  builtBy: { text: "Website Built & Operated by", name: "Lee Enterprises Unlimited", href: "https://leeenterprisesunlimited.com" },
  legalEntity: "Investing Mastery Signals",
  // Support and contact phone number shown across the site.
  phone: { display: "(240) 538-3463", href: "tel:+12405383463" },
  founders: ["Hunter Lee", "Aaron Wathen"],

  // IM logo mark (transparent PNG, 712x430) shown beside the text wordmark, and a
  // square version on its dark background for search engines and app icons.
  logo: {
    mark: { src: "/brand/logo-mark.png", width: 712, height: 430 },
    square: "/brand/logo-square.png",
  },

  // Where every "Join" button outside the pricing cards points.
  joinHref: "/signals#pricing",
  joinLabel: "See membership",

  // Stripe's no-code customer portal login link (members sign in with their email).
  // Set NEXT_PUBLIC_STRIPE_PORTAL_URL in Vercel. Test and live mode have different links.
  manageMembership: {
    label: "Manage membership",
    href: process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL ?? "[TODO: Stripe customer portal login link]",
  },

  // Only true claims. The return figure must be backed by records (which signal, actual or backtest).
  trustLine: ["Rules-based", "Reasoning written out", "+281% From August 2023 - November 2026"],

  ageNotice: "Membership is for adults 18 and over.",

  // Required wording. Shown in the footer on every page and next to the pricing table.
  disclaimer:
    "IMS provides general research and educational information only. It is not financial, investment, legal, or tax advice.",
  riskNote:
    "Crypto is highly volatile. Past performance does not guarantee future results. You can lose some or all of your money. Do your own research and consider speaking with a licensed professional.",

  nav: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Membership", href: "/signals" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ] satisfies NavLink[],

  socials: [
    { label: "X", href: "[TODO: X URL]", icon: "x" },
    { label: "YouTube", href: "[TODO: YouTube URL]", icon: "youtube" },
    { label: "Instagram", href: "[TODO: Instagram URL]", icon: "instagram" },
  ] as const,

  footer: {
    columns: [
      {
        title: "Membership",
        links: [
          { label: "Pricing", href: "/signals#pricing" },
          { label: "How joining works", href: "/signals#joining" },
          { label: "Billing", href: "/signals#billing" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "The signals",
        links: [
          { label: "How It Works", href: "/how-it-works" },
          { label: "The groups", href: "/how-it-works#groups" },
          { label: "Group rules", href: "/how-it-works#rules" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Founders", href: "/about#founders" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Disclaimer", href: "/disclaimer" },
          { label: "Risk Disclosure", href: "/risk-disclosure" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy" },
        ],
      },
    ] satisfies { title: string; links: NavLink[] }[],
  },
};

/** True when a string still holds a [PLACEHOLDER] or [TODO: ...] token. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || /\[[A-Z][^\]]*\]/.test(value);
}
