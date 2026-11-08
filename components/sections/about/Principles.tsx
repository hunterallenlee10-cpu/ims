import { about } from "@/content/about";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Core principles as big numbered rows (01, 02 …) separated by hairlines. */
export function Principles() {
  const c = about.principles;
  return (
    <Section id="principles" aria-labelledby="principles-title">
      <SectionHeader id="principles-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />
      <ol className="mx-auto max-w-4xl border-t border-panel-line">
        {c.items.map((p, i) => (
          <li
            key={p.title}
            data-reveal
            className="grid grid-cols-[4.5rem_1fr] items-start gap-6 border-b border-panel-line py-9 sm:grid-cols-[9rem_1fr] sm:gap-10 sm:py-11"
          >
            <span aria-hidden="true" className="font-display text-[clamp(3.2rem,8vw,6rem)] leading-[0.85] text-accent-light">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-h3">{p.title}</h3>
              <p className="mt-3 text-lg text-body">{p.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
