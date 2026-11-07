import { founders } from "@/content/about";
import { isPlaceholder, site } from "@/content/site";

/** Organization structured data. Placeholder values are left out until filled in. */
export function organizationJsonLd() {
  const sameAs = site.socials.map((s) => s.href).filter((h) => !isPlaceholder(h));
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    ...(site.logoSrc ? { logo: `${site.url}${site.logoSrc}` } : {}),
    ...(isPlaceholder(site.email) ? {} : { email: site.email }),
    ...(isPlaceholder(site.legalEntity) ? {} : { legalName: site.legalEntity }),
    founder: founders.map((f) => ({ "@type": "Person", name: f.name })),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
