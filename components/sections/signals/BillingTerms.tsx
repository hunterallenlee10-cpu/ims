import Link from "next/link";
import { signals } from "@/content/signals";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function BillingTerms() {
  const c = signals.terms;
  return (
    <Section divider aria-labelledby="terms-title">
      <SectionHeader id="terms-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />
      <dl data-reveal className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
        {c.items.map((item) => (
          <div key={item.label} className="grid gap-1 py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
            <dt className="eyebrow pt-1 text-accent-light">{item.label}</dt>
            <dd className="text-body">{item.text}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-center text-sm text-muted">
        Full details in the{" "}
        {c.links.map((l, i) => (
          <span key={l.href}>
            {i > 0 ? " and " : ""}
            <Link href={l.href} className="text-accent-light underline underline-offset-4 hover:text-accent-lighter">
              {l.label}
            </Link>
          </span>
        ))}
        .
      </p>
    </Section>
  );
}
