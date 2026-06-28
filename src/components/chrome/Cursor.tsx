"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/components/providers/AppProvider";

/**
 * Custom cursor: a dot that snaps to the pointer + a ring that lags behind
 * (lerp 0.16) and grows over interactive elements. Disabled on touch and under
 * reduced motion (the CSS hides it; the effect also bails early). Colours come
 * from the active section's --ink token. Ported from the reference.
 */
export function Cursor() {
  const { reducedMotion } = useApp();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    // Park both at the entry point (screen centre) and only THEN go live. They
    // must never paint at their CSS-default origin (0,0) — that is the faint
    // top-left "ghost" ring seen during the load/hydration window before this
    // effect runs. .cursor-live (read by chrome.css) keeps them at opacity:0
    // until exactly here, so the reveal happens already positioned.
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    document.documentElement.classList.add("cursor-live");

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      // Wake the ring loop only when the pointer actually moves. At rest the loop
      // stays parked, so the main thread is free — interactions paint sooner (INP).
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      // Once the ring has caught up, stop re-arming. onMove restarts us on the
      // next move — no perpetual 60fps style write while the cursor sits still.
      if (Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    // Grow the ring over interactive elements via EVENT DELEGATION on the
    // document. pointerover/pointerout BUBBLE (mouseenter/leave do not), so one
    // pair of listeners also covers elements added AFTER mount — links on
    // client-side-navigated pages and the lightbox buttons — which the old
    // query-once-at-mount approach silently missed.
    const SEL =
      "a, button, [role='button'], input, select, textarea, label[for], summary";
    const closestInteractive = (t: EventTarget | null) =>
      t instanceof Element ? t.closest(SEL) : null;
    const onOver = (e: PointerEvent) => {
      if (closestInteractive(e.target)) ring.classList.add("is-hot");
    };
    const onOut = (e: PointerEvent) => {
      // Cool only when actually leaving an interactive element for a
      // non-interactive one (relatedTarget = where the pointer is heading);
      // moves between a link and its own children must NOT flicker the ring.
      if (closestInteractive(e.target) && !closestInteractive(e.relatedTarget))
        ring.classList.remove("is-hot");
    };
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("cursor-live");
    };
  }, [reducedMotion]);

  return (
    <>
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
    </>
  );
}
