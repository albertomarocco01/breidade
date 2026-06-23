// Fixed full-screen fractal-noise grain. Blend mode + opacity are token-driven
// (--grain-blend / --grain-opacity), so the texture adapts to each section's
// canvas (multiply on the bold light grapholio, softer on the quiet fotofolio).
export function Grain() {
  return (
    <svg className="grain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves={2}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  );
}
