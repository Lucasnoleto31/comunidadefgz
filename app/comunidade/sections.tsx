"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NumberTicker } from "@/components/ui/number-ticker";

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

export function Stats({ items }: { items: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 border-t border-ink">
      {items.map((s, i) => (
        <div
          key={s.label}
          className={`border-b border-rule py-6 pr-4 ${
            i % 2 === 1 ? "border-l pl-5" : ""
          }`}
        >
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="block font-serif text-5xl leading-none tracking-tight text-ink md:text-6xl">
              {s.prefix}
              <NumberTicker
                value={s.value}
                decimalPlaces={s.decimals ?? 0}
                className="tracking-tight text-ink"
              />
              {s.suffix}
            </span>
            <span className="mt-3 block text-sm leading-snug text-muted">
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

const FAQ = [
  {
    q: "É gratuito mesmo?",
    a: "Sim. Entrar e acompanhar o canal não custa nada.",
  },
  {
    q: "Preciso já operar para entrar?",
    a: "Não. O canal é aberto para quem já opera e para quem está começando agora.",
  },
  {
    q: "Outras pessoas vão ver o meu número?",
    a: "Não. Em canais do WhatsApp o seu número fica oculto: nem o Fabricio nem os outros seguidores conseguem vê-lo.",
  },
  {
    q: "Vou receber mensagens o dia todo?",
    a: "Num canal só o Fabricio publica, sem conversa paralela de grupo. Você pode silenciar as notificações ou deixar de seguir a qualquer momento, com um toque.",
  },
  {
    q: "O conteúdo é recomendação de investimento?",
    a: "Não. O conteúdo é educacional e informativo, sem recomendação ou garantia de resultado. Operar no mercado financeiro envolve risco de perda.",
  },
];

export function Faq() {
  return (
    <Accordion type="single" collapsible className="border-t border-ink">
      {FAQ.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`q${i}`}
          className="border-b border-rule"
        >
          <AccordionTrigger className="py-5 font-serif text-xl font-normal text-ink md:text-2xl">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-ink-2">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/**
 * Botão fixo no rodapé (só no celular): aparece depois que a ficha sai
 * da tela e some quando ela volta, para não competir com o formulário.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById("entrar");
    if (!form) return;
    const onScroll = () => setShow(form.getBoundingClientRect().bottom < 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/15 bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href="#entrar"
        tabIndex={show ? 0 : -1}
        className="btn !mt-0"
      >
        Entrar no canal grátis
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12h14m-6-6 6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
