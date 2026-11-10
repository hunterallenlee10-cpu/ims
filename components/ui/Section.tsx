import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Glow } from "@/components/art/Glow";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  /**
   * default: page background. raised: faint lift.
   * band: full-width navy band with cut corners.
   */
  tone?: "default" | "raised" | "band";
  /** Optional soft purple glow behind the section. */
  glow?: "center" | "left" | "right";
  /** Hairline divider at the top of the section. */
  divider?: boolean;
  "aria-labelledby"?: string;
};

const glowPos = {
  center: "left-1/2 top-1/2 h-[520px] w-[820px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2",
  left: "-left-40 top-10 h-[460px] w-[620px]",
  right: "-right-40 top-10 h-[460px] w-[620px]",
};

export function Section({
  children,
  id,
  className,
  containerClassName,
  tone = "default",
  glow,
  divider,
  ...rest
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={rest["aria-labelledby"]}
      className={cn(
        "relative isolate overflow-x-clip section-y",
        tone === "raised" && "bg-surface/60",
        tone === "band" && "chamfer bg-bg-lift-1 [--cut:40px]",
        divider && "border-t border-line",
        className,
      )}
    >
      {glow ? <Glow className={glowPos[glow]} strength={0.7} /> : null}
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
