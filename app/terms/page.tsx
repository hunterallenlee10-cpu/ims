import Content from "@/content/legal/terms.mdx";
import { legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/legal/LegalPage";

export const metadata = pageMetadata({
  title: legalPages["terms"].title,
  description: legalPages["terms"].description,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage slug="terms" Content={Content} />;
}
