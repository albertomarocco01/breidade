"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useApp } from "@/components/providers/AppProvider";
import { LocaleToggle } from "@/components/chrome/LocaleToggle";
import { InstagramIcon, LinkedInIcon } from "@/components/chrome/SocialIcons";
import type { Contact, Dictionary, Locale } from "@/lib/i18n";
import { registerGsap, FIELD_EASE, TOPBAR_REVEAL_TOP } from "@/lib/motion";

const NAV = [
  { href: "/grapholio", key: "grapholio" },
  { href: "/fotofolio", key: "fotofolio" },
  { href: "/about", key: "about" },
] as const;

/**
 * Page chrome shared across every route: the fixed top bar (faded in as the
 * entrance auto-plays on load), the main content slot, and the footer. Server-
 * rendered page content is passed through as children so it paints as static
 * HTML first. Ported from the reference and adapted from a single-page anchor
 * nav to App-Router route nav (next/link + usePathname active state).
 */
export function Shell({
  children,
  dict,
  locale,
  contact,
}: {
  children: React.ReactNode;
  dict: Dictionary;
  locale: Locale;
  contact: Contact;
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
  // off the shared Lenis instance and applied as a single class toggle through
  // topbarRef — no setState on the scroll tick. Skipped under reduced motion.
  useLenis(
    (instance) => {
      if (reducedMotion) return;
      const bar = topbarRef.current;
      if (!bar) return;
      const tucked =
        instance.scroll > TOPBAR_REVEAL_TOP && instance.direction === 1;
      if (tucked === tuckedRef.current) return;
      tuckedRef.current = tucked;
      bar.classList.toggle("is-tucked", tucked);
    },
    [reducedMotion],
  );

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

  const year = new Date().getFullYear();

  return (
    <>
      <a href="#main" className="skip-link">
        {dict.nav.skip}
      </a>

      <div
        ref={topbarRef}
        className={`topbar${entered ? " in" : ""}${onGate ? " is-gate" : ""}`}
      >
        <div className="topbar-left">
          <Link href="/" className="wordmark">
            giulia breida
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

      <main id="main" className="main">
        {children}
      </main>

      <footer className="foot">
        <a
          href={contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="foot-social"
        >
          <InstagramIcon className="foot-ic" />
          <span>{dict.footer.instagram}</span>
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="foot-social"
        >
          <LinkedInIcon className="foot-ic" />
          <span>{dict.footer.linkedin}</span>
        </a>
        <span className="spacer" />
        <span className="copy">
          © {year} {contact.name} · {dict.footer.rights}
        </span>
      </footer>
    </>
  );
}
