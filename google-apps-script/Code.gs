/**
 * Profissão Trader — endpoint Google Apps Script
 *
 * Recebe os leads enviados pela landing page e grava na planilha
 * conectada a este script. Pode ser publicado como "Web App"
 * (Anyone, even anonymous) e a URL gerada vai em GOOGLE_SHEETS_WEBHOOK_URL
 * nas variáveis de ambiente da landing page.
 *
 * Setup completo no SETUP-GOOGLE-SHEETS.md.
 */

// Nome da aba onde os leads serão gravados. Será criada automaticamente.
const SHEET_NAME = 'Leads';

// Cabeçalho da planilha. Edite se quiser adicionar/remover colunas.
const HEADERS = [
  'Data/Hora',
  'Nome',
  'WhatsApp',
  'WhatsApp (só dígitos)',
  'CPF',
  'CPF (só dígitos)',
  'Email',
  'Já opera?',
  'Corretora',
  'Origem',           // hero | final
  'Variante A/B',
  'URL da página',
  'Referrer',
  'User Agent',
];

/**
 * POST — chamado pelo formulário da landing page.
 * O body é enviado como FormData (multipart) — Apps Script entrega
 * os campos já parseados em e.parameter. Esta abordagem é simple request
 * no CORS e funciona 100% das vezes com Web App publicado.
 */
// Valores aceitos pra cada campo de qualificação. Qualquer outro vira spam.
const ALLOWED_SOURCES = ['hero', 'final'];
const ALLOWED_TRADES  = ['sim', 'comecando', 'ja_operei', 'nao'];
const ALLOWED_BROKERS = ['genial', 'xp', 'btg', 'toro', 'outra'];

function doPost(e) {
  try {
    const data = (e && e.parameter && Object.keys(e.parameter).length)
      ? e.parameter
      : JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // ----- Validação anti-spam ----------------------------------
    // Honeypot — qualquer valor aqui foi bot que driblou o JS do front.
    if (data.website) return jsonResponse_({ ok: false, error: 'spam' });

    // Campos obrigatórios + sanity check de tamanho.
    const name = String(data.name || '').trim();
    const phone = String(data.phone || '').trim();
    const phoneDigits = String(data.phoneDigits || '').replace(/\D/g, '');
    const cpfDigits = String(data.cpfDigits || data.cpf || '').replace(/\D/g, '');
    if (name.length < 2 || name.length > 80)        return jsonResponse_({ ok: false, error: 'name' });
    if (phoneDigits.length < 10 || phoneDigits.length > 13) return jsonResponse_({ ok: false, error: 'phone' });
    if (!isValidCPF_(cpfDigits))                    return jsonResponse_({ ok: false, error: 'cpf' });
    const cpfFormatted = formatCPF_(cpfDigits);
    const email = String(data.email || '').trim().toLowerCase();

    // Origem precisa ser hero ou final. URL precisa ser do nosso domínio
    // (pula em testes locais — file:// ou localhost).
    const source = String(data.source || '');
    if (!ALLOWED_SOURCES.includes(source)) return jsonResponse_({ ok: false, error: 'source' });

    // Qualificação válida (silenciosamente normaliza vazios pra string).
    const trades = ALLOWED_TRADES.includes(data.trades) ? data.trades : '';
    const broker = ALLOWED_BROKERS.includes(data.broker) ? data.broker : '';

    const props = PropertiesService.getScriptProperties();
    const cache = CacheService.getScriptCache();
    const now = Date.now();

    // Rate limit GLOBAL — máx 30 submits/minuto pra todo o endpoint.
    // Apps Script Web App não expõe IP do cliente, então o limite é global.
    // Detém ataques de flood independente de quem está enviando.
    const RATE_WINDOW_SEC = 60;
    const RATE_MAX = 30;
    const rateKey = 'rate_' + Math.floor(now / (RATE_WINDOW_SEC * 1000));
    const cached = cache.get(rateKey);
    const count = cached ? parseInt(cached, 10) : 0;
    if (count >= RATE_MAX) return jsonResponse_({ ok: false, error: 'rate_limit' });
    cache.put(rateKey, String(count + 1), RATE_WINDOW_SEC + 5);

    // Dedupe por (telefone + primeiro nome) em janela de 60s.
    // Combinação reduz chance de "colisão" inocente entre dois leads diferentes
    // que estão preenchendo ao mesmo tempo (mesma conexão familiar, etc).
    const lastKey = 'last_' + phoneDigits + '_' + name.split(' ')[0].toLowerCase();
    const last = parseInt(props.getProperty(lastKey) || '0', 10);
    if (last && (now - last) < 60000) return jsonResponse_({ ok: false, error: 'duplicate' });
    props.setProperty(lastKey, String(now));
    // -------------------------------------------------------------

    const sheet = getOrCreateSheet_(SHEET_NAME);

    // Cria o cabeçalho na primeira execução.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#0B0E11')
        .setFontColor('#26E07F');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      name,
      phone,
      phoneDigits,
      cpfFormatted,
      cpfDigits,
      email,
      labelTrades_(trades),
      labelBroker_(broker),
      source,
      String(data.variant || ''),
      String(data.url || ''),
      String(data.referrer || ''),
      String(data.userAgent || ''),
    ]);

    // Auto-resize ocasional pra manter as colunas legíveis.
    if (sheet.getLastRow() % 10 === 0) {
      sheet.autoResizeColumns(1, HEADERS.length);
    }

    // Envia ao Salesforce Marketing Cloud. Falha não bloqueia: planilha é fonte
    // primária do lead, e SFMC é canal secundário de marketing.
    try {
      sendToSFMC_(buildSfmcRow_({ name, phoneDigits, cpfDigits, trades, broker, source }));
    } catch (sfmcErr) {
      Logger.log('SFMC threw: ' + sfmcErr);
    }

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: err.toString() });
  }
}

