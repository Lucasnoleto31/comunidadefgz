import Image from "next/image";
import LeadForm from "./LeadForm";
import Nav from "./Nav";
import Candles from "./Candles";

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dash() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 12h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Chevron() {
  return (
    <svg
      className="chev"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FACTS = [
  { v: "5º", k: "Top Traders InfoMoney 2025" },
  { v: "17 anos", k: "vivendo do mercado" },
  { v: "Sócio", k: "Genial Investimentos" },
  { v: "Alaska & Square", k: "estratégias autorais" },
];

const LIST = [
  {
    t: "Análises e setups, com o porquê",
    d: "As leituras de mercado e os setups de mini índice que o Fabricio opera, incluindo quando a decisão certa é ficar de fora.",
  },
  {
    t: "A verdade sobre viver disso",
    d: "Os bastidores de quem opera de verdade: gestão de risco, dias no vermelho, disciplina e o lado emocional que quase ninguém mostra.",
  },
  {
    t: "Perto do Fabricio",
    d: "Avisos oficiais em primeira mão e uma comunidade que segue o mesmo método. Você deixa de aprender sozinho.",
  },
];

const FAQ = [
  {
    q: "A comunidade é gratuita?",
    a: "Sim. A entrada na comunidade oficial do Fabricio no WhatsApp é gratuita. Basta preencher o formulário.",
  },
  {
    q: "Como funciona depois que eu entro?",
    a: "Assim que você confirma seus dados, é direcionado para a comunidade oficial no WhatsApp. É lá que ficam os avisos, as análises e o contato com a equipe.",
  },
  {
    q: "Isto é recomendação de investimento?",
    a: "Não. O conteúdo é educacional e mostra a rotina e o método do Fabricio. Nenhuma análise representa recomendação ou garantia de resultado. Decisões de investimento são de sua responsabilidade.",
  },
  {
    q: "Preciso já saber operar?",
    a: "Não. A comunidade recebe desde quem está começando até quem já opera. O foco é método, gestão de risco e a realidade do mercado.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main id="topo">
        {/* ---------- HERO ---------- */}
        <section className="hero">
          <Candles />
          <div className="wrap hero-grid">
            <div>
              <h1 className="rise">
                Acompanhe de perto um dos melhores traders do{" "}
                <em>Brasil</em>
              </h1>
              <p className="hero-sub rise-2">
                As análises, os setups de mini índice e a rotina sem filtro do
                Fabricio Gonçalvez, direto no seu WhatsApp e de graça.
              </p>
              <div className="cred-line rise-3">
                <span>5º no Top Traders InfoMoney 2025</span>
                <i className="sep" />
                <span>Sócio da Genial Investimentos</span>
                <i className="sep" />
                <span>17 anos de mercado</span>
              </div>
            </div>

            <div className="panel rise-2" id="entrar">
              <div className="panel-head">Entrar na comunidade</div>
              <div className="panel-sub">
                Gratuito. Leva menos de um minuto.
              </div>
              <LeadForm idPrefix="hero" />
            </div>
          </div>
        </section>

        {/* ---------- CREDIBILIDADE ---------- */}
        <section className="s slim">
          <div className="wrap">
            <div className="facts">
              {FACTS.map((f) => (
                <div className="fact" key={f.k}>
                  <div className="v">{f.v}</div>
                  <div className="k">{f.k}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- QUEM É ---------- */}
        <section className="s">
          <div className="wrap s-label">
            <div className="kicker">Quem é</div>
            <div className="bio">
              <div className="portrait">
                <Image
                  src="/fabricio.jpg"
                  alt="Fabricio Gonçalvez"
                  fill
                  sizes="(max-width: 940px) 100vw, 380px"
                  priority
                />
              </div>
              <div className="bio-body">
                <p>
                  Antes dos gráficos, foi picolé vendido na arquibancada para
                  ajudar em casa. Foi daí que o Fabricio Gonçalvez partiu.
                  Foram <strong>mais de 17 anos de mercado</strong>, erros
                  caros e disciplina até se tornar referência em day trade de
                  mini índice.
                </p>
                <p>
                  Hoje é <strong>sócio da Genial Investimentos</strong> e ficou
                  em <strong>5º lugar no Top Traders InfoMoney 2025</strong>.
                  Criou as estratégias autorais{" "}
                  <strong>Alaska &amp; Square</strong> e fundou a{" "}
                  <strong>Quants</strong>, sua empresa de robôs.
                </p>
                <blockquote className="pull serif">
                  “No trading, sobreviver é mais difícil do que ganhar.”
                  <cite>Fabricio Gonçalvez</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- O QUE VOCÊ ACOMPANHA ---------- */}
        <section className="s">
          <div className="wrap s-label">
            <div>
              <div className="kicker">Dentro</div>
              <h2 style={{ marginTop: 14, fontSize: "1.6rem" }}>
                O que você acompanha
              </h2>
            </div>
            <div className="list">
              {LIST.map((item, i) => (
                <div className="row" key={item.t}>
                  <div className="idx">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{item.t}</h3>
                    <p>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- PRA QUEM É ---------- */}
        <section className="s">
          <div className="wrap s-label">
            <div>
              <div className="kicker">Honestidade</div>
              <h2 style={{ marginTop: 14, fontSize: "1.6rem" }}>
                Pra quem é, e pra quem não é
              </h2>
            </div>
            <div className="fit">
              <div className="fit-col">
                <h3>É pra você se</h3>
                <ul>
                  <li>
                    <Check /> Quer aprender com quem vive do mercado de
                    verdade, não com vídeo de carro alugado.
                  </li>
                  <li>
                    <Check /> Aceita que método e gestão de risco vêm antes do
                    lucro.
                  </li>
                  <li>
                    <Check /> Prefere a verdade nua sobre operar a uma promessa
                    bonita de enriquecimento.
                  </li>
                </ul>
              </div>
              <div className="fit-col">
                <h3>Não é pra você se</h3>
                <ul>
                  <li>
                    <Dash /> Procura sinal mágico ou dinheiro fácil para
                    ontem.
                  </li>
                  <li>
                    <Dash /> Não topa estudar, ter disciplina nem respeitar o
                    risco.
                  </li>
                  <li>
                    <Dash /> Quer operar sob pressão para pagar conta no fim do
                    mês.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="s">
          <div className="wrap s-label">
            <div className="kicker">Dúvidas</div>
            <div className="faq">
              {FAQ.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <Chevron />
                  </summary>
                  <div className="a">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- FECHAMENTO ---------- */}
        <section className="close">
          <div className="wrap close-grid">
            <div>
              <h2>Fique perto de quem está no topo</h2>
              <p>
                A entrada é gratuita e leva menos de um minuto. Entre na
                comunidade e comece a acompanhar o Fabricio hoje.
              </p>
            </div>
            <div className="panel">
              <LeadForm idPrefix="close" />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <span>
              Fabricio Gonçalvez · Comunidade · © {new Date().getFullYear()}
            </span>
            <span>Conteúdo educacional sobre mercado financeiro</span>
          </div>
          <p className="disclaimer">
            Todo conteúdo tem finalidade educacional e informativa e não
            constitui recomendação, oferta ou solicitação de compra ou venda de
            ativos. Operações no mercado financeiro envolvem risco de perda. A
            rentabilidade passada não representa garantia de resultados futuros.
          </p>
        </div>
      </footer>
    </>
  );
}
