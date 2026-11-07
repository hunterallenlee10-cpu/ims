import { howItWorks } from "@/content/how-it-works";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Checklist } from "@/components/ui/Checklist";
import { Icon } from "@/components/ui/Icon";

export function Delivery() {
  const c = howItWorks.delivery;
  return (
    <Section tone="raised" divider aria-labelledby="delivery-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader id="delivery-title" align="left" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} className="!mb-8" />
          <p
            data-reveal
            className="inline-flex min-h-12 items-center gap-3 rounded-site-sm border border-accent-light/60 bg-bg/60 px-5 font-medium text-heading"
          >
            <Icon name="chat" size={20} className="text-accent-light" />
            {c.channel}
          </p>
        </div>
        <div data-reveal className="rounded-site border border-line bg-bg/50 p-7 sm:p-9">
          <Checklist items={c.points} />
        </div>
      </div>
    </Section>
  );
}
