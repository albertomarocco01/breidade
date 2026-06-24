import Link from "next/link";
import {
  ArrowUpIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/chrome/SocialIcons";
import type { Contact, Dictionary } from "@/lib/i18n";

/**
 * Site footer: the two social links (Instagram / LinkedIn) and the copyright
 * line. Purely presentational — its palette comes from the active section's CSS
 * tokens, so it recolours per route with no props. Extracted from <Shell> so the
 * footer lives in its own module (styles in src/styles/footer.css).
 */
export function Footer({
  dict,
  contact,
}: {
  dict: Dictionary;
  contact: Contact;
}) {
  const year = new Date().getFullYear();

  return (
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
      {/* about: same inline-flex baseline as the socials (so it aligns), with a
         vertical "go" arrow at its right. Fills the empty space beside the socials
         on phones, and reorders to the far right (after the copyright) on wider
         screens — see footer.css */}
      <Link href="/about" className="foot-social foot-about">
        <span>{dict.nav.about}</span>
        <ArrowUpIcon className="foot-ic" />
      </Link>
      <span className="spacer" />
      <span className="copy">
        © {year} {contact.name} · {dict.footer.rights}
      </span>
    </footer>
  );
}
