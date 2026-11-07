import { Icon } from "./Icon";

/** Accessible accordion row built on native <details>/<summary>. */
export function FaqItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-line" open={defaultOpen}>
      <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-left text-lg font-medium text-heading transition-colors hover:text-accent-lighter">
        <span>{question}</span>
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-accent-light transition-transform duration-300 group-open:rotate-45"
        >
          <Icon name="plus" size={18} />
        </span>
      </summary>
      <div className="measure pb-6 pr-12 text-body">
        {answer.split("\n\n").map((para) => (
          <p key={para} className="mt-3 first:mt-0">
            {para}
          </p>
        ))}
      </div>
    </details>
  );
}
