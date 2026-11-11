import type { Metadata } from "next";
import { signals } from "@/content/signals";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/sections/shared/PageHero";
import { StepPath } from "@/components/sections/shared/StepPath";

// This page grants nothing. Anyone can open it; access comes from Stripe webhooks.
export const metadata: Metadata = {
  ...pageMetadata({ ...signals.success.meta, path: "/join/success" }),
  robots: { index: false, follow: false },
};

export default function JoinSuccessPage() {
  const c = signals.success;
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} intro={c.intro} />
      <Section aria-label="What happens next">
        <StepPath items={c.steps} />
        <div className="mx-auto mt-16 max-w-xl border border-line p-6 text-center">
          <p className="text-body">{c.help}</p>
          <ul className="mt-4 flex flex-col items-center gap-2">
            <li>
              <a href={site.phone.href} className="inline-flex min-h-11 items-center gap-2 text-heading hover:text-accent-lighter">
                <Icon name="phone" size={18} className="text-accent-light" />
                {site.phone.display}
              </a>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
