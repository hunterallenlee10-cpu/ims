# Placeholders to fill before launch

Every `[BRACKETED]` item on the site, grouped by what you need to supply. Most copy lives in `content/`. Edit the file listed, save and redeploy.

How placeholders behave on the site:

- Bracketed text shows on the page as-is, so missing items are easy to spot.
- A button or social link whose URL is still a placeholder renders **disabled**. It never sends visitors to a broken page.
- Stats stay **hidden** until a real value replaces `null`.
- Photos show a labeled slot until a file is added and its path is set.
- `[CONFIRM]` marks a claim that's drafted but not yet verified. Remove the tag once it's true.

## 1. Business basics

| Placeholder | Where | Notes |
|---|---|---|
| `[LEGAL ENTITY NAME]` | `content/site.ts` (`legalEntity`), `content/legal/terms.mdx`, `content/legal/privacy.mdx` | Shown in the footer © line and the legal pages |
| `[EMAIL]` | `content/site.ts` (`email`), `content/legal/disclaimer.mdx`, `terms.mdx`, `privacy.mdx` | Footer, contact page, legal pages. Becomes a `mailto:` link once set |
| `[ADDRESS]` | `content/legal/terms.mdx`, `content/legal/privacy.mdx` | Business address |
| `[DOMAIN]` | Vercel env var `NEXT_PUBLIC_SITE_URL` (see `content/site.ts`) | e.g. `https://yourdomain.com`. Used by the sitemap, canonical URLs, OG tags and JSON-LD |
| `[X URL]`, `[YOUTUBE URL]`, `[INSTAGRAM URL]`, `[DISCORD/TELEGRAM URL]` | `content/site.ts` (`socials`) | Remove any network you don't use |

## 2. Signals and membership

| Placeholder | Where | Notes |
|---|---|---|
| `[DISCORD/TELEGRAM/EMAIL]` (delivery channel) | `content/home.ts` (steps, features), `content/how-it-works.ts` (delivery), `content/signals.ts` (tiers, included), `content/faq.ts` (`receive`) | Search-and-replace across `content/` |
| `[DISCORD/TELEGRAM/EMAIL PROVIDER]` | `content/legal/terms.mdx`, `content/legal/privacy.mdx` | The platform's name |
| `[CADENCE]` | `content/how-it-works.ts` (cadence), `content/faq.ts` (`cadence`) | e.g. "every Monday" |
| `[STATE NAMES]` | `content/how-it-works.ts` (`combine.outputNote`) | The composite states you publish |
| `[MARKETS]` | `content/faq.ts` (`markets`), `content/legal/risk-disclosure.mdx` | Which assets/markets are covered |
| Signal types list `[CONFIRM list]` | `content/home.ts` (`program.items`) | Five items: valuation, trend, risk gate, macro & liquidity, weekly note |
| Membership inclusions `[CONFIRM]` | `content/home.ts` (`features.cards`), `content/signals.ts` (`included`, tier `includes`) | Remove the `[CONFIRM]` tags once verified |
| Tier names `[CONFIRM tier name]` | `content/signals.ts` (`tiers.items[].name`) | Currently "Monthly" and "Annual" |
| `[PRICE]` ×2 | `content/signals.ts` (`tiers.items[].price`) | |
| `[BILLING PERIOD]` | `content/signals.ts` (tier `period` comments, `terms`), `content/legal/terms.mdx` | |
| `[JOIN LINK: monthly]`, `[JOIN LINK: annual]` | `content/signals.ts` (`tiers.items[].joinHref`) | Checkout URLs (e.g. Stripe, Whop). Buttons stay disabled until set |
| `[ANNUAL NOTE: …]` | `content/signals.ts` (`tiers.items[1].note`) | Only state a saving if it is real and exact, or delete the `note` line |
| `[CURRENCY]` | `content/signals.ts` (`tiers.footnote`), `content/legal/terms.mdx` | |
| `[CANCELLATION STEPS: …]` | `content/signals.ts` (`terms`), `content/legal/terms.mdx` | |
| `[ACCESS AFTER CANCEL: …]` | `content/signals.ts` (`terms`), `content/legal/terms.mdx` | |
| `[REFUND POLICY]` | `content/signals.ts` (`terms`), `content/legal/terms.mdx` | |
| `[PRICE CHANGE POLICY: …]`, `[NOTICE PERIOD]` | `content/signals.ts` (`terms`), `content/legal/terms.mdx` | |
| `[CONFIRM all terms]` | `content/signals.ts` (`terms.subhead`) | Remove once terms are final |
| `[PAYMENT PROCESSOR]` | `content/legal/terms.mdx`, `content/legal/privacy.mdx` | |

## 3. Trust line and tagline

| Placeholder | Where | Notes |
|---|---|---|
| "Cancel anytime [CONFIRM]" | `content/site.ts` (`trustLine`) | Shows under every main CTA. Remove the tag if true; replace the claim if not |
| Tagline "The science of wealth multiplication." `[CONFIRM tagline]` | `content/home.ts` (`hero.tagline`, code comment) | Not shown with a visible tag. Consider whether "wealth multiplication" fits the no-income-claims rule before launch |
| Hero sentence | `content/home.ts` (`hero.sentence`) | Drafted, review wording |

