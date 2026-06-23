# Fonts — placeholder

## `breida-hand.woff2` (to be supplied)

This is the home for **`breida-hand.woff2`** — Giulia Breida's own handwriting,
to be digitised with [Calligraphr](https://www.calligraphr.com/) and dropped in
here.

Until that file exists, `--font-hand` is served by the **Caveat** Google font as
a graceful placeholder (see `src/app/layout.tsx`).

### Wiring it up (Prompt 2)

`next/font/local` reads the font file at **build time**, so the real font must
be present before you enable it or the build will fail. Once
`breida-hand.woff2` is in this folder, replace the Caveat placeholder in
`src/app/layout.tsx` with the commented `localFont({ … })` block already prepared
there:

```ts
import localFont from "next/font/local";

const hand = localFont({
  src: [{ path: "../assets/fonts/breida-hand.woff2", weight: "400", style: "normal" }],
  variable: "--font-hand",
  display: "swap",
  weight: "400",
  fallback: ["Caveat", "cursive"],
  adjustFontFallback: "Arial", // 'Arial' | 'Times New Roman' | false
});
```

No CSS change is needed — `--font-hand` / the `.hand` utility already consume it.
