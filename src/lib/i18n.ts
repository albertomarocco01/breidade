// Hand-rolled IT/EN localization. No i18n library, no [lang] routing, no
// middleware: the active locale is read from a `locale` cookie on the server
// (defaulting to Italian, the canonical language for this brand) and the matching
// dictionary is threaded to components as a prop.
//
// HARD CONTENT RULE: the only narrative copy on this site is Giulia's own scraped
// text. It is stored in ENGLISH (the form it was supplied in). Italian falls back
// to the English copy for content that has not been translated yet — we never
// invent Italian. Chrome / navigation / UI affordances stay IT-first.
//
// Proper nouns and brand tokens (Grapholio / Fotofolio, project titles, the email,
// the phone number, "Instagram", "LinkedIn", 設計師) stay untranslated on purpose.

import { cookies } from "next/headers";

export type Locale = "en" | "it";
export const DEFAULT_LOCALE: Locale = "it";

export interface Dictionary {
  nav: {
    skip: string;
    grapholio: string;
    fotofolio: string;
    about: string;
  };
  locale: {
    /** aria-label for the toggle group */
    label: string;
    /** spoken names for the two buttons */
    en: string;
    it: string;
  };
  gate: {
    enter: string;
    /** small "info / about" affordance inside the gate */
    info: string;
  };
  grapholio: {
    /** section landmark label */
    aria: string;
    /** discipline label (also the gate portal sublabel) */
    label: string;
  };
  fotofolio: {
    aria: string;
    label: string;
    /** the scraped series description — the ONLY fotofolio copy (EN in both) */
    intro: string;
    /** the series tagline, split for the "yet exposed" line-break emphasis (chrome) */
    tagline: { lead: string; emph: string; tail: string };
    /** affordance on the series cover/entry tile (UI chrome, IT-first) */
    enter: string;
  };
  /** fotofolio series ("story") page chrome — never captions on the photographs */
  story: {
    /** back to the photo wall */
    back: string;
    /** lightbox close */
    close: string;
    /** lightbox previous / next frame (spoken labels) */
    prev: string;
    next: string;
    /** spoken label for opening a photo full-frame */
    zoom: string;
  };
  /** grapholio case-study chrome */
  project: {
    back: string;
    brief: string;
    /** stand-in note where real spreads will go */
    soon: string;
    next: string;
    prev: string;
  };
  about: {
    label: string;
    /** Giulia's verbatim scraped bio (EN in both) */
    bio: string;
    contact: string;
    /** literal gloss of the 設計師 motif */
    designer: string;
  };
  footer: {
    rights: string;
    instagram: string;
    linkedin: string;
  };
}

// ---- scraped, English-only content (reused by both locales) ----
const SCRAPED = {
  // Fotofolio series "Hand other stories" — the only text near the photographs.
  fotofolioIntro:
    "A collection of images that tells stories through the hand of people with different social backgrounds.",
  // The series' own tagline (Giulia's copy). Shown only as page chrome on the
  // story page — never as a caption on a photo. Split so "yet exposed" can be
  // isolated on its own line for emphasis, exactly as on the source site.
  fotofolioTagline: {
    lead: "Visual project about the most intimate,",
    emph: "yet exposed",
    tail: "part of our body: the Hands.",
  },
  // About — Giulia's bio, verbatim.
  aboutBio:
    "Giulia Breida, 2001, I am an italian graphic designer and photographer, with a passion for China and eastern cultures. Currently working in the marketing field, I create visual projects from ideas with a fresh, bold and colorful style.",
} as const;

const en: Dictionary = {
  nav: {
    skip: "skip to content",
    grapholio: "grapholio",
    fotofolio: "fotofolio",
    about: "about",
  },
  locale: {
    label: "language",
    en: "English",
    it: "Italian",
  },
  gate: {
    enter: "enter",
    info: "info",
  },
  grapholio: {
    aria: "Grapholio — graphic design",
    label: "graphic design",
  },
  fotofolio: {
    aria: "Fotofolio — photography",
    label: "photography",
    intro: SCRAPED.fotofolioIntro,
    tagline: SCRAPED.fotofolioTagline,
    enter: "view the series",
  },
  story: {
    back: "all photographs",
    close: "close",
    prev: "previous",
    next: "next",
    zoom: "view full frame",
  },
  project: {
    back: "all projects",
    brief: "the project",
    soon: "spreads coming soon",
    next: "next project",
    prev: "previous project",
  },
  about: {
    label: "about",
    bio: SCRAPED.aboutBio,
    contact: "contact",
    designer: "the designer",
  },
  footer: {
    rights: "all rights reserved",
    instagram: "Instagram",
    linkedin: "LinkedIn",
  },
};

const it: Dictionary = {
  nav: {
    skip: "vai al contenuto",
    grapholio: "grapholio",
    fotofolio: "fotofolio",
    about: "about",
  },
  locale: {
    label: "lingua",
    en: "Inglese",
    it: "Italiano",
  },
  gate: {
    enter: "entra",
    info: "info",
  },
  grapholio: {
    aria: "Grapholio — progettazione grafica",
    label: "progettazione grafica",
  },
  fotofolio: {
    aria: "Fotofolio — fotografia",
    label: "fotografia",
    // IT falls back to the EN scraped copy until translated — never invented.
    intro: SCRAPED.fotofolioIntro,
    // Scraped tagline reused verbatim (proper copy) — chrome only, never invented.
    tagline: SCRAPED.fotofolioTagline,
    enter: "guarda la serie",
  },
  story: {
    back: "tutte le foto",
    close: "chiudi",
    prev: "precedente",
    next: "successiva",
    zoom: "guarda a tutto schermo",
  },
  project: {
    back: "tutti i progetti",
    brief: "il progetto",
    soon: "tavole in arrivo",
    next: "progetto successivo",
    prev: "progetto precedente",
  },
  about: {
    label: "info",
    // IT falls back to the EN scraped bio until translated — never invented.
    bio: SCRAPED.aboutBio,
    contact: "contatti",
    designer: "la designer",
  },
  footer: {
    rights: "tutti i diritti riservati",
    instagram: "Instagram",
    linkedin: "LinkedIn",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, it };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "it";
}

/**
 * Read the active locale from the `locale` cookie, validated against the
 * supported set and falling back to {@link DEFAULT_LOCALE}. Awaiting `cookies()`
 * (async in Next 16) opts the route into dynamic rendering — expected here.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get("locale")?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

// ---- Language-neutral contact / brand constants (proper nouns; not translated) ----

export const CONTACT = {
  name: "Giulia Breida",
  born: 2001,
  role: "graphic designer & photographer",
  location: "Torino, Italy",
  email: "giulia.breida@gmail.com",
  phone: "(+39) 3518172634",
  phoneHref: "tel:+393518172634",
  instagram: "https://www.instagram.com/breidade/",
  linkedin: "https://www.linkedin.com/in/giulia-breida/",
} as const;

/** Client components import this TYPE only (CONTACT is passed down as a prop) so
 *  they never pull this module's `next/headers` import into the browser bundle. */
export type Contact = typeof CONTACT;

/** "設計師" — "designer". A subtle bilingual flourish (Giulia's love of China). */
export const HANZI = "設計師";
