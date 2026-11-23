import { cn } from "@/lib/cn";

/** "Hunter Lee" -> "HL". */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Purple cut-corner tile with a person's initials. Stands in for a photo. Decorative: the name is always shown as text nearby. */
export function Monogram({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "chamfer flex shrink-0 items-center justify-center font-display tracking-wide text-heading",
        className,
      )}
      style={{ backgroundImage: "linear-gradient(135deg, var(--accent) 0%, #5a12a8 100%)", boxShadow: "0 0 32px var(--accent-glow)" }}
    >
      {initials(name)}
    </span>
  );
}
