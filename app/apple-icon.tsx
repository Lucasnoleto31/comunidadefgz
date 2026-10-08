import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Mesmo desenho do icon.svg, em PNG para a tela inicial do iPhone.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#15120e",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path
            fill="#f3eee4"
            d="M6 6.5h13v4h-1.4l-.5-1.9H12v5.2h3.4l.3-1.5H17v5.4h-1.3l-.3-1.6H12v5.6l2.2.5V24H6v-1.2l2.1-.5V9.2L6 8.7z"
          />
          <line x1="24" y1="9" x2="24" y2="26" stroke="#3fae74" strokeWidth="1.4" />
          <rect x="21.8" y="13" width="4.4" height="9" rx=".8" fill="#3fae74" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
