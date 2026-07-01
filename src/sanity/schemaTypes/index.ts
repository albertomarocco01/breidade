import { type SchemaTypeDefinition } from "sanity";

import { localizedStringType } from "./localizedStringType";
import { photoType } from "./photoType";
import { projectType } from "./projectType";
import { seriesType } from "./seriesType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localizedStringType, photoType, seriesType, projectType],
};
