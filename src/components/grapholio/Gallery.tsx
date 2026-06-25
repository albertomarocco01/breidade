"use client";

// GRAPHOLIO gallery — the loud world. An asymmetric, hand-composed wall of VIVID
// colour cards, each painted in its project's own bg/fg and carrying its
// HANDWRITTEN title (La Belle Aurore — the through-line of this soul). The cover
// is a local placeholder sized for Giulia's real covers (they drop straight in).
// Motion: a flash-free scroll-reveal (GSAP sets the hidden state in a layout
// effect, an IntersectionObserver plays each card as it enters) + a gentle Lenis
// parallax on the handwritten heading. Hover (straighten + lift) is pure CSS. All
// of it is off under reduced motion.

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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

  // Scroll-reveal each card as it enters. gsap.set runs in useGSAP's layout
  // effect (before paint) so there is no visible flash of the hidden state.
  useGSAP(
    () => {
      if (!entered || reducedMotion) return;
      registerGsap();
      const cards = gsap.utils.toArray<HTMLElement>(".g-card");
      gsap.set(cards, { autoAlpha: 0, y: 52 });
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
      cards.forEach((c) => io.observe(c));
      return () => io.disconnect();
    },
    { dependencies: [entered, reducedMotion], scope: rootRef },
  );

  // Gentle parallax on the handwritten heading as you scroll.
  useLenis(
    (lenis) => {
      if (reducedMotion) return;
      const el = headRef.current;
      if (!el) return;
      el.style.transform = `translateY(${lenis.scroll * 0.1}px)`;
    },
    [reducedMotion],
  );

  const total = String(projects.length).padStart(2, "0");

  return (
    <section className="container" aria-label={dict.grapholio.aria} ref={rootRef}>
      <header className="g-head" ref={headRef}>
        <span className="sect-kicker">grapholio · {total}</span>
        <h1 className="sect-title hand">{dict.grapholio.label}</h1>
      </header>

      <ul className="g-wall" role="list">
        {projects.map((project, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <li
              key={project.id}
              className="g-card"
              style={
                {
                  "--card-bg": project.bg,
                  "--card-fg": project.fg,
                  "--rot": `${project.rot}deg`,
                } as React.CSSProperties
              }
            >
              <Link
                href={`/grapholio/${project.slug}`}
                className="g-card-link"
                aria-label={`${project.title} — ${project.category[locale]}`}
              >
                <span className="g-card-top">
                  <span className="g-card-cat">{project.category[locale]}</span>
                  <span className="g-card-year">
                    {num}/{total}
                  </span>
                </span>
                <span className="g-card-cover">
                  <span className="g-card-num">{num}</span>
                  <Image
                    src={project.cover as string}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    unoptimized
                  />
                </span>
                <span className="g-card-title hand">{project.title}</span>
                <span className="g-card-desc">{project.description[locale]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
