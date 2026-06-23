import type { MetadataRoute } from "next";
import { projectSlugs } from "@/lib/grapholio";

const SITE = "https://breidade.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE}/grapholio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/fotofolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs().map((slug) => ({
    url: `${SITE}/grapholio/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
