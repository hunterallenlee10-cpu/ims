// /how-it-works copy. Each block feeds one section component in
// components/sections/how/. Reorder sections in app/how-it-works/page.tsx.

import { groups } from "@/content/signals";
import { home } from "@/content/home";

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
      "The four signals, the structure of every post, the two Telegram groups, how often we post, and the rules that keep it all private. **No black box.**",
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
    // Same intro as the home page Signals section, so the two never drift apart.
    subhead: home.program.subhead,
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
        "Every signal, the daily research and analysis, and the execution tutorials",
        "Live calls and Ask the Founders",
        "Members can ask questions and talk with each other and the founders",
      ],
    },
    topicsTitle: "Topics in the main group",
    topics: [
      { name: "Start Here", text: "Read this first. How the group works and how to read the signals." },
      // Topic names match the Telegram group exactly; descriptions use the signal names from the rest of the site.
      { name: "IMS Signals", text: "The Portfolio Signal and IMS's other rules-based signals, each with its reasoning." },
      { name: "IA - Investing Analysis", text: "IA (Investing Analysis): daily market, macro and liquidity breakdowns, the research note and tutorials." },
      { name: "BTC DCA Signal", text: "The daily BTC DCA number and the reasoning behind it." },
      { name: "Trend Probability", text: "TPI (Trend Probability Indicator) readings and their reasoning." },
      { name: "Questions", text: "Ask questions about the signals and how the models work." },
      { name: "Member Chat", text: "General conversation with other members and the founders." },
    ],
  },

  cadence: {
    eyebrow: "Timing",
    title: "We post everything\n*every day.*",
    subhead: "Signals, analysis and research. **New posts go up every single day.**",
    items: [
      { label: "Signals", value: "Every day", text: "Every signal is updated daily, each with its reasoning written out." },
      { label: "Investing Analysis", value: "Every day", text: "Market, macro and liquidity breakdowns for Pro and Champion members." },
      { label: "Research note", value: "Every day", text: "A written research note for Pro and Champion members." },
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
      { title: "Not a quick trade call", text: "Signals are positions you hold for weeks to years, not buy-now, sell-now calls. What you do is always your decision." },
      { title: "Not early access for a few", text: "Every member of a tier gets the same post at the same time." },
    ],
  },

  cta: {
    title: "See the\n*membership.*",
    text: "Core, Pro and Champion. Monthly, or yearly for Pro. Cancel anytime.",
  },
};
