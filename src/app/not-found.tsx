import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";

// Root 404 — serves both explicit notFound() calls (the [slug] routes) AND any
// unmatched URL across the app. Renders inside the root layout, so the topbar +
// footer chrome are present. Localized via the same cookie-driven dictionary as
// the rest of the site; Next auto-injects <meta name="robots" content="noindex">
// for 404 responses. Server Component (no client hooks) so it can read the locale.
export default async function NotFound() {
  const locale = await getLocale();
  const nf = getDictionary(locale).notFound;

  return (
    <div className="section" data-section="about">
      <section className="container state" aria-labelledby="nf-title">
        <span className="state-code" aria-hidden="true">
          {nf.code}
        </span>
        <div className="state-inner">
          <h1 id="nf-title" className="state-title hand">
            {nf.title}
          </h1>
          <p className="state-body">{nf.body}</p>
          <Link href="/" className="state-home">
            ← {nf.home}
          </Link>
        </div>
      </section>
    </div>
  );
}
