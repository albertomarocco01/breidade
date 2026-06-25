// Grapholio — Giulia Breida's graphic-design soul. Bold, colourful, hand-composed.
// Each project is a VIVID card painted in its own protagonist colour (bg/fg) and
// carries a HANDWRITTEN title (--font-hand, La Belle Aurore — the through-line of
// this soul). Per-project colour assignments are fixed by the art direction.
//
// CONTENT RULE: the title is a proper noun and is NEVER translated. category and
// description are Giulia's scraped copy (English source) plus a faithful Italian
// translation, so the IT/EN toggle switches these too — see `Localized`. No invented
// taglines, tags, chinese titles or marketing manifesto.

// Local placeholder covers (src/assets) sized 16:10 — Giulia's real covers drop
// in by swapping the import (or the file on disk). Typed `any` by Next's *.svg
// module declaration; rendered through next/image.
import boemCover from "@/assets/grapholio/boem.svg";
import anconaCover from "@/assets/grapholio/ancona.svg";
import flashbackCover from "@/assets/grapholio/flashback.svg";
import notalaCover from "@/assets/grapholio/notala.svg";
import durexCover from "@/assets/grapholio/durex.svg";
import sanbaudiaCover from "@/assets/grapholio/sanbaudia.svg";
import kombatCover from "@/assets/grapholio/kombat-xxv.svg";
import kappaFuturCover from "@/assets/grapholio/kappa-futur.svg";
import kappa433Cover from "@/assets/grapholio/kappa-433.svg";

/** A string supplied in both locales: Giulia's EN source + its IT translation. */
export type Localized = { en: string; it: string };

export interface Project {
  /** stable key, also used for i18n lookups */
  id: string;
  /** URL segment under /grapholio/<slug> */
  slug: string;
  /** handwritten display title (rendered in --font-hand) — proper noun, not translated */
  title: string;
  /** design discipline label (EN source + IT translation) */
  category: Localized;
  /** the project's protagonist background colour (hex) */
  bg: string;
  /** contrasting foreground colour (hex) */
  fg: string;
  /** project brief (EN source + IT translation) */
  description: Localized;
  /** hand-placed card rotation in degrees */
  rot: number;
  /** local placeholder cover; real cover drops in here */
  cover: unknown;
  /** gallery image paths (supplied later; plates stand in) */
  gallery?: unknown[];
}

const TOMATO = "#FF3E2B";
const CARBON = "#121212";
const BLUE = "#0A369D";
const LIME = "#DFFF00";
const TEAL = "#0DCD9D";
const CREAM = "#FCFAF2";

