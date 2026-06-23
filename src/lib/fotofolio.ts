// Fotofolio — Giulia Breida's photography soul. Quiet, neutral, image-forward.
// HARD brand rule: the photography is shown with NO captions or titles, and NO
// text on or around the images, ever. The series `title` is structural only
// (routing / SEO / aria) and must NEVER be rendered as a visible caption.
//
// The only fotofolio copy is the series description, which lives in src/lib/i18n.ts
// (scraped, EN) and is rendered as page chrome ABOVE the mosaic — never near a frame.

// Local placeholder photos (src/assets) — text-free "developing" frames. Giulia's
// real prints drop in by swapping these imports (or the files on disk).
import h1 from "@/assets/fotofolio/hand-1.svg";
import h2 from "@/assets/fotofolio/hand-2.svg";
import h3 from "@/assets/fotofolio/hand-3.svg";
import h4 from "@/assets/fotofolio/hand-4.svg";
import h5 from "@/assets/fotofolio/hand-5.svg";
import h6 from "@/assets/fotofolio/hand-6.svg";
import h7 from "@/assets/fotofolio/hand-7.svg";
import h8 from "@/assets/fotofolio/hand-8.svg";
import h9 from "@/assets/fotofolio/hand-9.svg";

/** Mosaic footprint hint — drives the asymmetric, art-directed photo wall. */
export type FrameShape = "is-portrait" | "is-land" | "is-sq";

export interface PhotoImage {
  /** image source (local placeholder for now; real print drops in here) */
  src: unknown;
  /** mosaic footprint */
  shape: FrameShape;
}

export interface Series {
  /** stable key, also used for i18n lookups */
  id: string;
  /** URL segment (reserved — no /fotofolio/[slug] route yet) */
  slug: string;
  /** structural proper-noun title — routing / SEO / aria only, NEVER a caption */
  title: string;
  /** the photographs (text-free placeholders for now) */
  images: PhotoImage[];
}

export const SERIES: Series[] = [
  {
    id: "hand-other-stories",
    slug: "hand-other-stories",
    // "Hand other stories" — stories through the hands of people from different
    // social backgrounds. Structural title; the visible description is in i18n.
    title: "Hand other stories",
    images: [
      { src: h1, shape: "is-portrait" },
      { src: h2, shape: "is-sq" },
      { src: h3, shape: "is-portrait" },
      { src: h4, shape: "is-land" },
      { src: h5, shape: "is-portrait" },
      { src: h6, shape: "is-sq" },
      { src: h7, shape: "is-land" },
      { src: h8, shape: "is-portrait" },
      { src: h9, shape: "is-sq" },
    ],
  },
];

/** The primary series — the only one for now. */
export const MAIN_SERIES = SERIES[0];

/** Lookup a series by slug (reserved for future routing). */
export function getSeries(slug: string): Series | undefined {
  return SERIES.find((s) => s.slug === slug);
}
