# Investing Mastery Signals — website

Marketing site for Investing Mastery Signals. Next.js 16 (App Router), TypeScript, Tailwind CSS v4, MDX. Deploys on Vercel.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

Node 20.9 or newer.

## Editing copy

All text lives in `content/`. You shouldn't need to touch components to change wording.

| File | Page |
|---|---|
| `content/site.ts` | Name, nav, footer, socials, email, trust line, disclaimer, logo slot |
| `content/home.ts` | Home page |
| `content/how-it-works.ts` | How It Works |
| `content/signals.ts` | Membership tiers, terms |
| `content/faq.ts` | Every FAQ (used on /faq, home and /signals) |
| `content/about.ts` | Founders, timeline, principles |
| `content/research.ts` + `content/research/*.mdx` | Research index and posts |
| `content/contact.ts` | Contact page |
| `content/legal.ts` + `content/legal/*.mdx` | Legal pages |

In headlines, wrap the one key word in `*asterisks*` to color it purple: `"Rules over *mood*"`.

See **PLACEHOLDERS.md** for everything still to fill in.

## Design tokens

Colors, type scale and spacing are CSS variables at the top of `app/globals.css`, exposed to Tailwind (`bg-surface`, `text-heading`, `border-line`, `text-accent-light`, `font-display` …). Change a value there and it updates everywhere.

Accessibility rules baked into the tokens:

- `#8A1EF1` (`accent`) only appears as a button fill or on large text.
- Small purple text uses `#B946FB` (`accent-light`).
- The primary button hover is `#A030F5` (`accent-hover`). It's a lighter purple that keeps platinum text at AA contrast; `#B946FB` behind white text would fail.

## Structure

```
app/                 routes, metadata, sitemap, robots, OG image, API route
components/
  layout/            header (with mobile menu), footer, skip link
  brand/             wordmark
  ui/                buttons, cards, section header, stat, accordion, form field …
  art/               data-wave SVG, glow
  sections/          page sections (shared, home, how, signals, about, research, legal, contact)
content/             all copy (edit here)
hooks/               reveal-on-scroll, count-up, reduced motion, scroll state
lib/                 helpers (metadata, research loader, JSON-LD, wave math)
public/              brand/, media/, team/ (see the README in each)
```

## Deploy on Vercel

1. Push this branch and merge it into `main` (or deploy the branch as a preview first).
2. Go to [vercel.com/new](https://vercel.com/new), import the `ims` GitHub repository. Framework preset: **Next.js** (auto-detected). Leave the build settings at their defaults.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com` (no trailing slash). Without it the site falls back to the Vercel production URL.
   - `CONTACT_WEBHOOK_URL` = your form webhook (optional; see `app/api/contact/route.ts`).
4. Click **Deploy**.
5. Add your domain in **Project → Settings → Domains** and follow the DNS instructions. Then make sure `NEXT_PUBLIC_SITE_URL` matches it and redeploy.
6. After launch, submit `https://your-domain.com/sitemap.xml` in Google Search Console.

Every push to `main` deploys to production; every other branch gets a preview URL.
