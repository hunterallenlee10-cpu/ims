// /signals (membership) copy, plus the tier and signal data used across the site.
// Source of truth: three monthly tiers. Each higher tier includes everything below it.
// No countdowns, no "spots left", no strikethrough prices, no "most popular" labels.

import type { IconName } from "@/components/ui/Icon";

import type { TierId } from "@/lib/tiers";
export type { TierId };

export const groups = {
  core: "Core Members - SIGNAL ONLY",
  main: "Investing Mastery Signals",
} as const;

/** The four signals. `tiers` lists who gets each one. */
export const signalCatalog: { icon: IconName; name: string; text: string; tiers: string }[] = [
  {
    icon: "valuation",
    name: "Portfolio Signal",
    text: "The portfolio-level signal, posted with its reasoning written out.", // TODO(Hunter): one-line description of what it measures
    tiers: "Core, Pro and Champion",
  },
  {
    icon: "refresh",
    name: "BTC DCA Signal",
    text: "A rules-based signal for members who dollar-cost average into Bitcoin, posted with its reasoning.", // TODO(Hunter): confirm description
    tiers: "Pro and Champion",
  },
  {
    icon: "trend",
    name: "TPI - Trend Probability Indicator",
    text: "A rules-based trend probability reading, posted with the reasoning behind it.", // TODO(Hunter): confirm description
    tiers: "Pro and Champion",
  },
  {
    icon: "note",
    name: "IA - Investing Analysis",
    text: "Investing analysis and research posts, with the reasoning written out.", // TODO(Hunter): confirm description
    tiers: "Pro and Champion",
  },
];

export type Tier = {
  id: TierId;
  name: string;
  price: string;
  /** Plain number for structured data. */
  amount: number;
  period: string;
  /** "Everything in Core, plus:" style line. */
  inherits?: string;
  rows: { label: string; items: string[] }[];
  whoFor?: string;
  note?: string;
  /** Champion only: shown instead of rows until compliance clears the wording. */
  pending?: string;
  /** Checkout button label. The button posts only the tier id to /api/checkout. */
  cta: { label: string };
};

export const tiers: Tier[] = [
  {
    id: "core",
    name: "Core",
    price: "$25",
    amount: 25,
    period: "USD / month, billed monthly",
    rows: [
      { label: "Group", items: [`${groups.core} (read-only)`] },
      { label: "Signals", items: ["Portfolio Signal only"] },
      { label: "Research", items: ["None"] },
      { label: "Community", items: ["Read-only: members can't post or ask questions"] },
    ],
    whoFor: "People who want the portfolio signal and nothing else.",
    cta: { label: "Join Core" },
  },
  {
    id: "pro",
    name: "Pro",
    price: "$50",
    amount: 50,
    period: "USD / month, billed monthly",
    inherits: "Everything in Core, plus:",
    rows: [
      { label: "Group", items: [`Full access to the main ${groups.main} group, every topic`] },
      { label: "Signals", items: ["Portfolio Signal", "BTC DCA Signal", "TPI - Trend Probability Indicator", "IA - Investing Analysis"] },
      { label: "Research", items: ["Weekly research note", "Macro and liquidity briefing", "Method notes on how the models work"] },
      { label: "Community", items: ["All chats", "Live calls", "Ask the Founders", "Talk with other members and the founders"] },
    ],
    whoFor: "People who want the full system, the reasoning behind it, and the community.",
    note: "You manage and move your own money. IMS provides signals and analysis only.",
    cta: { label: "Join Pro" },
  },
  {
    id: "champion",
    name: "Champion",
    price: "$399",
    amount: 399,
    period: "USD / month, billed monthly",
    inherits: "Everything in Pro, plus:",
    rows: [{ label: "Portfolio management", items: ["We manage your portfolio for you"] }],
    cta: { label: "Join Champion" },
  },
];

