// Member training page copy. This page is unlisted: it is not in the nav, footer or sitemap,
// and is only shared as a link inside the member Telegram group.

/** Folder in public/ that holds the module PDFs. */
export const trainingFiles = "/members-tu2km4apwv";
/** Route of the unlisted training page. */
export const trainingPath = "/training-tu2km4apwv";

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  covers: string[];
  file: string;
  warning?: string;
};

export type BriefingItem = {
  text: string;
  note?: string;
  link?: { label: string; href: string };
  videos?: { label: string; href: string }[];
};

export const training = {
  meta: { title: "Member Training" },
  hero: {
    eyebrow: "Member Training",
    title: "Start\n*here.*",
    intro: "Five short modules. Work through them in order. Each one ends with a checklist. Finish it before you move on.",
  },
  how: ["Go in order", "Tick every checklist", "Stuck after looking it up? Ask in the group"],
  progress: { label: "Your progress", of: "modules complete" },
  step: "Step",
  coversLabel: "What you'll cover",
  open: "Open module",
  download: "Download PDF",
  mark: "Mark as complete",
  done: "Complete",
  complete: {
    title: "Training complete",
    text: "Go back to your Module 3 notes, confirm your money split and your system, and follow them.",
  },
  // Shown after the five steps. Not a step and not counted in the progress bar.
  briefing: {
    label: "Final briefing",
    title: "Get ready to go",
    welcome: "Welcome to Investing Mastery Signals 👋",
    intro: "If you know nothing about investing and need to get started, do these in order:",
    items: [
      {
        text: "Watch these videos as well.",
        // Add each new video here: { label: "Video 2", href: "https://..." }
        videos: [{ label: "Video 1", href: "https://www.youtube.com/watch?v=bBC-nXj3Ng4" }],
        note: "More videos coming soon.",
      },
      {
        text: "Get on this centralized exchange.",
        link: { label: "Open Kraken", href: "https://proinvite.kraken.com/9f1e/iz1isq99" },
      },
      {
        text: "Get on this centralized exchange as a backup.",
        link: { label: "Open Coinbase", href: "https://coinbase.com/join/UY63VLT?src=referral-link" },
      },
      { text: "Have both set up and ready to go before buying anything." },
      {
        text: "Buy a cold wallet when you are investing over $5,000. Trezor Safe 5 is what we recommend.",
        link: { label: "Get a Trezor", href: "http://trezorio.refr.cc/default/u/hunterlee" },
      },
    ] satisfies BriefingItem[],
    pools: {
      label: "Your money",
      title: "Two pools. Not one big pool.",
      intro: "Your investing money is split into two separate funds. Each one follows its own signal.",
      items: [
        {
          name: "RSPS fund",
          text: "Your active pool. It follows the Portfolio Signal, posted every evening. It can change any day, so check in daily and act when it changes.",
        },
        {
          name: "DCA fund",
          text: "Your long-term pool. It follows the BTC DCA Signal. A share of this fund's remaining cash goes into Bitcoin each day, so it builds slowly.",
        },
      ],
      outro: "Decide how much goes in each before you buy anything. Write the split in your Module 3 notes and track each fund on its own.",
    },
    referral: "The Kraken, Coinbase and Trezor links are referral links. We may earn a commission if you sign up or buy through them.",
  },
  note: "Educational material only. Not financial advice. Crypto is high risk and you can lose money. We will never message you first asking for money, a password or your seed phrase.",
  modules: [
    {
      id: "m1",
      title: "Start Here",
      description: "Your setup, your expectations, and the words you need.",
      covers: ["Have a computer", "What to expect: hard work", "Where does your money come from?", "Your dictionary", "Use Google"],
      file: "IMS-Module-1-Start-Here.pdf",
    },
    {
      id: "m2",
      title: "How the Market Works",
      description: "What you are buying and why prices move.",
      covers: ["What a market is", "Why prices move", "Market cycles", "Types of crypto assets", "Types of markets", "Order types", "Using CoinGecko"],
      file: "IMS-Module-2-How-the-Market-Works.pdf",
    },
    {
      id: "m3",
      title: "Signals and Your System",
      description: "Read the signals, split your money, follow a plan.",
      covers: ["What a signal is", "The kinds of signals", "How to read a signal post", "Decide your money split", "Decide your system", "Understand any position you take", "Keep a record"],
      file: "IMS-Module-3-Signals-and-Your-System.pdf",
    },
    {
      id: "m4",
      title: "Accounts and Wallets",
      description: "Kraken, Coinbase, Rabby and Trezor Safe 5.",
      covers: ["What is a CEX?", "Kraken and Coinbase", "Rabby: your hot wallet", "Trezor Safe 5: your cold wallet", "Seed phrase rules", "Moving crypto safely", "Scams to know"],
      file: "IMS-Module-4-Accounts-and-Wallets.pdf",
    },
    {
      id: "m5",
      title: "Leverage",
      description: "What it is, and why beginners stay away.",
      covers: ["What leverage is", "The math that wipes people out", "Spot versus leverage", "Costs most people miss", "Where leverage hides", "The rules", "Am I ready?"],
      file: "IMS-Module-5-Leverage.pdf",
      warning: "Beginners: spot only",
    },
  ] satisfies TrainingModule[],
};
