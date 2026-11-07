import Content from "@/content/legal/privacy.mdx";
import { legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/legal/LegalPage";

export const metadata = pageMetadata({
  title: legalPages["privacy"].title,
  description: legalPages["privacy"].description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage slug="privacy" Content={Content} />;
}
