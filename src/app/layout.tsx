import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Caveat } from "next/font/google";
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

// --font-display — bold variable grotesk. Drives display headings & the topbar.
const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

// --font-hand — handwriting. PLACEHOLDER: Giulia's real handwriting font
// (breida-hand.woff2, via Calligraphr) does not exist yet, so we gracefully fall
// back to the Caveat script Google font for now.
const hand = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hand",
});

/* TODO(Prompt 2): once src/assets/fonts/breida-hand.woff2 is supplied, replace
   the Caveat placeholder above with the real local font. next/font/local reads
   the file at BUILD time, so DO NOT enable this block until the woff2 exists or
   the build will fail.

   import localFont from "next/font/local";
   const hand = localFont({
     src: [{ path: "../assets/fonts/breida-hand.woff2", weight: "400", style: "normal" }],
     variable: "--font-hand",
     display: "swap",
     weight: "400",
     fallback: ["Caveat", "cursive"],
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
  themeColor: "#f4f1ea",
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
    <html lang={locale} className={`${display.variable} ${hand.variable}`}>
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
