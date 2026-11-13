// Legal page settings. The documents themselves are content/legal/*.mdx.
export const legalPages = {
  disclaimer: {
    title: "Disclaimer",
    description: "IMS provides general research and educational information only. It is not financial, investment, legal, or tax advice.",
    updated: "November 10, 2026",
  },
  "risk-disclosure": {
    title: "Risk Disclosure",
    description: "The main risks of crypto investing and of using rules-based signals. Please read before acting on any signal.",
    updated: "November 10, 2026",
  },
  terms: {
    title: "Terms of Service",
    description: "The terms that govern the Investing Mastery Signals website and the Core and Pro memberships, including Pro access paid in Bitcoin.",
    updated: "November 10, 2026",
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Investing Mastery Signals collects, uses and protects personal information.",
    updated: "November 10, 2026",
  },
} as const;

export type LegalSlug = keyof typeof legalPages;
