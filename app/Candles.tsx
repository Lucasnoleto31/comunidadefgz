/**
 * Candles ambientes — motivo de candlestick discreto no fundo do hero.
 * Monocromático, baixa opacidade, "respiração" lenta e escalonada.
 * Sem JS: animação puramente CSS (desligada em prefers-reduced-motion).
 */

// Alturas/posições fixas (determinístico — sem aleatório por render).
const DATA = [
  { h: 54, y: 150, up: false },
  { h: 88, y: 120, up: true },
  { h: 40, y: 176, up: false },
  { h: 120, y: 92, up: true },
  { h: 66, y: 150, up: false },
  { h: 150, y: 70, up: true },
  { h: 48, y: 158, up: false },
  { h: 96, y: 118, up: false },
  { h: 132, y: 84, up: true },
  { h: 58, y: 152, up: false },
  { h: 104, y: 104, up: true },
  { h: 44, y: 172, up: false },
  { h: 116, y: 96, up: true },
  { h: 72, y: 142, up: false },
  { h: 158, y: 64, up: true },
  { h: 50, y: 160, up: false },
  { h: 92, y: 116, up: false },
  { h: 124, y: 88, up: true },
];

const STEP = 44;
const W = 16;

export default function Candles() {
  return (
    <div className="candles" aria-hidden="true">
      <svg
        viewBox={`0 0 ${DATA.length * STEP} 320`}
        preserveAspectRatio="xMidYMid slice"
      >
        {DATA.map((c, i) => {
          const cx = i * STEP + STEP / 2;
          const wickTop = c.y - 26;
          const wickBot = c.y + c.h + 26;
          return (
            <g key={i}>
              <line
                className="candle-wick"
                x1={cx}
                x2={cx}
                y1={wickTop}
                y2={wickBot}
              />
              <rect
                className={`candle-body${c.up ? " up" : ""}`}
                x={cx - W / 2}
                y={c.y}
                width={W}
                height={c.h}
                rx={2}
                style={{ animationDelay: `${(i % 6) * 0.9}s` }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
