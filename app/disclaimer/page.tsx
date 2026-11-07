import Content from "@/content/legal/disclaimer.mdx";
import { legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/legal/LegalPage";

export const metadata = pageMetadata({
  title: legalPages["disclaimer"].title,
  description: legalPages["disclaimer"].description,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return <LegalPage slug="disclaimer" Content={Content} />;
}
