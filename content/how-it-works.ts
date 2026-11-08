// /how-it-works copy. Each block feeds one section component in
// components/sections/how/. Reorder sections in app/how-it-works/page.tsx.

import type { IconName } from "@/components/ui/Icon";

export const howItWorks = {
  meta: {
    title: "How It Works",
    description:
      "The Investing Mastery Signals method in plain English: valuation, trend and risk inputs, how they combine, how often signals update and how members receive them.",
  },

  hero: {
    eyebrow: "How it works",
    title: "The method in\n*plain English.*",
    intro:
      "No black box. Here is **what goes into a signal**, how the pieces fit together, how often it updates and what a signal post looks like.",
  },

  why: {
    eyebrow: "Why systematic",
    title: "Rules over\n*mood.*",
    subhead:
      "Discretionary investing depends on how someone feels that day. **A systematic process decides the same way every time,** and you can check its work.",
    discretionary: {
      title: "Discretionary",
      points: [
        "Decisions shift with headlines, fear and excitement",
        "Hard to repeat, because the reasoning lives in someone's head",
        "Hard to review, because nothing was written down beforehand",
      ],
    },
    systematic: {
      title: "Systematic",
      points: [
        "The same inputs produce the same output, every time",
        "Rules are written before the decision, not after it",
        "Every change can be traced back to the rule that caused it",
      ],
    },
    note: "A system is not a crystal ball. It can be wrong, and sometimes will be. Its value is consistency and transparency, not certainty.",
  },

  inputs: {
    eyebrow: "The three inputs",
    title: "Three inputs.\n*One signal.*",
    subhead: "Each input answers one question. Together they produce one composite state.",
    items: [
      {
        icon: "valuation",
        name: "Valuation",
        question: "Is price cheap or expensive against its own history?",
        how: "A set of long-term valuation measures is combined into a single Z-score. Below zero is cheaper than usual; above zero is more expensive than usual.",
      },
      {
        icon: "trend",
        name: "Trend",
        question: "Which way is the market moving right now?",
        how: "Fixed trend rules read the current direction across several timeframes. The output is a state such as up, down or sideways, never a price target.",
      },
      {
        icon: "shield",
        name: "Risk",
        question: "Do conditions support taking on more risk?",
        how: "A risk and leverage gate checks volatility, liquidity and macro conditions. If the gate is closed, the signal does not support added leverage, whatever the other inputs say.",
      },
    ] satisfies { icon: IconName; name: string; question: string; how: string }[],
    combine: {
      title: "How they combine",
      steps: [
        "Valuation sets the long-term backdrop.",
        "Trend confirms or questions the direction.",
        "The risk gate decides whether added exposure is supported.",
      ],
      output: "Composite state",
      outputNote: "Published as one of [STATE NAMES], with the reasoning attached.",
    },
  },

  cadence: {
    eyebrow: "Timing",
    title: "How often it\n*updates.*",
    subhead: "On a schedule, plus whenever a rule is triggered. [CONFIRM]",
    items: [
      { label: "Scheduled review", value: "[CADENCE]", text: "Every input is recalculated and the full signal is published, even when nothing changes." },
      { label: "Rule-triggered change", value: "As it happens", text: "If a rule flips a state between reviews, members are notified with the reason." },
      { label: "Research note", value: "Weekly", text: "A written note on what changed, why, and what we are watching next." },
    ],
  },

  delivery: {
    eyebrow: "Delivery",
    title: "Where signals\n*arrive.*",
    subhead: "One place, the same moment, for every member.",
    channel: "[DISCORD/TELEGRAM/EMAIL]",
    points: [
      "Signals and research notes are posted in [DISCORD/TELEGRAM/EMAIL].",
      "Every member receives the same post at the same time.",
      "Past posts stay available, so you can see how each state changed over time.",
      "No DMs with personal allocations. Questions about the method are welcome; questions about your portfolio are for a licensed professional.",
    ],
  },

  anatomy: {
    eyebrow: "Anatomy of a signal",
    title: "What a signal\n*post looks like.*",
    subhead: "An annotated example. **Every value is made up** to show the format.",
    post: {
      badge: "Example data",
      header: "Signal update · Example asset",
      timestamp: "Example · Mon 14:00 UTC",
      change: "Trend state changed: Sideways → Uptrend",
      rows: [
        { input: "Valuation Z-score", value: "+0.80", note: "Fair to slightly expensive (unchanged)" },
        { input: "Trend state", value: "Uptrend", note: "Rules met on 3 of 3 timeframes (changed)" },
        { input: "Risk & leverage gate", value: "Closed", note: "Volatility above threshold (unchanged)" },
      ],
      composite: "Composite state: Hold exposure",
      reasoning:
        "The trend rules now agree across all three timeframes, so the trend input moved to Uptrend. Valuation is close to its long-run average, and the risk gate stays closed, so the composite state does not support added leverage.",
      watching: "What would change it: the risk gate reopening, or the Z-score moving above +1.5.",
      disclaimer: "General research, not personal advice. Signals can be wrong.",
    },
    callouts: [
      { n: 1, title: "Header and timestamp", text: "Which market, and exactly when the signal was published." },
      { n: 2, title: "What changed", text: "The state change in one line, so you never have to hunt for it." },
      { n: 3, title: "The three inputs", text: "Every input with its current value, marked changed or unchanged." },
      { n: 4, title: "Composite state", text: "The single combined read, under the same rules every time." },
      { n: 5, title: "Reasoning", text: "Why the state is what it is, in plain English." },
      { n: 6, title: "What would change it", text: "The conditions that would move the signal next." },
    ],
  },

  isNot: {
    eyebrow: "Clear limits",
    title: "What a signal\n*is not.*",
    items: [
      { title: "Not personal advice", text: "It does not know your goals, finances or risk tolerance." },
      { title: "Not a guarantee", text: "Signals can be wrong. Investing always carries risk of loss." },
      { title: "Not money management", text: "We never hold, manage or trade your money." },
      { title: "Not early access for a few", text: "Every member gets the same signal at the same time." },
    ],
  },

  cta: {
    title: "See the\n*membership.*",
    text: "Two billing options, the same signals and research on both.",
  },
};
