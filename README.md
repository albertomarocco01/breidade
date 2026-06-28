# Breidade — Giulia Breida portfolio

Portfolio site for **Giulia Breida**, graphic designer & photographer (Torino, IT).
One opinionated art direction — _"due anime"_ (two souls): **Grapholio** (graphic
design, loud) and **Fotofolio** (photography, quiet) — entered through a split
**Gate**.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **GSAP** + `@gsap/react` — entrance & scroll motion
- **Lenis** — smooth scroll, driven by the GSAP ticker
- **three / @react-three/fiber / @react-three/drei** — installed for the WebGL
  accent field, currently **staged, not yet wired** (`src/components/canvas/`,
  `FieldMount` renders `null`)
- **@vercel/analytics**
- Authored CSS only — no Tailwind, no CSS-in-JS. Split partials in `src/styles/`,
  imported in cascade order by `src/app/globals.css` (order is load-bearing).

> ⚠️ **This is not the public Next.js.** This project tracks a build of Next with
> breaking changes vs. what you may know (e.g. `error.tsx` receives
> `unstable_retry`, not `reset`). Before writing framework code, read the bundled
> guides in `node_modules/next/dist/docs/`. See [`AGENTS.md`](./AGENTS.md).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Scripts:

```bash
npm run dev      # dev server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Routes

| Route                                | Description                                          |
| ------------------------------------ | ---------------------------------------------------- |
| `/`                                  | The Gate — split landing into the two souls          |
| `/grapholio` · `/grapholio/[slug]`   | Design gallery + case studies                        |
| `/fotofolio` · `/fotofolio/[slug]`   | Photo mosaic + series "story" page with lightbox     |
| `/about`                             | Bio + contact spec sheet                             |

Project & series content lives in [`src/lib/grapholio.ts`](src/lib/grapholio.ts)
and [`src/lib/fotofolio.ts`](src/lib/fotofolio.ts); their slugs feed
`generateStaticParams`, the sitemap and robots. Unknown slugs 404 via the shared
`not-found` page (`dynamicParams = false`).

## Internationalization

Hand-rolled IT/EN — no i18n library, no `[lang]` routing, no middleware. The active
locale is read from a `locale` cookie **per request** ([`src/lib/i18n.ts`](src/lib/i18n.ts),
default **English**) and the matching dictionary is threaded to components as a
prop. `LocaleToggle` writes the cookie and calls `router.refresh()`.

> Because `getLocale()` reads the cookie via `connection()`, the whole site is
> rendered **dynamically per request** (no static caching), by design.

## Project structure

```
src/
  app/         routes, layouts, SEO (sitemap/robots/og), not-found/error/loading
  components/  chrome (topbar/footer/cursor/…), gate, grapholio, fotofolio, canvas
  lib/         i18n, project/series data, motion helpers
  styles/      authored CSS partials (imported by app/globals.css)
  assets/      fonts, project covers, photographs
```

## Accessibility & motion

Every animation is gated behind `prefers-reduced-motion`; the custom cursor and
smooth scroll fall back to native behaviour on touch / reduced-motion. The
fotofolio lightbox is focus-trapped with full keyboard support (Esc / ← → / Tab).

## Deployment

Optimized for Vercel. Real project covers and photographs drop in by swapping the
imports in `src/lib/*` (and Giulia's digitised hand font via the documented seam in
[`src/app/layout.tsx`](src/app/layout.tsx)).
