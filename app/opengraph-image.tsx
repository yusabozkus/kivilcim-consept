import { ImageResponse } from "next/og";

export const alt = "Kıvılcım Creative Collective";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          background: "#101522",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 480,
            height: 480,
            borderRadius: 999,
            border: "86px solid #ff6b35",
            right: -130,
            top: -170,
            opacity: 0.9,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: 19,
              background: "#ff6b35",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 7 }}>
            KIVILCIM
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 0.95, fontWeight: 900, letterSpacing: -6 }}>
            BUILD WHAT MATTERS,
          </div>
          <div style={{ marginTop: 10, color: "#ff6b35", fontSize: 96, lineHeight: 0.95, fontWeight: 900, letterSpacing: -6 }}>
            TOGETHER.
          </div>
          <div style={{ marginTop: 44, fontSize: 21, letterSpacing: 4, color: "rgba(255,255,255,.45)" }}>
            CREATIVE TECHNOLOGY COLLECTIVE · ISTANBUL
          </div>
        </div>
      </div>
    ),
    size
  );
}
