"use client";

import { useCountUp } from "@/hooks/useCountUp";

/** Parses "1,250+" into prefix "", number 1250, suffix "+". */
function parse(value: string) {
  const match = value.match(/^([^0-9-]*)(-?[\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, num, suffix] = match;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { prefix, number: Number(num.replace(/,/g, "")), suffix, decimals, grouped: num.includes(",") };
}

/** Huge Cinzel number in purple plus a small uppercase label. Counts up on scroll. */
export function Stat({ value, label }: { value: string; label: string }) {
  const parsed = parse(value);
  const { ref, value: current } = useCountUp<HTMLParagraphElement>(parsed?.number ?? 0);

  const display = parsed
    ? `${parsed.prefix}${current.toLocaleString("en-US", {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
        useGrouping: parsed.grouped,
      })}${parsed.suffix}`
    : value;

  return (
    <div className="text-center">
      <p ref={ref} className="font-display text-stat font-semibold text-accent tabular-nums">
        <span aria-hidden="true">{display}</span>
        <span className="sr-only">{value}</span>
      </p>
      <p className="eyebrow mt-3 text-eyebrow">{label}</p>
    </div>
  );
}
