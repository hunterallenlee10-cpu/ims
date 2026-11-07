import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/**
 * Surface card with a hairline border. On hover only the border lifts to purple.
 * Pass `icon` for a line icon, or `rule` for a thin purple top rule.
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
        "relative rounded-site border bg-surface p-6 transition-colors duration-300 sm:p-8",
        highlight ? "border-accent-light/70" : "border-line hover:border-accent-light/70",
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
        <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-site-sm border border-line text-accent-light">
          <Icon name={icon} size={22} />
        </span>
      ) : null}
      {children}
    </Tag>
  );
}
