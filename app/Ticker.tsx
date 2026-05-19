/**
 * Fita de cotações — motivo de trader. Marquee horizontal contínuo,
 * pausa no hover, desliga em prefers-reduced-motion (CSS).
 * Valores ilustrativos, fixos (sem dado ao vivo).
 */

type Q = { s: string; v: string; c: string; up: boolean };

const QUOTES: Q[] = [
  { s: "WIN", v: "132.480", c: "+0,84%", up: true },
  { s: "WDO", v: "5.412,5", c: "-0,31%", up: false },
  { s: "IBOV", v: "129.740", c: "+0,67%", up: true },
  { s: "IND", v: "132.510", c: "+0,82%", up: true },
  { s: "DOL", v: "5.413,0", c: "-0,29%", up: false },
  { s: "PETR4", v: "38,21", c: "+1,12%", up: true },
  { s: "VALE3", v: "61,07", c: "-0,44%", up: false },
  { s: "S&P", v: "5.870", c: "+0,38%", up: true },
  { s: "BTC", v: "US$ 94,2K", c: "+2,15%", up: true },
  { s: "OURO", v: "US$ 2.658", c: "+0,21%", up: true },
];

function Row({ aria }: { aria?: boolean }) {
  return (
    <div className="tick-row" aria-hidden={aria ? undefined : true}>
      {QUOTES.map((q, i) => (
        <span className="tick" key={`${q.s}-${i}`}>
          <span className="tick-s">{q.s}</span>
          <span className="tick-v">{q.v}</span>
          <span className={`tick-c ${q.up ? "up" : "dn"}`}>
            {q.up ? "▲" : "▼"} {q.c.replace(/^[+-]/, "")}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="ticker" role="marquee" aria-label="Cotações ilustrativas">
      <div className="ticker-track">
        <Row aria />
        <Row />
      </div>
    </div>
  );
}
