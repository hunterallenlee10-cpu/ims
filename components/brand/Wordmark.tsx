import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** The IM logo mark on its own (transparent background). Size it with a height class. */
export function LogoMark({
  className,
  priority,
  decorative = true,
}: {
  className?: string;
  priority?: boolean;
  /** Decorative by default because it usually sits next to the written name. */
  decorative?: boolean;
}) {
  const { src, width, height } = site.logo.mark;
  return (
    <Image
      src={src}
      alt={decorative ? "" : `${site.name} logo`}
      width={width}
      height={height}
      priority={priority}
      sizes="(min-width: 640px) 240px, 160px"
      className={cn("w-auto max-w-none select-none", className)}
    />
  );
}

/**
 * Logo lockup: the IM mark, then "INVESTING MASTERY" in Cinzel with platinum
 * sheen and "SIGNALS" letter-spaced in purple beneath, flanked by thin gradient rules.
 *
 * "header" sets one font size and sizes the mark, SIGNALS line, gaps and rules in em,
 * so the whole lockup scales together. "lg" (footer) stacks the mark above the name.
 */
type Size = "sm" | "lg" | "header";

const sizes: Record<Size, { root: string; layout: string; mark: string; text?: string; title: string; row: string; rule: string; tag: string }> = {
  sm: {
    root: "",
    layout: "flex-row items-center gap-2.5 sm:gap-3",
    mark: "h-8 sm:h-9",
    title: "text-[0.95rem] sm:text-[1.05rem]",
    row: "mt-1.5 gap-2",
    rule: "",
    tag: "pl-[0.55em] text-[0.6rem] tracking-[0.55em]",
  },
  lg: {
    root: "",
    layout: "flex-col items-start gap-4",
    mark: "h-14",
    title: "text-[1.3rem] sm:text-[1.45rem]",
    row: "mt-2.5 gap-3",
    rule: "",
    tag: "pl-[0.6em] text-xs tracking-[0.6em]",
  },
  header: {
    // 26px at 1280px, growing to 34px at 2560px so wide screens don't look empty;
    // easing down to 18px at 900px so the nav links keep room.
    // Smaller on phones so the logo, CTA and menu button fit on one row.
    root: "text-[clamp(11px,calc(2.6vw+2px),22px)] nav:text-[clamp(18px,calc(2.105vw-0.95px),26px)] xl:text-[clamp(26px,calc(18px+0.625vw),34px)]",
    layout: "flex-row items-center gap-[0.5em]",
    // The header shows the mark alone; the written name is kept for screen readers.
    mark: "h-10 sm:h-[2.4em]",
    text: "sr-only",
    title: "",
    row: "mt-[0.36em] gap-[0.48em]",
    rule: "h-[max(1px,0.06em)]",
    tag: "pl-[0.55em] text-[0.57em] tracking-[0.55em]",
  },
};

export function Wordmark({ size = "sm", href = "/", className }: { size?: Size; href?: string | null; className?: string }) {
  const s = sizes[size];
  const mark = (
    <span className={cn("inline-flex", s.layout, s.root)}>
      <LogoMark priority={size !== "lg"} className={s.mark} />
      <span className={cn("inline-flex flex-col items-center leading-none", s.text)}>
        <span className={cn("sheen whitespace-nowrap font-brand font-semibold normal-case tracking-[0.08em]", s.title)}>
          INVESTING MASTERY
        </span>{" "}
        <span className={cn("flex w-full items-center", s.row)}>
          <span aria-hidden="true" className={cn("rule-gradient flex-1", s.rule)} />
          <span className={cn("font-mono font-medium text-accent-light", s.tag)}>SIGNALS</span>
          <span aria-hidden="true" className={cn("rule-gradient-r flex-1", s.rule)} />
        </span>
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
