import { howItWorks } from "@/content/how-it-works";
import { pageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { WhySystematic } from "@/components/sections/how/WhySystematic";
import { TheSignals } from "@/components/sections/how/TheSignals";
import { SignalAnatomy } from "@/components/sections/how/SignalAnatomy";
import { Groups } from "@/components/sections/how/Groups";
import { UpdateCadence } from "@/components/sections/how/UpdateCadence";
import { GroupRules } from "@/components/sections/how/GroupRules";
import { WhatItIsNot } from "@/components/sections/how/WhatItIsNot";

export const metadata = pageMetadata({ ...howItWorks.meta, path: "/how-it-works" });

// Each section is self-contained. Reorder by moving lines.
export default function HowItWorksPage() {
  const { hero, cta } = howItWorks;
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/signals#pricing" size="lg">
            See membership
          </Button>
          <Button href="#signal-anatomy" size="lg" variant="secondary">
            See an example signal
          </Button>
        </div>
      </PageHero>
      <TheSignals />
      <SignalAnatomy />
      <Groups />
      <UpdateCadence />
      <GroupRules />
      <WhySystematic />
      <WhatItIsNot />
      <CtaBand title={cta.title} text={cta.text} />
    </>
  );
}
