import { defineField, defineType } from "sanity";

/** Mirrors `Project` in src/lib/grapholio.ts — one /grapholio/<slug> case study. */
export const projectType = defineType({
  name: "project",
  title: "Grapholio project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Handwritten display title — proper noun, never translated.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "category", title: "Category", type: "localizedString" }),
    defineField({ name: "description", title: "Description", type: "localizedString" }),
    defineField({
      name: "bg",
      title: "Background colour (hex)",
      type: "string",
      validation: (rule) => rule.regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex colour" }),
    }),
    defineField({
      name: "fg",
      title: "Foreground colour (hex)",
      type: "string",
      validation: (rule) => rule.regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex colour" }),
    }),
    defineField({
      name: "rot",
      title: "Card rotation (deg)",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "cover",
      title: "Cover",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "title", media: "cover" },
  },
});
