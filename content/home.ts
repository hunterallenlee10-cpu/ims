// Home page copy. *Asterisks* mark the one accent word in a headline.
// See PLACEHOLDERS.md for every [BRACKETED] item.

import type { IconName } from "@/components/ui/Icon";

export const home = {
  meta: {
    title: "Systematic Investment Research",
    description:
      "Rules-based valuation, trend and risk signals, published the same way to every member, with the reasoning written down. General research, not personal advice.",
  },

  hero: {
    eyebrow: "Systematic investment research",
    title: "Investing Mastery Signals",
    tagline: "The science of wealth multiplication.", // [CONFIRM tagline]
    sentence:
      "Members get a rules-based read on valuation, trend and risk, published to everyone at the same time, with the reasoning written down.",
    primary: { label: "Join Signals", href: "/signals" },
    secondary: { label: "See how it works", href: "/how-it-works" },
  },

  console: {
    eyebrow: "Inside the signal",
    title: "One screen. Three *inputs*.",
    subhead: "This is what a signal update looks like. The numbers below are made up to show the format.",
    badge: "Example data",
    caption: "Illustrative only. Not a real or current signal, and not a recommendation.",
    asset: "Example asset",
    trend: { label: "Trend state", value: "Uptrend", detail: "Rules met on 3 of 3 timeframes" },
    valuation: { label: "Valuation Z-score", value: 0.8, detail: "Fair to slightly expensive" },
    gate: { label: "Risk & leverage gate", value: "Closed", detail: "Conditions do not support added leverage" },
    composite: { label: "Composite state", value: "Hold exposure" },
    updated: "Last updated: Example · Mon 14:00 UTC",
  },

  // Stats render only once a real value replaces null. All null = section hidden.
  stats: {
    eyebrow: "By the numbers",
    items: [
      { value: null as string | null, label: "[NUMBER] Label one" },
      { value: null as string | null, label: "[NUMBER] Label two" },
      { value: null as string | null, label: "[NUMBER] Label three" },
      { value: null as string | null, label: "[NUMBER] Label four" },
    ],
  },

  vs: {
    eyebrow: "Two ways to invest",
    title: "Opinion or *process*",
    subhead: "Most investors decide on feel. A system decides the same way every time.",
    theirs: {
      title: "Guessing, hype and influencer calls",
      points: [
        "Decisions follow headlines and mood",
        "Calls arrive without the reasoning behind them",
        "Different answers depending on who you ask",
        "No plan written down for when the market turns",
      ],
    },
    ours: {
      title: "Rules, data and a written process",
      points: [
        "Signals come from fixed rules, not mood",
        "Every change comes with the reason in writing",
        "The same signal for every member, at the same time",
        "Risk is checked before any added exposure",
      ],
    },
  },

  // [CONFIRM list]
  program: {
    eyebrow: "What members get",
    title: "Five parts. One *signal*.",
    subhead: "Each part is measured the same way every time, then combined into one read.",
    items: [
      {
        icon: "valuation",
        name: "Long-term valuation",
        text: "Where price sits against its own long-run history, scored as a Z-score. Cheap, fair or expensive, measured the same way every time.",
      },
      {
        icon: "trend",
        name: "Trend state",
        text: "Whether the market is trending up, down or sideways under a fixed set of trend rules. A reading, not a forecast.",
      },
      {
        icon: "shield",
        name: "Risk & leverage gate",
        text: "A yes-or-no check on whether conditions support added risk. When the gate is closed, the signal says so plainly.",
      },
      {
        icon: "macro",
        name: "Macro & liquidity briefing",
        text: "A plain-English read on rates, liquidity and the wider backdrop, and how each one feeds the signal.",
      },
      {
        icon: "note",
        name: "Weekly research note",
        text: "What changed this week, why it changed, and what we are watching next. All in writing.",
      },
    ] satisfies { icon: IconName; name: string; text: string }[],
  },

  steps: {
    eyebrow: "The path",
    title: "Three *steps*",
    subhead: "Simple on purpose. The decisions stay yours.",
    items: [
      {
        title: "Join",
        text: "Choose a membership on the Signals page. Access details follow by [DISCORD/TELEGRAM/EMAIL].",
      },
      {
        title: "Receive the signal",
        text: "Signals and research notes go to every member at the same time, with the reasoning attached.",
      },
      {
        title: "Execute with your own plan",
        text: "You decide what to do with it, based on your own goals and risk tolerance. We never manage money or give personal advice.",
      },
    ],
  },

  // [CONFIRM] all inclusions
  features: {
    eyebrow: "Membership",
    title: "What's *included*",
    subhead: "Every member gets the same access. No upsells inside the membership.",
    cards: [
      {
        title: "The signals",
        items: ["Valuation, trend and risk states", "An alert when any state changes", "Archive of past signal posts"],
      },
      {
        title: "The research",
        items: ["Weekly research note", "Macro & liquidity briefing", "Method notes on each input"],
      },
      {
        title: "The membership",
        items: [
          "Member channel on [DISCORD/TELEGRAM/EMAIL]",
          "Same access for every member",
          "Cancel from your account [CONFIRM]",
        ],
      },
    ],
  },

  founders: {
    eyebrow: "Who's behind it",
    title: "Built by two *operators*",
    subhead: "Investing Mastery Signals is run by Hunter Lee and Aaron Wathen.",
    link: { label: "Read our story", href: "/about" },
  },

  faq: {
    eyebrow: "Questions",
    title: "Straight *answers*",
    ids: ["financial-advice", "guarantee", "personalized", "receive"],
    link: { label: "All questions", href: "/faq" },
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
    cta: { label: "Join Signals", href: "/signals" },
  },
};
