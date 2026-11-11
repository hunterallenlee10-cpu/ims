// Home page copy. *Asterisks* mark the accent line in a headline.
// See PLACEHOLDERS.md for every [TODO: ...] item.

export const home = {
  meta: {
    title: "Rules-Based Crypto Signals in Private Telegram Groups",
    description:
      "Investing Mastery Signals posts rules-based crypto valuation and trend signals, each with its reasoning written out, in private Telegram groups. Core $25, Pro $50, Champion $399 per month.",
  },

  hero: {
    chipTag: "Signals",
    eyebrow: "Rules-based crypto research",
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
    subhead: "Every post follows the same structure. **The values are hidden here** because this shows the format only.",
    link: { label: "See the full breakdown", href: "/how-it-works#signal-anatomy" },
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
    title: "Stop guessing.\n*Follow a process.*",
    subhead: "Most investors decide on feel. **A system decides the same way every time.**",
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
        "Every signal comes with its reasoning written out",
        "The same post for every member of a tier, at the same time",
        "Indicators, not buy or sell calls. Your decisions stay yours",
      ],
    },
  },

  program: {
    eyebrow: "The signals",
    title: "Four signals.\n*Reasoning included.*",
    subhead: "Valuation and trend indicators, each posted with the reasoning behind it. **Not direct buy or sell calls.**",
    hint: "Select each one to see what it is",
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
