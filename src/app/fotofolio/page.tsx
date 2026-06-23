import { SERIES } from "@/lib/fotofolio";
import { getDictionary, getLocale } from "@/lib/i18n";

// FOTOFOLIO (/fotofolio) — photography. SCAFFOLD ONLY.
// Brand rule: NO captions, NO titles on the images. The series `title` is
// structural (routing/SEO/aria) and is intentionally never rendered here.
// TODO(Prompt 2): the real image-forward gallery — full-bleed photographs
// (next/image), quiet scroll, minimal chrome, no text over the images.
export default async function FotofolioPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const series = SERIES[0];

  return (
    <section className="container foto" aria-label={dict.fotofolio.aria}>
      <header className="sect-head foto-head">
        <span className="sect-kicker">fotofolio</span>
        <p className="sect-intro">{dict.fotofolio.intro}</p>
      </header>

      {/* Captionless gallery placeholder — images come in Prompt 2. */}
      <div className="foto-grid">
        {series && series.images.length === 0 ? (
          <p className="foto-empty">—</p>
        ) : (
          series?.images.map((image, i) => (
            <figure key={i} className="foto-cell">
              {/* TODO(Prompt 2): <Image> here — no caption, ever. */}
              <span className="sr-only">{image.alt ?? ""}</span>
            </figure>
          ))
        )}
      </div>
    </section>
  );
}
