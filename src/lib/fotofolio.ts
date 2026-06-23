// Fotofolio — Giulia Breida's photography soul. Quiet, neutral, image-forward.
// HARD brand rule: the photography is shown with NO captions or titles, and NO
// text on or around the images, ever. The series `title` is structural only
// (routing / SEO / aria) and must NEVER be rendered as a visible caption on a
// photograph. The ONLY exception is the deliberate series COVER / entry tile and
// page chrome (hero, scraped tagline, prev/next) — those are navigation, not a
// caption sitting on a bare gallery photo.
//
// The only fotofolio narrative copy (the series description + tagline) lives in
// src/lib/i18n.ts (scraped, EN) and is rendered as page chrome — never near a frame.

import type { StaticImageData } from "next/image";

// Giulia's real "Hand other stories" prints (B&W hand studies). They drop in by
// swapping these imports (or the files on disk). next/image gets width/height +
// a blur placeholder for free from the static import.
import glass from "@/assets/fotofolio/story-glass.webp";
import face from "@/assets/fotofolio/story-face.webp";
import torso from "@/assets/fotofolio/story-torso.webp";

/** Mosaic footprint hint — drives the asymmetric, art-directed photo wall. */
export type FrameShape = "is-portrait" | "is-land" | "is-sq";

export interface PhotoImage {
  /** image source (real print, static import) */
  src: StaticImageData;
  /** mosaic footprint on the /fotofolio wall */
  shape: FrameShape;
}

export interface Series {
  /** stable key, also used for i18n lookups */
  id: string;
  /** URL segment under /fotofolio/<slug> */
  slug: string;
  /** structural proper-noun title — routing / SEO / aria + the cover/hero, NEVER a caption on a bare photo */
  title: string;
  /** the cover photograph for the entry tile (a deliberate portal, not a gallery frame) */
  cover: StaticImageData;
  /** the photographs (text-free, shown bare in the gallery) */
  images: PhotoImage[];
}

export const SERIES: Series[] = [
  {
    id: "hand-other-stories",
    slug: "hand-other-stories",
    // "Hand other stories" — stories through the hands of people from different
    // social backgrounds. Structural title; the visible copy lives in i18n.
    title: "Hand other stories",
    cover: torso,
    images: [
      { src: glass, shape: "is-land" },
      { src: face, shape: "is-land" },
      { src: torso, shape: "is-land" },
    ],
  },
];

/** The primary series — the only one for now. */
export const MAIN_SERIES = SERIES[0];

/** Lookup a series by slug (used by /fotofolio/[slug]). */
export function getSeries(slug: string): Series | undefined {
  return SERIES.find((s) => s.slug === slug);
}

/** All slugs — feeds generateStaticParams for the series routes. */
export function seriesSlugs(): string[] {
  return SERIES.map((s) => s.slug);
}
