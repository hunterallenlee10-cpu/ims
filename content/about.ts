// About page copy. Founder data is shared with the home page teaser.
// Photos: drop files in public/team/ and set `photo` (e.g. "/team/hunter.jpg").

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
    role: "Co-founder",
    oneLiner: "[ONE-LINE BIO: Hunter Lee]",
    bio: ["[BIO: Hunter Lee, paragraph 1]", "[BIO: Hunter Lee, paragraph 2]"],
    photo: null,
  },
  {
    name: "Aaron Wathen",
    role: "Co-founder",
    oneLiner: "[ONE-LINE BIO: Aaron Wathen]",
    bio: ["[BIO: Aaron Wathen, paragraph 1]", "[BIO: Aaron Wathen, paragraph 2]"],
    photo: null,
  },
];

export const about = {
  meta: {
    title: "About",
    description:
      "The story behind Investing Mastery Signals, the two founders who run it, and the principles the research is built on.",
  },
  hero: {
    eyebrow: "About us",
    title: "Why we built\n*a system.*",
    intro:
      "Investing Mastery Signals started with a simple frustration: too much opinion, not enough process. This is how it came together, who runs it, and the rules we hold ourselves to.",
  },
  timeline: {
    eyebrow: "The story",
    title: "Year by\n*year.*",
    subhead: "Milestones only. Each chapter gets filled in with real dates and details.",
    items: [
      { year: "[YEAR]", title: "[MILESTONE]", text: "[MILESTONE: what happened and why it mattered]", photo: null as string | null },
      { year: "[YEAR]", title: "[MILESTONE]", text: "[MILESTONE: what happened and why it mattered]", photo: null as string | null },
      { year: "[YEAR]", title: "[MILESTONE]", text: "[MILESTONE: what happened and why it mattered]", photo: null as string | null },
      { year: "[YEAR]", title: "[MILESTONE]", text: "[MILESTONE: what happened and why it mattered]", photo: null as string | null },
      { year: "[YEAR]", title: "Investing Mastery Signals launches", text: "[MILESTONE: launch details]", photo: null as string | null },
    ],
  },
  founders: {
    eyebrow: "The founders",
    title: "Hunter Lee &\n*Aaron Wathen.*",
    subhead: "Two people, **one written process.**",
  },
  principles: {
    eyebrow: "How we operate",
    title: "Our core\n*principles.*",
    subhead: "Six rules sit behind everything we publish.",
    items: [
      { icon: "rule", title: "Rules over opinions", text: "Signals come from written rules. If we change a rule, we say what changed and why." },
      { icon: "layers", title: "One signal for everyone", text: "Every member gets the same signal at the same time. No inner circle, no early access." },
      { icon: "shield", title: "Risk first", text: "We check risk before anything else. A closed risk gate is a valid signal, not a failure." },
      { icon: "eye", title: "Reasoning in writing", text: "Every update explains itself. You should never have to guess why a state changed." },
      { icon: "ban", title: "No hype", text: "No guarantees, no income claims, no countdowns. If it sounds too good, we won't say it." },
      { icon: "compass", title: "Your decisions stay yours", text: "We publish general research. What you do with it, and how much, is your call." },
    ] satisfies { icon: IconName; title: string; text: string }[],
  },
};