// Display order matches the brief (1 → 9). Colours per the art direction:
// boem tomato · ancona blue · flashback teal · notala lime · durex tomato ·
// sanbaudia cream · kombat carbon · kappa-futur tomato · kappa-433 teal.
export const PROJECTS: Project[] = [
  {
    id: "boem",
    slug: "boem",
    title: "Boem",
    category: { en: "Pack design", it: "Packaging" },
    bg: TOMATO,
    fg: CREAM,
    description: {
      en: "The BOEM packaging design challenge: talking from the shelves to the toughest generation of all: Gen Z. Its packaging doesn't whisper—it demands attention, exploding with color, energy, and attitude.",
      it: "La sfida del packaging BOEM: parlare dagli scaffali alla generazione più difficile di tutte, la Gen Z. Un packaging che non sussurra: pretende attenzione, esplodendo di colore, energia e attitudine.",
    },
    rot: -2,
    cover: boemCover,
  },
  {
    id: "ancona",
    slug: "ancona",
    title: "Ancora, Ancona",
    category: { en: "City Brand Design", it: "Branding di città" },
    bg: BLUE,
    fg: CREAM,
    description: {
      en: "The Ancona City Branding project redefines the city's identity, highlighting its deep connection to the sea. It celebrates the slow rhythm of life along the waterfront, creating a memorable and immersive brand experience.",
      it: "Il progetto di city branding per Ancona ridefinisce l'identità della città, mettendone in risalto il legame profondo con il mare. Celebra il ritmo lento della vita sul lungomare, dando vita a un'esperienza di marca memorabile e immersiva.",
    },
    rot: 1.5,
    cover: anconaCover,
  },
  {
    id: "flashback",
    slug: "flashback",
    title: "Flashback",
    category: { en: "Signal System Design", it: "Sistema segnaletico" },
    bg: TEAL,
    fg: CARBON,
    description: {
      en: "From an orphanage to a multipurpose cultural space, from which a brand identity and a visual system are born that will guide the visitor in a new way of conceiving art.",
      it: "Da orfanotrofio a spazio culturale polifunzionale, da cui nascono un'identità di marca e un sistema visivo che guidano il visitatore verso un nuovo modo di concepire l'arte.",
    },
    rot: -1,
    cover: flashbackCover,
  },
  {
    id: "notala",
    slug: "notala",
    title: "NotaLa",
    category: { en: "Brand Design", it: "Identità di marca" },
    bg: LIME,
    fg: CARBON,
    description: {
      en: "A project transforming abandoned phone booths into small artistic spaces. An urban regeneration initiative bringing installations, sound, and visual art into daily life.",
      it: "Un progetto che trasforma le cabine telefoniche abbandonate in piccoli spazi artistici. Un'iniziativa di rigenerazione urbana che porta installazioni, suono e arte visiva nella vita di tutti i giorni.",
    },
    rot: 2,
    cover: notalaCover,
  },
  {
    id: "durex",
    slug: "durex",
    title: "Durex",
    category: { en: "ADV Design", it: "Pubblicità" },
    bg: TOMATO,
    fg: CREAM,
    description: {
      en: "Advertising idea following Durex' ironic TOV for print advertising.",
      it: "Idea pubblicitaria che segue il tono di voce ironico di Durex per la pubblicità su stampa.",
    },
    rot: -1.5,
    cover: durexCover,
  },
  {
    id: "sanbaudia",
    slug: "sanbaudia",
    title: "Sanbaudia",
    category: { en: "Editorial Design", it: "Design editoriale" },
    bg: CREAM,
    fg: CARBON,
    description: {
      en: "Editorial Design with a pop style for a new local magazine showing around the churches and holy places of Torino and surroundings, explaining the history of catholicism from a different perspective.",
      it: "Progetto editoriale in stile pop per una nuova rivista locale che accompagna tra le chiese e i luoghi sacri di Torino e dintorni, raccontando la storia del cattolicesimo da una prospettiva diversa.",
    },
    rot: 1,
    cover: sanbaudiaCover,
  },
  {
    id: "kombat-xxv",
    slug: "kombat-xxv",
    title: "Kombat XXV",
    category: { en: "Graphic Design", it: "Progettazione grafica" },
    bg: CARBON,
    fg: CREAM,
    description: {
      en: "Celebrating XXVth anniversary of Kombat with a special project signed by Kappa.",
      it: "Un progetto speciale firmato Kappa per celebrare il venticinquesimo anniversario di Kombat.",
    },
    rot: -2,
    cover: kombatCover,
  },
  {
    id: "kappa-futur",
    slug: "kappa-futur",
    title: "Kappa Futur",
    category: { en: "Graphic Design", it: "Progettazione grafica" },
    bg: TOMATO,
    fg: CREAM,
    description: {
      en: "The futur is in Torino: Save the date for the most iconic techno festival in Europe.",
      it: "Il futuro è a Torino: segna la data del festival techno più iconico d'Europa.",
    },
    rot: 1.5,
    cover: kappaFuturCover,
  },
  {
    id: "kappa-433",
    slug: "kappa-433",
    title: "Kappa x 433",
    category: { en: "Pack Design", it: "Packaging" },
    bg: TEAL,
    fg: CARBON,
    description: {
      en: "Together for the beautiful game: what happens when omini brand Kappa meets 433.",
      it: "Insieme per il gioco più bello: cosa succede quando il brand degli Omini, Kappa, incontra 433.",
    },
    rot: -1,
    cover: kappa433Cover,
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
