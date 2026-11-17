import type { Metadata } from "next";
import { training } from "@/content/training";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/shared/PageHero";
import { TrainingSteps } from "./TrainingSteps";

// Unlisted member page: shared by link only. Kept out of search engines, the sitemap and all menus.
export const metadata: Metadata = {
  title: training.meta.title,
  description: null,
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: { index: false, follow: false, noarchive: true, nosnippet: true },
  },
  openGraph: null,
  twitter: null,
};

export default function TrainingPage() {
  const c = training;
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} intro={c.hero.intro}>
        <ul className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
          {c.how.map((item, i) => (
            <li key={item} className="mono-label flex min-h-11 items-center gap-3 border border-panel-line bg-bg/40 px-4 text-accent-lighter">
              <span className="text-accent-light">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      </PageHero>
      <Section aria-labelledby="training-steps-title" className="!pt-10 md:!pt-14">
        <h2 id="training-steps-title" className="sr-only">
          Training modules
        </h2>
        <TrainingSteps />
        <p className="mx-auto mt-12 max-w-3xl text-sm leading-relaxed text-muted">{c.note}</p>
      </Section>
    </>
  );
}
