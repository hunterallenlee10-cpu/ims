import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/**
 * Navy panel with cut corners and a hairline border.
 * On hover only the border lifts to purple. `icon` adds a boxed line icon,
 * `rule` adds a thin purple top rule.
 */
export function Card({
  children,
  icon,
  rule,
  highlight,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  icon?: IconName;
  rule?: boolean;
  highlight?: boolean;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "frame p-6 sm:p-8",
        highlight ? "frame-accent" : "frame-hover",
        className,
      )}
    >
      {rule ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-6 top-0 h-px sm:inset-x-8"
          style={{ background: "linear-gradient(90deg, var(--accent-light), rgba(185,70,251,0))" }}
        />
      ) : null}
      {icon ? (
        <span className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-panel-line bg-bg/40 text-accent-light">
          <Icon name={icon} size={22} />
        </span>
      ) : null}
      {children}
    </Tag>
  );
}
