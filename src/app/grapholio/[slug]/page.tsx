import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projectSlugs } from "@/lib/grapholio";
import { getDictionary, getLocale } from "@/lib/i18n";

// Next 16: `params` is a Promise — await it (this is an async Server Component).
type Props = { params: Promise<{ slug: string }> };

// Prerender exactly the known projects; anything else 404s (dynamicParams=false).
export function generateStaticParams(): { slug: string }[] {
  return projectSlugs().map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title, // -> "<title>Boem — Giulia Breida</title>" via template
    description: `${project.title} — ${project.category}. Grapholio · Giulia Breida.`,
  };
}

// GRAPHOLIO PROJECT (/grapholio/[slug]) — single project. STUB ONLY.
// TODO(Prompt 2): full case study — handwritten title, project gallery
// (project.gallery via next/image), accent-driven layout, next/prev nav, WebGL.
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <article
      className="container project"
      style={
        project.accent
          ? ({ "--card-accent": project.accent } as React.CSSProperties)
          : undefined
      }
    >
      <Link href="/grapholio" className="back-link">
        ← {dict.grapholio.label}
      </Link>

      {/* Prompt 2: title rendered in Giulia's handwriting (--font-hand). */}
      <h1 className="project-title hand">{project.title}</h1>
      <p className="project-cat">{project.category}</p>

      <p className="project-todo">{/* placeholder */}— scaffold —</p>
    </article>
  );
}
