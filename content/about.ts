// About page copy. Founder data is shared with the home page teaser.
// Photos: drop files in public/team/ and set `photo` (e.g. "/team/hunter.jpg").
// Don't add credentials, track records or backstory that Hunter hasn't supplied.

import type { IconName } from "@/components/ui/Icon";

export type Founder = {
  name: string;
  role: string;
  oneLiner: string;
  bio: string[];
  photo: string | null;
};

export const founders: Founder[] = [
  {
    name: "Hunter Lee",
    role: "Co-founder and group admin",
    oneLiner: "[TODO: one-line bio for Hunter Lee]",
    bio: ["[TODO: bio for Hunter Lee]"],
    photo: null, // [TODO: photo of Hunter Lee]
  },
  {
    name: "Aaron Wathen",
    role: "Co-founder and group admin",
    oneLiner: "[TODO: one-line bio for Aaron Wathen]",
    bio: ["[TODO: bio for Aaron Wathen]"],
    photo: null, // [TODO: photo of Aaron Wathen]
  },
];

// Shared photo of both founders for the home page founders box.
// Drop a landscape photo (about 1600x900 or larger) in public/team/ and set the path, e.g. "/team/founders.jpg".
export const foundersPhoto: string | null = null; // [TODO: photo of Hunter Lee and Aaron Wathen together]

export const about = {
  meta: {
    title: "About",
    description:
      "Investing Mastery Signals is run by its co-founders, Hunter Lee and Aaron Wathen, who are also the admins of the member Telegram groups.",
  },
  hero: {
    eyebrow: "About us",
    title: "Who runs\n*IMS.*",
    intro:
      "Investing Mastery Signals is run by its co-founders, **Hunter Lee and Aaron Wathen.** Both are admins of the member Telegram groups.",
  },
  timeline: {
    eyebrow: "The story",
    title: "Year by\n*year.*",
    subhead: "The Portfolio Signal track record, one year at a time. **Actual results since August 28, 2023.**",
    // `chart` renders that year's Growth of $10,000 card from content/track-record.ts.
    // Set `photo` to a real image path to show a photo instead.
    // Keep titles and text free of figures (the cards compute them), except the 2026 title,
    // which must stay in step with the +281% trust line in content/site.ts.
    disclosure:
      "Portfolio Signal: actual results since August 28, 2023, before taxes and fees. Yearly figures are approximate. Past performance does not guarantee future results. Crypto is highly volatile and you can lose money.",
    items: [
      {
        year: "2023",
        title: "The track record starts",
        text: "On August 28, 2023 we started following the Portfolio Signal and recording every result, with the reasoning for every change written out.",
        photo: null as string | null,
        chart: 2023 as number | null,
      },
      {
        year: "2024",
        title: "The breakout year",
        text: "The strongest year of the track record so far. Same written rules, posted the same way, with a market that gave them room to work.",
        photo: null as string | null,
        chart: 2024 as number | null,
      },
      {
        year: "2025",
        title: "Holding the gains",
        text: "A slower year. The rules kept the portfolio positioned through it and still finished the year up.",
        photo: null as string | null,
        chart: 2025 as number | null,
      },
      {
        year: "2026",
        title: "Up 281% since day one",
        text: "Three years in, $10,000 that followed the Portfolio Signal from the first post is worth more than three and a half times what it started at.",
        photo: null as string | null,
        chart: 2026 as number | null,
      },
    ],
  },
  founders: {
    eyebrow: "The founders",
    title: "Hunter Lee &\n*Aaron Wathen.*",
    subhead: "Co-founders, and the admins of both member groups.",
  },
  principles: {
    eyebrow: "How we operate",
    title: "Our core\n*principles.*",
    subhead: "Six rules sit behind everything we publish.",
    items: [
      { icon: "rule", title: "Rules over opinions", text: "Signals come from written rules. If we change a rule, we say what changed and why." },
      { icon: "layers", title: "Same post, same time", text: "Every member of a tier gets the same post at the same moment. No early access." },
      { icon: "shield", title: "Risk in plain view", text: "Crypto is volatile and signals can be wrong. We say so plainly." },
      { icon: "eye", title: "Reasoning in writing", text: "Every signal explains itself. You should never have to guess why a reading changed." },
      { icon: "ban", title: "No hype", text: "No guarantees, no performance claims, no countdowns. If it sounds too good, we won't say it." },
      { icon: "compass", title: "Indicators, not instructions", text: "Signals are valuation and trend indicators, not direct buy or sell calls." },
    ] satisfies { icon: IconName; title: string; text: string }[],
  },
};