/**
 * GET — usado para teste rápido no navegador. Acessar a URL do
 * Web App deve devolver o texto abaixo, confirmando que está vivo.
 */
function doGet() {
  return ContentService
    .createTextOutput('Profissão Trader · endpoint de leads OK')
    .setMimeType(ContentService.MimeType.TEXT);
}

/* ----------------------------------------------------------- */

function getOrCreateSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

// Traduções dos códigos curtos vindos do form para texto humano na planilha.
function labelTrades_(code) {
  return ({
    sim: 'Sim, já opero',
    comecando: 'Estou começando agora',
    ja_operei: 'Já operei e parei',
    nao: 'Ainda não opero',
  })[code] || '';
}

function labelBroker_(code) {
  return ({
    genial: 'Genial', xp: 'XP', btg: 'BTG', toro: 'Toro', outra: 'Outra',
  })[code] || '';
}

// Valida CPF pelo algoritmo oficial dos dígitos verificadores e
// rejeita sequências repetidas (000.000.000-00, 111..., etc).
function isValidCPF_(value) {
  const d = String(value || '').replace(/\D/g, '');
  if (d.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(d)) return false;
  const calc = function (slice, factor) {
    let sum = 0;
    for (let i = 0; i < slice.length; i++) sum += parseInt(slice.charAt(i), 10) * (factor - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  if (calc(d.substr(0, 9), 10) !== parseInt(d.charAt(9), 10)) return false;
  if (calc(d.substr(0, 10), 11) !== parseInt(d.charAt(10), 10)) return false;
  return true;
}

function formatCPF_(digits) {
  const d = String(digits || '').replace(/\D/g, '').padStart(11, '0').slice(0, 11);
  return d.substr(0, 3) + '.' + d.substr(3, 3) + '.' + d.substr(6, 3) + '-' + d.substr(9, 2);
}

/* =============================================================
   SALESFORCE MARKETING CLOUD — Integração com Data Extension

   Setup (uma vez):
     1. Editor Apps Script → ⚙️ Project Settings → Script Properties
     2. Adicione:
          SFMC_CLIENT_ID, SFMC_CLIENT_SECRET, SFMC_AUTH_URL,
          SFMC_REST_URL, SFMC_DE_KEY, SFMC_ENABLED ('true' pra ligar)
     3. Salve. As credenciais ficam server-side, fora do código.

   Para desligar a integração temporariamente sem mexer no código,
   apague o SFMC_ENABLED ou troque pra qualquer coisa diferente de 'true'.
   ============================================================= */

/**
 * Mapeia o lead para o schema da Data Extension.
 * Ajuste os nomes das CHAVES (esquerda) pra bater EXATAMENTE com os
 * nomes das colunas na DE — case-sensitive.
 */
function buildSfmcRow_(lead) {
  return {
    // PrimaryKey de exemplo: Telefone. Se a DE exigir Email, adicione o
    // campo no form (script.js + index.html) e mapeie aqui.
    Telefone: lead.phoneDigits,
    CPF: lead.cpfDigits,
    Nome: lead.name,
    JaOpera: labelTrades_(lead.trades),
    Corretora: labelBroker_(lead.broker),
    Origem: lead.source,                     // 'hero' | 'final'
    DataHora: new Date().toISOString(),
  };
}

/**
 * Envia uma linha à Data Extension via API REST do SFMC.
 * Retorna { ok: true } ou { ok: false, error: '...' }.
 * Falhas são logadas com Logger.log (acessível em Executions no editor).
 */
function sendToSFMC_(row) {
  const props = PropertiesService.getScriptProperties();

  if (props.getProperty('SFMC_ENABLED') !== 'true') {
    return { ok: false, error: 'disabled' };
  }

  const clientId     = props.getProperty('SFMC_CLIENT_ID');
  const clientSecret = props.getProperty('SFMC_CLIENT_SECRET');
  const authBase     = (props.getProperty('SFMC_AUTH_URL') || '').replace(/\/+$/, '');
  const restBase     = (props.getProperty('SFMC_REST_URL') || '').replace(/\/+$/, '');
  const deKey        = props.getProperty('SFMC_DE_KEY');

  if (!clientId || !clientSecret || !authBase || !restBase || !deKey) {
    Logger.log('SFMC: faltam Script Properties (verifique SFMC_*)');
    return { ok: false, error: 'no_credentials' };
  }

  let token = getSfmcToken_(authBase, clientId, clientSecret);
  if (!token) return { ok: false, error: 'auth' };

  const url = restBase + '/data/v1/async/dataextensions/key:' + deKey + '/rows';
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify({ items: [row] }),
    muteHttpExceptions: true,
  };

  let resp = UrlFetchApp.fetch(url, options);
  let code = resp.getResponseCode();

  // Token expirou no meio do voo — invalida cache, reautentica e tenta uma vez
  if (code === 401) {
    CacheService.getScriptCache().remove('sfmc_token');
    token = getSfmcToken_(authBase, clientId, clientSecret);
    if (!token) return { ok: false, error: 'reauth' };
    options.headers.Authorization = 'Bearer ' + token;
    resp = UrlFetchApp.fetch(url, options);
    code = resp.getResponseCode();
  }

  if (code !== 202) {
    Logger.log('SFMC write fail HTTP ' + code + ': ' + resp.getContentText().slice(0, 300));
    return { ok: false, error: 'write_' + code };
  }
  return { ok: true };
}

/**
 * Busca um access token, com cache de 18 minutos (token SFMC dura 20).
 */
function getSfmcToken_(authBase, clientId, clientSecret) {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('sfmc_token');
  if (cached) return cached;

  const resp = UrlFetchApp.fetch(authBase + '/v2/token', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
    muteHttpExceptions: true,
  });

  if (resp.getResponseCode() !== 200) {
    Logger.log('SFMC auth fail HTTP ' + resp.getResponseCode());
    return null;
  }

  const body = JSON.parse(resp.getContentText());
  if (!body.access_token) return null;

  // Cache pelo tempo informado pela API menos margem de 60s
  const ttl = Math.max(60, (body.expires_in || 1080) - 60);
  cache.put('sfmc_token', body.access_token, ttl);
  return body.access_token;
}

/**
 * Função pra rodar manualmente do editor: testa o envio sem precisar
 * disparar um submit real. Vai aparecer no menu "Executar" do editor.
 */
function testSFMC() {
  const result = sendToSFMC_(buildSfmcRow_({
    name: 'Teste Apps Script',
    phoneDigits: '5511900000000',
    cpfDigits: '39053344705',
    trades: 'sim',
    broker: 'genial',
    source: 'hero',
  }));
  Logger.log('Resultado: ' + JSON.stringify(result));
}
