// /how-it-works copy. Each block feeds one section component in
// components/sections/how/. Reorder sections in app/how-it-works/page.tsx.

import { groups } from "@/content/signals";
import { home } from "@/content/home";

export const howItWorks = {
  meta: {
    title: "How It Works",
    description:
      "What Investing Mastery Signals posts, when signals go out each evening, how the private Telegram groups and their topics work, and the group rules.",
  },

  hero: {
    eyebrow: "How it works",
    title: "What members\n*actually see.*",
    intro:
      "The four signals, the two Telegram groups and their topics, when we post, and the rules that keep it all private. **Example posts are on the home page.**",
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
        "The reasoning is written up in the Investing Analysis topic",
      ],
    },
    note: "A system is not a crystal ball. It can be wrong, and sometimes will be. Its value is consistency and transparency, not certainty.",
  },

  signalsList: {
    eyebrow: "The signals",
    title: "Four signals.\n*Posted daily.*",
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
        "The Portfolio Signal every day, without the short positions",
        "Read-only: only the founders post, members can't post or ask questions",
      ],
    },
    main: {
      name: groups.main,
      tier: "Pro and the BTC year",
      points: [
        "All four signals, including the Portfolio Signal's short positions",
        "Investing Analysis: daily chart-based commentary and the BTC valuation update",
        "Member Chat, and Questions where the founders answer",
        "Training videos coming soon",
      ],
    },
    topicsTitle: "Topics in the main group, in order",
    // Topic names, order and emoji match the Telegram group exactly (read Nov 12, 2026).
    // Keep in step with home.sample.topics.
    topics: [
      { name: "💎 Portfolio Signal", text: "Posted by the founders every evening: cash allocation, short positions, net positions and the BTC leverage condition." },
      { name: "🟠 BTC DCA Signal", text: "Posted by the founders every evening: the SDCA rate, the share of your remaining cash to put into BTC." },
      { name: "🧭 Trend Probability Indicator", text: "Posted by the founders every evening: the LTPI and MTPI dials. Locked." },
      { name: "📈 IA - Investing Analysis", text: "Posted by the founders: chart-based commentary and the daily BTC valuation update. The reasoning lives here." },
      { name: "📌 Start Here", text: "Welcome, setup steps, rules and disclaimer. Read it first. Locked." },
      { name: "💬 Member Chat", text: "Members and the founders talk." },
      { name: "🧠 Questions", text: "Members ask, the founders answer." },
    ],
  },

  cadence: {
    eyebrow: "Timing",
    title: "Posted every\n*evening.*",
    subhead: "Signals go up daily between 6pm and midnight ET, usually 7 to 9pm. **Positions can change any day, so check in daily.**",
    items: [
      { label: "Signals", value: "Every evening", text: "Portfolio Signal, BTC DCA Signal and TPI, each in its fixed format, between 6pm and midnight ET." },
      { label: "Investing Analysis", value: "Every day", text: "Chart-based commentary and the BTC valuation update, for Pro and the BTC year." },
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
      { title: "Not set-and-forget", text: "Positions are actively managed and can change any day, including short positions. Check in daily. What you do is always your decision." },
      { title: "Not early access for a few", text: "Every member of a tier gets the same post at the same time." },
    ],
  },

  cta: {
    title: "See the\n*membership.*",
    text: "Core or Pro, monthly or yearly by card, or a full year of Pro paid in Bitcoin.",
  },
};
