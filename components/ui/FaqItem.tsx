import { Icon } from "./Icon";

/** Accordion row (native <details>) styled as a navy panel with a plus icon. */
export function FaqItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen?: boolean }) {
  return (
    <details className="group border border-panel-line bg-panel transition-colors open:border-accent-light/60 hover:border-accent-light/60" open={defaultOpen}>
      <summary className="flex min-h-16 items-center justify-between gap-6 px-5 py-4 text-left text-[1.05rem] font-semibold text-heading sm:px-6">
        <span>{question}</span>
        <Icon name="plus" size={22} className="shrink-0 text-accent-light transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <div className="measure px-5 pb-6 text-body sm:px-6">
        {answer.split("\n\n").map((para) => (
          <p key={para} className="mt-3 first:mt-0">
            {para}
          </p>
        ))}
      </div>
    </details>
  );
}
