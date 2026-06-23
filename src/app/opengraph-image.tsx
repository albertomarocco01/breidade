import { ImageResponse } from "next/og";

export const alt = "Giulia Breida — Graphic Designer & Photographer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f4f1ea";
const INK = "#15140f";
const DIM = "#6b675c";
const ACCENT = "#ff2e63";

// Fetch Space Grotesk as TTF (Google serves truetype to unrecognised UAs, which
// is what Satori needs). Subsetted to the glyphs we render. Wrapped so a failed
// fetch (e.g. offline build) gracefully falls back to next/og's built-in font.
async function loadGrotesk(text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&text=${encodeURIComponent(
      text,
    )}`;
    const css = await (await fetch(url)).text();
    const src = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
    )?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

// TODO(Prompt 2): richer OG art (handwritten wordmark via breida-hand, the two
// souls). For now: a clean, on-brand bold card.
export default async function Image() {
  const name = "Giulia Breida";
  const eyebrow = "graphic designer & photographer · torino";
  const domain = "breidade.com";
  const hanzi = "設計師";
  const font = await loadGrotesk(`${name}${eyebrow}${domain}${hanzi}·.`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px",
          background: PAPER,
          color: INK,
          fontFamily: font ? "Space Grotesk" : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 27,
            letterSpacing: "0.28em",
            color: DIM,
            textTransform: "lowercase",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            fontSize: 128,
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          <span>{name}</span>
          <span style={{ color: ACCENT }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 27,
            letterSpacing: "0.12em",
            color: DIM,
          }}
        >
          <span>{domain}</span>
          <span style={{ fontSize: 40, color: INK }}>{hanzi}</span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(font
        ? {
            fonts: [
              {
                name: "Space Grotesk",
                data: font,
                weight: 700 as const,
                style: "normal" as const,
              },
            ],
          }
        : {}),
    },
  );
}
