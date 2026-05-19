# Conectar a planilha do Google (o "balde" dos leads)

Tempo: ~3 minutos. Você faz isso uma vez.

Backend: o script `Code.gs` (do seu funil "Profissão Trader"), com
anti-spam (honeypot, rate limit, dedupe), validação de CPF e integração
opcional com o Salesforce Marketing Cloud.

## 1. Crie a planilha
1. Abra <https://sheets.new>.
2. Dê um nome, ex.: **Leads — Comunidade FGZ**.
3. Não precisa criar abas nem cabeçalho — o script cria a aba **`Leads`**
   e o cabeçalho sozinho no primeiro lead.

## 2. Cole o script
1. Na planilha: menu **Extensões → Apps Script**.
2. Apague o conteúdo padrão.
3. Cole TODO o conteúdo de [`Code.gs`](./Code.gs).
4. Salve (ícone de disquete).

## 3. Publique como App da Web
1. **Implantar → Nova implantação**.
2. Tipo (engrenagem ⚙️) → **App da Web**.
3. Configure:
   - **Executar como:** Eu (sua conta)
   - **Quem pode acessar:** **Qualquer pessoa** (anyone, even anonymous)
4. **Implantar** → autorize (sua conta → Avançado → Permitir).
5. Copie a **URL do app da Web** (termina em `/exec`).
6. Teste rápido: abra essa URL no navegador. Deve aparecer
   *"Profissão Trader · endpoint de leads OK"*.

## 4. Configure no site
No `.env.local` (local) e nas variáveis de ambiente da Vercel
(produção):

```
GOOGLE_SHEETS_WEBHOOK_URL=<a URL que termina em /exec>
```

> Este script **não usa senha compartilhada** — a proteção é honeypot +
> rate limit + dedupe + validação de CPF.

## Pronto
Cada lead cai na aba **`Leads`** em tempo real, com data/hora, dados,
qualificação (Já opera? / Corretora), origem (`hero`/`final`) e a URL da
página (que inclui a etiqueta de canal `?utm_source=`, então você sabe de
onde o lead veio).

---

## (Opcional) Salesforce Marketing Cloud

O script também envia cada lead para uma Data Extension do SFMC. Vem
**desligado**. Para ligar:

1. No editor Apps Script: **⚙️ Configurações do projeto → Propriedades
   do script**.
2. Adicione: `SFMC_CLIENT_ID`, `SFMC_CLIENT_SECRET`, `SFMC_AUTH_URL`,
   `SFMC_REST_URL`, `SFMC_DE_KEY` e `SFMC_ENABLED` = `true`.
3. As chaves das colunas em `buildSfmcRow_` precisam bater **exatamente**
   com os nomes dos campos da sua Data Extension (case-sensitive).
4. Teste sem submit real: no editor, rode a função **`testSFMC`** e veja
   o resultado em *Execuções*.

Para desligar: apague `SFMC_ENABLED` (a planilha continua gravando
normalmente — o SFMC é canal secundário e a falha dele nunca bloqueia o
lead).

> Se editar o `Code.gs` depois: **Implantar → Gerenciar implantações →
> editar (lápis) → Nova versão**.
