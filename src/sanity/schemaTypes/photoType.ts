import { defineField, defineType } from "sanity";

/** Mirrors `PhotoImage` in src/lib/fotofolio.ts — one frame on the /fotofolio wall. */
export const photoType = defineType({
  name: "photo",
  title: "Photo",
  type: "object",
  fields: [
    defineField({
      name: "src",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shape",
      title: "Mosaic shape",
      type: "string",
      options: {
        list: [
          { title: "Portrait", value: "is-portrait" },
          { title: "Landscape", value: "is-land" },
          { title: "Square", value: "is-sq" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { media: "src", subtitle: "shape" },
  },
});
