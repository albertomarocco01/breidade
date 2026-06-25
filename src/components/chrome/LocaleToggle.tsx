"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import type { Dictionary, Locale } from "@/lib/i18n";

const LOCALES: Locale[] = ["en", "it"];

// Persist the choice for a year. Kept at module scope so the cookie write (a
// side effect on the global `document`) stays out of the component body.
function persistLocale(locale: Locale) {
  document.cookie = `locale=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * EN/IT switch for the topbar. Two real buttons: the active locale reads in
 * --ink, the inactive in --ink-dim (lifting toward --ink on hover/focus).
 * Selecting the inactive locale writes the `locale` cookie and calls
 * router.refresh(), which re-renders the server tree (and its dictionary) in the
 * new language without a full navigation — confirmed valid in Next 16. The
 * current locale comes down from the server as a prop.
 *
 * On desktop the swap is wrapped in a brief GSAP fade for a touch of polish;
 * reduced-motion and touch (hover: none) users skip it and commit instantly.
 */
export function LocaleToggle({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Dictionary["locale"];
}) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const select = (next: Locale) => {
    if (next === locale) return;

    const commit = () => {
      persistLocale(next);
      router.refresh();
    };

    // Desktop-only flourish. On touch or under reduced motion the fade would only
    // add latency to the swap, so there we commit immediately.
    const el = ref.current;
    const skipAnim =
      !el ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches;

    if (skipAnim) {
      commit();
      return;
    }

    gsap.to(el, {
      opacity: 0.4,
      duration: 0.25,
      onComplete: () => {
        commit();
        gsap.to(el, { opacity: 1, duration: 0.35, delay: 0.1 });
      },
    });
  };

  return (
    <div
      className="locale-toggle"
      role="group"
      aria-label={labels.label}
      ref={ref}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            className="locale-opt"
            aria-pressed={active}
            aria-label={code === "en" ? labels.en : labels.it}
            onClick={() => select(code)}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
