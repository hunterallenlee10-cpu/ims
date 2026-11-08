import { faqGroups } from "@/content/faq";
import { faqPage } from "@/content/faq-page";
import { isPlaceholder } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { FaqItem } from "@/components/ui/FaqItem";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CtaBand } from "@/components/sections/shared/CtaBand";

export const metadata = pageMetadata({ ...faqPage.meta, path: "/faq" });

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function FaqPage() {
  // FAQ structured data only for questions that have final answers.
  const answered = faqGroups.flatMap((g) => g.items).filter((f) => !isPlaceholder(f.answer));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.replace(/\n\n/g, " ") },
    })),
  };

  return (
    <>
      <PageHero eyebrow={faqPage.hero.eyebrow} title={faqPage.hero.title} intro={faqPage.hero.intro} />
      <Section className="!pt-4 md:!pt-8" aria-label="Frequently asked questions">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {faqGroups.map((g) => (
                <li key={g.title}>
                  <a
                    href={`#${slug(g.title)}`}
                    className="inline-flex min-h-11 items-center rounded-site-sm border border-line px-4 text-sm text-body transition-colors hover:border-accent-light/70 hover:text-heading lg:w-full"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16">
            {faqGroups.map((g) => (
              <section key={g.title} id={slug(g.title)} aria-labelledby={`${slug(g.title)}-title`} className="scroll-mt-28">
                <h2 id={`${slug(g.title)}-title`} className="mono-label mb-4 text-accent-light">
                  {g.title}
                </h2>
                <div className="border-t border-line">
                  {g.items.map((f) => (
                    <FaqItem key={f.id} question={f.question} answer={f.answer} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>
      <CtaBand title={faqPage.still.title} text={faqPage.still.text} cta={faqPage.still.cta} />
      {answered.length ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
    </>
  );
}
