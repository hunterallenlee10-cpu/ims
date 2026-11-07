import { renderAccent } from "@/lib/accent";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { TrustLine } from "@/components/ui/TrustLine";
import { Glow } from "@/components/art/Glow";

/** Full-width raised band: one Cinzel line + primary button + trust line. */
export function CtaBand({
  title = "Follow a *system*",
  text,
  cta = { label: site.joinLabel, href: site.joinHref },
}: {
  title?: string;
  text?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-hidden border-y border-line bg-surface/60 py-16 md:py-24">
      <Glow className="left-1/2 top-1/2 h-[380px] w-[760px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2" strength={0.6} />
      <div className="container-site text-center" data-reveal>
        <h2 className="text-h2">{renderAccent(title)}</h2>
        {text ? <p className="measure mx-auto mt-4 text-muted">{text}</p> : null}
        <div className="mt-9 flex flex-col items-center gap-5">
          <Button href={cta.href} size="lg" className="w-full sm:w-auto sm:min-w-64">
            {cta.label}
          </Button>
          <TrustLine />
        </div>
      </div>
    </section>
  );
}