export const signals = {
  meta: {
    title: "Membership and Pricing",
    description:
      "Core ($25/month), Pro ($50/month) and Champion ($399/month) memberships for Investing Mastery Signals, delivered in private Telegram groups. How joining, billing, cancelling and switching tiers work.",
  },

  hero: {
    eyebrow: "Membership",
    title: "Pick your\n*tier.*",
    intro:
      "Three monthly memberships, all delivered in private Telegram groups. **Each tier includes everything in the tiers below it.**",
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Three tiers.\n*Billed monthly.*",
    canceled: "Checkout canceled. You haven't been charged. Pick a tier when you're ready.",
    agree: "By joining you agree to the",
    footnote: "Prices in USD. Depending on where you live, sales tax or VAT may apply at checkout. Stripe processes payments as the merchant of record.",
    championClosed: "Champion checkout opens soon.",
    redirecting: "Opening checkout…",
    error: "Checkout couldn't start. Please try again, or contact support.",
  },

  success: {
    meta: { title: "Payment Received", description: "Your Investing Mastery Signals payment went through. Your private Telegram invite link is on its way by email." },
    eyebrow: "You're in",
    title: "Payment\n*received.*",
    intro: "Thanks for joining Investing Mastery Signals. **This page doesn't grant access.** Your invite comes by email.",
    steps: [
      { title: "Check your email", text: "Your private invite link arrives by email within 12 hours. Check spam if you don't see it." },
      { title: "Request to join", text: "Open the link in Telegram and tap Request to Join. Use the Telegram username you entered at checkout." },
      { title: "Read Start Here", text: "Once you're approved, read the Start Here topic first." },
    ],
    help: "Invite didn't arrive, or your username changed? Contact support:",
  },

  joining: {
    eyebrow: "How joining works",
    title: "From checkout\n*to the group.*",
    subhead:
      "Core members join **" + groups.core + "**. Pro and Champion members join the main **" + groups.main + "** group.",
    steps: [
      { title: "Choose a tier", text: "Pick Core, Pro or Champion above." },
      { title: "Pay with Stripe", text: "Checkout runs on Stripe. Enter your Telegram username there so we can approve your request." },
      { title: "Get your invite", text: "A private invite link arrives by email within 12 hours." },
      { title: "Request to join", text: "Open the link in Telegram and tap Request to Join." },
      { title: "Get approved", text: "Your request is approved once it matches your paid membership and Telegram username." },
      { title: "Read Start Here", text: "Start with the Start Here topic. It explains how the group works." },
    ],
  },

  switching: {
    eyebrow: "Upgrade or downgrade",
    title: "Change tiers\n*any time.*",
    subhead: "Switch between Core and Pro yourself in **Manage membership**. Sign in with the email you paid with.",
    items: [
      {
        label: "Core to Pro",
        text: "Takes effect right away. The price difference for the rest of the current month is added to your next bill. You get an invite to the main " + groups.main + " group, and you're removed from the Core group once you've joined.",
      },
      {
        label: "Pro to Core",
        text: "Takes effect at the end of your current billing period. Then you're removed from the main group and invited to " + groups.core + ".",
      },
      {
        label: "Champion",
        text: "Contact us anytime to move up to Champion. Champion members can cancel in Manage membership, or contact us to switch tiers.",
      },
    ],
  },

  terms: {
    eyebrow: "Billing and cancellation",
    title: "Clear\n*terms.*",
    subhead: "Read these before you join.",
    items: [
      { label: "Billing", text: "Every tier is billed monthly in USD, in advance, through Stripe, until you cancel." },
      { label: "Cancelling", text: "Cancel any time in Manage membership. Sign in with the email you paid with." },
      { label: "After you cancel", text: "Access continues to the end of the period you've paid for. Then your membership ends and you're removed from the group." },
      {
        label: "Failed payments",
        text: "Stripe emails you and retries your card automatically. You keep access while retries run. If every retry fails, your membership is canceled and you're removed from the group.",
      },
      { label: "Receipts", text: "Stripe emails a receipt for every payment. Past invoices are in Manage membership." },
      { label: "Refunds", text: "No refunds for periods already paid. Cancel anytime to stop future charges; your access continues to the end of the period you've paid for." },
      { label: "Price changes", text: "We give at least 30 days' notice before a price change applies to your membership. You can cancel before it takes effect." },
      { label: "Age", text: "Membership is for adults 18 and over." },
    ],
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Risk Disclosure", href: "/risk-disclosure" },
    ],
  },

  faq: {
    eyebrow: "Before you join",
    title: "Membership\n*questions.*",
    ids: ["core-vs-pro", "telegram", "cancel", "upgrade", "payment-failed", "refunds", "financial-advice"],
  },

  twoPaths: {
    eyebrow: "Your call",
    title: "Two paths.\n*Pick one.*",
    left: {
      title: "Keep guessing",
      text: "Same headlines, same second-guessing, and no written plan for when markets turn.",
    },
    right: {
      title: "Follow a system",
      text: "Rules-based signals with the reasoning written out, and your own decisions about what to do with them.",
    },
    cta: { label: "Choose a tier", href: "#pricing" },
  },
};
