# Missing information

What's still left for Hunter to supply. Copy lives in `content/`; edit the file listed, save and redeploy.

- A `[TODO: ...]` in visible copy shows on the page as-is, so gaps are easy to spot.
- Stats stay hidden until a real value replaces `null`. Social links stay hidden until a real URL is set.
- Photos show a labeled slot until a file is added and its path is set.

Find them all: `git grep -n "TODO"`

## Shown on the live site

| What | Where |
|---|---|
| Founder one-line bios and bios (also on the home page) | `content/about.ts` (`founders`) |
| Founder photos | Add `public/team/hunter.jpg` and `aaron.jpg`, then set `photo` in `content/about.ts` |
| About page timeline: years, milestones, launch details, photos | `content/about.ts` (`timeline`) |

## Code comments only (not visible)

| What | Where |
|---|---|
| What the Portfolio Signal measures; BTC DCA Signal, TPI and IA descriptions | `content/signals.ts` (`signalCatalog`, `TODO(Hunter)` comments) |
| Real, verifiable stats (hidden until set; no performance numbers) | `content/home.ts` (`stats`) |
| X, YouTube, Instagram links (hidden until set) | `content/site.ts` (`socials`) |

## Logo

The share image is generated from the brand styles in `app/opengraph-image.tsx`. When a logo exists, put it at `public/brand/logo.svg` and set `logoSrc` in `content/site.ts`.
