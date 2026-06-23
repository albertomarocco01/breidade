import Link from "next/link";
import { getDictionary, getLocale, HANZI } from "@/lib/i18n";

// GATE (/) — the entrance, split into Giulia's two souls. STUB ONLY.
// TODO(Prompt 2): build the full gate animation (handwritten reveal, the two
// "doors" opening into Grapholio / Fotofolio, subtle bilingual 設計師 flourish,
// WebGL accent via the FieldMount seam). For now: a minimal, labelled placeholder.
export default async function GatePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="section gate" data-section="gate">
      <div className="container gate-inner">
        <p className="eyebrow">{dict.gate.eyebrow}</p>

        <h1 className="gate-title display">Giulia Breida</h1>
        <p className="gate-tagline hand">{dict.gate.tagline}</p>
        <p className="gate-hanzi" lang="zh" aria-hidden="true">
          {HANZI}
        </p>

        <nav className="gate-doors" aria-label={dict.gate.doors}>
          <Link href="/grapholio" className="door">
            <span className="door-name display">Grapholio</span>
            <span className="door-sub">{dict.grapholio.label}</span>
          </Link>
          <Link href="/fotofolio" className="door">
            <span className="door-name display">Fotofolio</span>
            <span className="door-sub">{dict.fotofolio.label}</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
