"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useApp } from "@/components/providers/AppProvider";
import { LocaleToggle } from "@/components/chrome/LocaleToggle";
import type { Dictionary, Locale } from "@/lib/i18n";
import { registerGsap, FIELD_EASE, TOPBAR_REVEAL_TOP } from "@/lib/motion";

const NAV = [
  { href: "/grapholio", key: "grapholio" },
  { href: "/fotofolio", key: "fotofolio" },
  { href: "/about", key: "about" },
] as const;

/**
 * The fixed top bar — the site header: wordmark, IT/EN toggle and primary route
 * nav. Faded in as the entrance auto-plays on load (next/link + usePathname drive
 * the active state), and auto-tucked on scroll-down / revealed on scroll-up,
 * driven off the shared Lenis instance and applied as a single class toggle
 * through a ref (no setState in the scroll hot loop). On the gate the two halves
 * ARE the navigation, so the nav is hidden there. All motion is off under reduced
 * motion. Extracted from <Shell> so the header lives in its own module (styles in
 * src/styles/header.css).
 */
export function Topbar({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { entered, reducedMotion } = useApp();
  const pathname = usePathname();
  // On the gate the two halves ARE the navigation, so the topbar nav is hidden.
  const onGate = pathname === "/";
  const topbarRef = useRef<HTMLDivElement>(null);
  // Last applied tuck state, held in a ref so the scroll subscription can toggle
  // the class without ever calling setState in the hot loop.
  const tuckedRef = useRef(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // The entrance auto-plays on load (no gate to click). Only the topbar fades in;
  // page content is deliberately NOT animated — it paints as static server HTML
  // and stays visible from first paint, so the opening never costs LCP. Skipped
  // entirely under reduced motion (content is shown instantly by CSS).
  useGSAP(
    () => {
      if (!entered || reducedMotion) return;
      registerGsap();
      const root = document.documentElement;
      root.classList.add("entering");
      const tl = gsap.timeline({
        onComplete: () => root.classList.remove("entering"),
      });
      tl.from(".topbar", { autoAlpha: 0, duration: 1.2, ease: FIELD_EASE }).to(
        {},
        { duration: 0.4 },
      );
    },
    { dependencies: [entered, reducedMotion] },
  );

  // Auto-hide the transparent topbar so it never collides with page titles: tuck
  // it away on scroll down, reveal on scroll up, always show near the top. Driven
  // off window.scrollY (NOT Lenis direction): Lenis runs with syncTouch:false, so
  // on mobile touch scroll its direction signal never updates and the bar would
  // never tuck — leaving the fixed header permanently overlapping page content.
  // Lenis scrolls the window in root mode, so window.scrollY is correct on every
  // device. rAF-throttled, single class toggle through topbarRef (no setState in
  // the scroll loop). Skipped under reduced motion.
  useEffect(() => {
    if (reducedMotion) return;
    const bar = topbarRef.current;
    if (!bar) return;
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const tucked = y > TOPBAR_REVEAL_TOP && y > last;
        last = y;
        if (tucked === tuckedRef.current) return;
        tuckedRef.current = tucked;
        bar.classList.toggle("is-tucked", tucked);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  // Keyboard access: if focus moves into the topbar while it's tucked, reveal it
  // so every nav link stays reachable. `focusin` bubbles, so one listener covers
  // all descendants.
  useEffect(() => {
    const bar = topbarRef.current;
    if (!bar) return;
    const reveal = () => {
      if (!tuckedRef.current) return;
      tuckedRef.current = false;
      bar.classList.remove("is-tucked");
    };
    bar.addEventListener("focusin", reveal);
    return () => bar.removeEventListener("focusin", reveal);
  }, []);

  return (
    <div
      ref={topbarRef}
      className={`topbar${entered ? " in" : ""}${onGate ? " is-gate" : ""}`}
    >
      <div className="topbar-left">
        <Link href="/" className="wordmark">
          Breidade
        </Link>
        <LocaleToggle locale={locale} labels={dict.locale} />
      </div>
      <nav aria-label="primary">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {dict.nav[item.key]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
