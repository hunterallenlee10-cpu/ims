import type { ReactNode } from "react";
import { renderAccent } from "@/lib/accent";
import { DataWave } from "@/components/art/DataWave";
import { Glow } from "@/components/art/Glow";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Hero for inner pages: eyebrow, sheen H1, intro, optional actions. */
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
    <section className="relative isolate overflow-hidden pb-16 pt-[calc(var(--header-h)+4.5rem)] md:pb-24 md:pt-[calc(var(--header-h)+7rem)]">
      <DataWave
        seed={2.1}
        lines={7}
        opacity={0.32}
        className="-right-[30%] -top-[20%] h-[420px] w-[900px] max-w-none sm:-right-[10%]"
      />
      <Glow className="left-1/2 top-1/3 h-[360px] w-[700px] max-w-[130vw] -translate-x-1/2" strength={0.6} />
      <div className="container-site">
        <div className="max-w-3xl">
          <Eyebrow tone="platinum" className="mb-5">
            {eyebrow}
          </Eyebrow>
          <h1 className="sheen text-h1">{renderAccent(title)}</h1>
          {intro ? <p className="measure mt-6 text-lg text-body md:text-xl">{intro}</p> : null}
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </div>
      <div aria-hidden="true" className="container-site mt-16 md:mt-24">
        <div className="rule-gradient-r" />
      </div>
    </section>
  );
}
