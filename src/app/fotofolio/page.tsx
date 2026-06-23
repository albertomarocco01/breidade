import { getDictionary, getLocale } from "@/lib/i18n";

// FOTOFOLIO (/fotofolio) — the quiet world: a darkroom. Until the real prints
// arrive it shows an expressive, STRICTLY TEXT-FREE empty state — a wall of
// empty frames "developing" under a breathing aperture. The brand rule holds:
// no captions, no titles, no text on or around the images. The only copy is the
// page-level manifesto up top and the faint 設計師 thread in the margin (both are
// page chrome, never image captions). All motion is CSS, off under reduced motion.

const FRAMES = [
  "is-portrait",
  "is-land",
  "is-sq",
  "is-land",
  "is-portrait",
  "is-sq",
] as const;

export default async function FotofolioPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <section className="container foto" aria-label={dict.fotofolio.aria}>
      <span className="foto-thread" aria-hidden="true" lang="zh">
        攝影
      </span>

      <header className="foto-manifesto">
        <span className="sect-kicker">fotofolio</span>
        <p className="sect-intro">{dict.fotofolio.intro}</p>
        <svg
          className="foto-aperture"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="46" />
          <line x1="84" y1="50" x2="33" y2="79.4" />
          <line x1="67" y1="79.4" x2="16" y2="50" />
          <line x1="33" y1="79.4" x2="33" y2="20.6" />
          <line x1="16" y1="50" x2="67" y2="20.6" />
          <line x1="33" y1="20.6" x2="84" y2="50" />
          <line x1="67" y1="20.6" x2="67" y2="79.4" />
        </svg>
      </header>

      {/* the developing wall — empty frames only, never any text */}
      <div className="foto-wall" role="presentation">
        {FRAMES.map((shape, i) => (
          <div key={i} className={`foto-frame ${shape}`} aria-hidden="true" />
        ))}
      </div>
    </section>
  );
}
