// Site-wide copy and settings. Edit text here; components read from this file.
// Anything in [TODO: ...] brackets is missing information. See PLACEHOLDERS.md.

export type NavLink = { label: string; href: string };

export const site = {
  name: "Investing Mastery Signals",
  shortName: "IMS",
  description:
    "Rules-based crypto valuation and trend signals, each with its reasoning written out, delivered in private Telegram groups. Three monthly memberships: Core, Pro and Champion.",
  // Set NEXT_PUBLIC_SITE_URL in Vercel to the production domain, e.g. https://example.com
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  legalEntity: "Investing Mastery Signals",
  // Support and contact phone number shown across the site.
  phone: { display: "(240) 538-3463", href: "tel:+12405383463" },
  founders: ["Hunter Lee", "Aaron Wathen"],

  // Set to "/brand/logo.svg" once the real logo file is in public/brand/.
  logoSrc: null as string | null,

  // Where every "Join" button outside the pricing cards points.
  joinHref: "/signals#pricing",
  joinLabel: "See membership",

  // Stripe's no-code customer portal login link (members sign in with their email).
  // Set NEXT_PUBLIC_STRIPE_PORTAL_URL in Vercel. Test and live mode have different links.
  manageMembership: {
    label: "Manage membership",
    href: process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL ?? "[TODO: Stripe customer portal login link]",
  },

  // Only true claims.
  trustLine: ["Rules-based", "Reasoning written out", "Cancel anytime"],

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
          { label: "Example signal", href: "/how-it-works#signal-anatomy" },
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
