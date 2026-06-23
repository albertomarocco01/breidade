// FieldMount — STUB. The seam for Prompt 2's shared WebGL field.
//
// three / @react-three/fiber / @react-three/drei are installed, but NO canvas is
// mounted yet. For now this renders nothing.
//
// TODO(Prompt 2): turn this into a "use client" component that, gated on
// AppProvider's `fieldReady` + `!reducedMotion` (see useApp), lazily mounts the
// shared, code-split WebGL field (dynamic import, ssr:false) so three/r3f never
// enter the initial chunk and 3D stays off the LCP path.
export function FieldMount() {
  return null;
}