## 4. Stats strip (hidden until filled)

| Placeholder | Where | Notes |
|---|---|---|
| `[NUMBER]` ×4 with labels | `content/home.ts` (`stats.items`) | Set `value` to a real, verifiable figure (e.g. `"2,400+"`) and replace the label. Only filled stats show; all `null` hides the section. No performance numbers |

## 5. FAQ answers

All in `content/faq.ts`:

| Item id | Placeholder |
|---|---|
| `receive` | `[ANSWER: how access is granted after joining.]` |
| `cadence` | `[CADENCE]`, `[ANSWER: confirm]` |
| `markets` | `[MARKETS]`, `[ANSWER: which assets and markets the signal covers.]` |
| `cancel` | `[ANSWER: cancellation steps.]` |
| `refunds` | `[ANSWER: refund policy.]` |
| `tiers` | `[CONFIRM]` |
| `share` | `[ANSWER: sharing policy.]` |

FAQ structured data (JSON-LD) automatically includes only answers with no placeholders left.

## 6. Founders and story

| Placeholder | Where | Notes |
|---|---|---|
| `[ONE-LINE BIO: Hunter Lee]`, `[ONE-LINE BIO: Aaron Wathen]` | `content/about.ts` (`founders[].oneLiner`) | Home teaser and /about |
| `[BIO: … paragraph 1/2]` | `content/about.ts` (`founders[].bio`) | |
| Founder photos | `public/team/hunter.jpg`, `public/team/aaron.jpg`, then set `photo` in `content/about.ts` | Portrait, at least 900×1125 |
| `[YEAR]` ×5, `[MILESTONE]` ×4, `[MILESTONE: …]` ×5 | `content/about.ts` (`timeline.items`) | Add or remove items freely |
| Chapter photos `[PHOTO: chapter N]` | `public/…`, then set `photo` per timeline item in `content/about.ts` | Optional |

## 7. Brand assets

| Placeholder | Where | Notes |
|---|---|---|
| Logo | Add `public/brand/logo.svg`, then set `logoSrc: "/brand/logo.svg"` in `content/site.ts` | Replaces the text wordmark in the nav and footer |
| Hero video (optional) | `public/media/hero.mp4` (+ `hero-poster.jpg`) | Picked up automatically at build time. Muted, looped, off for reduced-motion visitors |

## 8. Contact

| Placeholder | Where | Notes |
|---|---|---|
| `[RESPONSE TIME, …]` | `content/contact.ts` (`form.success`) | |
| Form destination (TODO) | Vercel env var `CONTACT_WEBHOOK_URL`, see `app/api/contact/route.ts` | Any webhook (n8n, Zapier, Make). Until set, messages only reach the server log |

## 9. Legal drafts (attorney review required)

Every legal page shows "DRAFT: have an attorney review before launch." The banner text is in `content/legal.ts`. Remove it after review.

| Placeholder | Where |
|---|---|
| `[DATE]` (last updated) ×4 | `content/legal.ts` |
| `[CONFIRM WITH ATTORNEY: regulatory position]` | `content/legal/disclaimer.mdx` |
| `[CONFIRM WITH ATTORNEY: founder positions / trading policy]` | `content/legal/disclaimer.mdx` |
| `[CONFIRM: market-specific risks]` | `content/legal/risk-disclosure.mdx` |
| `[CONFIRM: excluded countries/states]`, `[CONFIRM sharing policy.]`, `[CONFIRM WITH ATTORNEY]` (liability cap), `[STATE / COUNTRY]`, `[DISPUTE RESOLUTION: …]` | `content/legal/terms.mdx` |
| `[ANALYTICS PROVIDER …]`, `[LIST PROVIDERS]`, `[DESCRIBE COOKIES …]`, `[RETENTION PERIODS]`, `[COUNTRIES]`, `[CONFIRM WITH ATTORNEY]` (legal bases) | `content/legal/privacy.mdx` |

## 10. Research posts

Both sample posts are outlines marked `[PLACEHOLDER OUTLINE]`, with `[DRAFT: …]` and `[TAKEAWAY N]` notes. The dates are sample dates.

- `content/research/why-rules-beat-predictions.mdx`
- `content/research/reading-a-valuation-z-score.mdx`

Add a post by creating a new `.mdx` file in `content/research/` with an `export const meta = { title, date, summary, tags }` block. It appears on /research, in the sitemap and gets its own page automatically.

## 11. Example data (intentional, keep labeled)

The home "signal console" (`content/home.ts` → `console`) and the annotated signal post (`content/how-it-works.ts` → `anatomy`) use made-up values. Both carry a visible **EXAMPLE DATA** badge and caption. Keep the labels if you change the numbers, and never use real or current calls there.
