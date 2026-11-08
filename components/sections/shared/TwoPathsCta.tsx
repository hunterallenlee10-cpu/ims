import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { TrustLine } from "@/components/ui/TrustLine";
import { CtaArrows } from "@/components/ui/CtaArrows";
import { Icon } from "@/components/ui/Icon";

type Path = { title: string; text: string };

/** Closing "two paths" section ending in one big button. */
export function TwoPathsCta({
  eyebrow,
  title,
  left,
  right,
  cta,
}: {
  eyebrow: string;
  title: string;
  left: Path;
  right: Path;
  cta: { label: string; href: string };
}) {
  return (
    <Section glow="center" aria-labelledby="two-paths-title" className="overflow-hidden">
      <SectionHeader id="two-paths-title" eyebrow={eyebrow} title={title} />
      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        <div data-reveal className="frame p-7 [--fill:var(--bg)] sm:p-9">
          <p className="mono-label mb-4 flex items-center gap-2 text-muted">
            <span className="flex h-6 w-6 items-center justify-center border border-panel-line font-mono text-[0.7rem]">A</span>
            Path one
          </p>
          <h3 className="text-h3 text-body">{left.title}</h3>
          <p className="mt-3 text-muted">{left.text}</p>
        </div>
        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className="frame frame-accent p-7 sm:p-9"
        >
          <p className="mono-label mb-4 flex items-center gap-2 text-accent-light">
            <span className="flex h-6 w-6 items-center justify-center bg-accent font-mono text-[0.7rem] text-heading">B</span>
            Path two
          </p>
          <h3 className="text-h3">{right.title}</h3>
          <p className="mt-3 text-body">{right.text}</p>
        </div>
      </div>
      <div className="mt-14 flex flex-col items-center gap-6" data-reveal>
        <CtaArrows>
          <Button href={cta.href} size="lg" className="sm:min-w-64">
            {cta.label}
            <Icon name="arrowRight" size={18} />
          </Button>
        </CtaArrows>
        <TrustLine />
      </div>
    </Section>
  );
}
