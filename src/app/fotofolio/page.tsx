import Image from "next/image";
import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";
import { MAIN_SERIES } from "@/lib/fotofolio";

// FOTOFOLIO (/fotofolio) — the quiet world: a darkroom. An asymmetric photo
// mosaic of Giulia's real "Hand other stories" prints. The brand rule holds
// absolutely: NO captions, NO titles, NO text on or around the PHOTOGRAPHS, and
// the structural series title is NEVER rendered over a bare frame. The only copy
// is the scraped series description up top (page chrome) and the faint 攝影 thread.
//
// The wall ends on a deliberate COVER / portal tile (the only labelled tile —
// clearly NOT a bare photo) that carries the handwritten series title and opens
// the full series at /fotofolio/[slug].
export default async function FotofolioPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const series = MAIN_SERIES;

  return (
    <section className="container foto" aria-label={dict.fotofolio.aria}>
      <span className="foto-thread" aria-hidden="true" lang="zh">
        攝影
      </span>

      <header className="foto-manifesto">
        <span className="sect-kicker">fotofolio</span>
        <p className="foto-intro">{dict.fotofolio.intro}</p>
      </header>

      {/* the mosaic — bare photographs only, never any text */}
      <div className="foto-wall" role="list">
        {series.images.map((img, i) => (
          <div key={i} className={`foto-frame ${img.shape}`} role="listitem">
            <Image
              src={img.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              placeholder="blur"
            />
          </div>
        ))}

        {/* the cover / portal — a labelled tile, deliberately NOT a bare photo.
            The whole tile is the link (stretched ::after over the card). */}
        <div className="foto-frame foto-entry" role="listitem">
          <Image
            src={series.cover}
            alt=""
            fill
            sizes="(min-width: 640px) 92vw, 90vw"
            placeholder="blur"
          />
          <span className="foto-entry-veil" aria-hidden="true" />
          <span className="foto-entry-han" aria-hidden="true" lang="zh">
            攝影
          </span>
          <span className="foto-entry-inner">
            <span className="foto-entry-kicker">fotofolio · 01</span>
            <span className="foto-entry-title hand">{series.title}</span>
            <Link
              href={`/fotofolio/${series.slug}`}
              className="foto-entry-go"
              aria-label={`${series.title} — ${dict.fotofolio.enter}`}
            >
              {dict.fotofolio.enter} →
            </Link>
          </span>
        </div>
      </div>

      <div className="foto-coda" aria-hidden="true">
        <span className="rule" />
      </div>
    </section>
  );
}
