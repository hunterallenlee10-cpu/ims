import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export function Checklist({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon name="check" size={20} className="mt-[0.2em] shrink-0 text-accent-light" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
