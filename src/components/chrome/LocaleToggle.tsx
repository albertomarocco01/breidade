"use client";

import { useRouter } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";

const LOCALES: Locale[] = ["it", "en"];

// Persist the choice for a year. Kept at module scope so the cookie write (a
// side effect on the global `document`) stays out of the component body.
function persistLocale(locale: Locale) {
  document.cookie = `locale=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * IT/EN switch for the topbar. Two real buttons: the active locale reads in
 * --ink, the inactive in --ink-dim (lifting toward --ink on hover/focus).
 * Selecting the inactive locale writes the `locale` cookie and calls
 * router.refresh(), which re-renders the server tree (and its dictionary) in the
 * new language without a full navigation — confirmed valid in Next 16. The
 * current locale comes down from the server as a prop.
 */
export function LocaleToggle({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Dictionary["locale"];
}) {
  const router = useRouter();

  const select = (next: Locale) => {
    if (next === locale) return;
    persistLocale(next);
    router.refresh();
  };

  return (
    <div className="locale-toggle" role="group" aria-label={labels.label}>
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
