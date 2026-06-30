"use client";

// The actual WebGL surface — ALWAYS reached through a dynamic(ssr:false) import
// (see ShaderField), so three / @react-three/fiber never enter the initial chunk
// and never run on the server. A single full-clip-space quad runs a flowing
// risograph gradient tinted by the project's two accent colours, with a gentle
// pointer parallax. This is decoration: a CSS-gradient fallback always sits
// underneath, so nothing here is load-bearing.

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // ignore the camera — position the quad directly in clip space so it fills
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec2 uPointer;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 3.0 + uPointer * 0.5;
    float t = uTime * 0.07;
    float n = noise(p + t) * 0.6 + noise(p * 2.0 - t) * 0.4;
    float g = smoothstep(0.15, 0.95, uv.x + n * 0.55 - 0.2);
    vec3 col = mix(uColorA, uColorB, g);
    float c = smoothstep(0.55, 1.0, noise(p * 1.5 + t * 1.4));
    col = mix(col, uColorC, c * 0.5);
    float v = smoothstep(1.35, 0.25, length(uv - 0.5));
    col *= 0.82 + 0.18 * v;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function FieldPlane({
  colorA,
  colorB,
  colorC,
}: {
  colorA: string;
  colorB: string;
  colorC: string;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  // THREE.Color converts each sRGB hex uniform to linear (ColorManagement on). The
  // shader output is then ACES-tone-mapped + sRGB-encoded to the canvas (R3F
  // defaults: toneMapping=ACESFilmic, material.toneMapped=true), so the on-screen
  // colours are intentionally softened/shifted from the raw hex — the established
  // look. Built once.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uColorC: { value: new THREE.Color(colorC) },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    const ptr = m.uniforms.uPointer.value as THREE.Vector2;
    ptr.x += (state.pointer.x - ptr.x) * 0.04;
    ptr.y += (state.pointer.y - ptr.y) * 0.04;
  });

  return (
    // frustumCulled={false}: the vertex shader writes clip space directly and
    // ignores the camera, so the geometry's bounding-sphere cull test is
    // meaningless here — disabling it guarantees the full-screen quad always draws.
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderFieldCanvas({
  colorA,
  colorB,
  colorC,
}: {
  colorA: string;
  colorB: string;
  colorC: string;
}) {
  return (
    <Canvas
      // No antialias: a full-clip-space quad has no internal hard edges to alias
      // (its only edges are the canvas border), so MSAA is wasted fill. Must be set
      // explicitly to false — R3F's default gl props (antialias: true) only get
      // overridden by keys actually present in this object.
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 1] }}
      style={{ position: "absolute", inset: 0 }}
    >
      <FieldPlane colorA={colorA} colorB={colorB} colorC={colorC} />
    </Canvas>
  );
}
