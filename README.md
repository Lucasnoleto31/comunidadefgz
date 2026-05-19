# Comunidade FGZ — página de captura

Página única que concentra os leads de **todos os canais** (YouTube,
Instagram, TikTok, etc.) em um só lugar e redireciona para a comunidade
oficial do Fabricio Gonçalvez no WhatsApp.

Fluxo: `página → formulário (nome, WhatsApp, e-mail, CPF, qualificação) →
Apps Script → planilha (aba Leads) + Salesforce opcional → Comunidade no
WhatsApp`. Cada lead grava a URL da página (com a etiqueta de canal
`?utm_source=`), então você sabe de qual canal a pessoa veio sem precisar
de página diferente por rede.

Stack: Next.js (App Router) + deploy na Vercel. Sem banco: o "balde" é
uma planilha do Google.

---

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha os valores
npm run dev                  # http://localhost:3000
```

A página funciona mesmo sem o Google Sheets configurado — nesse caso o
lead não é gravado, mas o visitante segue normalmente para o WhatsApp
(o redirecionamento usa `NEXT_PUBLIC_WHATSAPP_URL`).

## Variáveis de ambiente

| Variável | Onde usar | O que é |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_URL` | público | Link de convite da Comunidade do WhatsApp |
| `GOOGLE_SHEETS_WEBHOOK_URL` | servidor | URL `/exec` do Apps Script (ver abaixo) |

> O Apps Script não usa senha compartilhada — a proteção é honeypot +
> rate limit + dedupe + validação de CPF.

Conectar a planilha: siga
[`google-apps-script/SETUP-GOOGLE-SHEETS.md`](./google-apps-script/SETUP-GOOGLE-SHEETS.md).

## Deploy na Vercel

1. Suba este projeto para o GitHub (repo `comunidadefgz`).
2. Em <https://vercel.com/new>, importe o repositório.
   - Se este projeto estiver numa subpasta, defina **Root Directory =
     `site`** nas configurações de build.
3. Em **Settings → Environment Variables**, adicione as 3 variáveis.
4. Deploy. Aponte seu domínio (ex.: `comunidadefgz.com.br`) em
   **Settings → Domains**.

## Links para cada canal (rastreamento de origem)

Use a **mesma URL** em todo lugar, só mudando o `utm_source`. Assim a
planilha mostra de onde cada lead veio:

| Canal | Link a colar |
|---|---|
| YouTube (descrição) | `https://SEU-DOMINIO/?utm_source=youtube` |
| Instagram (bio) | `https://SEU-DOMINIO/?utm_source=instagram` |
| TikTok | `https://SEU-DOMINIO/?utm_source=tiktok` |
| WhatsApp status | `https://SEU-DOMINIO/?utm_source=whatsapp` |
| Telegram | `https://SEU-DOMINIO/?utm_source=telegram` |

Dica: encurte cada link (ex.: Bitly) para ficarem bonitos nas bios.

## Personalizar

- **Foto do Fabricio:** coloque o arquivo em `public/fabricio.jpg` e, em
  `app/page.tsx`, troque o placeholder `.bio-photo` por
  `<img src="/fabricio.jpg" alt="Fabricio Gonçalvez" />`.
- **Textos e números:** todo o conteúdo está em `app/page.tsx`.
- **Cores/visual:** variáveis no topo de `app/globals.css`.
- **Depoimentos:** dá para adicionar uma seção nova; peça que eu monto.
