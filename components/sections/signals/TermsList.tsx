import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ManageMembershipLink } from "@/components/ui/ManageMembershipLink";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  subhead?: string;
  items: { label: string; text: string }[];
  links?: { label: string; href: string }[];
  /** Show the Manage membership (Stripe customer portal) link under the list. */
  manage?: boolean;
  tone?: "default" | "raised";
};

/** Label / text rows (billing terms, tier switching), with optional legal links. */
export function TermsList({ id, eyebrow, title, subhead, items, links, manage, tone = "default" }: Props) {
  return (
    <Section id={id} tone={tone} divider aria-labelledby={`${id}-title`} className="scroll-mt-20">
      <SectionHeader id={`${id}-title`} eyebrow={eyebrow} title={title} subhead={subhead} />
      <dl data-reveal className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div key={item.label} className="grid gap-1 py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
            <dt className="eyebrow pt-1 text-accent-light">{item.label}</dt>
            <dd className="text-body">{item.text}</dd>
          </div>
        ))}
      </dl>
      {manage ? (
        <div className="mt-8 text-center">
          <ManageMembershipLink variant="button" />
        </div>
      ) : null}
      {links?.length ? (
        <p className="mt-8 text-center text-sm text-muted">
          Full details in the{" "}
          {links.map((l, i) => (
            <span key={l.href}>
              {i > 0 ? (i === links.length - 1 ? " and " : ", ") : ""}
              <Link href={l.href} className="text-accent-light underline underline-offset-4 hover:text-accent-lighter">
                {l.label}
              </Link>
            </span>
          ))}
          .
        </p>
      ) : null}
    </Section>
  );
}
