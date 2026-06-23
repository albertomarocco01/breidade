"use client";

// THE GATE — "due anime". A living vertical seam (horizontal on mobile) splits
// the screen into Giulia's two souls: GRAPHOLIO (a loud risograph field) and
// FOTOFOLIO (a quiet darkroom). On the seam stands 設計師 — "the designer" —
// the pivot between them. Hovering a half makes that world breathe open; choosing
// one wipes across in its colour and enters. The whole half is the door, so the
// gate IS the navigation (the topbar nav is hidden here).

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useApp } from "@/components/providers/AppProvider";
import { registerGsap, FIELD_EASE } from "@/lib/motion";
import type { Dictionary } from "@/lib/i18n";

type Side = "graph" | "foto" | null;

export function Gate({ dict }: { dict: Dictionary }) {
  const { entered, reducedMotion } = useApp();
  const router = useRouter();
  const [active, setActive] = useState<Side>(null);

  const gateRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLAnchorElement>(null);
  const fotoRef = useRef<HTMLAnchorElement>(null);
  const pivotRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  // Entrance — the seam opens: the two halves slide apart, the pivot scales in,
  // the world labels rise. Skipped under reduced motion (everything is at rest).
  useGSAP(
    () => {
      if (!entered || reducedMotion) return;
      registerGsap();
      const isRow = window.matchMedia("(min-width: 1024px)").matches;
      const axis = isRow ? "xPercent" : "yPercent";
      const tl = gsap.timeline();
      tl.from(graphRef.current, {
        [axis]: -8,
        autoAlpha: 0,
        duration: 1.1,
        ease: FIELD_EASE,
      })
        .from(
          fotoRef.current,
          { [axis]: 8, autoAlpha: 0, duration: 1.1, ease: FIELD_EASE },
          0,
        )
        .from(
          pivotRef.current,
          { scale: 0.5, autoAlpha: 0, duration: 0.9, ease: FIELD_EASE },
          0.3,
        )
        .from(
          ".gate-reveal",
          {
            yPercent: 40,
            autoAlpha: 0,
            stagger: 0.07,
            duration: 0.9,
            ease: FIELD_EASE,
          },
          0.2,
        );
    },
    { dependencies: [entered, reducedMotion], scope: gateRef },
  );

  // Enter a world: wipe across in its colour, then navigate. Under reduced motion
  // we bail and let the underlying <Link> do an instant navigation.
  const enter = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    color: string,
  ) => {
    if (reducedMotion) return;
    e.preventDefault();
    registerGsap();
    const wipe = wipeRef.current;
    if (!wipe) {
      router.push(href);
      return;
    }
    gsap.set(wipe, { backgroundColor: color, transformOrigin: "bottom", scaleY: 0 });
    gsap.to(wipe, {
      scaleY: 1,
      duration: 0.55,
      ease: FIELD_EASE,
      onComplete: () => router.push(href),
    });
  };

  return (
    <div
      className="section gate"
      data-section="gate"
      data-active={active ?? undefined}
      ref={gateRef}
    >
      <p className="gate-brand">{dict.gate.eyebrow}</p>

      {/* GRAPHOLIO — the loud half */}
      <Link
        ref={graphRef}
        href="/grapholio"
        className="gate-half gate-half--graph"
        aria-label={dict.grapholio.aria}
        onMouseEnter={() => setActive("graph")}
        onMouseLeave={() => setActive(null)}
        onClick={(e) => enter(e, "/grapholio", "#ff2d6f")}
      >
        <span className="gate-field" aria-hidden="true" />
        <span className="gate-half-inner">
          <span className="gate-world-num gate-reveal">
            01 —{" "}
            <span lang="zh" aria-hidden="true">
              設計
            </span>
          </span>
          <span className="gate-world-name display gate-reveal">Grapholio</span>
          <span className="gate-world-disc gate-reveal">
            {dict.grapholio.label}
          </span>
          <span className="gate-enter gate-reveal">
            {dict.gate.enter} <span className="arr">→</span>
          </span>
        </span>
      </Link>

      {/* FOTOFOLIO — the quiet half */}
      <Link
        ref={fotoRef}
        href="/fotofolio"
        className="gate-half gate-half--foto"
        aria-label={dict.fotofolio.aria}
        onMouseEnter={() => setActive("foto")}
        onMouseLeave={() => setActive(null)}
        onClick={(e) => enter(e, "/fotofolio", "#0c0c0d")}
      >
        <span className="gate-field" aria-hidden="true" />
        <span className="gate-half-inner">
          <span className="gate-world-num gate-reveal">
            02 —{" "}
            <span lang="zh" aria-hidden="true">
              攝影
            </span>
          </span>
          <span className="gate-world-name display gate-reveal">Fotofolio</span>
          <span className="gate-world-disc gate-reveal">
            {dict.fotofolio.label}
          </span>
          <span className="gate-enter gate-reveal">
            {dict.gate.enter} <span className="arr">→</span>
          </span>
        </span>
      </Link>

      {/* the seam pivot — 設計師, the designer between her two souls */}
      <div className="gate-pivot" ref={pivotRef} aria-hidden="true">
        <span className="gate-pivot-mark" lang="zh">
          設計師
        </span>
        <span className="gate-pivot-gloss">{dict.gate.pivot}</span>
      </div>

      <Link href="/about" className="gate-info">
        {dict.gate.info} ↗
      </Link>

      <div className="gate-wipe" ref={wipeRef} aria-hidden="true" />
    </div>
  );
}
