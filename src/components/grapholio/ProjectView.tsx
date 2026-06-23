"use client";

// GRAPHOLIO case study — a real treatment for one project. A full-bleed hero
// where the WebGL risograph field (lazy, with a CSS fallback) is flooded by the
// project's accent and the handwritten title sits oversized on top; then a
// technical spec, a palette strip (colour as a deliverable), generative "plates"
// standing in for the real spreads, and prev/next. Motion is a flash-free GSAP
// entrance, fully disabled under reduced motion.

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useApp } from "@/components/providers/AppProvider";
import { registerGsap, FIELD_EASE } from "@/lib/motion";
import { ShaderField } from "@/components/canvas/ShaderField";
import type { Project } from "@/lib/grapholio";
import type { Dictionary, Locale } from "@/lib/i18n";

const PLATES = ["is-wide", "is-tall", "is-sq", "is-sq", "is-wide"] as const;

export function ProjectView({
  project,
  prev,
  next,
  number,
  dict,
  locale,
}: {
  project: Project;
  prev: Project;
  next: Project;
  number: number;
  dict: Dictionary;
  locale: Locale;
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
          "--card-accent": project.accent,
          "--card-accent2": project.accent2,
        } as React.CSSProperties
      }
    >
      <header className="project-hero">
        <div className="project-hero-field">
          <ShaderField
            accent={project.accent}
            accent2={project.accent2}
            accent3="#ffd400"
          />
        </div>
        <div className="project-hero-inner">
          <Link href="/grapholio" className="back-link">
            ← {dict.project.back}
          </Link>
          <p className="project-overline">
            <span className="project-num">{num}</span>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </p>
          <h1 className="project-title hand">{project.title}</h1>
        </div>
      </header>

      <div className="project-body">
        <p className="project-brief">{project.tagline[locale]}</p>

        <div>
          <p className="project-meta-head">{dict.project.role}</p>
          <dl className="project-spec">
            <div className="project-spec-row">
              <dt>{dict.project.year}</dt>
              <dd>{project.year}</dd>
            </div>
            <div className="project-spec-row">
              <dt>{dict.project.role}</dt>
              <dd>{project.role}</dd>
            </div>
            <div className="project-spec-row">
              <dt>{dict.grapholio.label}</dt>
              <dd>{project.category}</dd>
            </div>
          </dl>
        </div>

        <div>
          <p className="project-meta-head">{dict.project.palette}</p>
          <div className="project-palette">
            <span className="swatch" style={{ background: project.accent }}>
              <span>{project.accent}</span>
            </span>
            <span className="swatch" style={{ background: project.accent2 }}>
              <span>{project.accent2}</span>
            </span>
            <span
              className="swatch"
              style={{
                background: `color-mix(in oklab, ${project.accent} 60%, #fff)`,
              }}
            >
              <span>tint</span>
            </span>
            <span
              className="swatch"
              style={{
                background: `color-mix(in oklab, ${project.accent} 55%, #000)`,
              }}
            >
              <span>shadow</span>
            </span>
          </div>
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
