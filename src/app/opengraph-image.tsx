import { ImageResponse } from "next/og";

export const alt = "ТЕХДЕЛО 40 — Concept / Demo Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#141713",
        color: "#fff",
        padding: 72,
        fontFamily: "Arial",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 700 }}>
        <span>ТЕХДЕЛО 40</span>
        <span style={{ color: "#DFFF43" }}>CONCEPT / DEMO</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", maxWidth: 950, fontSize: 78, lineHeight: 0.98, fontWeight: 800, letterSpacing: -4 }}>
          Техника под задачу.<br />Цена и подача — до выезда.
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#aeb4aa" }}>
          UX · Figma · Next.js · Responsive implementation
        </div>
      </div>
      <div style={{ display: "flex", width: 260, height: 14, background: "#DFFF43" }} />
    </div>,
    size,
  );
}
