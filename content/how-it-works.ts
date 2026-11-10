// /how-it-works copy. Each block feeds one section component in
// components/sections/how/. Reorder sections in app/how-it-works/page.tsx.

import { groups } from "@/content/signals";

export const howItWorks = {
  meta: {
    title: "How It Works",
    description:
      "What Investing Mastery Signals posts, what a signal post looks like, how the private Telegram groups and topics work, how often posts go out, and the group rules.",
  },

  hero: {
    eyebrow: "How it works",
    title: "What members\n*actually see.*",
    intro:
      "The signals, the structure of every post, the two Telegram groups, and the rules that keep them private. **No black box.**",
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
        "Every reading comes with the reasoning behind it",
      ],
    },
    note: "A system is not a crystal ball. It can be wrong, and sometimes will be. Its value is consistency and transparency, not certainty.",
  },

  signalsList: {
    eyebrow: "The signals",
    title: "Four signals.\n*Reasoning included.*",
    subhead:
      "Rules-based valuation and trend indicators. Examples include the BTC Valuation Z-Score model, the SDCA accumulation and distribution rate, and trend probability. **They are indicators, not direct buy or sell calls.**",
  },

  anatomy: {
    eyebrow: "Anatomy of a signal post",
    title: "What a signal\n*post looks like.*",
    subhead: "Every signal post follows the same structure. **Values are hidden here** because this shows the format, not a reading.",
    label: "Example format, not a real signal.",
    post: {
      signalLabel: "Signal",
      signalName: "BTC DCA Signal",
      postedLabel: "Posted",
      readingLabel: "Current reading",
      changeLabel: "What changed",
      changeText: "Reading moved from",
      changeJoin: "to",
      reasoningLabel: "The reasoning",
      reasoningText:
        "A plain-English explanation of which inputs moved, why the reading is what it is, and which rule produced it.",
      footer: "General research and educational information only. Not financial advice.",
    },
    callouts: [
      { n: 1, title: "Signal name and time", text: "Which signal it is, and exactly when it was posted." },
      { n: 2, title: "Current reading", text: "The signal's reading right now, under the same rules every time." },
      { n: 3, title: "What changed", text: "How the reading moved since the last post, in one line." },
      { n: 4, title: "The reasoning", text: "Why the reading is what it is, written out in plain English." },
    ],
  },

  groupsSection: {
    eyebrow: "The Telegram groups",
    title: "Two private\n*groups.*",
    subhead: "Your tier decides which group you join. Both are private and invite-only.",
    core: {
      name: groups.core,
      tier: "Core",
      points: [
        "The Portfolio Signal only",
        "Read-only: members can't post or ask questions",
      ],
    },
    main: {
      name: groups.main,
      tier: "Pro and Champion",
      points: [
        "Every signal, the research, live calls and Ask the Founders",
        "Members can ask questions and talk with each other and the founders",
      ],
    },
    topicsTitle: "Topics in the main group",
    topics: [
      { name: "Start Here", text: "Read this first. How the group works and how to read the signals." },
      { name: "IMS Signals", text: "IMS's rules-based valuation, trend and risk signals, with their reasoning." },
      { name: "IA - Investing Analysis", text: "Investing analysis and research posts." },
      { name: "BTC DCA Signal", text: "BTC DCA Signal posts and their reasoning." },
      { name: "Trend Probability", text: "Trend Probability posts and their reasoning." },
      { name: "Questions", text: "Ask questions about the signals and how the models work." },
      { name: "Member Chat", text: "General conversation with other members and the founders." },
    ],
  },

  cadence: {
    eyebrow: "Timing",
    title: "How often\n*posts go out.*",
    subhead: "New posts go up every day.",
    items: [
      { label: "Signals", value: "Daily", text: "Signals are posted every day, each with its reasoning written out." },
      { label: "Research note", value: "Weekly", text: "A written research note for Pro and Champion members." },
    ],
  },

  rules: {
    eyebrow: "Group rules and privacy",
    title: "Private\n*by design.*",
    items: [
      { title: "Invite-only", text: "Both groups are private. You join through your own invite link and a join request." },
      { title: "No forwarding or saving", text: "Forwarding and saving content are turned off in the groups." },
      { title: "No adding members", text: "Members can't add or invite anyone else." },
      { title: "For your own use", text: "Signals are for your own use. You can't share, repost or resell them." },
      { title: "Full archive from day one", text: "Every past signal post in your group is visible from your first day." },
      { title: "Your details", text: "Your Telegram username is used to approve your join request and manage your access." },
    ],
  },

  isNot: {
    eyebrow: "Clear limits",
    title: "What a signal\n*is not.*",
    items: [
      { title: "Not personal advice", text: "It doesn't know your goals, finances or risk tolerance." },
      { title: "Not a guarantee", text: "Signals can be wrong. Crypto is highly volatile and you can lose money." },
      { title: "Not a buy or sell call", text: "Signals are valuation and trend indicators. What you do is your decision." },
      { title: "Not early access for a few", text: "Every member of a tier gets the same post at the same time." },
    ],
  },

  cta: {
    title: "See the\n*membership.*",
    text: "Core, Pro and Champion. Billed monthly. Cancel anytime.",
  },
};
