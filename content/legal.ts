// Legal page settings. The documents themselves are content/legal/*.mdx.
export const legalPages = {
  disclaimer: {
    title: "Disclaimer",
    description: "IMS provides general research and educational information only. It is not financial, investment, legal, or tax advice.",
    updated: "[TODO: date]",
  },
  "risk-disclosure": {
    title: "Risk Disclosure",
    description: "The main risks of crypto investing and of using rules-based signals. Please read before acting on any signal.",
    updated: "[TODO: date]",
  },
  terms: {
    title: "Terms of Service",
    description: "The terms that govern the Investing Mastery Signals website and the Core, Pro and Champion memberships.",
    updated: "[TODO: date]",
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Investing Mastery Signals collects, uses and protects personal information.",
    updated: "[TODO: date]",
  },
} as const;

export type LegalSlug = keyof typeof legalPages;

export const legalDraftNotice = "DRAFT — needs legal review.";
