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
