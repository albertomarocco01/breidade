import type { Metadata, Viewport } from "next";
import { Syne, Space_Mono, Permanent_Marker } from "next/font/google";
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

// --font-display — Syne: the quirky, expanded display grotesk that reads as
// "contemporary art portfolio". Drives oversized headlines, the wordmark, the
// world names on the gate. Variable family (400–800).
const display = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

// --font-text — Space Mono: the technical, zine-spec voice for meta, labels,
// nav, numbers and body. The cold counterweight to Syne's shout and the hand's
// warmth. Not a variable font, so weights are explicit.
const text = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-text",
});

// --font-hand — handwriting, the through-line of the grapholio world. PLACEHOLDER:
// Permanent Marker — a loud, characterful marker hand (deliberately NOT Caveat).
// It stands in for Giulia's own digitised handwriting, dropped in later via the
// commented localFont seam below.
const hand = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-hand",
});

/* SEAM — once src/assets/fonts/breida-hand.woff2 (Giulia's real hand) is supplied,
   replace the Permanent Marker placeholder above with the local font. next/font/local
   reads the file at BUILD time, so keep this commented until the woff2 exists or the
   build will fail.

   import localFont from "next/font/local";
   const hand = localFont({
     src: [{ path: "../assets/fonts/breida-hand.woff2", weight: "400", style: "normal" }],
     variable: "--font-hand",
     display: "swap",
     weight: "400",
     fallback: ["Permanent Marker", "cursive"],
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
  themeColor: "#f3efe4",
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
      className={`${display.variable} ${text.variable} ${hand.variable}`}
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
