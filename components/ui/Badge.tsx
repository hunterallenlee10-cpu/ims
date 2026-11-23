import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  md: "border px-2.5 py-1 text-[0.7rem]",
  // Large: for labels that must not be missed, like "Example format".
  lg: "border-2 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm",
} as const;

export function Badge({
  children,
  className,
  tone = "accent",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  tone?: "accent" | "muted";
  size?: keyof typeof sizes;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-site-sm font-semibold uppercase tracking-[0.2em]",
        sizes[size],
        tone === "accent" ? "border-accent-light/60 text-accent-light" : "border-line text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
