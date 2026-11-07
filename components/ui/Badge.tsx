import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({ children, className, tone = "accent" }: { children: ReactNode; className?: string; tone?: "accent" | "muted" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-site-sm border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em]",
        tone === "accent" ? "border-accent-light/60 text-accent-light" : "border-line text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
