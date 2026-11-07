import { cn } from "@/lib/cn";

/** Soft radial purple glow placed behind a key element. Decorative. */
export function Glow({ className, strength = 1 }: { className?: string; strength?: number }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10 rounded-full", className)}
      style={{
        background: `radial-gradient(closest-side, rgba(138,30,241,${0.35 * strength}), rgba(138,30,241,0))`,
      }}
    />
  );
}
