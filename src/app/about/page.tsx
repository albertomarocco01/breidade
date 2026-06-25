import { CONTACT, getDictionary, getLocale, HANZI } from "@/lib/i18n";
import { InstagramIcon, LinkedInIcon } from "@/components/chrome/SocialIcons";

// ABOUT (/about) — warm-paper world. Giulia's verbatim bio (the China / eastern-
// cultures thread is foregrounded by an oversized 設計師 column and the motif
// stamp). Contacts read as a technical spec sheet (JetBrains Mono). The only body
// copy is the scraped bio; everything else is structural chrome.
export default async function AboutPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="section" data-section="about">
      <section className="container about" aria-label={dict.about.label}>
        <div className="about-intro">
          <span className="sect-kicker">{dict.about.label}</span>
          <p className="about-bio">{dict.about.bio}</p>
        </div>

        <div className="about-hanzi-col" aria-hidden="true" lang="zh">
          {HANZI}
        </div>

        <div className="about-contact">
          <span className="sect-kicker">{dict.about.contact}</span>
          <dl className="about-spec">
            <div className="about-spec-row">
              <dt>{dict.about.spec.email}</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </dd>
            </div>
            <div className="about-spec-row">
              <dt>{dict.about.spec.tel}</dt>
              <dd>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </dd>
            </div>
            <div className="about-spec-row">
              <dt>instagram</dt>
              <dd>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spec-social"
                >
                  <InstagramIcon className="spec-ic" />
                  <span>{dict.footer.instagram}</span>
                </a>
              </dd>
            </div>
            <div className="about-spec-row">
              <dt>linkedin</dt>
              <dd>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spec-social"
                >
                  <LinkedInIcon className="spec-ic" />
                  <span>{dict.footer.linkedin}</span>
                </a>
              </dd>
            </div>
          </dl>
          <p className="contact-meta">
            {CONTACT.location} · {CONTACT.born}
          </p>
        </div>
      </section>
    </div>
  );
}
