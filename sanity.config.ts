import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "breidade",
  title: "Giulia Breida — Studio",

  basePath: "/studio",
  projectId,
  dataset,
  schema,

  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
