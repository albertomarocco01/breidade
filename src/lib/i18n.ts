// Hand-rolled IT/EN localization — ported from the reference architecture.
// No i18n library, no [lang] routing, no middleware: the active locale is read
// from a `locale` cookie on the server (defaulting to Italian, the canonical
// language for this brand) and the matching dictionary is threaded to components
// as a prop. Proper nouns and brand tokens (the names Grapholio / Fotofolio, the
// project titles, "Instagram", "LinkedIn", the email, the phone number, 設計師)
// stay untranslated on purpose.

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
    eyebrow: string;
    tagline: string;
    enter: string;
    /** aria-label for the two "doors" into the two souls */
    doors: string;
  };
  grapholio: {
    /** section landmark label */
    aria: string;
    label: string;
    intro: string;
  };
  fotofolio: {
    aria: string;
    label: string;
    intro: string;
  };
  about: {
    label: string;
    lede: string;
    bio: string;
    contact: string;
  };
  footer: {
    rights: string;
    instagram: string;
    linkedin: string;
  };
}

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
    eyebrow: "graphic designer & photographer · torino",
    tagline: "fresh, bold and colorful",
    enter: "enter",
    doors: "choose a world",
  },
  grapholio: {
    aria: "Grapholio — graphic design",
    label: "graphic design",
    intro:
      "Graphic design with attitude — identity, packaging, editorial and wayfinding, each project carrying its own handwritten title.",
  },
  fotofolio: {
    aria: "Fotofolio — photography",
    label: "photography",
    intro:
      "Stories told through the hands of people from different social backgrounds. No captions, no titles — only the images.",
  },
  about: {
    label: "about",
    lede: "Giulia Breida — graphic designer & photographer, born 2001 in Torino.",
    bio: "Italian designer and photographer working fresh, bold and colorful, with a long-running fascination for China and eastern cultures. Two souls: Grapholio for graphic design, Fotofolio for photography.",
    contact: "contact",
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
    about: "info",
  },
  locale: {
    label: "lingua",
    en: "Inglese",
    it: "Italiano",
  },
  gate: {
    eyebrow: "graphic designer & fotografa · torino",
    tagline: "fresca, audace e colorata",
    enter: "entra",
    doors: "scegli un mondo",
  },
  grapholio: {
    aria: "Grapholio — progettazione grafica",
    label: "progettazione grafica",
    intro:
      "Progettazione grafica con attitudine — identità, packaging, editoria e segnaletica, ogni progetto con il suo titolo scritto a mano.",
  },
  fotofolio: {
    aria: "Fotofolio — fotografia",
    label: "fotografia",
    intro:
      "Storie raccontate attraverso le mani di persone di diversa estrazione sociale. Niente didascalie, niente titoli — solo le immagini.",
  },
  about: {
    label: "info",
    lede: "Giulia Breida — graphic designer e fotografa, classe 2001, Torino.",
    bio: "Designer e fotografa italiana dal segno fresco, audace e colorato, con una lunga passione per la Cina e le culture orientali. Due anime: Grapholio per la grafica, Fotofolio per la fotografia.",
    contact: "contatti",
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
  phone: "+39 351 817 2634",
  phoneHref: "tel:+393518172634",
  // TODO: confirm the real handles before launch.
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
} as const;

/** Client components import this TYPE only (CONTACT is passed down as a prop) so
 *  they never pull this module's `next/headers` import into the browser bundle. */
export type Contact = typeof CONTACT;

/** "設計師" — "designer". A subtle bilingual flourish (Giulia's love of China). */
export const HANZI = "設計師";
