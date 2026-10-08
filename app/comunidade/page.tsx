import Image from "next/image";
import LeadForm from "@/app/LeadForm";
import { SITE_URL } from "@/app/layout";
import { Marquee } from "@/components/ui/marquee";
import { Faq, Stats, StickyCta, type Stat } from "./sections";

/**
 * Números da seção "Quem assina". Para mostrar audiência (seguidores,
 * inscritos, membros do canal), adicione itens aqui — use apenas
 * números reais e atuais. Ex.:
 *   { value: 120, suffix: " mil", label: "seguidores no Instagram" },
 */
const STATS: Stat[] = [
  { value: 20, suffix: " anos", label: "de mercado financeiro" },
  { value: 5, suffix: "º", label: "lugar no Top Traders InfoMoney 2025" },
  { value: 2, label: "estratégias autorais: Alaska & Square" },
  { value: 0, prefix: "R$ ", label: "para entrar e acompanhar o canal" },
];

const CREDENTIALS = [
  "5º no Top Traders InfoMoney 2025",
  "Sócio da Genial Investimentos",
  "20 anos de mercado",
  "Criador do Alaska & Square",
  "Visto em InfoMoney, Genial e Nelogica",
];

const CONTENTS = [
  {
    n: "01",
    t: "Análises",
    d: "A leitura do Fabricio sobre o mercado, publicada no momento em que ela importa.",
  },
  {
    n: "02",
    t: "Setups de mini índice",
    d: "Os setups que ele acompanha no mini índice, explicados de forma direta.",
  },
  {
    n: "03",
    t: "Rotina sem filtro",
    d: "Os bastidores de quem vive do mercado há 20 anos: preparação, disciplina e método.",
  },
];

