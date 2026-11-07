import { renderAccent } from "@/lib/accent";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { TrustLine } from "@/components/ui/TrustLine";
import { DataWave } from "@/components/art/DataWave";

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
    <Section glow="center" divider className="overflow-hidden" aria-labelledby="two-paths-title">
      <DataWave seed={4.2} lines={7} opacity={0.22} reverse className="-bottom-24 -left-1/4 h-[380px] w-[1100px] max-w-none" />
      <div className="text-center" data-reveal>
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h2 id="two-paths-title" className="text-h2">
          {renderAccent(title)}
        </h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        <div data-reveal className="rounded-site border border-line bg-surface/40 p-7 sm:p-9">
          <p className="eyebrow mb-3 text-muted">Path one</p>
          <h3 className="text-h3 text-body">{left.title}</h3>
          <p className="mt-3 text-muted">{left.text}</p>
        </div>
        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className="rounded-site border border-accent-light/70 bg-surface p-7 sm:p-9"
        >
          <p className="eyebrow mb-3 text-accent-light">Path two</p>
          <h3 className="text-h3">{right.title}</h3>
          <p className="mt-3 text-body">{right.text}</p>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center gap-5" data-reveal>
        <Button href={cta.href} size="lg" className="w-full sm:w-auto sm:min-w-72">
          {cta.label}
        </Button>
        <TrustLine />
      </div>
    </Section>
  );
}
