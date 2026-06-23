// Soft ambient wash, fixed behind content. Colours come from the active section's
// tokens (--glow-1 / --glow-2 in globals.css), so it shifts per section.
export function Glow() {
  return <div className="glow" aria-hidden="true" />;
}