const WHY = [
  {
    t: "Seu número fica oculto",
    d: "Em canais do WhatsApp ninguém vê o seu telefone, nem o Fabricio, nem os outros seguidores.",
  },
  {
    t: "Sem conversa paralela",
    d: "Só o Fabricio publica. Nada de grupo lotado com centenas de mensagens.",
  },
  {
    t: "Você no controle",
    d: "Silencie quando quiser e deixe de seguir com um toque, a qualquer momento.",
  },
];

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
      image: `${SITE_URL}/fabricio.jpg`,
      description:
        "Trader profissional com 20 anos de mercado, 5º lugar no Top Traders InfoMoney 2025, sócio da Genial Investimentos e criador das estratégias Alaska & Square.",
      worksFor: { "@type": "Organization", name: "Genial Investimentos" },
      sameAs: [
        "https://www.instagram.com/fabricio_goncalvez/",
        "https://www.youtube.com/c/fabriciogoncalvez",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ["É gratuito mesmo?", "Sim. Entrar e acompanhar o canal não custa nada."],
        [
          "Outras pessoas vão ver o meu número?",
          "Não. Em canais do WhatsApp o seu número fica oculto: nem o Fabricio nem os outros seguidores conseguem vê-lo.",
        ],
      ].map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Comunidade() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="grain">
        {/* ============ CAPA ============ */}
        <section className="grid lg:min-h-svh lg:grid-cols-[1.08fr_1fr]">
          <div className="relative isolate flex min-h-[92svh] flex-col justify-between overflow-hidden bg-cover px-5 pt-5 pb-8 text-paper sm:px-8 lg:sticky lg:top-0 lg:h-svh lg:min-h-0 lg:px-12 lg:pt-8 lg:pb-12">
            <Image
              src="/fabricio.jpg"
              alt="Fabricio Gonçalvez, sentado, sorrindo, de camiseta preta"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="-z-10 object-cover object-[50%_18%] lg:object-[50%_24%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(21,18,14,.55)_0%,rgba(21,18,14,0)_22%,rgba(21,18,14,0)_42%,rgba(21,18,14,.88)_78%,#15120e_100%)]"
            />

            {/* Cabeçalho de revista */}
            <header className="animate-rise">
              <div className="flex items-end justify-between gap-4 border-b border-paper/30 pb-3">
                <span className="font-serif text-[2.1rem] leading-none tracking-tight sm:text-5xl">
                  Comunidade <em className="italic">FGZ</em>
                </span>
                <span className="kicker hidden text-paper/70 sm:block">
                  Canal oficial · WhatsApp
                </span>
              </div>
              <div className="kicker mt-2 flex justify-between text-paper/60">
                <span>Mercado · Mini índice</span>
                <span>Gratuito</span>
              </div>
            </header>

            <div className="animate-rise [animation-delay:.15s]">
              <p className="kicker mb-4 text-green-light">● Na capa</p>
              <h1 className="max-w-[13ch] font-serif text-[2.9rem] leading-[0.98] font-normal tracking-[-0.02em] text-balance sm:text-6xl xl:text-[5.4rem]">
                Acompanhe <em className="italic">de perto</em> um dos melhores
                traders do Brasil.
              </h1>
              <p className="mt-5 border-t border-paper/25 pt-3 text-sm text-paper/75">
                <span className="font-medium text-paper">Fabricio Gonçalvez</span>{" "}
                · trader profissional e sócio da Genial Investimentos
              </p>
              <a href="#entrar" className="btn mt-6 lg:!hidden">
                Entrar no canal grátis
                <Arrow />
              </a>
            </div>
          </div>

          {/* Ficha de inscrição */}
          <div className="px-5 py-10 sm:px-8 lg:flex lg:flex-col lg:justify-center lg:px-14 lg:py-16 xl:px-20">
            <div className="mx-auto w-full max-w-[34rem]">
              <p className="animate-rise font-serif text-[1.45rem] leading-snug text-ink-2 [animation-delay:.25s] md:text-[1.6rem]">
                As análises, os setups de mini índice e a rotina sem filtro do
                Fabricio, <em>direto no seu WhatsApp</em> e de graça.
              </p>

              <ul className="mt-6 grid grid-cols-3 border-y border-ink text-ink">
                {[
                  ["5º", "Top Traders InfoMoney 2025"],
                  ["20", "anos de mercado"],
                  ["R$ 0", "para entrar"],
                ].map(([big, small], i) => (
                  <li
                    key={small}
                    className={`py-3 ${i ? "border-l border-rule pl-3" : "pr-3"}`}
                  >
                    <span className="block font-serif text-2xl leading-none md:text-3xl">
                      {big}
                    </span>
                    <span className="mt-1 block text-[0.72rem] leading-tight text-muted">
                      {small}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                id="entrar"
                className="mt-8 scroll-mt-6 border border-ink/80 bg-[#f8f4ec] p-5 shadow-[6px_6px_0_0_#15120e] sm:p-7"
              >
                <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-dashed border-rule pb-3">
                  <h2 className="font-serif text-2xl leading-none">
                    Ficha de inscrição
                  </h2>
                  <span className="kicker text-green">Grátis</span>
                </div>
                <LeadForm idPrefix="hero" />
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAIXA DE CREDENCIAIS ============ */}
        <section
          aria-label="Credenciais"
          className="border-y border-ink bg-ink py-3 text-paper"
        >
          <Marquee pauseOnHover className="p-0 [--duration:38s] [--gap:0rem]">
            {CREDENTIALS.map((c) => (
              <span
                key={c}
                className="flex items-center font-serif text-lg whitespace-nowrap italic md:text-xl"
              >
                {c}
                <span aria-hidden className="mx-7 text-green-light not-italic">
                  ✦
                </span>
              </span>
            ))}
          </Marquee>
        </section>

        {/* ============ O QUE CHEGA NO CANAL ============ */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
            <div>
              <p className="kicker text-green">Nesta edição</p>
              <h2 className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
                O que chega no seu WhatsApp
              </h2>
            </div>
            <ol className="border-t border-ink">
              {CONTENTS.map((c) => (
                <li
                  key={c.n}
                  className="grid grid-cols-[3.2rem_1fr] gap-x-4 border-b border-rule py-7 md:grid-cols-[4.5rem_1fr_1.3fr] md:items-baseline"
                >
                  <span className="font-mono text-sm text-muted">{c.n}</span>
                  <h3 className="font-serif text-2xl leading-tight md:text-[1.75rem]">
                    {c.t}
                  </h3>
                  <p className="col-start-2 mt-2 leading-relaxed text-ink-2 md:col-start-3 md:mt-0">
                    {c.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ POR QUE UM CANAL ============ */}
        <section className="border-y border-rule bg-paper-2">
          <div className="mx-auto grid max-w-6xl md:grid-cols-3">
            {WHY.map((w, i) => (
              <div
                key={w.t}
                className={`px-5 py-10 sm:px-8 md:py-14 ${
                  i ? "border-t border-rule md:border-t-0 md:border-l" : ""
                }`}
              >
                <h3 className="font-serif text-2xl leading-tight">{w.t}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{w.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ QUEM ASSINA ============ */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <article>
              <p className="kicker text-green">Quem assina</p>
              <h2 className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Fabricio Gonçalvez
              </h2>
              <p className="dropcap mt-8 text-lg leading-relaxed text-ink-2 md:text-xl md:leading-relaxed">
                Fabricio Gonçalvez tem 20 anos de mercado financeiro. É sócio da
                Genial Investimentos, criador das estratégias Alaska &amp; Square
                e ficou em 5º lugar no ranking Top Traders InfoMoney 2025.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink-2 md:text-xl md:leading-relaxed">
                No canal, ele divide o que normalmente fica atrás da tela: a
                leitura do mercado, os setups e a rotina de quem vive disso.
              </p>
            </article>
            <Stats items={STATS} />
          </div>
        </section>

        {/* ============ PERGUNTAS ============ */}
        <section className="border-t border-rule">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-8 md:grid-cols-[1fr_2fr] md:gap-12 md:py-28">
            <div>
              <p className="kicker text-green">Antes de entrar</p>
              <h2 className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Perguntas frequentes
              </h2>
            </div>
            <Faq />
          </div>
        </section>

        {/* ============ CHAMADA FINAL ============ */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <p className="kicker text-green-light">Pregão de amanhã</p>
            <h2 className="mt-4 max-w-[16ch] font-serif text-5xl leading-[1] tracking-[-0.02em] text-balance md:text-7xl">
              O mercado abre às 9h. Esteja <em>no canal</em> antes.
            </h2>
            <a
              href="#entrar"
              className="btn mt-10 !w-auto !bg-paper !px-8 !text-ink hover:!bg-white"
            >
              Preencher a ficha
              <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-ink pb-28 text-paper/55 lg:pb-10">
        <div className="mx-auto max-w-6xl border-t border-paper/15 px-5 pt-8 text-sm leading-relaxed sm:px-8">
          <p className="max-w-3xl">
            Conteúdo educacional e informativo, sem recomendação ou garantia de
            resultado. Operações no mercado financeiro envolvem risco de perda.
          </p>
          <p className="mt-3">
            © {new Date().getFullYear()} Comunidade FGZ · Fabricio Gonçalvez
          </p>
        </div>
      </footer>

      <StickyCta />
    </>
  );
}
