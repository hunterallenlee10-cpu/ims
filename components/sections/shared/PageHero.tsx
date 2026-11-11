import type { ReactNode } from "react";
import { renderAccent, renderRich } from "@/lib/accent";
import { site } from "@/content/site";
import { DataWave } from "@/components/art/DataWave";
import { Glow } from "@/components/art/Glow";
import { Chip } from "@/components/ui/Chip";

/** Hero for inner pages: label chip, two-line condensed H1, intro, optional actions. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-panel-line pb-16 pt-16 md:pb-24 md:pt-24">
      <DataWave seed={2.1} lines={7} opacity={0.32} className="-right-[30%] -top-[20%] h-[420px] w-[900px] max-w-none sm:-right-[10%]" />
      <DataWave seed={4.4} lines={6} opacity={0.22} reverse className="-bottom-[40%] -left-[35%] h-[380px] w-[900px] max-w-none" />
      <Glow className="left-1/2 top-1/2 h-[360px] w-[760px] max-w-[130vw] -translate-x-1/2 -translate-y-1/2" strength={0.6} />
      <div className="container-site text-center">
        <Chip tag={eyebrow} label={site.name} className="mb-7" />
        <h1 className="mx-auto max-w-5xl text-h1">{renderAccent(title)}</h1>
        {intro ? <p className="measure mx-auto mt-7 text-lg text-body md:text-xl">{renderRich(intro)}</p> : null}
        {children ? <div className="mt-10 flex justify-center">{children}</div> : null}
      </div>
    </section>
  );
}
