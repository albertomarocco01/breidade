"use client";

// Root TEMPLATE — App-Router-native inter-route transitions (the AI Studio
// scale / brightness / slide page changes), without faking SPA routing. A
// template (unlike a layout) is given a unique key and REMOUNTS when its segment
// changes, so the per-world CSS keyframe in globals.css (.route[data-route=…])
// replays on every world change. We tag the wrapper by first path segment; the
// keyframes resolve `transform` to none at rest (no lingering containing block)
// and collapse to an instant swap under prefers-reduced-motion.

import { usePathname } from "next/navigation";

function sectionFor(pathname: string): string {
  if (pathname.startsWith("/grapholio")) return "grapholio";
  if (pathname.startsWith("/fotofolio")) return "fotofolio";
  if (pathname.startsWith("/about")) return "about";
  return "gate";
}

export default function RouteTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="route" data-route={sectionFor(pathname)}>
      {children}
    </div>
  );
}
