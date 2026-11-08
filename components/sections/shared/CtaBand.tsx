import { renderAccent, renderRich } from "@/lib/accent";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { TrustLine } from "@/components/ui/TrustLine";
import { CtaArrows } from "@/components/ui/CtaArrows";
import { Icon } from "@/components/ui/Icon";
import { Glow } from "@/components/art/Glow";

/** Full-width navy band with cut corners: two-line headline + main button + trust line. */
export function CtaBand({
  title = "Follow a\n*system.*",
  text,
  cta = { label: site.joinLabel, href: site.joinHref },
}: {
  title?: string;
  text?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-x-clip py-10 md:py-16">
      <div className="chamfer relative isolate overflow-hidden bg-panel py-16 [--cut:40px] md:py-24">
        <Glow className="left-1/2 top-1/2 h-[380px] w-[760px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2" strength={0.55} />
        <div className="container-site text-center" data-reveal>
          <h2 className="text-h2">{renderAccent(title)}</h2>
          {text ? <p className="measure mx-auto mt-5 text-lg text-muted">{renderRich(text)}</p> : null}
          <div className="mt-10 flex flex-col items-center gap-6">
            <CtaArrows>
              <Button href={cta.href} size="lg" className="sm:min-w-60">
                {cta.label}
                <Icon name="arrowRight" size={18} />
              </Button>
            </CtaArrows>
            <TrustLine />
          </div>
        </div>
      </div>
    </section>
  );
}
