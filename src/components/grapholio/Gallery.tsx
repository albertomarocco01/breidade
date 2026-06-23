"use client";

// GRAPHOLIO gallery — the loud world. An asymmetric, hand-composed wall of
// colour fields, each carrying its handwritten title (the through-line of this
// soul). Real covers drop into `.g-tile-field` later; for now a generative
// risograph gradient per project stands in. Motion: a flash-free scroll-reveal
// (GSAP sets the hidden state in a layout effect, an IntersectionObserver plays
// each tile as it enters) plus a gentle Lenis parallax on the handwritten title.
// Hover bloom + RGB split are pure CSS. All of it is off under reduced motion.

import { useRef } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useApp } from "@/components/providers/AppProvider";
import { registerGsap, FIELD_EASE } from "@/lib/motion";
import type { Project } from "@/lib/grapholio";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Gallery({
  projects,
  dict,
  locale,
}: {
  projects: Project[];
  dict: Dictionary;
  locale: Locale;
}) {
  const { entered, reducedMotion } = useApp();
  const rootRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal each tile as it enters. gsap.set runs in useGSAP's layout
  // effect (before paint) so there is no visible flash of the hidden state.
  useGSAP(
    () => {
      if (!entered || reducedMotion) return;
      registerGsap();
      const tiles = gsap.utils.toArray<HTMLElement>(".g-tile");
      gsap.set(tiles, { autoAlpha: 0, y: 52 });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            gsap.to(en.target, {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: FIELD_EASE,
            });
            io.unobserve(en.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      tiles.forEach((t) => io.observe(t));
      return () => io.disconnect();
    },
    { dependencies: [entered, reducedMotion], scope: rootRef },
  );

  // Gentle parallax on the handwritten section title as you scroll.
  useLenis(
    (lenis) => {
      if (reducedMotion) return;
      const el = headRef.current;
      if (!el) return;
      el.style.transform = `translateY(${lenis.scroll * 0.12}px)`;
    },
    [reducedMotion],
  );

  return (
    <section className="container" aria-label={dict.grapholio.aria} ref={rootRef}>
      <header className="g-head" ref={headRef}>
        <span className="sect-kicker">
          grapholio · {String(projects.length).padStart(2, "0")}
        </span>
        <h1 className="sect-title hand">{dict.grapholio.label}</h1>
        <p className="sect-intro">{dict.grapholio.intro}</p>
      </header>

      <ul className="g-wall" role="list">
        {projects.map((project, i) => (
          <li
            key={project.id}
            className={`g-tile is-${project.size}`}
            style={
              {
                "--card-accent": project.accent,
                "--card-accent2": project.accent2,
              } as React.CSSProperties
            }
          >
            <Link
              href={`/grapholio/${project.slug}`}
              className="g-tile-link"
              aria-label={`${project.title} — ${project.category}`}
            >
              <span className="g-tile-field" aria-hidden="true" />
              <span className="g-tile-scrim" aria-hidden="true" />
              <span className="g-tile-body">
                <span className="g-tile-num display">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="g-tile-title hand">{project.title}</span>
                  <span className="g-tile-foot">
                    <span className="g-tile-cat">{project.category}</span>
                    <span className="g-tile-year">{project.year}</span>
                    <span className="g-tile-tag">{project.tagline[locale]}</span>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
