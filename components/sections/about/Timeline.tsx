import { about } from "@/content/about";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/lib/cn";

/** Year-by-year founder story: big years, short chapters, photo slots, alternating sides. */
export function Timeline() {
  const c = about.timeline;
  return (
    <Section aria-labelledby="timeline-title">
      <SectionHeader id="timeline-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />

      {/* Mini timeline: jump to a chapter */}
      <nav aria-label="Timeline chapters" className="-mx-[var(--gutter)] mb-14 overflow-x-auto px-[var(--gutter)]">
        <ol className="flex min-w-max justify-center gap-2">
          {c.items.map((item, i) => (
            <li key={i}>
              <a
                href={`#chapter-${i + 1}`}
                className="inline-flex min-h-11 items-center rounded-site-sm border border-line px-4 text-sm text-body transition-colors hover:border-accent-light/70 hover:text-heading"
              >
                <span className="mr-2 text-accent-light">{String(i + 1).padStart(2, "0")}</span>
                {item.year}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <ol className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[11px] top-0 w-px md:left-1/2"
          style={{ background: "linear-gradient(180deg, rgba(47,240,254,0), rgba(47,240,254,.5) 10%, rgba(138,30,241,.7) 90%, rgba(138,30,241,0))" }}
        />
        {c.items.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <li key={i} id={`chapter-${i + 1}`} className="relative scroll-mt-28 pb-16 last:pb-0 md:pb-24">
              <span
                aria-hidden="true"
                className="absolute left-[5px] top-3 h-[13px] w-[13px] border-2 border-accent-light bg-accent md:left-1/2 md:-translate-x-1/2"
              />
              <div className={cn("grid gap-6 pl-10 md:grid-cols-2 md:gap-16 md:pl-0")}>
                <div data-reveal className={cn(right ? "md:order-2 md:pl-4" : "md:pr-4 md:text-right")}>
                  <p className="text-signature font-display text-[clamp(3.2rem,8vw,5.6rem)] leading-none">{item.year}</p>
                  <h3 className="mt-4 text-h3">{item.title}</h3>
                  <p className={cn("measure mt-3 text-body", !right && "md:ml-auto")}>{item.text}</p>
                </div>
                <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} className={cn(right ? "md:order-1 md:pr-4" : "md:pl-4")}>
                  <PlaceholderImage
                    src={item.photo}
                    alt={`Photo for chapter ${i + 1}`}
                    label={`[TODO: photo for chapter ${i + 1}]`}
                    className="aspect-[16/10]"
                    sizes="(min-width: 768px) 520px, 100vw"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
