// /signals (membership) copy. Two tiers, same signals on both.
// No countdowns, no "spots left", no strikethrough prices, no "most popular" labels.

export type Tier = {
  name: string;
  price: string;
  period: string;
  blurb: string;
  includes: string[];
  joinHref: string;
  note?: string;
};

export const signals = {
  meta: {
    title: "Join Signals",
    description:
      "Investing Mastery Signals membership: two billing options with the same rules-based signals and research. Clear terms, cancel information, 18+ only.",
  },

  hero: {
    eyebrow: "Membership",
    title: "Join *Signals*",
    intro:
      "Two ways to pay, one membership. Both options get the same signals, the same research and the same access, at the same time.",
  },

  tiers: {
    eyebrow: "Choose a billing option",
    title: "Same signal. Your *schedule*.",
    items: [
      {
        name: "Monthly", // [CONFIRM tier name]
        price: "[PRICE]",
        period: "per month", // [BILLING PERIOD]
        blurb: "Pay month to month.",
        includes: [
          "All signals: valuation, trend, risk gate",
          "Change alerts when a state flips",
          "Weekly research note",
          "Macro & liquidity briefing",
          "Member channel on [DISCORD/TELEGRAM/EMAIL]",
        ],
        joinHref: "[JOIN LINK: monthly]",
      },
      {
        name: "Annual", // [CONFIRM tier name]
        price: "[PRICE]",
        period: "per year", // [BILLING PERIOD]
        blurb: "Pay once a year.",
        includes: [
          "Everything in Monthly",
          "Same signals and research, same timing",
          "One payment per year",
        ],
        joinHref: "[JOIN LINK: annual]",
        note: "[ANNUAL NOTE: only state a saving if it is real and exact]",
      },
    ] satisfies Tier[],
    footnote: "Prices in [CURRENCY]. Taxes may apply. [CONFIRM]",
  },

  included: {
    eyebrow: "Included in every membership",
    title: "Everything you *get*",
    groups: [
      {
        title: "Signals",
        items: [
          "Long-term valuation Z-score",
          "Trend state across several timeframes",
          "Risk & leverage gate status",
          "One composite state with written reasoning",
          "Alerts when any state changes",
        ],
      },
      {
        title: "Research & access",
        items: [
          "Weekly research note",
          "Macro & liquidity briefing",
          "Method notes on how each input works",
          "Archive of past signal posts",
          "Member channel on [DISCORD/TELEGRAM/EMAIL]",
        ],
      },
    ],
    note: "[CONFIRM] every item above before launch.",
  },

  terms: {
    eyebrow: "Billing & cancellation",
    title: "Clear *terms*",
    subhead: "Read these before you join. [CONFIRM all terms]",
    items: [
      { label: "Billing", text: "Billed [BILLING PERIOD] in advance until you cancel." },
      { label: "Cancelling", text: "[CANCELLATION STEPS: e.g. cancel any time from your account page.]" },
      { label: "After you cancel", text: "[ACCESS AFTER CANCEL: e.g. access continues to the end of the period you paid for.]" },
      { label: "Refunds", text: "[REFUND POLICY]" },
      { label: "Price changes", text: "[PRICE CHANGE POLICY: e.g. notice given before any change takes effect.]" },
      { label: "Age", text: "Membership is for adults 18 and over." },
    ],
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Risk Disclosure", href: "/risk-disclosure" },
    ],
  },

  faq: {
    eyebrow: "Before you join",
    title: "Membership *questions*",
    ids: ["financial-advice", "personalized", "receive", "cancel", "refunds", "tiers", "manage-money"],
  },

  twoPaths: {
    eyebrow: "Your call",
    title: "Two *paths*",
    left: {
      title: "Keep guessing",
      text: "Same headlines, same second-guessing, and no written plan for when markets turn.",
    },
    right: {
      title: "Follow a system",
      text: "Rules-based signals, the reasoning in writing, and your own plan for what to do with them.",
    },
    cta: { label: "Choose a billing option", href: "#tiers" },
  },
};
