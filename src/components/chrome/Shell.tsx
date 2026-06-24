"use client";

import { Topbar } from "@/components/chrome/Topbar";
import { Footer } from "@/components/chrome/Footer";
import type { Contact, Dictionary, Locale } from "@/lib/i18n";

/**
 * Page chrome shared across every route, composed around the page content: the
 * skip link, the fixed header (<Topbar>), the <main> content slot, and the
 * <Footer>. Server-rendered page content is passed through as `children` so it
 * paints as static HTML first. The header and footer internals now live in their
 * own components — Shell just assembles them.
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
  return (
    <>
      <a href="#main" className="skip-link">
        {dict.nav.skip}
      </a>

      <Topbar dict={dict} locale={locale} />

      <main id="main" className="main">
        {children}
      </main>

      <Footer dict={dict} contact={contact} />
    </>
  );
}
