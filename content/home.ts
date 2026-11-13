// Home page copy. *Asterisks* mark the accent line in a headline.
// See PLACEHOLDERS.md for every [TODO: ...] item.

import { groups } from "@/content/signals";

/** One line of a Telegram post, rendered in order. Text is copied from the real post formats. */
export type PostLine =
  | { kind: "title"; text: string } // bold line
  | { kind: "text"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "note"; text: string } // italic line
  | { kind: "divider" } // ───── ⋆⋅☆⋅⋆ ─────
  | { kind: "space" };

/** An image above the caption, as Telegram shows it. Drawn in SVG; example values only. */
export type PostMedia =
  | {
      kind: "tpi";
      gauges: { title: string; short: string; low: string; high: string; value: number; state: string; roc: string }[];
    }
  | { kind: "chart"; title: string; series: "supply" | "zscore" };

export type ExamplePost = {
  /** Telegram topic the post sits in, with its emoji. */
  topic: string;
  /** Who gets this topic. One wording site-wide: see tierLabels. */
  tiers: string;
  /** Extra tier detail shown under the pill, e.g. what Core gets. */
  tierNote?: string;
  /** Evening timestamp in ET. Weekday-free and date-free: these are not real posts. */
  time: { label: string; datetime: string };
  media?: PostMedia;
  lines: PostLine[];
};

/** Tier wording used everywhere on the site. */
export const tierLabels = { all: "All plans", full: "Pro and the BTC year", core: "Core" } as const;

const div = { kind: "divider" } as const;
const sp = { kind: "space" } as const;

