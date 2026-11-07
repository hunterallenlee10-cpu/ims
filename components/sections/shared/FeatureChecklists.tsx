import { Card } from "@/components/ui/Card";
import { Checklist } from "@/components/ui/Checklist";

/** Three cards, each a title plus checkmarked bullets. */
export function FeatureChecklists({ cards }: { cards: { title: string; items: string[] }[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {cards.map((card, i) => (
        <li key={card.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
          <Card rule className="h-full">
            <h3 className="text-h3">{card.title}</h3>
            <Checklist items={card.items} className="mt-6" />
          </Card>
        </li>
      ))}
    </ul>
  );
}
