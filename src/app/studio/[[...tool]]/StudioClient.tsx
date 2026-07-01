"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

// Config (Sanity's route matcher, plugin resources, ...) holds functions, so it
// must be constructed here, inside the Client Component, rather than passed
// down as a prop from the Server Component page — functions can't cross that
// RSC boundary.
export default function StudioClient() {
  return <NextStudio config={config} />;
}
