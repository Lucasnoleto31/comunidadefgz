import LeadForm from "./LeadForm";
import Nav from "./Nav";
import Candles from "./Candles";
import Ticker from "./Ticker";
import { SITE_URL } from "./layout";

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
        "Trader profissional com mais de 17 anos de mercado, 5º lugar no Top Traders InfoMoney 2025, sócio da Genial Investimentos e criador das estratégias Alaska & Square.",
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
