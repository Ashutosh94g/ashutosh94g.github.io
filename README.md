# ashutosh94g.github.io

Source for [ashutosh94g.github.io](https://ashutosh94g.github.io/) — Ashutosh Modi's portfolio and case studies.

Built with [Astro](https://astro.build/) + MDX + Tailwind CSS, deployed to GitHub Pages via Actions.

## Stack

- **Astro 6** — static site generator, content collections.
- **MDX** — case studies are MDX so they can interleave prose, code, and the occasional Mermaid diagram.
- **Tailwind CSS 4** — design system, dark mode via `prefers-color-scheme` + persisted toggle.
- **astro-expressive-code** — code blocks with copy button, line highlighting, GitHub light/dark themes.
- **Mermaid** — architecture diagrams, dynamically imported only on pages that need them.
- **Fontsource** — Inter, Source Serif 4, JetBrains Mono served from the same origin (no CDN).
- **GitHub Pages + Actions** — automatic deploy on push to `main`.

## Run locally

```bash
npm install
npm run dev
```

Dev server runs at [http://localhost:4321](http://localhost:4321) with hot reload.

## Build

```bash
npm run build       # outputs to dist/
npm run preview     # preview the production build locally
```

## Add a new case study

Drop an MDX file into `src/content/case-studies/`:

```mdx
---
title: "Some new case study"
summary: "One-line summary that shows up on the card and in the page hero."
role: "Your role on the project"
dates: "Mon YYYY – Mon YYYY"
tags: ["tag-one", "tag-two"]
order: 4
featured: false
accent: "indigo"   # indigo | amber | emerald
diagram: "none"    # or "mermaid-tuxedo" / register a new key in CaseStudyLayout
---

import CaseStudyLayout from '@layouts/CaseStudyLayout.astro';

Body content here…
```

The frontmatter schema lives in [`src/content.config.ts`](./src/content.config.ts) — extend it there if you add new fields. The dynamic route at [`src/pages/case-studies/[...slug].astro`](./src/pages/case-studies/%5B...slug%5D.astro) picks up new files automatically.

## Add a writing post

Same idea, but in `src/content/writing/` with this frontmatter:

```yaml
title: "Post title"
summary: "Why someone would click this."
pubDate: 2026-04-26
tags: ["tag-one"]
draft: false
```

The list page at `/writing/` will render it automatically. `draft: true` excludes it from production builds.

## Sync the resume PDF

The portfolio serves `/resume.pdf` straight from the repo. To keep it in sync with the latest compile from `c:\Users\modia\Resume\resume.pdf`:

```bash
npm run resume:sync
```

This runs [`scripts/sync-resume.mjs`](./scripts/sync-resume.mjs), which copies the source PDF into `public/resume.pdf` and reports the size change. The script exits successfully even when the source is missing, so CI never breaks because the resume folder isn't checked out.

Override the source path with `RESUME_SRC`:

```bash
RESUME_SRC=/some/other/path/resume.pdf npm run resume:sync
```

After syncing, commit the updated `public/resume.pdf` so the deployed site picks it up on the next push.

## Rebuild the OpenGraph image

```bash
npm run og:build
```

Renders `public/og/default.png` (1200×630) from the SVG template in [`scripts/build-og.mjs`](./scripts/build-og.mjs) using `@resvg/resvg-js`. Re-run whenever the headline, name, or tagline changes.

## Deploy

Pushing to `main` triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. `actions/checkout@v4`
2. `actions/setup-node@v4` (Node 22)
3. `npm ci`
4. `npm run build`
5. `actions/upload-pages-artifact@v3` from `dist/`
6. `actions/deploy-pages@v4`

GitHub Pages source is set to **GitHub Actions** (not the legacy branch build). The site URL in [`astro.config.mjs`](./astro.config.mjs) is `https://ashutosh94g.github.io` — update it (and add `public/CNAME`) if a custom domain is wired in.

## Project layout

```
website/
├── astro.config.mjs           # Astro + integrations + Tailwind via Vite
├── tsconfig.json              # strict TS, path aliases (@components, @layouts, @content)
├── package.json
├── public/                    # static assets, served as-is
│   ├── resume.pdf             # synced from c:\Users\modia\Resume\resume.pdf
│   ├── favicon.svg
│   ├── robots.txt
│   └── og/default.png
├── scripts/
│   ├── sync-resume.mjs        # npm run resume:sync
│   └── build-og.mjs           # npm run og:build
├── src/
│   ├── content.config.ts      # typed content collection schema
│   ├── content/
│   │   ├── case-studies/      # MDX case studies
│   │   └── writing/           # MDX posts (empty in v1)
│   ├── components/            # Hero, CaseStudyCard, Mermaid, Nav, Footer, ThemeToggle, JsonLd
│   ├── layouts/               # BaseLayout, CaseStudyLayout
│   ├── pages/                 # routes
│   ├── diagrams/              # Mermaid diagram source
│   └── styles/global.css      # Tailwind base + theme tokens + prose tweaks
└── .github/workflows/deploy.yml
```

## SEO and accessibility

- Per-page `<title>`, `description`, canonical URL, OpenGraph + Twitter cards (1200×630), `theme-color` for both light and dark.
- JSON-LD `Person` and `WebSite` schemas on the home page; `TechArticle` schema on each case study.
- Sitemap at `/sitemap-index.xml` (via `@astrojs/sitemap`) and a `robots.txt` pointing to it.
- Semantic landmarks (`header`, `main`, `footer`), skip-to-content link, keyboard-navigable nav, `prefers-reduced-motion` respected, `alt` text on every image.

## Deferred follow-ups

- **Custom domain** — drop `public/CNAME` with the chosen domain (e.g. `ashutoshmodi.dev`) and update `site` in `astro.config.mjs`. HTTPS auto-provisions.
- **Analytics** — Plausible / Cloudflare Web Analytics / GoatCounter all work as a single `<script>` in `BaseLayout.astro`. None are wired up yet.
- **Blog content** — `/writing/` is structurally ready; just drop MDX files into `src/content/writing/`.
- **RSS feed** — easy to add via `@astrojs/rss` once `/writing/` has posts.
- **`/now` page** — nice-to-have, not in v1.

## License

The code in this repo is MIT-licensed. The written content (case studies, resume, blog posts) is © Ashutosh Modi — please don't republish without permission.
