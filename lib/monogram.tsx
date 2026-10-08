import { ImageResponse } from "next/og";
import { loadPoppins } from "@/lib/og-font";

// Monograma FG na tinta, para favicon e ícone da tela inicial.
export async function monogramImage(px: number) {
  const bold = await loadPoppins(700, "FG");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          borderRadius: px <= 64 ? px * 0.22 : 0,
          color: "#f5f5f5",
          fontFamily: "Poppins",
          fontWeight: 700,
          fontSize: px * 0.46,
          letterSpacing: -px * 0.02,
          paddingTop: px * 0.03,
        }}
      >
        FG
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: bold
        ? [{ name: "Poppins", data: bold, weight: 700, style: "normal" }]
        : undefined,
    }
  );
}
