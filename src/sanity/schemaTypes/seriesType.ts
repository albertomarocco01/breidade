import { defineField, defineType } from "sanity";

/** Mirrors `Series` in src/lib/fotofolio.ts — one /fotofolio/<slug> series. */
export const seriesType = defineType({
  name: "series",
  title: "Fotofolio series",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Structural only — never rendered as a caption on a photo.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [{ type: "photo" }],
    }),
  ],
  preview: {
    select: { title: "title", media: "cover" },
  },
});
