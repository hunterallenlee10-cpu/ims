import { about, founders } from "@/content/about";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function FounderBios() {
  const c = about.founders;
  return (
    <Section id="founders" tone="raised" divider glow="left" aria-labelledby="founders-title">
      <SectionHeader id="founders-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />
      <div className="space-y-16 md:space-y-24">
        {founders.map((f, i) => (
          <article key={f.name} aria-labelledby={`founder-${i}`} className="grid items-center gap-8 md:grid-cols-[5fr_7fr] md:gap-14">
            <div data-reveal className={i % 2 === 1 ? "md:order-2" : undefined}>
              <PlaceholderImage
                src={f.photo}
                alt={`Portrait of ${f.name}`}
                label={`[PHOTO: ${f.name}]`}
                className="mx-auto aspect-[4/5] max-w-md"
                sizes="(min-width: 768px) 440px, 100vw"
              />
            </div>
            <div data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
              <p className="eyebrow text-accent-light">{f.role}</p>
              <h3 id={`founder-${i}`} className="mt-3 text-h2">
                {f.name}
              </h3>
              <p className="mt-4 font-accent text-[1.45rem] italic leading-snug text-accent-light">{f.oneLiner}</p>
              <div className="measure mt-6 space-y-4 text-body">
                {f.bio.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
