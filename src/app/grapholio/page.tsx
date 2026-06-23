import Link from "next/link";
import { PROJECTS } from "@/lib/grapholio";
import { getDictionary, getLocale } from "@/lib/i18n";

// GRAPHOLIO (/grapholio) — the graphic-design grid. SCAFFOLD ONLY.
// TODO(Prompt 2): real bold gallery — handwritten project titles (--font-hand),
// per-project accent colour, cover imagery (next/image), hover/scroll motion,
// WebGL accents. For now: a semantic grid of links to each project.
export default async function GrapholioPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <section className="container" aria-label={dict.grapholio.aria}>
      <header className="sect-head">
        <span className="sect-kicker">grapholio</span>
        <h1 className="sect-title display">{dict.grapholio.label}</h1>
        <p className="sect-intro">{dict.grapholio.intro}</p>
      </header>

      <ul className="g-grid" role="list">
        {PROJECTS.map((project) => (
          <li key={project.id}>
            <Link
              href={`/grapholio/${project.slug}`}
              className="g-card"
              style={
                project.accent
                  ? ({ "--card-accent": project.accent } as React.CSSProperties)
                  : undefined
              }
            >
              {/* Prompt 2: title becomes Giulia's handwriting (--font-hand). */}
              <span className="g-card-title hand">{project.title}</span>
              <span className="g-card-cat">{project.category}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
