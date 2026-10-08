"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "./faq";


/** Perguntas como grupo de linhas do iOS: cartão chapado, separador encaixado. */
export function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="overflow-hidden rounded-panel bg-card"
    >
      {FAQ.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`q${i}`}
          className="relative border-0 after:absolute after:right-0 after:bottom-0 after:left-5 after:h-px after:bg-border last:after:hidden"
        >
          <AccordionTrigger className="rounded-none px-5 py-4 text-[17px] leading-[22px] font-medium text-fg md:text-[15px] md:leading-[20px]">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 text-muted">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/**
 * Botão fixo no pé, só no telefone: aparece depois que a ficha sai da tela
 * por cima e some quando ela volta. Respeita a área segura.
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
      className={`fixed inset-x-0 bottom-0 z-40 bg-bg/90 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-[16px] transition-opacity duration-[180ms] md:hidden ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!show}
    >
      <a href="#entrar" tabIndex={show ? 0 : -1} className="btn !mt-0">
        Entrar no canal
      </a>
    </div>
  );
}

/** Fio de progresso da rolagem no topo (página longa). */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.current?.style.setProperty("--p", String(p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[#8c8c8c] [transform:scaleX(var(--p,0))]"
    />
  );
}
