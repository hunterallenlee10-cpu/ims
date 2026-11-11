// FAQ copy. Used on /faq, the home preview and /signals.
// Answers with a [TODO: ...] are left out of the FAQPage structured data until filled in.
// `link: "manage"` adds the Manage membership (Stripe customer portal) link under the answer.

import { groups } from "@/content/signals";

export type Faq = { id: string; question: string; answer: string; link?: "manage" };
export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Basics",
    items: [
      {
        id: "financial-advice",
        question: "Is this financial advice?",
        answer:
          "No. IMS provides general research and educational information only. It is not financial, investment, legal, or tax advice. The signals don't take your goals, finances or risk tolerance into account.\n\nIf you need advice for your own situation, speak with a licensed professional.",
      },
      {
        id: "experience",
        question: "Do I need experience?",
        answer:
          "There's no experience requirement to join. Every signal comes with its reasoning written out, and Pro includes method notes on how the models work. You do need to be comfortable making your own decisions, because the signals are indicators, not instructions.",
      },
      {
        id: "exchange",
        question: "Which exchange do I need?",
        answer: "None in particular. Use whichever exchange or wallet you already prefer.",
      },
      {
        id: "guarantee",
        question: "Do you guarantee returns?",
        answer:
          "No. Nobody can. Crypto is highly volatile and you can lose some or all of your money. Signals will sometimes be wrong. Past performance does not guarantee future results.",
      },
      {
        id: "manage-money",
        question: "Does IMS manage my money?",
        answer:
          "Only for Champion members. In Champion, we manage your portfolio for you. Core and Pro members manage and move their own money, and IMS provides signals and analysis only.",
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
        id: "what-signals",
        question: "What are the signals?",
        answer:
          "Rules-based valuation and trend indicators, each posted with its reasoning written out. Examples include the BTC Valuation Z-Score model, the SDCA accumulation and distribution rate, and trend probability. They are indicators, not direct buy or sell calls.",
      },
      {
        id: "core-vs-pro",
        question: "What's the difference between Core and Pro?",
        answer:
          `Core ($25/month) gets the Portfolio Signal only, in the read-only ${groups.core} group. Members can't post or ask questions.\n\nPro ($50/month) gets every signal: the Portfolio Signal, the BTC DCA Signal, the TPI (Trend Probability Indicator) and IA (Investing Analysis). It adds the weekly research note, the macro and liquidity briefing, method notes on how the models work, and full access to the main ${groups.main} group, including live calls and Ask the Founders.`,
      },
      {
        id: "personalized",
        question: "Is the signal personalized?",
        answer:
          "No. Every member of a tier gets the same post at the same time. Signals don't include individual allocations or position sizes.",
      },
      {
        id: "missed",
        question: "What if I miss a signal?",
        answer:
          "Nothing is lost. The full signal archive is visible in your group from your first day, so you can scroll back through every past post.",
      },
      {
        id: "cadence",
        question: "How often do signals go out?",
        answer: "Signals are posted every day. Pro and Champion members also get a weekly research note.",
      },
      {
        id: "markets",
        question: "What markets do the signals cover?",
        answer: "Crypto, including Bitcoin.",
      },
    ],
  },
  {
    title: "Telegram groups",
    items: [
      {
        id: "telegram",
        question: "How do I get into the Telegram group after I pay?",
        answer:
          `Enter your Telegram username during checkout. After you pay, a private invite link arrives by email within 12 hours. Open it in Telegram and tap Request to Join. Once your request is approved, read the Start Here topic first.\n\nCore members join ${groups.core}. Pro and Champion members join the main ${groups.main} group.`,
      },
      {
        id: "share",
        question: "Can I share the signals?",
        answer:
          "No. Signals are for your own use. You can't share, repost or resell them, and forwarding and saving are turned off in the groups. Members also can't add or invite anyone. Sharing breaks the Terms of Service and can lead to removal.",
      },
    ],
  },
  {
    title: "Membership and billing",
    items: [
      {
        id: "cancel",
        question: "How do I cancel?",
        answer:
          "Open Manage membership, sign in with the email you paid with, and cancel. Your access continues to the end of the period you've paid for. Then your membership ends and you're removed from the group.",
        link: "manage",
      },
      {
        id: "upgrade",
        question: "Can I upgrade or downgrade?",
        answer:
          `Yes, between Core and Pro, in Manage membership. Moving from Core to Pro takes effect right away: the price difference for the rest of the month is added to your next bill, you get an invite to the main ${groups.main} group, and you leave the Core group once you've joined.\n\nMoving from Pro to Core takes effect at the end of your current billing period. Then you're removed from the main group and invited to ${groups.core}. To move up to Champion, contact us anytime.`,
        link: "manage",
      },
      {
        id: "payment-failed",
        question: "What happens to my access if my payment fails?",
        answer:
          "Stripe emails you and retries your card automatically. You keep access while retries run, and you can update your card in Manage membership. If every retry fails, your membership is canceled and you're removed from the group.",
        link: "manage",
      },
      {
        id: "refunds",
        question: "Do you offer refunds?",
        answer:
          "No. Payments for periods already paid aren't refunded. You can cancel anytime in Manage membership to stop future charges, and your access continues to the end of the period you've paid for.",
        link: "manage",
      },
    ],
  },
];

const all = faqGroups.flatMap((g) => g.items);

/** Pick FAQs by id, in the order given. */
export function pickFaqs(ids: string[]): Faq[] {
  return ids.map((id) => all.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));
}
