import { PROJECTS } from "@/lib/grapholio";
import { getDictionary, getLocale } from "@/lib/i18n";
import { Gallery } from "@/components/grapholio/Gallery";

// GRAPHOLIO (/grapholio) — the graphic-design world. The expressive, hand-composed
// wall + motion lives in <Gallery> (Client Component); this server page resolves
// the locale and passes the project data + dictionary down.
export default async function GrapholioPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return <Gallery projects={PROJECTS} dict={dict} />;
}
