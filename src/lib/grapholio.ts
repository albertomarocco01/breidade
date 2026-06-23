// Grapholio — Giulia Breida's graphic-design soul. Bold, colourful, Gen-Z.
// Each project carries a handwritten title (--font-hand) and a vivid per-project
// accent that floods the loud grapholio world. The mosaic uses `size` to compose
// an asymmetric, hand-placed wall; the case-study page uses year / role / tagline.
//
// This file is the content source. Discipline labels (category, role) are kept as
// international design jargon, as in any Italian studio. Narrative copy that must
// read Italian-first lives bilingually in `tagline` ({ it, en }).

import type { Locale } from "@/lib/i18n";

/** Mosaic footprint hint — drives the asymmetric grapholio wall. */
export type ProjectSize = "sm" | "md" | "lg";

export interface Project {
  /** stable key, also used for the accent + i18n lookups */
  id: string;
  /** URL segment under /grapholio/<slug> */
  slug: string;
  /** handwritten display title (rendered in --font-hand) */
  title: string;
  /** design discipline label (headline) */
  category: string;
  /** finer discipline tags for the case-study spec line */
  role: string;
  /** year of the work */
  year: number;
  /** vivid accent hex — the protagonist colour for this project */
  accent: string;
  /** a second hex, used to build the generative gradient field / stand-in cover */
  accent2: string;
  /** one-line story, Italian-first + English (case study + mosaic) */
  tagline: { it: string; en: string };
  /** mosaic footprint */
  size: ProjectSize;
  /** cover image path (supplied later; the gradient field is the stand-in) */
  cover?: string;
  /** gallery image paths (supplied later; gradient plates are the stand-ins) */
  gallery?: string[];
}

// Display order matches the brief (1 → 9).
export const PROJECTS: Project[] = [
  {
    id: "boem",
    slug: "boem",
    title: "Boem",
    category: "Pack Design",
    role: "identity · packaging · art direction",
    year: 2024,
    accent: "#ff2d6f",
    accent2: "#ffd400",
    size: "lg",
    tagline: {
      it: "Packaging che urla — colore, energia e attitudine Gen-Z.",
      en: "Packaging that shouts — colour, energy and Gen-Z attitude.",
    },
  },
  {
    id: "ancona",
    slug: "ancona",
    title: "Ancora, Ancona",
    category: "City Brand",
    role: "identity · city brand",
    year: 2023,
    accent: "#1ca7ec",
    accent2: "#1b43ff",
    size: "md",
    tagline: {
      it: "Un'identità legata al mare e alla vita lenta del lungomare.",
      en: "An identity tied to the sea and slow waterfront life.",
    },
  },
  {
    id: "flashback",
    slug: "flashback",
    title: "Flashback",
    category: "Wayfinding",
    role: "signage · wayfinding system",
    year: 2023,
    accent: "#ffb400",
    accent2: "#ff2d6f",
    size: "sm",
    tagline: {
      it: "Un ex orfanotrofio rinato come spazio culturale: segni e segnali.",
      en: "An ex-orphanage reborn as a cultural space: signs and signals.",
    },
  },
  {
    id: "notala",
    slug: "notala",
    title: "NotaLa",
    category: "Brand Design",
    role: "identity · brand",
    year: 2024,
    accent: "#7c4dff",
    accent2: "#00d6c2",
    size: "md",
    tagline: {
      it: "Cabine telefoniche abbandonate trasformate in micro spazi d'arte.",
      en: "Abandoned phone booths turned into micro art spaces.",
    },
  },
  {
    id: "durex",
    slug: "durex",
    title: "Durex",
    category: "ADV",
    role: "art direction · print adv",
    year: 2022,
    accent: "#2d5bff",
    accent2: "#ff2d6f",
    size: "sm",
    tagline: {
      it: "Advertising stampato, ironico e diretto.",
      en: "Print advertising — ironic and direct.",
    },
  },
  {
    id: "sanbaudia",
    slug: "sanbaudia",
    title: "Sanbaudia",
    category: "Editorial",
    role: "editorial · art direction",
    year: 2024,
    accent: "#e84393",
    accent2: "#ffd400",
    size: "lg",
    tagline: {
      it: "Un editoriale pop sulle chiese e i luoghi sacri di Torino.",
      en: "A pop editorial on Torino's churches and holy places.",
    },
  },
  {
    id: "kombat-xxv",
    slug: "kombat-xxv",
    title: "Kombat XXV",
    category: "Graphics",
    role: "graphics · art direction",
    year: 2023,
    accent: "#ff6b00",
    accent2: "#0a0a0a",
    size: "md",
    tagline: {
      it: "Il 25° anniversario di Kombat, firmato Kappa.",
      en: "Kombat's 25th anniversary, by Kappa.",
    },
  },
  {
    id: "kappa-futur",
    slug: "kappa-futur",
    title: "Kappa Futur",
    category: "Graphics",
    role: "graphics · festival identity",
    year: 2025,
    accent: "#00e5ff",
    accent2: "#1b43ff",
    size: "sm",
    tagline: {
      it: "Festival techno: «il futuro è a Torino».",
      en: "A techno festival — 'the futur is in Torino'.",
    },
  },
  {
    id: "kappa-433",
    slug: "kappa-433",
    title: "Kappa x 433",
    category: "Pack Design",
    role: "packaging · graphics",
    year: 2024,
    accent: "#00c853",
    accent2: "#0a0a0a",
    size: "md",
    tagline: {
      it: "La collab calcistica Kappa × 433.",
      en: "The Kappa × 433 football collab.",
    },
  },
];

/** Lookup a project by its URL slug (used by /grapholio/[slug]). */
export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** All slugs — feeds generateStaticParams for the project routes. */
export function projectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

/** Index in display order (1-based) — the big mosaic / case-study number. */
export function projectNumber(slug: string): number {
  return PROJECTS.findIndex((p) => p.slug === slug) + 1;
}

/** Neighbouring projects for prev/next case-study nav (wraps around). */
export function projectNeighbours(slug: string): { prev: Project; next: Project } {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const len = PROJECTS.length;
  return {
    prev: PROJECTS[(i - 1 + len) % len],
    next: PROJECTS[(i + 1) % len],
  };
}

/** Pick the locale-appropriate tagline. */
export function tagline(project: Project, locale: Locale): string {
  return project.tagline[locale];
}
