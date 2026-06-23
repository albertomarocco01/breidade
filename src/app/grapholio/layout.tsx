// Grapholio section shell. Sets data-section="grapholio" so globals.css swaps to
// the light/white canvas + high-energy bold palette + strong type token set.
// Wraps both /grapholio and /grapholio/[slug].
export default function GrapholioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="section" data-section="grapholio">
      {children}
    </div>
  );
}
