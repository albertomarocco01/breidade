// Fotofolio — Giulia Breida's photography soul. Quiet, neutral, image-forward.
// IMPORTANT brand rule: the photography is shown with NO captions or titles.
// The `title` below is structural only (routing / SEO / aria) and must NEVER be
// rendered as a visible caption in the gallery — that rule is enforced by the
// Prompt 2 gallery component, not the data.
//
// Structural and language-neutral; any translatable surrounding copy (the series
// intro) lives in src/lib/i18n.ts.

export interface PhotoImage {
  /** image path — filled in Prompt 2 (public/ or src/assets) */
  src: string;
  /** alt text for accessibility — NOT a visible caption */
  alt?: string;
  width?: number;
  height?: number;
}

export interface Series {
  /** stable key, also used for i18n lookups */
  id: string;
  /** URL segment (reserved for Prompt 2 — no /fotofolio/[slug] route yet) */
  slug: string;
  /** structural proper-noun title — routing / SEO / aria only, never a caption */
  title: string;
  /** the photographs (empty placeholder for now; filled in Prompt 2) */
  images: PhotoImage[];
}

export const SERIES: Series[] = [
  {
    id: "hand-other-stories",
    slug: "hand-other-stories",
    title: "Hand other stories",
    // stories through the hands of people from different social backgrounds
    images: [], // TODO(Prompt 2): supply the photographs
  },
];

/** Lookup a series by slug (reserved for Prompt 2 routing). */
export function getSeries(slug: string): Series | undefined {
  return SERIES.find((s) => s.slug === slug);
}
