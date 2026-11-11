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
    subhead: "Milestones only.",
    items: [
      { year: "[TODO: year]", title: "[TODO: milestone]", text: "[TODO: what happened and why it mattered]", photo: null as string | null },
      { year: "[TODO: year]", title: "[TODO: milestone]", text: "[TODO: what happened and why it mattered]", photo: null as string | null },
      { year: "[TODO: year]", title: "[TODO: milestone]", text: "[TODO: what happened and why it mattered]", photo: null as string | null },
      { year: "[TODO: year]", title: "[TODO: milestone]", text: "[TODO: what happened and why it mattered]", photo: null as string | null },
      { year: "[TODO: year]", title: "Investing Mastery Signals launches", text: "[TODO: launch details]", photo: null as string | null },
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
