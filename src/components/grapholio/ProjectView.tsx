"use client";

// GRAPHOLIO case study — a real treatment for one project. A full-bleed hero
// flooded by the project's OWN colour (CSS-driven — no WebGL), with a faded 設計
// watermark and the handwritten title oversized on top; then the scraped brief, a
// compact spec, generative "plates" in the project's colour standing in for the
// real spreads, and prev/next. Motion is a flash-free GSAP entrance, fully
// disabled under reduced motion.

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useApp } from "@/components/providers/AppProvider";
import { registerGsap, FIELD_EASE } from "@/lib/motion";
import { PROJECTS, type Project } from "@/lib/grapholio";
import type { Dictionary } from "@/lib/i18n";

const PLATES = ["is-wide", "is-tall", "is-sq", "is-sq", "is-wide"] as const;
const TOTAL = String(PROJECTS.length).padStart(2, "0");

export function ProjectView({
  project,
  prev,
  next,
  number,
  dict,
}: {
  project: Project;
  prev: Project;
  next: Project;
  number: number;
  dict: Dictionary;
}) {
  const { entered, reducedMotion } = useApp();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!entered || reducedMotion) return;
      registerGsap();
      const tl = gsap.timeline();
      tl.from(".project-overline", {
        autoAlpha: 0,
        y: 18,
        duration: 0.7,
        ease: FIELD_EASE,
      })
        .from(
          ".project-title",
          { autoAlpha: 0, y: 40, duration: 1, ease: FIELD_EASE },
          0.08,
        )
        .from(
          ".project-brief",
          { autoAlpha: 0, y: 26, duration: 0.9, ease: FIELD_EASE },
          0.25,
        )
        .from(
          ".plate",
          {
            autoAlpha: 0,
            y: 40,
            stagger: 0.08,
            duration: 0.9,
            ease: FIELD_EASE,
          },
          0.3,
        );
    },
    { dependencies: [entered, reducedMotion], scope: rootRef },
  );

  const num = String(number).padStart(2, "0");

  return (
    <article
      className="project"
      ref={rootRef}
      style={
        {
          "--card-bg": project.bg,
          "--card-fg": project.fg,
        } as React.CSSProperties
      }
    >
      <header className="project-hero">
        <span className="project-hero-han" aria-hidden="true" lang="zh">
          設計
        </span>
        <div className="project-hero-inner">
          <Link href="/grapholio" className="back-link">
            ← {dict.project.back}
          </Link>
          <p className="project-overline">
            <span className="project-num">
              {num} / {TOTAL}
            </span>
            <span>{project.category}</span>
          </p>
          <h1 className="project-title hand">{project.title}</h1>
        </div>
      </header>

      <div className="project-body">
        <p className="project-brief">{project.description}</p>

        <div>
          <p className="project-meta-head">{dict.project.brief}</p>
          <dl className="project-spec">
            <div className="project-spec-row">
              <dt>{dict.grapholio.label}</dt>
              <dd>{project.category}</dd>
            </div>
            <div className="project-spec-row">
              <dt>nº</dt>
              <dd>
                {num} / {TOTAL}
              </dd>
            </div>
          </dl>
        </div>

        <div className="project-plates">
          {PLATES.map((shape, i) => (
            <div key={i} className={`plate ${shape}`} aria-hidden="true">
              <span className="plate-num">
                pl.{String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
          <p className="project-soon">{dict.project.soon}</p>
        </div>
      </div>

      <nav className="project-nav" aria-label={dict.grapholio.label}>
        <Link href={`/grapholio/${prev.slug}`} className="project-nav-link is-prev">
          <span className="project-nav-dir">← {dict.project.prev}</span>
          <span className="project-nav-name hand">{prev.title}</span>
        </Link>
        <Link href={`/grapholio/${next.slug}`} className="project-nav-link is-next">
          <span className="project-nav-dir">{dict.project.next} →</span>
          <span className="project-nav-name hand">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
