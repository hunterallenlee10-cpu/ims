import { isPlaceholder, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Icon } from "./Icon";

/**
 * "Manage membership": Stripe's no-code customer portal login link.
 * While the link isn't set, it renders as disabled text so it never 404s.
 */
export function ManageMembershipLink({ variant = "link", className }: { variant?: "link" | "button"; className?: string }) {
  const { label, href } = site.manageMembership;
  if (variant === "button") {
    return (
      <Button href={href} variant="secondary" className={className}>
        {label}
      </Button>
    );
  }
  if (isPlaceholder(href)) {
    return (
      <span className={cn("inline-flex min-h-11 items-center gap-2 text-muted sm:min-h-9", className)} title={`Link not set yet: ${href}`}>
        <Icon name="card" size={16} />
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex min-h-11 items-center gap-2 text-body transition-colors hover:text-heading sm:min-h-9", className)}
    >
      <Icon name="card" size={16} className="text-accent-light" />
      {label}
      <span className="sr-only"> (opens Stripe in a new tab)</span>
    </a>
  );
}
