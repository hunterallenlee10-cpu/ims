import Link from "next/link";
import { isPlaceholder, site } from "@/content/site";
import { Wordmark } from "@/components/brand/Wordmark";
import { Icon } from "@/components/ui/Icon";
import { ManageMembershipLink } from "@/components/ui/ManageMembershipLink";

/** Mega footer: wordmark, support, link columns, socials, disclaimer, risk note, 18+ notice. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = site.socials.filter((s) => !isPlaceholder(s.href));
  return (
    <footer
      className="relative border-t border-accent/30"
      style={{ background: "linear-gradient(180deg, rgba(13,23,36,0.4) 0%, #0A1520 100%)" }}
    >
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          <div>
            <Wordmark size="lg" />
            <p className="mt-6 max-w-xs text-sm text-muted">
              Rules-based crypto valuation and trend signals, delivered in private Telegram groups.
            </p>
            <p className="eyebrow mb-1 mt-6 text-accent-light">Support</p>
            <ul className="text-sm">
              <li>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center gap-2 text-muted hover:text-heading sm:min-h-9"
                >
                  <Icon name="phone" size={16} className="text-accent-light" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <ManageMembershipLink className="text-sm" />
              </li>
            </ul>
          </div>

          <div className={socials.length ? "grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-5" : "grid grid-cols-2 gap-10 md:grid-cols-4"}>
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
            {socials.length ? (
              <nav aria-label="Social">
                <p className="eyebrow mb-4 text-accent-light">Social</p>
                <ul className="space-y-1">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 text-sm text-body transition-colors hover:text-heading sm:min-h-9"
                      >
                        <Icon name={s.icon} size={16} className="text-accent-light" />
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="max-w-4xl text-sm font-semibold leading-relaxed text-heading">{site.disclaimer}</p>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted">{site.riskNote}</p>
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
            <div className="flex flex-col gap-2 sm:items-end">
              <p>
                <Link href="/terms" className="hover:text-heading">
                  Terms of Service
                </Link>
                {" · "}
                <Link href="/privacy" className="hover:text-heading">
                  Privacy Policy
                </Link>
                {" · "}
                <Link href="/risk-disclosure" className="hover:text-heading">
                  Risk Disclosure
                </Link>
              </p>
              <p>{site.builtBy}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
