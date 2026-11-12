// Home page copy. *Asterisks* mark the accent line in a headline.
// See PLACEHOLDERS.md for every [TODO: ...] item.

type PostBase = { label: string; name: string; match: string; tag: string; time: { label: string; datetime: string } };
export type ExamplePost =
  | (PostBase & {
      kind: "reading";
      reading: string;
      change: { from: string; to: string; dir: "up" | "down" };
      body: string;
      gauge?: { value: number; label: string };
    })
  | (PostBase & { kind: "analysis"; topic: string; lines: string[]; more: string; locked: string });

export const home = {
  meta: {
    title: "Rules-Based Crypto Signals in Private Telegram Groups",
    description:
      "Investing Mastery Signals posts rules-based crypto valuation and trend signals, each with its reasoning written out, in private Telegram groups. Core $25, Pro $50, Champion $399 per month.",
  },

  hero: {
    chipTag: "Signals",
    eyebrow: "Rules-based investment research",
    // "\n" breaks the line; *stars* color the second line purple.
    title: "Investing Mastery\n*Signals.*",
    sentence:
      "Rules-based crypto valuation and trend signals, **each with its reasoning written out,** delivered in private Telegram groups.",
    primary: { label: "See membership", href: "#pricing" },
    secondary: { label: "See an example signal", href: "/how-it-works#signal-anatomy" },
  },

  sample: {
    eyebrow: "Inside the group",
    title: "What a signal\n*post looks like.*",
    subhead:
      "Every post follows the same structure: the reading, what changed, and why. **The values below are illustrative,** written the way we post them in Telegram.",
    link: { label: "See the full breakdown", href: "/how-it-works#signal-anatomy" },
    plansCta: { label: "See all plans", href: "#pricing" },
    // The card stacks one example Telegram post per signal, top to bottom in this order.
    // Values are illustrative, not live signals or past results. Timestamps are weekday + time only, never a real date.
    // Tier pills are not typed here: they're read from the pricing tiers in content/signals.ts (see `match`).
    card: {
      heading: "Example posts",
      sender: "Investing Mastery Signals",
      avatar: "IMS",
      readingLabel: "Current reading",
      changeLabel: "Moved from",
      topicLabel: "Topic",
      tiersLabel: "Included in",
      posts: [
        {
          kind: "reading",
          label: "Signal",
          name: "Portfolio Signal",
          // Text that identifies this signal in the pricing tiers' "Signals" rows.
          match: "Portfolio Signal",
          tag: "#portfolio",
          time: { label: "Mon · 9:00 AM ET", datetime: "09:00" },
          reading: "60% BTC / 25% ETH / 15% Cash",
          change: { from: "40% Cash", to: "15% Cash", dir: "down" },
          body: "Our trend and liquidity models both turned positive this week, so we're lowering cash and adding to BTC and ETH. Rebalance once and don't chase intraday moves.",
        },
        {
          kind: "reading",
          label: "Signal",
          name: "BTC DCA Signal",
          match: "BTC DCA Signal",
          tag: "#btc-dca",
          time: { label: "Mon · 9:15 AM ET", datetime: "09:15" },
          reading: "ACCUMULATE (1.5x)",
          change: { from: "Neutral (1x)", to: "Accumulate (1.5x)", dir: "up" },
          body: "Valuation z-score is -1.3, in our accumulate zone. Raise your normal weekly BTC buy to 1.5x until the next update.",
        },
        {
          kind: "reading",
          label: "Signal",
          name: "TPI Signal",
          match: "TPI",
          tag: "#tpi",
          time: { label: "Tue · 8:30 AM ET", datetime: "08:30" },
          reading: "+0.42 · LONG",
          change: { from: "-0.18", to: "+0.42", dir: "up" },
          body: "The Trend Probability Indicator flipped long. 7 of 10 inputs are positive. A long TPI means trend-following positions can stay on.",
          gauge: { value: 0.42, label: "TPI reading" },
        },
        {
          kind: "analysis",
          label: "Analysis",
          name: "Investing Analysis",
          match: "Investing Analysis",
          tag: "#analysis",
          time: { label: "Thu · 6:00 PM ET", datetime: "18:00" },
          topic: "Global liquidity is turning up. What it means for the next 3 months.",
          lines: [
            "Liquidity trend: our global liquidity composite has turned up after months of decline.",
            "BTC link: BTC has tended to follow liquidity turns with a lag of several weeks.",
            "What we're watching: central bank balance sheets and the dollar.",
          ],
          more: "Full breakdown + chart inside the group.",
          locked: "Members only",
        },
      ] as ExamplePost[],
      footer:
        "Illustrative examples of our post format. Values shown are not live signals or past results. General research and educational information only. Not financial advice.",
      caption: "Example format, not real signals.",
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
        "Every signal comes with its reasoning written out",
        "Portfolio Signal: +281% from August 2023 to November 2026. Past results don't guarantee future returns",
        "Indicators, not buy or sell calls. Your decisions stay yours",
      ],
    },
    cta: { label: "Get the signals", href: "#pricing" },
  },

  program: {
    eyebrow: "The signals",
    title: "Four signals.\n*Reasoning included.*",
    subhead: "Valuation and trend indicators, each posted with the reasoning behind it. **Not direct buy or sell calls.**",
  },

  pricing: {
    eyebrow: "Membership",
    title: "Three tiers.\n*Billed monthly.*",
    subhead: "Each tier includes everything in the tiers below it.",
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
      text: "Rules-based crypto signals, each with the reasoning written out, so you know why and when the reading changes.",
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
