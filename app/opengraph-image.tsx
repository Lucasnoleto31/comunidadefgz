import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Fabricio Gonçalvez no seu WhatsApp — canal gratuito da Comunidade FGZ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEADLINE = "Acompanhe de perto um dos melhores traders do Brasil.";

// Carrega a Newsreader (serifa da página) só com os glifos usados.
// Se a busca falhar no build, a imagem sai com a fonte padrão.
async function loadSerif(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@72,400&text=${encodeURIComponent(text)}`
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "app/og-portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;
  const serif = await loadSerif(`Comunidade FGZ${HEADLINE}`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f3eee4",
          color: "#15120e",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderBottom: "2px solid #15120e",
              paddingBottom: 14,
            }}
          >
            <span style={{ fontFamily: "Serif", fontSize: 44 }}>
              Comunidade FGZ
            </span>
            <span style={{ fontSize: 18, letterSpacing: 3, color: "#6c6457" }}>
              CANAL · WHATSAPP
            </span>
          </div>

          <div
            style={{
              fontFamily: "Serif",
              fontSize: 70,
              lineHeight: 1.02,
              letterSpacing: -1.5,
            }}
          >
            {HEADLINE}
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              fontSize: 20,
              whiteSpace: "nowrap",
              color: "#3b352d",
              borderTop: "1px solid #cbc0ac",
              paddingTop: 16,
            }}
          >
            <span style={{ color: "#17633f", fontWeight: 600 }}>
              5º Top Traders InfoMoney 2025
            </span>
            <span>·</span>
            <span>20 anos de mercado</span>
            <span>·</span>
            <span>Gratuito</span>
          </div>
        </div>

        <div style={{ display: "flex", width: 430, height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            width={430}
            height={630}
            alt=""
            style={{ objectFit: "cover", width: 430, height: 630 }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif
        ? [{ name: "Serif", data: serif, weight: 400, style: "normal" }]
        : undefined,
    }
  );
}
