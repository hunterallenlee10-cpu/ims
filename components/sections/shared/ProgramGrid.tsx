import { Card } from "@/components/ui/Card";
import type { IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Item = { icon: IconName; name: string; text: string };

/** Grid of offering cards: line icon, name, two-line description. 5 items lay out 3 + 2. */
export function ProgramGrid({ items }: { items: Item[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {items.map((item, i) => (
        <li
          key={item.name}
          data-reveal
          style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}
          className={cn(
            "lg:col-span-2",
            items.length === 5 && i >= 3 && "lg:col-span-3",
            items.length % 2 === 1 && i === items.length - 1 && "sm:col-span-2 lg:col-span-3",
          )}
        >
          <Card icon={item.icon} className="h-full">
            <h3 className="text-h3">{item.name}</h3>
            <p className="mt-3 text-body">{item.text}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
