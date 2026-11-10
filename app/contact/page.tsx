import { contact } from "@/content/contact";
import { isPlaceholder, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ManageMembershipLink } from "@/components/ui/ManageMembershipLink";

export const metadata = pageMetadata({ ...contact.meta, path: "/contact" });

export default function ContactPage() {
  const s = contact.sidebar;
  return (
    <>
      <PageHero eyebrow={contact.hero.eyebrow} title={contact.hero.title} intro={contact.hero.intro} />
      <Section className="!pt-4 md:!pt-8" aria-labelledby="contact-form-title">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="frame p-6 [--cut:22px] sm:p-10">
            <h2 id="contact-form-title" className="mb-8 text-h3">
              {contact.form.title}
            </h2>
            <ContactForm />
          </div>
          <aside className="space-y-10" aria-label="Other ways to reach us">
            <div>
              <p className="eyebrow mb-3 text-accent-light">{s.emailTitle}</p>
              {isPlaceholder(site.email) ? (
                <p className="inline-flex items-center gap-2 text-heading">
                  <Icon name="mail" size={18} className="text-accent-light" />
                  {site.email}
                </p>
              ) : (
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2 text-heading hover:text-accent-lighter">
                  <Icon name="mail" size={18} className="text-accent-light" />
                  {site.email}
                </a>
              )}
              <p className="mt-3 text-sm text-muted">{s.note}</p>
            </div>
            <div>
              <p className="eyebrow mb-3 text-accent-light">Billing</p>
              <p className="text-sm text-muted">{s.manageNote}</p>
              <ManageMembershipLink className="mt-2" />
            </div>
            <div hidden={site.socials.every((so) => isPlaceholder(so.href))}>
              <p className="eyebrow mb-3 text-accent-light">{s.socialTitle}</p>
              <ul className="space-y-1">
                {site.socials.map((so) => (
                  <li key={so.label}>
                    {isPlaceholder(so.href) ? (
                      <span className="inline-flex min-h-11 items-center gap-3 text-muted">
                        <Icon name={so.icon} size={18} />
                        {so.label} <span className="text-xs">{so.href}</span>
                      </span>
                    ) : (
                      <a href={so.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 text-body hover:text-heading">
                        <Icon name={so.icon} size={18} className="text-accent-light" />
                        {so.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <p className="rounded-site border border-line p-5 text-sm text-muted">
              {site.disclaimer} {site.riskNote}
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
