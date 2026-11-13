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
          "There's no experience requirement to join. Pro and the BTC year include the Investing Analysis topic, where the reasoning behind the signals is written up, and the Questions topic, where the founders answer. Training videos are coming soon. You do need to be comfortable making your own decisions, because the signals are general research, not instructions.",
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
          "No. Every member manages and moves their own money. IMS provides signals and analysis only.",
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
          "Four rules-based signals, posted daily: the Portfolio Signal (cash allocation, short positions, net positions and the BTC leverage condition), the BTC DCA Signal (the SDCA rate: the share of your remaining cash to put into BTC each day), the TPI or Trend Probability Indicator (long-term and medium-term trend readings), and IA, Investing Analysis (chart-based commentary and the daily BTC valuation update, where the reasoning is written up).\n\nPositions are actively managed and can change any day, and the Portfolio Signal can include short positions. Check in daily.",
      },
      {
        id: "core-vs-pro",
        question: "What's the difference between Core and Pro?",
        answer:
          `Core ($20/month) gets the Portfolio Signal every day, without the short positions, in the read-only ${groups.core} group. Only the founders post there; members can't post or ask questions.\n\nPro ($25/month, or $249/year) and the BTC year ($199 in Bitcoin for 12 months) get all four signals: the Portfolio Signal including short positions, the BTC DCA Signal, the TPI (Trend Probability Indicator) and IA (Investing Analysis). They also get full access to the main ${groups.main} group: Start Here, Member Chat, and Questions, where the founders answer. Training videos are coming soon.`,
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
        answer: "Every day. Signals go up in the evening, between 6pm and midnight ET, usually 7 to 9pm. Positions are actively managed and can change any day, so check in daily. Pro and the BTC year also get daily Investing Analysis posts.",
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
          `Enter your Telegram username during checkout. After you pay, a private invite link arrives by email within 12 hours. Open it in Telegram and tap Request to Join. Once your request is approved, read the Start Here topic first.\n\nCore members join ${groups.core}. Pro and BTC-year members join the main ${groups.main} group.\n\nPaying in Bitcoin? There's no checkout: after you send the BTC, send us the transaction ID, your email and your Telegram username through the contact form, and your invite follows within 12 hours of the payment confirming.`,
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
          `Yes, between Core and Pro, in Manage membership. Moving from Core to Pro takes effect right away: the price difference for the rest of the month is added to your next bill, you get an invite to the main ${groups.main} group, and you leave the Core group once you've joined.\n\nMoving from Pro to Core takes effect at the end of your current billing period. Then you're removed from the main group and invited to ${groups.core}.\n\nYou can also switch Pro between monthly and yearly billing in Manage membership. Monthly to yearly takes effect right away, with a credit for the unused part of your current month. Yearly to monthly takes effect when your year ends.`,
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
