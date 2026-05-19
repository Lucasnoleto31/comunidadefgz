import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Proxy entre o formulário e o Apps Script (Profissão Trader).
 *
 * O navegador envia JSON para esta rota (mesma origem, sem CORS).
 * Aqui reencaminhamos como application/x-www-form-urlencoded para o
 * Web App do Apps Script, que lê os campos em `e.parameter` — o
 * caminho primário e mais robusto do script. Repassamos a resposta
 * JSON do script ({ ok } / { ok:false, error }) de volta ao front.
 */

// Campos que o Apps Script conhece. Só estes são repassados.
const FIELDS = [
  "name",
  "phone",
  "phoneDigits",
  "cpf",
  "cpfDigits",
  "email",
  "trades",
  "broker",
  "source",
  "variant",
  "website",
  "url",
  "referrer",
  "userAgent",
];

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const form = new URLSearchParams();
  for (const key of FIELDS) {
    const v = body[key];
    if (typeof v === "string" && v.length) form.set(key, v.slice(0, 500));
  }

  // Endpoint do Apps Script. É um Web App público ("qualquer pessoa"),
  // protegido pelo próprio script (honeypot, rate limit, dedupe, CPF) —
  // não é segredo. Usa a env var se existir; senão, este padrão.
  const webhook =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    "https://script.google.com/macros/s/AKfycbziVFGcq9rYUqVE3KrunkMszljNuApGit2KH4UXwXe15QZnQYrGGQlGwqCep_obqkSF/exec";

  // Sem webhook ainda: não bloqueia o usuário (segue para o WhatsApp).
  if (!webhook) {
    console.warn(
      "[lead] GOOGLE_SHEETS_WEBHOOK_URL não configurado. Lead não gravado:",
      { name: form.get("name"), phone: form.get("phoneDigits") }
    );
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    // Apps Script pode demorar (cold start + redirect 302). Margem larga.
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 20000);
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(t);

    const text = await res.text();
    let parsed: { ok?: boolean; error?: string };
    try {
      parsed = JSON.parse(text);
    } catch {
      // Resposta inesperada (ex.: HTML de erro do Google). Não perde o lead.
      console.error("[lead] resposta não-JSON do Apps Script:", text.slice(0, 300));
      return NextResponse.json({ ok: true, stored: false });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[lead] falha ao enviar ao Apps Script:", err);
    // Prioridade é a conversão: deixa o usuário seguir para o WhatsApp.
    return NextResponse.json({ ok: true, stored: false });
  }
}
