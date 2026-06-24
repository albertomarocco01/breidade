// HeatHaze — SVG filter defs for the "water shimmer / heat-haze" effect: a slow
// feTurbulence whose frequency morphs over time, fed into feDisplacementMap so any
// element with `filter: url(#heat-haze)` ripples gently, as if seen through water
// or the mirage above hot asphalt. Kept in a 0×0 hidden-but-rendered SVG (NOT
// display:none, so the filter id still resolves from CSS). Static markup — the
// SMIL <animate> runs natively in the browser, no JS or hydration needed.
//
// TRIAL SCOPE: currently wired only to the gate header (see header.css / gate.css).
// PERF note: the full-screen grain is dropped on mobile for jank reasons, but this
// filter only covers the few small header glyphs, so its per-frame cost is tiny.
export function HeatHaze() {
  return (
    <svg className="svg-defs" aria-hidden="true" focusable="false" width="0" height="0">
      <defs>
        <filter
          id="heat-haze"
          x="-35%"
          y="-35%"
          width="170%"
          height="170%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.028"
            numOctaves={2}
            seed={7}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="18s"
              values="0.009 0.028;0.013 0.034;0.009 0.028"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
