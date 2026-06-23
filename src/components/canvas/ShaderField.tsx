"use client";

// ShaderField — the safe wrapper around the WebGL accent. It ALWAYS renders a
// CSS-gradient fallback; the three/r3f canvas is lazily code-split (ssr:false,
// which Next 16 only allows inside a Client Component) and mounted ONLY once the
// app is past first paint (`fieldReady`), motion is allowed, and the device can
// hover. So 3D stays off the LCP path, off touch, and off for reduced-motion —
// and real cover art can later replace the fallback gradient without touching
// this component.

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useApp } from "@/components/providers/AppProvider";

const ShaderFieldCanvas = dynamic(() => import("./ShaderFieldCanvas"), {
  ssr: false,
});

// Subscribe to the hover-capability media query without a setState-in-effect.
// Server snapshot is `false`, so the canvas is never part of SSR/initial markup.
function subscribeHover(cb: () => void) {
  const mq = window.matchMedia("(hover: hover)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function useCanHover() {
  return useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia("(hover: hover)").matches,
    () => false,
  );
}

export function ShaderField({
  accent,
  accent2,
  accent3,
  className,
}: {
  accent: string;
  accent2: string;
  accent3?: string;
  className?: string;
}) {
  const { fieldReady, reducedMotion } = useApp();
  const canHover = useCanHover();

  const enabled = fieldReady && !reducedMotion && canHover;

  return (
    <div
      className={`shader-field${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      style={
        {
          "--card-accent": accent,
          "--card-accent2": accent2,
        } as React.CSSProperties
      }
    >
      <div className="shader-field-fallback" />
      {enabled && (
        <ShaderFieldCanvas
          colorA={accent}
          colorB={accent2}
          colorC={accent3 ?? accent2}
        />
      )}
    </div>
  );
}
