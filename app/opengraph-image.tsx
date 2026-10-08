import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { loadPoppins } from "@/lib/og-font";

export const alt =
  "O canal do Fabricio Gonçalvez no WhatsApp. Comunidade FGZ, entrada gratuita.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEADLINE = "O canal do Fabricio Gonçalvez no WhatsApp";
const BRAND = "Comunidade FGZ";
const FOOT = "5º no Top Traders InfoMoney 2025 · 20 anos de mercado";

// Chamada: fundo escuro esfumaçado, foto em preto e branco, marca no canto.
export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "app/og-portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;
  const [bold, light] = await Promise.all([
    loadPoppins(700, `${HEADLINE}${BRAND}FG`),
    loadPoppins(300, FOOT),
  ]);
  const fonts = [
    bold && { name: "Poppins", data: bold, weight: 700 as const, style: "normal" as const },
    light && { name: "Poppins", data: light, weight: 300 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(160deg, #2a2a2a 0%, #141414 46%, #080808 100%)",
          color: "#f5f5f5",
          fontFamily: "Poppins",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 56px",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700 }}>{BRAND}</div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {HEADLINE}
          </div>
          <div style={{ fontSize: 24, fontWeight: 300, color: "#d0d0d0" }}>
            {FOOT}
          </div>
        </div>

        <div style={{ display: "flex", position: "relative", width: 430 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={430} height={630} alt="" />
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 40,
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#f5f5f5",
              color: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            FG
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
