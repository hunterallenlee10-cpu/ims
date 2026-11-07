// FAQ copy. Used on /faq, the home preview and /signals.
// [ANSWER] / [CADENCE] / [MARKETS] / [DISCORD/TELEGRAM/EMAIL] are placeholders.

export type Faq = { id: string; question: string; answer: string };
export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Basics",
    items: [
      {
        id: "financial-advice",
        question: "Is this financial advice?",
        answer:
          "No. Investing Mastery Signals publishes general, impersonal research for educational purposes. It does not take your goals, finances or risk tolerance into account, and it is not financial, investment, tax or legal advice.\n\nIf you need advice for your own situation, speak with a licensed professional.",
      },
      {
        id: "guarantee",
        question: "Do you guarantee returns?",
        answer:
          "No. Nobody can. Every investment carries risk, including the loss of the money you put in. Signals will sometimes be wrong. Past results, real or hypothetical, never guarantee future results.",
      },
      {
        id: "manage-money",
        question: "Do you manage money or hold funds?",
        answer:
          "No. We never hold, manage or trade your money, and we never ask for access to your accounts. You keep full control of your own investments.",
      },
      {
        id: "who-for",
        question: "Who is this for?",
        answer:
          "Adults 18 and over who want a rules-based framework to inform their own decisions, and who are comfortable making those decisions themselves.",
      },
      {
        id: "performance",
        question: "Do you publish performance results?",
        answer:
          "Not at this time. If we ever publish performance, it will come with dated data, the method used, and clear labels on anything hypothetical or backtested.",
      },
    ],
  },
  {
    title: "Signals",
    items: [
      {
        id: "personalized",
        question: "Is the signal personalized?",
        answer:
          "No. Every member receives the same signal at the same time. We don't give individual allocations, position sizes or one-to-one recommendations, and we don't answer \"what should I buy?\" questions.",
      },
      {
        id: "receive",
        question: "How do I receive signals?",
        answer:
          "Signals and research notes are published to members in [DISCORD/TELEGRAM/EMAIL]. [ANSWER: how access is granted after joining.]",
      },
      {
        id: "cadence",
        question: "How often do signals update?",
        answer:
          "The full signal is reviewed [CADENCE]. A state can also change between scheduled updates when a rule is triggered, and members are notified when that happens. [ANSWER: confirm]",
      },
      {
        id: "markets",
        question: "What markets do you cover?",
        answer: "[MARKETS]. [ANSWER: which assets and markets the signal covers.]",
      },
      {
        id: "inputs",
        question: "What goes into a signal?",
        answer:
          "Three kinds of input: long-term valuation (where price sits against its own history), trend (the current direction under fixed rules) and risk (whether conditions support taking on more). How they combine is explained on the How It Works page.",
      },
    ],
  },
  {
    title: "Membership & billing",
    items: [
      {
        id: "cancel",
        question: "How do I cancel?",
        answer: "[ANSWER: cancellation steps.] Cancellation and billing terms are listed on the Signals page.",
      },
      {
        id: "refunds",
        question: "Do you offer refunds?",
        answer: "[ANSWER: refund policy.]",
      },
      {
        id: "tiers",
        question: "What is the difference between the membership options?",
        answer:
          "Both options receive the same signals and research. They differ only in billing period and price. [CONFIRM]",
      },
      {
        id: "share",
        question: "Can I share the signals?",
        answer: "[ANSWER: sharing policy.]",
      },
    ],
  },
];

const all = faqGroups.flatMap((g) => g.items);

/** Pick FAQs by id, in the order given. */
export function pickFaqs(ids: string[]): Faq[] {
  return ids.map((id) => all.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));
}
