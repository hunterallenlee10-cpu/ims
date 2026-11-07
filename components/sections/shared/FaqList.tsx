import type { Faq } from "@/content/faq";
import { FaqItem } from "@/components/ui/FaqItem";
import { cn } from "@/lib/cn";

export function FaqList({ items, className }: { items: Faq[]; className?: string }) {
  return (
    <div className={cn("mx-auto max-w-3xl border-t border-line", className)} data-reveal>
      {items.map((f) => (
        <FaqItem key={f.id} question={f.question} answer={f.answer} />
      ))}
    </div>
  );
}
