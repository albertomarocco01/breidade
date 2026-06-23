import Image from "next/image";
import { getDictionary, getLocale } from "@/lib/i18n";
import { MAIN_SERIES } from "@/lib/fotofolio";

// FOTOFOLIO (/fotofolio) — the quiet world: a darkroom. An asymmetric photo
// mosaic (local placeholders until the real prints arrive). The brand rule holds
// absolutely: NO captions, NO titles, NO text on or around the images. The only
// copy is the scraped series description up top (page chrome) and the faint 攝影
// thread in the margin — never an image caption. The structural series title is
// NEVER rendered visibly.
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
        <p className="foto-intro">{dict.fotofolio.intro}</p>
      </header>

      {/* the asymmetric mosaic — images only, never any text */}
      <div className="foto-wall" role="list">
        {MAIN_SERIES.images.map((img, i) => (
          <div key={i} className={`foto-frame ${img.shape}`} role="listitem">
            <Image
              src={img.src as string}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              unoptimized
            />
          </div>
        ))}
      </div>

      <div className="foto-coda" aria-hidden="true">
        <span className="rule" />
      </div>
    </section>
  );
}
