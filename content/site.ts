// Site-wide copy and settings. Edit text here; components read from this file.
// Anything in [BRACKETS] is a placeholder. See PLACEHOLDERS.md.

export type NavLink = { label: string; href: string };

export const site = {
  name: "Investing Mastery Signals",
  shortName: "IMS",
  description:
    "Systematic, rules-based investment research. Investing Mastery Signals publishes the same valuation, trend and risk signals to every member, with the reasoning written down.",
  // Set NEXT_PUBLIC_SITE_URL in Vercel to the production domain, e.g. https://[DOMAIN]
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  legalEntity: "[LEGAL ENTITY NAME]",
  email: "[EMAIL]",
  founders: ["Hunter Lee", "Aaron Wathen"],

  // Set to "/brand/logo.svg" once the real logo file is in public/brand/.
  logoSrc: null as string | null,

  // Where every "Join Signals" button points. Tier cards on /signals hold the real [JOIN LINK]s.
  joinHref: "/signals",
  joinLabel: "Join Signals",

  // Only true claims. Items marked [CONFIRM] are not yet confirmed.
  trustLine: ["Rules-based", "Same signal for every member", "Cancel anytime [CONFIRM]"],

  ageNotice: "Membership is for adults 18 and over.",

  disclaimer:
    "Investing Mastery Signals publishes general, impersonal research for educational purposes. Nothing on this site is financial, investment, tax or legal advice. Investing involves risk, including loss of principal. Past performance does not guarantee future results.",

  nav: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Signals", href: "/signals" },
    { label: "Research", href: "/research" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ] satisfies NavLink[],

  socials: [
    { label: "X", href: "[X URL]", icon: "x" },
    { label: "YouTube", href: "[YOUTUBE URL]", icon: "youtube" },
    { label: "Instagram", href: "[INSTAGRAM URL]", icon: "instagram" },
    { label: "Community", href: "[DISCORD/TELEGRAM URL]", icon: "chat" },
  ] as const,

  footer: {
    columns: [
      {
        title: "Signals",
        links: [
          { label: "Membership", href: "/signals" },
          { label: "How It Works", href: "/how-it-works" },
          { label: "Example signal", href: "/how-it-works#signal-anatomy" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Founders", href: "/about#founders" },
          { label: "Principles", href: "/about#principles" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Research",
        links: [
          { label: "All research", href: "/research" },
          { label: "Method notes", href: "/research?tag=method" },
          { label: "Valuation", href: "/research?tag=valuation" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Disclaimer", href: "/disclaimer" },
          { label: "Risk Disclosure", href: "/risk-disclosure" },
          { label: "Terms", href: "/terms" },
          { label: "Privacy", href: "/privacy" },
        ],
      },
    ] satisfies { title: string; links: NavLink[] }[],
  },
};

/** True when a string still holds a [PLACEHOLDER] token. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || /\[[A-Z0-9 /_.&-]+\]/.test(value);
}
