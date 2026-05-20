import Image from "next/image";
import LeadForm from "./LeadForm";
import Nav from "./Nav";
import Candles from "./Candles";
import Ticker from "./Ticker";
import { SITE_URL } from "./layout";

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Comunidade FGZ",
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Comunidade FGZ",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      founder: { "@id": `${SITE_URL}/#fabricio` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#fabricio`,
      name: "Fabricio Gonçalvez",
      jobTitle: "Trader profissional",
      description:
        "Trader profissional com 20 anos de mercado, 5º lugar no Top Traders InfoMoney 2025, sócio da Genial Investimentos e criador das estratégias Alaska & Square.",
      worksFor: { "@type": "Organization", name: "Genial Investimentos" },
      sameAs: [
        "https://www.instagram.com/fabricio_goncalvez/",
        "https://www.youtube.com/c/fabriciogoncalvez",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <main>
        <section className="hero">
          <Candles />
          <div className="wrap hero-grid">
            <div>
              <div className="who rise">
                <div className="who-avatar">
                  <Image
                    src="/fabricio.jpg"
                    alt="Fabricio Gonçalvez"
                    width={80}
                    height={80}
                    priority
                  />
                </div>
                <div className="who-meta">
                  <div className="who-name">Fabricio Gonçalvez</div>
                  <div className="who-role">
                    Trader profissional · Sócio Genial Investimentos
                  </div>
                </div>
              </div>

              <h1 className="rise-2">
                Acompanhe de perto um dos melhores traders do{" "}
                <em>Brasil</em>
              </h1>
              <p className="hero-sub rise-3">
                As análises, os setups de mini índice e a rotina sem filtro do
                Fabricio Gonçalvez, direto no seu WhatsApp e de graça.
              </p>
              <div className="cred-line rise-3">
                <span>5º no Top Traders InfoMoney 2025</span>
                <i className="sep" />
                <span>20 anos de mercado</span>
                <i className="sep" />
                <span>Alaska &amp; Square</span>
              </div>
              <div className="seen-on rise-3" aria-label="Presença na mídia">
                <span className="seen-label">Visto em</span>
                <span>InfoMoney</span>
                <i className="dotsep" />
                <span>BTG Pactual</span>
                <i className="dotsep" />
                <span>Genial</span>
                <i className="dotsep" />
                <span>Nelogica</span>
              </div>
            </div>

            <div className="panel rise-2" id="entrar">
              <div className="panel-head">Entre na comunidade</div>
              <div className="panel-sub">
                Gratuito. Vagas por ordem de chegada.
              </div>
              <ul className="benefits-mini" aria-label="Você recebe">
                <li>
                  <Check /> Análises e setups todos os dias
                </li>
                <li>
                  <Check /> A rotina real de quem vive disso
                </li>
                <li>
                  <Check /> Avisos oficiais e contato direto
                </li>
              </ul>
              <LeadForm idPrefix="hero" />
            </div>
          </div>
        </section>

        <Ticker />
      </main>

      <footer>
        <div className="wrap">
          <p className="disclaimer">
            Conteúdo educacional e informativo, sem recomendação ou garantia de
            resultado. Operações no mercado financeiro envolvem risco de perda.
            © {new Date().getFullYear()} Comunidade FGZ · Fabricio Gonçalvez.
          </p>
        </div>
      </footer>
    </>
  );
}
