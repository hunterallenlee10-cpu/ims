// Legal page settings. The documents themselves are content/legal/*.mdx.
export const legalPages = {
  disclaimer: {
    title: "Disclaimer",
    description: "Investing Mastery Signals publishes general, impersonal research for educational purposes. Not financial advice.",
    updated: "[DATE]",
  },
  "risk-disclosure": {
    title: "Risk Disclosure",
    description: "The main risks of investing and of using systematic, rules-based research. Please read before acting on any signal.",
    updated: "[DATE]",
  },
  terms: {
    title: "Terms of Service",
    description: "The terms that govern use of the Investing Mastery Signals website and membership.",
    updated: "[DATE]",
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Investing Mastery Signals collects, uses and protects personal information.",
    updated: "[DATE]",
  },
} as const;

export type LegalSlug = keyof typeof legalPages;

export const legalDraftNotice = "DRAFT: have an attorney review before launch.";