export const home = {
  meta: {
    title: "Rules-Based Crypto Signals in Private Telegram Groups",
    description:
      "Investing Mastery Signals posts rules-based crypto signals every evening in private Telegram groups. Core $20 or Pro $25 per month, Pro at $249 a year, or a full year of Pro access for $199 paid in Bitcoin.",
  },

  hero: {
    chipTag: "Signals",
    eyebrow: "Rules-based investment research",
    // "\n" breaks the line; *stars* color the second line purple.
    title: "Investing Mastery\n*Signals.*",
    sentence:
      "Rules-based crypto signals, **posted every evening in a fixed format,** in private Telegram groups.",
    primary: { label: "See membership", href: "#pricing" },
    secondary: { label: "See an example signal", href: "/#example-signal" },
  },

  sample: {
    eyebrow: "Inside the group",
    title: "Posted every evening.\n*Same format every time.*",
    subhead:
      "Signals go up daily between 6pm and midnight ET, usually 7 to 9pm, each in a fixed format. **The reasoning behind them is in the Investing Analysis topic.**",
    plansCta: { label: "See all plans", href: "#pricing" },

    // The seven topics of the main group, in the order members see them in Telegram (read Nov 12, 2026).
    // Keep in step with howItWorks.groupsSection.topics.
    topics: {
      title: "What's in the group",
      main: { name: groups.main, tiers: tierLabels.full },
      items: [
        { emoji: "💎", name: "Portfolio Signal", text: "Daily: cash allocation, short positions, net positions and the BTC leverage condition." },
        { emoji: "🟠", name: "BTC DCA Signal", text: "Daily SDCA rate: the share of your remaining cash to put into BTC." },
        { emoji: "🧭", name: "Trend Probability Indicator", text: "Daily long-term (LTPI) and medium-term (MTPI) trend readings." },
        { emoji: "📈", name: "IA - Investing Analysis", text: "Chart-based commentary and the daily BTC valuation update. The reasoning lives here." },
        { emoji: "📌", name: "Start Here", text: "Welcome, setup steps, rules and disclaimer. Read it first." },
        { emoji: "💬", name: "Member Chat", text: "Members and the founders talk." },
        { emoji: "🧠", name: "Questions", text: "Members ask, the founders answer." },
      ],
      postedBy: "The four signal topics are posted by the founders. Training videos are coming soon.",
      core: {
        name: groups.core,
        tiers: tierLabels.core,
        text: "A separate read-only group: the Portfolio Signal every day, without the short positions. Only the founders post.",
      },
    },

    // Stated once, next to the cards. Don't repeat it inside the card.
    notice: "Example format, example values, not live signals. General research, not financial advice.",

    // Example Telegram posts in the real formats (fields, order, emoji and dividers as posted).
    // Every value is invented. Never paste a real day's post here: it gives away the paid signal
    // and the group rules forbid sharing member content. Timestamps are evening ET with no date.
    card: {
      heading: "Example posts",
      sender: "Investing Mastery Signals",
      avatar: "IMS",
      tiersLabel: "Included in",
      topicLabel: "Topic",
      pinned: {
        label: "Pinned in every signal topic",
        text: "Executive Summary - Positions are actively managed, and signals can change at any time. Check in daily. Read this entire post before acting… You are responsible for your own trades… General research, not financial advice.",
      },
      posts: [
        {
          topic: "💎 Portfolio Signal",
          tiers: tierLabels.all,
          tierNote: "Core gets it without the short positions.",
          time: { label: "7:35 PM ET", datetime: "19:35" },
          lines: [
            { kind: "title", text: "📈 IMS Signal Update 📈" },
            { kind: "text", text: "💵 Current Cash Allocation: 100.0%" },
            div,
            { kind: "title", text: "📉 Short Module: 📉" },
            { kind: "bullet", text: "2.4% SOL SHORT ☀️" },
            { kind: "bullet", text: "1.9% DOGE SHORT 🐕" },
            { kind: "bullet", text: "1.7% ADA SHORT 🔵" },
            { kind: "bullet", text: "1.5% LINK SHORT 🔗" },
            { kind: "bullet", text: "1.5% AVAX SHORT 🔺" },
            { kind: "text", text: "📊 Total Short Exposure: 9.0%" },
            div,
            { kind: "title", text: "⚖️ Net Positions: ⚖️" },
            { kind: "bullet", text: "2.4% SOL SHORT ☀️ ⬇️" },
            { kind: "bullet", text: "1.9% DOGE SHORT 🐕 ⬇️" },
            { kind: "bullet", text: "1.7% ADA SHORT 🔵 ⬇️" },
            { kind: "bullet", text: "1.5% LINK SHORT 🔗 ⬇️" },
            { kind: "bullet", text: "1.5% AVAX SHORT 🔺 ⬇️" },
            { kind: "bullet", text: "100.0% CASH 💵" },
            div,
            { kind: "title", text: "📋 Executive Summary:" },
            { kind: "text", text: "Positions will continue to be actively managed. Check in daily, as signals can change frequently." },
            { kind: "title", text: "🔗 Associated Data:" },
            { kind: "text", text: "BTC Leverage Condition: Leverage Impermissible ❌💀" },
            div,
            { kind: "note", text: "⚠️ Portfolio allocations reflect current IMS systematic trading signals and are subject to change as market conditions evolve." },
          ],
        },
        {
          topic: "🟠 BTC DCA Signal",
          tiers: tierLabels.full,
          time: { label: "7:41 PM ET", datetime: "19:41" },
          lines: [
            { kind: "title", text: "⚡️ SDCA Signal Update ⚡️" },
            sp,
            { kind: "title", text: "📈 Today's Accumulation/Distribution Rate: 📈" },
            { kind: "text", text: "DCA Accelerated Accumulation Threshold: Not Passed" },
            { kind: "text", text: "💰 Current Signal: Default to ~1% per day perpetually." },
            sp,
            { kind: "title", text: "Important:" },
            { kind: "bullet", text: "Strategic Dollar Cost Averaging signals can change frequently at market extremes. Check in daily." },
            { kind: "bullet", text: "The signal represents the percentage of your remaining cash to deploy into BTC." },
            { kind: "bullet", text: "This signal applies to BTC only!" },
            sp,
            { kind: "note", text: "⚠️ Signals are based on systematic investment research and do not guarantee future returns." },
          ],
        },
        {
          topic: "🧭 Trend Probability Indicator",
          tiers: tierLabels.full,
          time: { label: "7:48 PM ET", datetime: "19:48" },
          media: {
            kind: "tpi",
            gauges: [
              { title: "Long-Term Bull/Bear Probability", short: "LTPI", low: "Bear", high: "Bull", value: 0.36, state: "Positive State", roc: "-ROC" },
              { title: "Medium-Term Trend Probability", short: "MTPI", low: "Down", high: "Up", value: -0.28, state: "Negative State", roc: "No ROC" },
            ],
          },
          lines: [
            { kind: "title", text: "Today's Update:" },
            { kind: "text", text: "🔴 MTPI: No ROC, remaining in NEGATIVE state" },
            { kind: "text", text: "🟢 LTPI: -ROC, remaining in POSITIVE state" },
          ],
        },
        {
          topic: "📈 IA - Investing Analysis",
          tiers: tierLabels.full,
          time: { label: "8:12 PM ET", datetime: "20:12" },
          media: { kind: "chart", title: "Example chart: stablecoin supply on exchanges", series: "supply" },
          lines: [
            {
              kind: "text",
              text: "Stablecoin supply on exchanges has risen for three straight weeks while price has moved sideways. That tends to mean capital is waiting on the sidelines rather than leaving the market.",
            },
            {
              kind: "text",
              text: "On its own this isn't a timing signal, but it fits with the improving long-term trend reading. I'll be watching whether that supply starts moving into spot buying.",
            },
          ],
        },
        {
          topic: "📈 IA - Investing Analysis",
          tiers: tierLabels.full,
          time: { label: "8:20 PM ET", datetime: "20:20" },
          media: { kind: "chart", title: "Example chart: BTC valuation z-score", series: "zscore" },
          lines: [
            { kind: "title", text: "📊 BTC Valuation Model Update" },
            sp,
            { kind: "text", text: "Current Market Value Z-Score: 0.42 (+0.05)" },
            { kind: "text", text: "Valuation Status: Fair Value" },
            { kind: "text", text: "Market Interpretation: Price sits close to its long-run average, neither cheap nor stretched." },
            sp,
            { kind: "text", text: "📈 Model: BTC Valuation Z-Score" },
            { kind: "text", text: "📅 Date: Today" },
            sp,
            { kind: "note", text: "The z-score compares BTC's market value with its own history. Below zero is cheaper than usual; above zero is more expensive than usual." },
            { kind: "text", text: "⚠️ This is a valuation indicator, not a direct buy or sell signal." },
          ],
        },
      ] satisfies ExamplePost[],
    },
  },

  // Stats render only once a real value replaces null. All null = section hidden.
  stats: {
    eyebrow: "By the numbers",
    items: [
      { value: null as string | null, label: "[TODO: stat label one]" },
      { value: null as string | null, label: "[TODO: stat label two]" },
      { value: null as string | null, label: "[TODO: stat label three]" },
      { value: null as string | null, label: "[TODO: stat label four]" },
    ],
  },

  vs: {
    eyebrow: "Two ways to invest",
    title: "Stop parking it.\n*Put it on a plan.*",
    subhead: "Money that sits still loses to inflation. **A rules-based process gives it a plan.**",
    // Keep every line here literally true: no "will" predictions, no claims about returns we can't back.
    theirs: {
      title: "Park your money and hope",
      points: [
        "Cash sitting still loses buying power to inflation",
        "Savings accounts often pay less than inflation. You lose slowly",
        "Bonds can lose to inflation too. In 2022 they fell while prices jumped",
        "Retirement accounts lock your money up until 59½, often in a default fund on autopilot",
      ],
    },
    ours: {
      title: "Rules, data and a written process",
      points: [
        "Signals come from fixed rules, not mood",
        "The reasoning is written up daily in Investing Analysis (Pro and the BTC year)",
        "Portfolio Signal: +281% from August 2023 to November 2026",
        "Training videos coming soon",
      ],
    },
    cta: { label: "Get the signals", href: "#pricing" },
  },

  program: {
    eyebrow: "The signals",
    title: "Four signals.\n*Posted daily.*",
    subhead:
      "Every signal comes from written rules, not a feeling, and goes up every evening. **Positions are actively managed and can change any day,** and the Portfolio Signal can include short positions, so check in daily. The reasoning is in the Investing Analysis topic (Pro and the BTC year).",
  },

  pricing: {
    eyebrow: "Membership",
    title: "Pick a plan.\n*Pay your way.*",
    subhead: "Pro includes everything in Core. Pay for Pro monthly or yearly by card, or pay $199 in Bitcoin for a full year.",
  },

  steps: {
    eyebrow: "Joining",
    title: "How\n*joining works.*",
    subhead: "From checkout to the group in a few steps.",
    items: [
      { title: "Choose and pay", text: "Pick a tier and pay with Stripe. Enter your Telegram username at checkout." },
      { title: "Get your invite", text: "A private invite link arrives by email. Open it in Telegram and request to join." },
      { title: "Read Start Here", text: "Once you're approved, start with the Start Here topic, then follow the signals." },
    ],
    link: { label: "Full joining steps", href: "/signals#joining" },
  },

  founders: {
    eyebrow: "Who's behind it",
    title: "Run by its\n*co-founders.*",
    subhead: "Hunter Lee and Aaron Wathen founded Investing Mastery Signals and run the member groups as admins.",
    // Shown under the founder names. Keep these true to what the tiers include (content/signals.ts).
    facts: [
      "Admins of both member Telegram groups",
      "Answer member questions in the Questions topic (Pro and the BTC year)",
    ],
    link: { label: "About the founders", href: "/about" },
  },

  faq: {
    eyebrow: "Questions",
    title: "Straight\n*answers.*",
    ids: ["financial-advice", "core-vs-pro", "telegram", "cancel"],
    link: { label: "All questions", href: "/faq" },
  },

  // Closing comparison. Left: the default places money sits. Right: IMS results.
  twoPaths: {
    eyebrow: "Your call",
    title: "Two paths.\n*Pick one.*",
    left: {
      tag: "Path one",
      title: "The default path",
      text: "Park it, automate it, and wait decades for it to compound.",
      // Approximate typical yearly returns. TODO(Hunter): confirm current figures before launch.
      // `bar` is the bar length as a percentage of the panel width.
      rows: [
        { label: "Savings account", note: "National average rate", value: "<1%", bar: 6 },
        { label: "Inflation", note: "What your cash loses each year", value: "~3%", bar: 18, negative: true },
        { label: "Bonds", note: "Government bond yields", value: "~4%", bar: 24 },
        { label: "401(k) and Roth IRA", note: "Index funds on autopilot, long-run average", value: "~7-10%", bar: 48 },
      ],
      footnote: "Approximate typical yearly returns. Figures vary over time.",
    },
    right: {
      tag: "Path two",
      title: "Follow the system",
      text: "Rules-based crypto signals, posted every evening in a fixed format, so you always know the current reading.",
      // Only real, verifiable results (keep records). Set value to null to show the placeholder.
      // Keep in step with the trust line in content/site.ts.
      result: {
        value: "+281%" as string | null,
        placeholder: "+[X]%",
        period: "Portfolio Signal, since August 2023",
        basis: "Actual results.",
      },
      disclosure:
        "Past performance does not guarantee future results. Crypto is highly volatile and you can lose money. Signals are research, not advice; your results depend on your own decisions.",
    },
    cta: { label: "Choose a tier", href: "#pricing" },
  },
};
