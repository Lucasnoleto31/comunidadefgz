"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

// Link de convite da Comunidade (público por natureza). Env var se
// existir; senão, este padrão — evita depender de config do painel.
const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ||
  "https://chat.whatsapp.com/GIXWd7ctS7nKrbNSJceanc";

const TRADES = [
  { v: "", l: "Selecione" },
  { v: "sim", l: "Sim, já opero" },
  { v: "comecando", l: "Estou começando agora" },
  { v: "ja_operei", l: "Já operei e parei" },
  { v: "nao", l: "Ainda não opero" },
];

const BROKERS = [
  { v: "", l: "Selecione (opcional)" },
  { v: "genial", l: "Genial" },
  { v: "xp", l: "XP" },
  { v: "btg", l: "BTG" },
  { v: "toro", l: "Toro" },
  { v: "outra", l: "Outra" },
];

function formatPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function formatCPF(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

// Algoritmo oficial dos dígitos verificadores (espelha o Apps Script).
function isValidCPF(value: string): boolean {
  const d = value.replace(/\D/g, "");
  if (d.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(d)) return false;
  const calc = (slice: string, factor: number) => {
    let sum = 0;
    for (let i = 0; i < slice.length; i++)
      sum += parseInt(slice.charAt(i), 10) * (factor - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  if (calc(d.substring(0, 9), 10) !== parseInt(d.charAt(9), 10)) return false;
  if (calc(d.substring(0, 10), 11) !== parseInt(d.charAt(10), 10)) return false;
  return true;
}

export default function LeadForm({ idPrefix = "hero" }: { idPrefix?: string }) {
  const source = idPrefix === "hero" ? "hero" : "final";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [trades, setTrades] = useState("");
  const [broker, setBroker] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const meta = useRef({ url: "", referrer: "", userAgent: "" });

  useEffect(() => {
    meta.current = {
      url: window.location.href,
      referrer: document.referrer || "",
      userAgent: navigator.userAgent || "",
    };
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Digite seu nome completo.";
    const pd = phone.replace(/\D/g, "");
    if (pd.length < 10 || pd.length > 11)
      e.phone = "Informe um WhatsApp válido com DDD.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Informe um e-mail válido.";
    if (!isValidCPF(cpf)) e.cpf = "Informe um CPF válido.";
    if (!trades) e.trades = "Selecione uma opção.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goToWhatsApp() {
    if (WHATSAPP_URL) window.location.href = WHATSAPP_URL;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (website) return; // bot: campo invisível preenchido
    if (!validate()) return;
    setStatus("loading");

    const phoneDigits = phone.replace(/\D/g, "");
    const cpfDigits = cpf.replace(/\D/g, "");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          phoneDigits,
          cpf,
          cpfDigits,
          email: email.trim().toLowerCase(),
          trades,
          broker,
          source,
          variant: "",
          website,
          url: meta.current.url,
          referrer: meta.current.referrer,
          userAgent: meta.current.userAgent,
        }),
      });
      const json = await res.json().catch(() => ({ ok: false }));

      // Erros de validação do back: o usuário precisa corrigir.
      const fieldErrors: Record<string, string> = {
        name: "Confira o nome informado.",
        phone: "Confira o WhatsApp informado.",
        cpf: "Confira o CPF informado.",
        source: "Não foi possível identificar a origem. Recarregue a página.",
      };
      if (json.ok || json.error === "duplicate") {
        setStatus("success");
        setTimeout(goToWhatsApp, 1200);
        return;
      }
      if (json.error && fieldErrors[json.error]) {
        setStatus("idle");
        setServerError(fieldErrors[json.error]);
        return;
      }
      // rate_limit / spam / desconhecido: não bloqueia humano, segue.
      setStatus("success");
      setTimeout(goToWhatsApp, 1200);
    } catch {
      setStatus("error");
      setServerError(
        "Não conseguimos registrar agora. Tente de novo em instantes."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <div className="mark" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6 9 17l-5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3>Você está dentro</h3>
        <p>
          Estamos te levando para a comunidade do Fabricio no WhatsApp. Se nada
          acontecer em alguns segundos, use o botão abaixo.
        </p>
        <button className="btn btn-ghost" type="button" onClick={goToWhatsApp}>
          Abrir a comunidade no WhatsApp
        </button>
      </div>
    );
  }

  const loading = status === "loading";
  const p = idPrefix;

  return (
    <form onSubmit={onSubmit} noValidate>
      {serverError && <div className="form-error-box">{serverError}</div>}

      <div className="field">
        <label htmlFor={`${p}-name`}>Nome</label>
        <input
          id={`${p}-name`}
          type="text"
          placeholder="Seu nome"
          value={name}
          autoComplete="name"
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
        />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>

      <div className="field">
        <label htmlFor={`${p}-phone`}>WhatsApp</label>
        <input
          id={`${p}-phone`}
          type="tel"
          inputMode="numeric"
          placeholder="(11) 90000-0000"
          value={phone}
          autoComplete="tel-national"
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <div className="field-error">{errors.phone}</div>}
      </div>

      <div className="field">
        <label htmlFor={`${p}-email`}>E-mail</label>
        <input
          id={`${p}-email`}
          type="email"
          placeholder="seu@email.com"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
        />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>

      <div className="field">
        <label htmlFor={`${p}-cpf`}>CPF</label>
        <input
          id={`${p}-cpf`}
          type="text"
          inputMode="numeric"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))}
          aria-invalid={!!errors.cpf}
        />
        {errors.cpf && <div className="field-error">{errors.cpf}</div>}
      </div>

      <div className="field">
        <label htmlFor={`${p}-trades`}>Você já opera no mercado?</label>
        <select
          id={`${p}-trades`}
          value={trades}
          onChange={(e) => setTrades(e.target.value)}
          aria-invalid={!!errors.trades}
          data-empty={trades === ""}
        >
          {TRADES.map((o) => (
            <option key={o.v} value={o.v} disabled={o.v === ""}>
              {o.l}
            </option>
          ))}
        </select>
        {errors.trades && <div className="field-error">{errors.trades}</div>}
      </div>

      <div className="field">
        <label htmlFor={`${p}-broker`}>Em qual corretora você opera?</label>
        <select
          id={`${p}-broker`}
          value={broker}
          onChange={(e) => setBroker(e.target.value)}
          data-empty={broker === ""}
        >
          {BROKERS.map((o) => (
            <option key={o.v} value={o.v} disabled={o.v === ""}>
              {o.l}
            </option>
          ))}
        </select>
      </div>

      {/* honeypot — invisível para humanos, atrai bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${p}-website`}>Não preencha este campo</label>
        <input
          id={`${p}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button className="btn" type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" aria-hidden /> Entrando
          </>
        ) : (
          <>
            Entrar na comunidade
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>

      <p className="form-note">
        Gratuito · Seus dados ficam apenas com a equipe do Fabricio
      </p>
    </form>
  );
}
