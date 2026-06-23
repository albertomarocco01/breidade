import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProject,
  projectSlugs,
  projectNumber,
  projectNeighbours,
} from "@/lib/grapholio";
import { getDictionary, getLocale } from "@/lib/i18n";
import { ProjectView } from "@/components/grapholio/ProjectView";

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
    title: project.title,
    description: `${project.title} — ${project.category}. Grapholio · Giulia Breida.`,
  };
}

// GRAPHOLIO PROJECT (/grapholio/[slug]) — a real case study, rendered by the
// <ProjectView> Client Component (hero shader + motion). This server route
// resolves the locale + the project's neighbours and hands them down.
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = projectNeighbours(slug);
  const number = projectNumber(slug);
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <ProjectView
      project={project}
      prev={prev}
      next={next}
      number={number}
      dict={dict}
    />
  );
}
