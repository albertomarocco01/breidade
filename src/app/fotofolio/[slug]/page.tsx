import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeries, seriesSlugs } from "@/lib/fotofolio";
import { getDictionary, getLocale } from "@/lib/i18n";
import { StoryView } from "@/components/fotofolio/StoryView";

// Next 16: `params` is a Promise — await it (this is an async Server Component).
type Props = { params: Promise<{ slug: string }> };

// Prerender exactly the known series; anything else 404s (dynamicParams=false).
export function generateStaticParams(): { slug: string }[] {
  return seriesSlugs().map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) return {};
  return {
    title: series.title,
    description: `${series.title} — Fotofolio · Giulia Breida.`,
  };
}

// FOTOFOLIO SERIES (/fotofolio/[slug]) — the full "story" page, rendered by the
// <StoryView> Client Component (darkroom hero + motion + lightbox). This server
// route resolves the locale and hands the series + dictionary down. The fotofolio
// layout already paints the carbon darkroom theme for this subtree.
export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) notFound();

  const locale = await getLocale();
  const dict = getDictionary(locale);

  return <StoryView series={series} dict={dict} />;
}
