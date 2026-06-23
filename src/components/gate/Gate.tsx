"use client";

// THE GATE — "due anime". Two full-height portals split the screen into Giulia's
// two souls: GRAPHOLIO (tomato, loud, 設計) and FOTOFOLIO (carbon, quiet, 攝影).
// On the seam stands 設計師 — "the designer" — with the instruction "scegli
// un'anima". Hovering a portal makes that world breathe open (CSS flex-grow);
// clicking it is a REAL route navigation, wiped across in the world's colour.
// The whole half is the door, so the gate IS the navigation (topbar nav hidden).

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useApp } from "@/components/providers/AppProvider";
import { registerGsap, FIELD_EASE } from "@/lib/motion";
import type { Contact, Dictionary } from "@/lib/i18n";

const TOMATO = "#FF3E2B";
const CARBON = "#121212";

export function Gate({ dict, contact }: { dict: Dictionary; contact: Contact }) {
  const { entered, reducedMotion } = useApp();
  const router = useRouter();

  const gateRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLAnchorElement>(null);
  const fotoRef = useRef<HTMLAnchorElement>(null);
  const pivotRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  // Entrance — the two portals fade/slide in, the pivot scales in, the labels
  // rise. Skipped under reduced motion (everything is at rest, fully visible).
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
    <div className="section gate" data-section="gate" ref={gateRef}>
      {/* floating brand header — serif name + meta, mix-blend over both souls */}
      <header className="gate-head">
        <div>
          <p className="gate-name serif">{contact.name}</p>
          <p className="gate-meta">
            <span>Torino, IT</span>
            <span className="dot">•</span>
            <span>Born {contact.born}</span>
          </p>
        </div>
        <Link href="/about" className="gate-info">
          <span>{dict.about.label}</span>
          <span className="hand2">{dict.gate.info}</span>
        </Link>
      </header>

      {/* GRAPHOLIO — the loud half (設計) */}
      <Link
        ref={graphRef}
        href="/grapholio"
        className="gate-half gate-half--graph"
        aria-label={dict.grapholio.aria}
        onClick={(e) => enter(e, "/grapholio", TOMATO)}
      >
        <span className="gate-han" aria-hidden="true" lang="zh">
          設計
        </span>
        <span className="gate-half-inner">
          <span className="gate-disc gate-reveal">{dict.grapholio.label}</span>
          <span className="gate-world gate-reveal">Grapholio</span>
          <span className="gate-enter gate-reveal">
            {dict.gate.enter} <span className="arr">→</span>
          </span>
        </span>
      </Link>

      {/* FOTOFOLIO — the quiet half (攝影) */}
      <Link
        ref={fotoRef}
        href="/fotofolio"
        className="gate-half gate-half--foto"
        aria-label={dict.fotofolio.aria}
        onClick={(e) => enter(e, "/fotofolio", CARBON)}
      >
        <span className="gate-han" aria-hidden="true" lang="zh">
          攝影
        </span>
        <span className="gate-half-inner">
          <span className="gate-disc gate-reveal">{dict.fotofolio.label}</span>
          <span className="gate-world serif gate-reveal">Fotofolio</span>
          <span className="gate-enter gate-reveal">
            {dict.gate.enter} <span className="arr">→</span>
          </span>
        </span>
      </Link>

      {/* the seam pivot — ONE 設計師 motif + the "scegli un'anima" instruction */}
      <div className="gate-pivot" ref={pivotRef} aria-hidden="true">
        <span className="gate-pivot-mark" lang="zh">
          設計師
        </span>
        <span className="gate-pivot-cta">{dict.gate.choose}</span>
      </div>

      <div className="gate-wipe" ref={wipeRef} aria-hidden="true" />
    </div>
  );
}
