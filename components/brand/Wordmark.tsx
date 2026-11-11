import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Text wordmark: "INVESTING MASTERY" in Cinzel with platinum sheen, "SIGNALS"
 * letter-spaced in purple beneath, flanked by thin gradient rules.
 * Swaps to the real logo once site.logoSrc is set.
 *
 * "header" sets one font size and sizes the SIGNALS line, gaps and rules in em,
 * so the whole lockup scales together.
 */
type Size = "sm" | "lg" | "header";

const sizes: Record<Size, { root: string; title: string; row: string; rule: string; tag: string; img: [number, number] }> = {
  sm: {
    root: "",
    title: "text-[0.95rem] sm:text-[1.05rem]",
    row: "mt-1.5 gap-2",
    rule: "",
    tag: "pl-[0.55em] text-[0.6rem] tracking-[0.55em]",
    img: [168, 44],
  },
  lg: {
    root: "",
    title: "text-[1.3rem] sm:text-[1.45rem]",
    row: "mt-2.5 gap-3",
    rule: "",
    tag: "pl-[0.6em] text-xs tracking-[0.6em]",
    img: [240, 64],
  },
  header: {
    // 26px from 1280px up, easing down to 18px at 900px so the nav links keep room.
    // Smaller on phones so the logo, CTA and menu button fit on one row.
    root: "text-[clamp(11px,calc(2.6vw+2px),22px)] nav:text-[clamp(18px,calc(2.105vw-0.95px),26px)]",
    title: "",
    row: "mt-[0.36em] gap-[0.48em]",
    rule: "h-[max(1px,0.06em)]",
    tag: "pl-[0.55em] text-[0.57em] tracking-[0.55em]",
    img: [260, 68],
  },
};

export function Wordmark({
  size = "sm",
  href = "/",
  className,
}: {
  size?: Size;
  href?: string | null;
  className?: string;
}) {
  const s = sizes[size];
  const mark = site.logoSrc ? (
    <Image
      src={site.logoSrc}
      alt={site.name}
      width={s.img[0]}
      height={s.img[1]}
      className="h-auto w-auto"
      priority={size !== "lg"}
    />
  ) : (
    <span className={cn("inline-flex flex-col items-center leading-none", s.root)}>
      <span
        className={cn(
          "sheen whitespace-nowrap font-brand font-semibold normal-case tracking-[0.08em]",
          s.title,
        )}
      >
        INVESTING MASTERY
      </span>{" "}
      <span className={cn("flex w-full items-center", s.row)}>
        <span aria-hidden="true" className={cn("rule-gradient flex-1", s.rule)} />
        <span className={cn("font-mono font-medium text-accent-light", s.tag)}>SIGNALS</span>
        <span aria-hidden="true" className={cn("rule-gradient-r flex-1", s.rule)} />
      </span>
    </span>
  );

  if (!href) return <span className={className}>{mark}</span>;

  return (
    <Link href={href} className={cn("inline-flex min-h-11 items-center", className)}>
      {mark}
      <span className="sr-only"> home</span>
    </Link>
  );
}
