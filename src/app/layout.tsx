import type { Metadata, Viewport } from "next";
import {
  Syne,
  Italiana,
  JetBrains_Mono,
  La_Belle_Aurore,
  Reenie_Beanie,
  Jost,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { AppProvider } from "@/components/providers/AppProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Glow } from "@/components/chrome/Glow";
import { Grain } from "@/components/chrome/Grain";
import { Cursor } from "@/components/chrome/Cursor";
import { Shell } from "@/components/chrome/Shell";
import { FieldMount } from "@/components/canvas/FieldMount";
import { CONTACT, getDictionary, getLocale } from "@/lib/i18n";

// The approved type system (ported from the Google AI Studio look).
// --font-display — Syne: the expanded display grotesk. The shout: world names on
// the gate, the wordmark, oversized headlines. Variable family (400–800).
const display = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

// --font-geo — Jost: the classic GEOMETRIC brand voice for GRAPHOLIO (a free,
// metrically close stand-in for Futura). Carries the Grapholio wordmark + section
// headings; scoped to the grapholio world via --stack-geo (tokens.css). Variable
// family, so weight 800 (the wordmark) needs no extra request.
const geo = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geo",
});

// --font-serif — Italiana: the high-contrast editorial serif. The quiet,
// art-direction voice — the photographic (fotofolio) soul and bios.
const serif = Italiana({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-serif",
});

// --font-mono — JetBrains Mono: the technical, zine-spec voice for meta, labels,
// nav, numbers and small print. Variable family.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// --font-hand — La Belle Aurore: the primary handwriting, the through-line of the
// grapholio world (project titles). PLACEHOLDER for Giulia's own digitised hand,
// dropped in later via the commented localFont seam below. (Caveat is explicitly
// NOT used.)
const hand = La_Belle_Aurore({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-hand",
  // PERF: the hand fonts are NOT used on the gate (home) — La Belle Aurore only
  // appears on grapholio/about project titles. Skipping preload keeps them off the
  // home's critical path; with preload:false a font is fetched only when an element
  // actually renders it (a brief swap on the secondary pages, which is acceptable
  // for decorative titles), instead of competing for bandwidth on first paint.
  preload: false,
});

// --font-hand2 — Reenie Beanie: the secondary hand for looser annotations / glosses.
const hand2 = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-hand2",
  // PERF: currently no rendered element uses .hand2, so with preload:false this
  // font is never downloaded at all (kept declared as the documented seam).
  preload: false,
});

/* SEAM — once src/assets/fonts/breida-hand.woff2 (Giulia's real hand) is supplied,
   replace the La Belle Aurore placeholder above with the local font. next/font/local
   reads the file at BUILD time, so keep this commented until the woff2 exists or the
   build will fail.

   import localFont from "next/font/local";
   const hand = localFont({
     src: [{ path: "../assets/fonts/breida-hand.woff2", weight: "400", style: "normal" }],
     variable: "--font-hand",
     display: "swap",
     weight: "400",
     fallback: ["La Belle Aurore", "cursive"],
     adjustFontFallback: "Arial", // 'Arial' | 'Times New Roman' | false
   });
*/

const SITE = "https://breidade.com";
const DESCRIPTION =
  "Portfolio di Giulia Breida — graphic designer e fotografa a Torino. Progettazione grafica fresca, audace e colorata (Grapholio) e fotografia (Fotofolio). · Portfolio of Giulia Breida — graphic designer & photographer in Turin.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Giulia Breida — Graphic Designer & Photographer",
    template: "%s — Giulia Breida",
  },
  description: DESCRIPTION,
  applicationName: "Giulia Breida",
  authors: [{ name: "Giulia Breida", url: SITE }],
  creator: "Giulia Breida",
  keywords: [
    "Giulia Breida",
    "graphic designer",
    "graphic design",
    "fotografa",
    "photographer",
    "Torino",
    "Turin",
    "grapholio",
    "fotofolio",
    "brand design",
    "packaging design",
    "editorial design",
    "Italy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_US"],
    url: SITE,
    siteName: "Giulia Breida",
    title: "Giulia Breida — Graphic Designer & Photographer",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Giulia Breida — Graphic Designer & Photographer",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// Next 16: themeColor / colorScheme / scaling live on `viewport`, NOT `metadata`.
export const viewport: Viewport = {
  themeColor: "#FCFAF2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return (
    <html
      lang={locale}
      className={`${display.variable} ${geo.variable} ${serif.variable} ${mono.variable} ${hand.variable} ${hand2.variable}`}
    >
      <body>
        <AppProvider>
          <Glow />
          {/* Prompt 2 seam — renders null for now. */}
          <FieldMount />
          <SmoothScroll>
            <Shell dict={dict} locale={locale} contact={CONTACT}>
              {children}
            </Shell>
          </SmoothScroll>
          <Grain />
          <Cursor />
        </AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
