import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Text wordmark: "INVESTING MASTERY" in Cinzel with platinum sheen, "SIGNALS"
 * letter-spaced in purple beneath, flanked by thin gradient rules.
 * Swaps to the real logo once site.logoSrc is set.
 */
export function Wordmark({
  size = "sm",
  href = "/",
  className,
}: {
  size?: "sm" | "lg";
  href?: string | null;
  className?: string;
}) {
  const mark = site.logoSrc ? (
    <Image
      src={site.logoSrc}
      alt={site.name}
      width={size === "lg" ? 240 : 168}
      height={size === "lg" ? 64 : 44}
      className="h-auto w-auto"
      priority={size === "sm"}
    />
  ) : (
    <span className="inline-flex flex-col items-center leading-none">
      <span
        className={cn(
          "sheen whitespace-nowrap font-brand font-semibold normal-case tracking-[0.08em]",
          size === "lg" ? "text-[1.3rem] sm:text-[1.45rem]" : "text-[0.95rem] sm:text-[1.05rem]",
        )}
      >
        INVESTING MASTERY
      </span>{" "}
      <span className={cn("flex w-full items-center", size === "lg" ? "mt-2.5 gap-3" : "mt-1.5 gap-2")}>
        <span aria-hidden="true" className="rule-gradient flex-1" />
        <span
          className={cn(
            "font-mono font-medium text-accent-light",
            size === "lg" ? "pl-[0.6em] text-xs tracking-[0.6em]" : "pl-[0.55em] text-[0.6rem] tracking-[0.55em]",
          )}
        >
          SIGNALS
        </span>
        <span aria-hidden="true" className="rule-gradient-r flex-1" />
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
