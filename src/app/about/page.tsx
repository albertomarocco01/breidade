import { CONTACT, getDictionary, getLocale, HANZI } from "@/lib/i18n";

// ABOUT (/about) — bio + contacts. STUB ONLY (data-section="about", neutral).
// TODO(Prompt 2): portrait, the China/eastern-cultures thread, the 設計師
// flourish, refined type & motion.
export default async function AboutPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="section" data-section="about">
      <section className="container about" aria-label={dict.about.label}>
        <span className="sect-kicker">{dict.about.label}</span>

        <p className="about-lede display">{dict.about.lede}</p>
        <p className="about-bio">{dict.about.bio}</p>
        <p className="about-hanzi" lang="zh" aria-hidden="true">
          {HANZI}
        </p>

        <div className="about-contact">
          <span className="sect-kicker">{dict.about.contact}</span>
          <ul className="contact-list" role="list">
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </li>
            <li>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.footer.instagram} ↗
              </a>
            </li>
            <li>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.footer.linkedin} ↗
              </a>
            </li>
          </ul>
          <p className="contact-meta">
            {CONTACT.location} · {CONTACT.born}
          </p>
        </div>
      </section>
    </div>
  );
}
