import { ImageResponse } from "next/og";

export const alt =
  "Comunidade FGZ · Fabricio Gonçalvez — entre e acompanhe de perto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Candles ilustrativos no fundo (determinístico).
const CANDLES = [
  { h: 70, y: 360, up: false },
  { h: 120, y: 300, up: true },
  { h: 60, y: 380, up: false },
  { h: 150, y: 250, up: true },
  { h: 90, y: 330, up: false },
  { h: 180, y: 210, up: true },
  { h: 70, y: 350, up: false },
  { h: 140, y: 260, up: true },
  { h: 100, y: 300, up: false },
  { h: 200, y: 190, up: true },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(900px 500px at 75% 0%, rgba(62,207,142,0.16), transparent 60%), #0a0a0b",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* candles ao fundo, à direita */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 120,
            display: "flex",
            alignItems: "flex-end",
            gap: 18,
            opacity: 0.5,
          }}
        >
          {CANDLES.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 26,
                height: c.h,
                borderRadius: 4,
                background: c.up
                  ? "rgba(62,207,142,0.22)"
                  : "rgba(255,255,255,0.06)",
                border: c.up
                  ? "1px solid rgba(62,207,142,0.5)"
                  : "1px solid rgba(255,255,255,0.16)",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 99,
              background: "#3ecf8e",
            }}
          />
          <div
            style={{
              fontSize: 26,
              color: "#abadb6",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Comunidade · WhatsApp
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#f2f2f3",
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 880,
            }}
          >
            Acompanhe de perto um dos melhores traders do Brasil
          </div>
          <div style={{ fontSize: 34, color: "#abadb6" }}>
            Fabricio Gonçalvez
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 24,
            color: "#74757e",
          }}
        >
          <span style={{ color: "#3ecf8e" }}>
            5º Top Traders InfoMoney 2025
          </span>
          <span>·</span>
          <span>Sócio da Genial Investimentos</span>
          <span>·</span>
          <span>20 anos de mercado</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
