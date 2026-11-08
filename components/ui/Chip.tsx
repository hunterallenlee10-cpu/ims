import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/**
 * Boxed monospace label.
 * - split: filled purple tag + label  →  [✦ SIGNALS] SYSTEMATIC RESEARCH
 * - icon:  icon box + label           →  [⏱] INSIDE THE SIGNAL
 */
export function Chip({
  label,
  tag,
  icon = "spark",
  variant = "split",
  className,
}: {
  label: ReactNode;
  tag?: string;
  icon?: IconName;
  variant?: "split" | "icon";
  className?: string;
}) {
  if (variant === "icon") {
    return (
      <span className={cn("inline-flex items-stretch gap-3 border border-panel-line bg-bg/40 p-1 pr-4", className)}>
        <span className="flex h-8 w-8 items-center justify-center border border-panel-line text-accent-light">
          <Icon name={icon} size={16} />
        </span>
        <span className="mono-label flex items-center text-accent-lighter">{label}</span>
      </span>
    );
  }
  return (
    <span className={cn("inline-flex max-w-full items-stretch border border-panel-line bg-bg/40 p-1", tag && "max-sm:pr-1", className)}>
      {tag ? (
        <span className="mono-label flex shrink-0 items-center gap-2 bg-accent px-3 py-1.5 font-semibold text-heading">
          <Icon name={icon} size={14} />
          {tag}
        </span>
      ) : null}
      <span className={cn("mono-label items-center px-3 py-1.5 text-accent-lighter", tag ? "hidden sm:flex" : "flex")}>{label}</span>
    </span>
  );
}
