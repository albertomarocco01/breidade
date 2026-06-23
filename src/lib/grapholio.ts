// Grapholio — Giulia Breida's graphic-design soul. Bold, colourful, Gen-Z.
// Each project carries a handwritten title (rendered in Prompt 2 via --font-hand)
// and a vivid per-project accent that the bold/white grapholio theme can pick up.
//
// This file stays structural and language-neutral. Project titles and categories
// are creative proper nouns / discipline labels kept as-is; any translatable
// surrounding copy (section intro, etc.) lives in src/lib/i18n.ts.

export interface Project {
  /** stable key, also used for the accent + i18n lookups */
  id: string;
  /** URL segment under /grapholio/<slug> */
  slug: string;
  /** handwritten display title (Prompt 2 sets it in --font-hand) */
  title: string;
  /** design discipline label */
  category: string;
  /** optional year of the work */
  year?: number;
  /** vivid accent hex — drives the bold grapholio palette per project */
  accent?: string;
  /** cover image path (filled in Prompt 2; live in /public or src/assets) */
  cover?: string;
  /** gallery image paths (filled in Prompt 2) */
  gallery?: string[];
}

// Display order matches the brief (1 → 9).
export const PROJECTS: Project[] = [
  {
    id: "boem",
    slug: "boem",
    title: "Boem",
    category: "Pack Design",
    accent: "#ff2e63", // loud Gen-Z packaging — colour, energy, attitude
  },
  {
    id: "ancona",
    slug: "ancona",
    title: "Ancora, Ancona",
    category: "City Brand Design",
    accent: "#1ca7ec", // Ancona identity — the sea, slow waterfront life
  },
  {
    id: "flashback",
    slug: "flashback",
    title: "Flashback",
    category: "Signal / Wayfinding System",
    accent: "#ffb400", // ex-orphanage reborn as a cultural space
  },
  {
    id: "notala",
    slug: "notala",
    title: "NotaLa",
    category: "Brand Design",
    accent: "#7c4dff", // abandoned phone booths → micro art spaces (urban regen)
  },
  {
    id: "durex",
    slug: "durex",
    title: "Durex",
    category: "ADV Design",
    accent: "#2d5bff", // ironic print advertising in the Durex tone of voice
  },
  {
    id: "sanbaudia",
    slug: "sanbaudia",
    title: "Sanbaudia",
    category: "Editorial Design",
    accent: "#e84393", // pop editorial on Torino's churches & holy places
  },
  {
    id: "kombat-xxv",
    slug: "kombat-xxv",
    title: "Kombat XXV",
    category: "Graphic Design",
    accent: "#ff6b00", // Kombat 25th anniversary, by Kappa
  },
  {
    id: "kappa-futur",
    slug: "kappa-futur",
    title: "Kappa Futur",
    category: "Graphic Design",
    accent: "#00e5ff", // techno festival — "the futur is in Torino"
  },
  {
    id: "kappa-433",
    slug: "kappa-433",
    title: "Kappa x 433",
    category: "Pack Design",
    accent: "#00c853", // Kappa × 433 football collab
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
