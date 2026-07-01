import { defineField, defineType } from "sanity";

/** Mirrors the `Localized` type in src/lib/grapholio.ts — EN source + IT translation. */
export const localizedStringType = defineType({
  name: "localizedString",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text" }),
    defineField({ name: "it", title: "Italiano", type: "text" }),
  ],
});
