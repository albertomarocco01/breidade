"use client";

// FOTOFOLIO "story" page — the full treatment of one photographic series, in the
// quiet darkroom voice. A carbon title-card hero (oversized handwritten title +
// giant faded 攝影 watermark + the scraped tagline, with "yet exposed" isolated
// for emphasis), then the real prints in a single, full-bleed vertical reel —
// bare, text-free, grayscale blooming to tone — that scroll-reveals into place.
// Clicking a frame opens a fullscreen lightbox (Esc / ← → / backdrop to dismiss,
// focus-trapped). All motion is flash-free GSAP and fully off under reduced motion.
//
// BRAND RULE held throughout: no captions, no titles, no text ON or AROUND the
// photographs. The series title lives only in the hero (a title card, never a
// frame caption); the lightbox chrome is edge UI, never a caption on the image.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useApp } from "@/components/providers/AppProvider";
import { registerGsap, FIELD_EASE } from "@/lib/motion";
import type { Series } from "@/lib/fotofolio";
import type { Dictionary } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

export function StoryView({
  series,
  dict,
}: {
  series: Series;
  dict: Dictionary;
}) {
  const { entered, reducedMotion } = useApp();
  const rootRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const images = series.images;
  const total = images.length;

  // Flash-free entrance + scroll-reveal of each print (mirrors the grapholio
  // gallery: gsap.set hides in the layout effect, an IO plays each on enter).
  useGSAP(
    () => {
      if (!entered || reducedMotion) return;
      registerGsap();
      const tl = gsap.timeline();
      tl.from(".back-link", {
        autoAlpha: 0,
        y: 12,
        duration: 0.6,
        ease: FIELD_EASE,
      })
        .from(
          ".story-overline",
          { autoAlpha: 0, y: 16, duration: 0.7, ease: FIELD_EASE },
          0.05,
        )
        .from(
          ".story-title",
          { autoAlpha: 0, y: 40, duration: 1, ease: FIELD_EASE },
          0.12,
        )
        .from(
          ".story-tagline",
          { autoAlpha: 0, y: 24, duration: 0.9, ease: FIELD_EASE },
          0.3,
        );

      const photos = gsap.utils.toArray<HTMLElement>(".story-photo");
      gsap.set(photos, { autoAlpha: 0, y: 64 });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            gsap.to(en.target, {
              autoAlpha: 1,
              y: 0,
              duration: 1.1,
              ease: FIELD_EASE,
            });
            io.unobserve(en.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.14 },
      );
      photos.forEach((p) => io.observe(p));
      return () => io.disconnect();
    },
    { dependencies: [entered, reducedMotion], scope: rootRef },
  );

  // ---- lightbox ----
  const [active, setActive] = useState<number | null>(null);
  const isOpen = active !== null;
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback((i: number) => setActive(i), []);
  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + total) % total)),
    [total],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % total)),
    [total],
  );

  // Open/close side-effects: pause smooth scroll, lock the page, move focus in,
  // restore it on close. Keyed on the open/closed transition only (not `active`),
  // so paging between frames doesn't thrash focus or scroll lock.
  useEffect(() => {
    if (!isOpen) return;
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.documentElement.classList.add("is-lightbox");
    closeBtnRef.current?.focus();
    return () => {
      lenis?.start();
      document.documentElement.classList.remove("is-lightbox");
      lastFocusRef.current?.focus?.();
    };
  }, [isOpen, lenis]);

  // Keyboard: Esc closes, arrows page, Tab is trapped inside the dialog.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab") {
        const root = overlayRef.current;
        if (!root) return;
        const f = root.querySelectorAll<HTMLElement>("button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <article className="story" ref={rootRef}>
      <header className="story-hero">
        <span className="story-hero-han" aria-hidden="true" lang="zh">
          攝影
        </span>
        <div className="story-hero-inner">
          <Link href="/fotofolio" className="back-link">
            ← {dict.story.back}
          </Link>
          <p className="story-overline">
            <span>fotofolio</span>
            <span>· {dict.fotofolio.label}</span>
          </p>
          <h1 className="story-title hand">{series.title}</h1>
          <p className="story-tagline">
            {dict.fotofolio.tagline.lead}{" "}
            <em className="story-tagline-emph">
              — {dict.fotofolio.tagline.emph} —
            </em>{" "}
            {dict.fotofolio.tagline.tail}
          </p>
        </div>
      </header>

      {/* the prints — bare, text-free, click to open full-frame */}
      <div className="story-reel">
        {images.map((img, i) => (
          <figure key={i} className={`story-photo ${img.shape}`}>
            <button
              type="button"
              className="story-photo-btn"
              onClick={() => open(i)}
              aria-label={dict.story.zoom}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 72vw, 92vw"
                placeholder="blur"
              />
            </button>
          </figure>
        ))}
      </div>

      <div className="story-coda">
        <span className="rule" aria-hidden="true" />
        <Link href="/fotofolio" className="story-back-foot">
          ← {dict.story.back}
        </Link>
      </div>

      {isOpen && (
        <div
          className="story-lightbox"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={series.title}
          onClick={close}
        >
          <div className="story-lightbox-bar" onClick={stop}>
            <span className="story-lightbox-count">
              {pad((active ?? 0) + 1)} / {pad(total)}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              className="story-lightbox-close"
              onClick={close}
              aria-label={dict.story.close}
            >
              ✕
            </button>
          </div>

          {/* clicking the empty area around the stage bubbles up to close */}
          <div className="story-lightbox-body">
            {total > 1 && (
              <button
                type="button"
                className="story-lightbox-nav is-prev"
                onClick={(e) => {
                  stop(e);
                  prev();
                }}
                aria-label={dict.story.prev}
              >
                ←
              </button>
            )}

            <figure className="story-lightbox-stage" onClick={stop}>
              <Image
                src={images[active ?? 0].src}
                alt=""
                fill
                sizes="100vw"
                placeholder="blur"
                className="story-lightbox-img"
              />
            </figure>

            {total > 1 && (
              <button
                type="button"
                className="story-lightbox-nav is-next"
                onClick={(e) => {
                  stop(e);
                  next();
                }}
                aria-label={dict.story.next}
              >
                →
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
