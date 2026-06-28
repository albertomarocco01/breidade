"use client";

import { ShaderField } from "@/components/canvas/ShaderField";

/**
 * /lab — superficie usa-e-getta per VEDERE il WebGL field staged.
 * Non linkata da nessuna parte; vai su /lab. Eredita chrome/cursore/grana dal
 * layout root. A differenza delle sezioni reali (--bg opaco) questa pagina non
 * dipinge un fondo solido, quindi il tuo ShaderField si vede finalmente intero.
 * Non richiede nulla da Higgsfield — è il GLSL che hai già scritto tu.
 */
export default function LabPage() {
  return (
    <main
      data-section="grapholio"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40, // sopra il content, sotto grana/cursore
        background:
          "linear-gradient(120deg, var(--tomato), var(--blue) 55%, var(--teal))",
      }}
    >
      {/* il campo che avevi staged — colori = accent del brand */}
      <ShaderField accent="#ff3e2b" accent2="#0a369d" accent3="#0dcd9d" />

      <p
        style={{
          position: "absolute",
          left: "var(--pad)",
          bottom: "var(--pad)",
          margin: 0,
          zIndex: 1,
          fontFamily: "var(--stack-mono)",
          fontSize: "0.78rem",
          letterSpacing: "0.08em",
          color: "var(--cream)",
          mixBlendMode: "difference",
        }}
      >
        /lab · shaderfield · il tuo GLSL, live
      </p>
    </main>
  );
}