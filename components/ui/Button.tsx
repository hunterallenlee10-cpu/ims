import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isPlaceholder } from "@/content/site";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

// Square buttons with a double border (outer line, dark gap, fill) in IMS purple.
const base =
  "inline-flex items-center justify-center gap-2 border-2 font-semibold tracking-[0.01em] whitespace-nowrap transition-colors duration-200 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent border-accent-light text-heading shadow-[inset_0_0_0_2px_var(--bg)] hover:bg-accent-hover hover:border-accent-lighter",
  secondary:
    "bg-transparent border-accent-light text-accent-light hover:border-accent-lighter hover:text-accent-lighter hover:bg-accent-light/5",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-[0.95rem]",
  lg: "min-h-14 px-8 text-base",
};

export type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
} & (
  | { href: string; type?: never; disabled?: never }
  | { href?: undefined; type?: "button" | "submit"; disabled?: boolean; onClick?: () => void; busy?: boolean }
);

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  arrow,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow ? <Icon name="arrowRight" size={18} /> : null}
    </>
  );

  if (rest.href !== undefined) {
    const { href } = rest;
    // A [PLACEHOLDER] link renders as a disabled button so it never 404s.
    if (isPlaceholder(href)) {
      return (
        <button
          type="button"
          disabled
          title={`Link not set yet: ${href}`}
          className={cn(classes, "cursor-not-allowed opacity-60")}
        >
          {content}
        </button>
      );
    }
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={rest.type ?? "button"}
      disabled={rest.disabled}
      onClick={rest.onClick}
      aria-busy={rest.busy || undefined}
      className={cn(classes, rest.disabled && "cursor-not-allowed opacity-60")}
    >
      {content}
    </button>
  );
}
