// /signals (membership) copy, plus the tier and signal data used across the site.
// Source of truth: Core (monthly), Pro (monthly or yearly) through Stripe, plus one year of Pro access paid in Bitcoin.
// No countdowns, no "spots left", no strikethrough prices, no "most popular" labels.

import type { IconName } from "@/components/ui/Icon";

import type { TierId } from "@/lib/tiers";
export type { TierId };

export const groups = {
  core: "Core Members - SIGNAL ONLY",
  main: "Investing Mastery Signals",
} as const;

/** The four signals. `tagline` is the one-line promise under the name; `tiers` lists who gets each one. */
export const signalCatalog: { icon: IconName; name: string; tagline: string; text: string; tiers: string }[] = [
  {
    icon: "valuation",
    name: "Portfolio Signal",
    tagline: "What to hold, and how much.",
    text: "One post every evening: your cash allocation, a short module of small short positions (often on around ten altcoins), the net positions that result, and the BTC leverage condition. It's actively managed and can change any day, so check in daily.",
    tiers: "All plans (Core gets it without the short positions)",
  },
  {
    icon: "refresh",
    name: "BTC DCA Signal",
    tagline: "How much of your cash goes into Bitcoin today.",
    text: "The SDCA (Strategic Dollar Cost Averaging) signal: the percentage of your remaining cash to put into BTC each day. The default is about 1% a day, and it speeds up when the accelerated accumulation threshold is passed. BTC only, posted daily.",
    tiers: "Pro and the BTC year",
  },
  {
    icon: "trend",
    name: "TPI (Trend Probability Indicator)",
    tagline: "Is the market trending up or down?",
    text: "Two readings, posted daily as a pair of dials: the long-term bull/bear probability (LTPI) and the medium-term trend probability (MTPI). Each runs from -1 to +1 and comes with its state, positive or negative, and its rate of change.",
    tiers: "Pro and the BTC year",
  },
  {
    icon: "note",
    name: "IA (Investing Analysis)",
    tagline: "The why behind every move.",
    text: "Daily chart-based commentary on on-chain data, liquidations, stablecoin supply, valuation models and sentiment, with a view by timeframe that ties back to the Portfolio Signal. Plus the daily BTC valuation z-score update.",
    tiers: "Pro and the BTC year",
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
  /** What this tier leaves out, shown with a cross. */
  excludes?: string[];
  /** Highlighted with a purple frame. A visual cue only: never a "most popular" label. */
  featured?: boolean;
  whoFor?: string;
  note?: string;
  /** Checkout button label. The button posts only the tier id to /api/checkout. */
  cta: { label: string };
  /** Optional yearly billing, shown under the monthly price with its own checkout button. */
  yearly?: { price: string; amount: number; period: string; note: string; cta: { label: string } };
};

export const tiers: Tier[] = [
  {
    id: "core",
    name: "Core",
    price: "$20",
    amount: 20,
    period: "USD / month, billed monthly",
    rows: [
      // The exact group name (groups.core) stays in the FAQ, Terms and joining steps; the card uses plain words.
      { label: "Group", items: ["The Core Members group, signals only (read-only)"] },
      { label: "Signals", items: ["Portfolio Signal, every day, without the short positions"] },
      { label: "Community", items: ["Read-only: members can't post or ask questions"] },
    ],
    excludes: [
      "Short positions in the Portfolio Signal",
      "BTC DCA Signal",
      "TPI (Trend Probability Indicator)",
      "IA (Investing Analysis), where the reasoning is written up",
      "Member Chat and Questions",
      "Training videos (coming soon)",
    ],
    whoFor: "People who want the daily portfolio signal and nothing else.",
    note: "Move up to Pro any time in Manage membership. It takes effect right away.",
    cta: { label: "Join Core" },
  },
  {
    id: "pro",
    name: "Pro",
    price: "$25",
    amount: 25,
    period: "USD / month, billed monthly",
    inherits: "Everything in Core, plus:",
    featured: true,
    rows: [
      { label: "Group", items: [`Full access to the main ${groups.main} group, every topic`] },
      { label: "Signals", items: ["Portfolio Signal, including short positions", "BTC DCA Signal (SDCA)", "TPI (Trend Probability Indicator)", "IA (Investing Analysis)"] },
      { label: "Community", items: ["Start Here: setup steps, rules and disclaimer", "Member Chat: talk with members and the founders", "Questions: the founders answer here"] },
      { label: "Coming soon", items: ["Training videos"] },
    ],
    whoFor: "People who want the full system, the reasoning behind it, and the community.",
    note: "You manage and move your own money. IMS provides signals and analysis only.",
    cta: { label: "Join Pro monthly" },
    // Keep in sync with the ims_pro_yearly price in scripts/stripe-setup.mts.
    yearly: {
      price: "$249",
      amount: 249,
      period: "USD / year, billed yearly",
      note: "$51 less than 12 monthly payments.",
      cta: { label: "Join Pro yearly" },
    },
  },
];

/** The Pro feature rows, shared by the Pro card and the BTC card. */
const fullAccessRows = tiers.find((t) => t.id === "pro")!.rows;

/**
 * One year of Pro access, paid once in Bitcoin. Not a Stripe product: there is no checkout,
 * no auto-renewal and no Manage membership. The button opens /join/btc, which shows the address.
 * Keep the facts here in sync with the btc page copy below and section 6 of the Terms.
 */
export const btcOffer = {
  id: "btc",
  name: "1 Year, Paid in BTC",
  price: "$199",
  amount: 199,
  period: "USD in Bitcoin, one payment for 12 months",
  inherits: "Full access, the same as Pro:",
  rows: fullAccessRows,
  whoFor: "People who'd rather pay once, in Bitcoin, for a full year.",
  note: "One payment. Nothing renews automatically. Your year starts the day we confirm your payment.",
  cta: { label: "Pay with BTC", href: "/join/btc" },
  closed: "Bitcoin payment opens soon.",
};

export const signals = {
  meta: {
    title: "Membership and Pricing",
    description:
      "Core ($20/month), Pro ($25/month or $249/year), or a full year of Pro access for $199 paid in Bitcoin. Investing Mastery Signals memberships, delivered in private Telegram groups. How joining, billing, cancelling and switching tiers work.",
  },

  hero: {
    eyebrow: "Membership",
    title: "Pick your\n*tier.*",
    intro:
      "Core or Pro by card, monthly or yearly, or a full year of Pro access paid in Bitcoin. All delivered in private Telegram groups. **Pro includes everything in Core.**",
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Pick a plan.\n*Pay your way.*",
    canceled: "Checkout canceled. You haven't been charged. Pick a tier when you're ready.",
    agree: "By joining you agree to the",
    footnote: "Prices in USD. For card payments, depending on where you live, sales tax or VAT may apply at checkout, and Stripe processes the payment as the merchant of record. Bitcoin payments are made directly to IMS.",
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

  btc: {
    meta: {
      title: "Pay with Bitcoin",
      description: "One year of full Investing Mastery Signals access for $199, paid once in Bitcoin. Where to send it and how you get into the Telegram group.",
    },
    eyebrow: "1 year, paid in BTC",
    title: "Pay with\n*Bitcoin.*",
    intro: "**$199 worth of BTC, paid once, gets a full year of Pro access.** Nothing renews automatically. Read every step before you send.",
    details: {
      title: "Payment details",
      rows: [
        { label: "Amount", text: "$199 USD worth of BTC, at the BTC price when you send. Send a little extra to cover your wallet's network fee: at least $199 has to arrive." },
        { label: "Network", text: "Bitcoin network only (on-chain BTC). Don't send Bitcoin Cash (BCH), Lightning, wrapped BTC or any other coin or network: it will be lost." },
        { label: "Address", text: "" },
      ],
      qrLabel: "QR code for the IMS Bitcoin address",
      qrNote: "Scan with your wallet, then enter $199 worth of BTC yourself.",
      copy: "Copy address",
      copied: "Copied",
      closed: "The Bitcoin address isn't published yet. Bitcoin payment opens soon.",
      warning: "Check the address character by character before you send. Don't send Bitcoin Cash (BCH) to this address. Bitcoin payments can't be reversed, and coins sent to the wrong address or network can't be recovered.",
    },
    steps: {
      title: "How it works",
      items: [
        { title: "Send the BTC", text: "Send $199 worth of BTC to the address above from your own wallet or exchange." },
        { title: "Send us your details", text: "Through the contact form, send the transaction ID (TXID), the email you want your invite sent to, and your Telegram username." },
        { title: "We confirm it", text: "We check the payment on the Bitcoin network. It counts once it has confirmed and at least $199 arrived." },
        { title: "Get your invite", text: "Your private invite link to the main " + groups.main + " group arrives by email within 12 hours of confirmation." },
        { title: "Request to join", text: "Open the link in Telegram and tap Request to Join with the username you gave us." },
        { title: "Your year runs", text: "Access lasts 12 months from the day we confirm your payment. We'll contact you before it ends about renewing." },
      ],
      cta: { label: "Send your transaction details", href: "/contact" },
    },
    rules: {
      title: "Good to know",
      items: [
        { label: "Refunds", text: "Bitcoin payments are final. No refunds once your payment has confirmed." },
        { label: "Short payment", text: "If less than $199 worth arrives, we'll email you to send the difference before we send your invite." },
        { label: "No auto-renewal", text: "We never charge you again. To stay after your year, pay again in Bitcoin or join by card." },
        { label: "Not in Manage membership", text: "Manage membership is for card memberships only. For anything about a BTC year, contact us." },
        { label: "Age", text: "Membership is for adults 18 and over." },
      ],
    },
  },

  joining: {
    eyebrow: "How joining works",
    title: "From checkout\n*to the group.*",
    subhead:
      "Core members join **" + groups.core + "**. Pro members and BTC-year members join the main **" + groups.main + "** group.",
    steps: [
      { title: "Choose a plan", text: "Pick Core, Pro or the BTC year above." },
      { title: "Pay", text: "Card checkout runs on Stripe: enter your Telegram username there. Paying in Bitcoin? Send us your transaction ID and Telegram username instead." },
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
        label: "Pro monthly to yearly",
        text: "Takes effect right away. You're charged $249 for the year, minus a credit for the unused part of your current month. Moving from yearly back to monthly takes effect when your year ends.",
      },
      {
        label: "BTC year",
        text: "The BTC year is a one-time payment, so there's nothing to switch or cancel in Manage membership. Near the end of your year we'll contact you about renewing, in Bitcoin or by card.",
      },
    ],
  },

  terms: {
    eyebrow: "Billing and cancellation",
    title: "Clear\n*terms.*",
    subhead: "Read these before you join.",
    items: [
      { label: "Billing", text: "Core is billed monthly. Pro is billed monthly ($25) or yearly ($249), whichever you pick. Card memberships are billed in USD, in advance, through Stripe, until you cancel." },
      { label: "Paying in Bitcoin", text: "$199 worth of BTC, paid once, gets 12 months of Pro access. It doesn't renew automatically. Bitcoin payments are final and can't be refunded." },
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
      text: "Rules-based signals posted every evening, and your own decisions about what to do with them.",
    },
    cta: { label: "Choose a plan", href: "#pricing" },
  },
};
