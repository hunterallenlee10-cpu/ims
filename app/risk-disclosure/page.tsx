import Content from "@/content/legal/risk-disclosure.mdx";
import { legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/legal/LegalPage";

export const metadata = pageMetadata({
  title: legalPages["risk-disclosure"].title,
  description: legalPages["risk-disclosure"].description,
  path: "/risk-disclosure",
});

export default function RiskDisclosurePage() {
  return <LegalPage slug="risk-disclosure" Content={Content} />;
}
