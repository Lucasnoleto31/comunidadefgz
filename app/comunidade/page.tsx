import Image from "next/image";
import LeadForm from "@/app/LeadForm";
import { SITE_URL } from "@/app/layout";
import { FAQ } from "./faq";
import { Faq, ScrollProgress, StickyCta } from "./sections";

/**
 * Números (número antes do texto). O primeiro vai na tinta: um destaque só.
 * Conferidos nos perfis em NUMBERS_DATE; atualize os dois juntos, sempre
 * no formato brasileiro. O canal do WhatsApp (475 seguidores em 08/10/2026)
 * fica de fora até crescer.
 */
const NUMBERS_DATE = "08/10/2026";
const NUMBERS = [
  { n: "239 mil", label: "seguidores no Instagram" },
  { n: "61,9 mil", label: "inscritos no YouTube" },
  { n: "5º", label: "lugar no Top Traders InfoMoney 2025" },
  { n: "20 anos", label: "de mercado, desde 2006" },
];

const CONTENTS = [
  {
    t: "Análises de mercado",
    d: "A leitura do Fabricio sobre o mini índice e o mercado.",
  },
  {
    t: "Setups de mini índice",
    d: "Os setups que ele acompanha, explicados de forma direta.",
  },
  {
    t: "Rotina de trader",
    d: "Como se prepara quem opera há 20 anos.",
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
      logo: `${SITE_URL}/apple-icon`,
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
        "https://www.youtube.com/@fabriciogoncalvez",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

/** Monograma FG: marca do Fabricio, no canto superior direito. */
function Monogram() {
  return (
    <span
      aria-label="FG"
      className="grid size-[45px] shrink-0 place-items-center rounded-full bg-[#f5f5f5] text-[15px] font-bold tracking-tight text-[#111]"
    >
      FG
    </span>
  );
}

export default function Comunidade() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />

      <main>
        {/* ============ CAPA (escuro) + FICHA (claro) ============ */}
        <section className="grid lg:min-h-svh lg:grid-cols-[1.1fr_1fr]">
          <div className="smoke relative isolate flex min-h-[88svh] flex-col justify-between overflow-hidden px-5 pt-5 pb-8 md:px-10 md:pt-8 lg:min-h-0 lg:pb-12">
            <Image
              src="/fabricio.jpg"
              alt="Fabricio Gonçalvez sentado, sorrindo, de camiseta preta"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="-z-10 object-cover object-[50%_16%] grayscale lg:object-[50%_22%]"
            />
            {/* A base escurece até ficar chapada sob o texto (contraste
                medido sobre a cor composta, não sobre a foto). */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,8,.6)_0%,rgba(8,8,8,0)_20%,rgba(8,8,8,0)_40%,rgba(8,8,8,.92)_70%,#080808_100%)]"
            />

            <header className="flex items-center justify-between">
              <span className="text-[17px] font-semibold">Comunidade FGZ</span>
              <Monogram />
            </header>

            <div>
              <h1 className="max-w-[14ch] text-[34px] leading-[41px] font-bold md:text-[48px] md:leading-[54px]">
                O canal do Fabricio Gonçalvez no WhatsApp
              </h1>
              <p className="mt-3 max-w-[34ch] text-[17px] leading-[24px] font-light text-night-muted md:text-[18px] md:leading-[27px]">
                Análises e setups de mini índice de quem ficou em 5º no Top
                Traders InfoMoney 2025.
              </p>
              <a href="#entrar" className="btn btn-light mt-6 lg:!hidden">
                Entrar no canal
              </a>
            </div>
          </div>

          <div className="bg-bg px-5 py-10 md:px-10 lg:flex lg:flex-col lg:justify-center lg:px-14 lg:py-14 xl:px-20">
            <div className="mx-auto w-full max-w-[30rem]">
              <h2 className="text-[22px] leading-[28px] font-semibold md:text-[24px] md:leading-[30px]">
                Entre no canal
              </h2>
              <p className="mt-1 text-muted">
                Gratuito. Depois de enviar a ficha, o WhatsApp abre no canal.
              </p>
              <div
                id="entrar"
                className="mt-6 scroll-mt-6 rounded-panel bg-card p-5"
              >
                <LeadForm idPrefix="hero" />
              </div>
            </div>
          </div>
        </section>

        {/* ============ NÚMEROS (claro) ============ */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="text-[22px] leading-[28px] font-semibold md:text-[24px] md:leading-[30px]">
            Em números
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {NUMBERS.map((x, i) => (
              <li
                key={x.label}
                className={`rounded-panel p-5 md:p-6 ${
                  i === 0 ? "bg-fg text-bg" : "bg-card text-fg"
                }`}
              >
                <span className="tnum block text-[28px] leading-[34px] font-bold tracking-tight md:text-[40px] md:leading-[44px]">
                  {x.n}
                </span>
                <span
                  className={`mt-2 block ${i === 0 ? "opacity-75" : "text-muted"}`}
                >
                  {x.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] leading-[18px] text-muted">
            Instagram e YouTube conferidos em {NUMBERS_DATE}.
          </p>
        </section>

        {/* ============ O QUE É PUBLICADO (claro) ============ */}
        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-10 md:pb-24">
          <div className="grid gap-6 md:grid-cols-[1fr_1.6fr] md:gap-12">
            <div>
              <h2 className="text-[22px] leading-[28px] font-semibold md:text-[24px] md:leading-[30px]">
                O que é publicado no canal
              </h2>
              <p className="mt-2 text-muted">
                Só o Fabricio publica. Quem segue lê e reage.
              </p>
            </div>
            <ul className="overflow-hidden rounded-panel bg-card">
              {CONTENTS.map((c) => (
                <li
                  key={c.t}
                  className="relative px-5 py-4 after:absolute after:right-0 after:bottom-0 after:left-5 after:h-px after:bg-border last:after:hidden"
                >
                  <h3 className="text-[17px] leading-[22px] font-semibold md:text-[14px] md:leading-[19px]">
                    {c.t}
                  </h3>
                  <p className="mt-1 text-muted">{c.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ PERFIL (escuro) ============ */}
        <section className="smoke">
          <div className="mx-auto grid max-w-6xl md:grid-cols-[1.3fr_1fr]">
            <div className="px-5 py-16 md:px-10 md:py-24">
              <h2 className="text-[34px] leading-[41px] font-bold md:text-[40px] md:leading-[46px]">
                Fabricio Gonçalvez
              </h2>
              <p className="mt-1 text-[17px] font-light text-night-muted">
                Trader profissional, sócio da Genial Investimentos
              </p>
              <div className="mt-8 max-w-[52ch] space-y-4 text-night-muted">
                <p>
                  Opera há 20 anos no mercado financeiro e ficou em 5º lugar no
                  ranking Top Traders InfoMoney 2025.
                </p>
                <p>Criou as estratégias Alaska &amp; Square.</p>
                <p>Já apareceu na InfoMoney, na Genial e na Nelogica.</p>
              </div>
            </div>
            <div className="relative min-h-[420px] md:min-h-0">
              <Image
                src="/fabricio.jpg"
                alt="Retrato de Fabricio Gonçalvez"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-[50%_14%] grayscale"
              />
            </div>
          </div>
        </section>

        {/* ============ PERGUNTAS (claro) ============ */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-6 md:grid-cols-[1fr_1.6fr] md:gap-12">
            <h2 className="text-[22px] leading-[28px] font-semibold md:text-[24px] md:leading-[30px]">
              Perguntas
            </h2>
            <Faq />
          </div>
        </section>

        {/* ============ CHAMADA FINAL (escuro) ============ */}
        <section className="smoke">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
            <h2 className="max-w-[18ch] text-[34px] leading-[41px] font-bold md:text-[40px] md:leading-[46px]">
              Entrada gratuita, com o seu número oculto.
            </h2>
            <p className="mt-3 max-w-[44ch] text-[17px] font-light text-night-muted">
              Envie a ficha e o WhatsApp abre direto no canal do Fabricio.
            </p>
            <a href="#entrar" className="btn btn-light mt-8 md:!w-auto md:px-10">
              Preencher a ficha
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-night pb-28 text-[#9e9e9e] md:pb-10">
        <div className="mx-auto max-w-6xl border-t border-night-line px-5 pt-8 text-[13px] leading-[18px] md:px-10">
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
