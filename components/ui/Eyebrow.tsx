import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Spaced uppercase label. "accent" = light purple (AA for small text); "platinum" = #B7BFD3. */
export function Eyebrow({
  children,
  tone = "accent",
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  tone?: "accent" | "platinum";
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag className={cn("eyebrow", tone === "accent" ? "text-accent-light" : "text-eyebrow", className)}>
      {children}
    </Tag>
  );
}
