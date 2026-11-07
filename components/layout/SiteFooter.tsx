import Link from "next/link";
import { isPlaceholder, site } from "@/content/site";
import { Wordmark } from "@/components/brand/Wordmark";
import { Icon } from "@/components/ui/Icon";

/** Mega footer: wordmark, link columns, socials, persistent disclaimer, 18+ notice. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative border-t border-line"
      style={{ background: "linear-gradient(180deg, rgba(13,23,36,0.4) 0%, #0A1520 100%)" }}
    >
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          <div>
            <Wordmark size="lg" />
            <p className="mt-6 max-w-xs text-sm text-muted">
              Systematic investment research. One rules-based signal, published the same way to every member.
            </p>
            <p className="mt-4 text-sm text-muted">
              <a href={isPlaceholder(site.email) ? "/contact" : `mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2 hover:text-heading">
                <Icon name="mail" size={18} className="text-accent-light" />
                {site.email}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-5">
            {site.footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="eyebrow mb-4 text-accent-light">{col.title}</p>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex min-h-11 items-center text-sm text-body transition-colors hover:text-heading sm:min-h-9">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <nav aria-label="Social">
              <p className="eyebrow mb-4 text-accent-light">Social</p>
              <ul className="space-y-1">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    {isPlaceholder(s.href) ? (
                      <span className="inline-flex min-h-11 items-center gap-2 text-sm text-muted sm:min-h-9" title={`Link not set yet: ${s.href}`}>
                        <Icon name={s.icon} size={16} />
                        {s.label}
                      </span>
                    ) : (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 text-sm text-body transition-colors hover:text-heading sm:min-h-9"
                      >
                        <Icon name={s.icon} size={16} className="text-accent-light" />
                        {s.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="max-w-4xl text-sm leading-relaxed text-muted">{site.disclaimer}</p>
          <p className="mt-3 text-sm text-muted">
            <span className="mr-2 inline-flex items-center rounded-site-sm border border-line px-1.5 py-0.5 text-xs font-semibold text-eyebrow">
              18+
            </span>
            {site.ageNotice}
          </p>
          <div className="mt-8 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.name}. {site.legalEntity}. All rights reserved.
            </p>
            <p>
              <Link href="/disclaimer" className="hover:text-heading">
                Disclaimer
              </Link>
              {" · "}
              <Link href="/risk-disclosure" className="hover:text-heading">
                Risk Disclosure
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
