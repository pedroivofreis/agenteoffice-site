// Motor do trial — extração honesta e determinística, zero chamadas externas.
// O card só mostra o que o agente REALMENTE informou (voo se tiver voo, hotel se
// tiver hotel). O que faltar de essencial vira pergunta da Mar.ia (Chat.jsx, via
// Gemini em ia.js; sem key/erro, o fluxo local daqui assume).

// Economia do trial (decisão 03/08): crédito = viagem criada, e só isso.
// Chat da Mar.ia e envio no WhatsApp não consomem — capturar lead nunca custa crédito.
export const CREDITOS_INICIAIS = 5
export const CUSTO_VIAGEM = 1

const FOTO = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=70&fit=crop`

const DESTINOS = [
  {
    match: ['porto de galinhas', 'galinhas', 'muro alto'],
    nome: 'Porto de Galinhas', uf: 'PE', grad: ['#0e7490', '#0ea5e9'],
    foto: FOTO('1507525428034-b723cf961d3e'),
    aeroporto: 'REC · Recife', cia: 'LATAM', voo: 'direto · 3h05',
    hotel: 'Serrambi Resort', regime: 'All inclusive',
    transfer: 'Privativo aeroporto ⇄ hotel',
    precoBase: 3450,
    destaques: ['Piscinas naturais de jangada', 'Day use em Muro Alto', 'Jantar pé na areia'],
  },
  {
    match: ['recife', 'boa viagem'],
    nome: 'Recife', uf: 'PE', grad: ['#0f766e', '#22c55e'],
    foto: FOTO('1658044552345-df3ea485f77f'),
    aeroporto: 'REC · Recife', cia: 'GOL', voo: 'direto · 2h30',
    hotel: 'Hotel Atlante Plaza', regime: 'Café da manhã',
    transfer: 'Privativo aeroporto ⇄ hotel',
    precoBase: 3200,
    destaques: ['Marco Zero e Recife Antigo', 'Praia de Boa Viagem', 'Instituto Ricardo Brennand'],
  },
  {
    match: ['orlando', 'disney', 'universal'],
    nome: 'Orlando', uf: 'EUA', grad: ['#7c3aed', '#2563eb'],
    foto: FOTO('1597466599360-3b9775841aec'),
    aeroporto: 'MCO · Orlando', cia: 'Azul', voo: 'direto · 8h40',
    hotel: 'Rosen Inn Universal', regime: 'Café da manhã',
    transfer: 'Van compartilhada + ingressos',
    precoBase: 9800,
    destaques: ['4 parques Disney', 'Universal Studios', 'Outlets Vineland Premium'],
  },
  {
    match: ['gramado', 'canela', 'serra gaucha', 'serra gaúcha'],
    nome: 'Gramado', uf: 'RS', grad: ['#166534', '#059669'],
    foto: FOTO('1509316975850-ff9c5deb0cd9'),
    aeroporto: 'POA · Porto Alegre', cia: 'GOL', voo: 'direto · 1h50',
    hotel: 'Hotel Laghetto Allegro', regime: 'Café colonial',
    transfer: 'Receptivo POA ⇄ Gramado',
    precoBase: 2680,
    destaques: ['Tour uva e vinho', 'Snowland', 'Mini Mundo e Lago Negro'],
  },
  {
    match: ['cancun', 'cancún', 'riviera maya'],
    nome: 'Cancún', uf: 'México', grad: ['#0d9488', '#22d3ee'],
    foto: FOTO('1552074284-5e88ef1aef18'),
    aeroporto: 'CUN · Cancún', cia: 'Copa Airlines', voo: '1 conexão · 9h30',
    hotel: 'Riu Caribe', regime: 'All inclusive',
    transfer: 'Privativo + catamarã Isla Mujeres',
    precoBase: 7900,
    destaques: ['Chichén Itzá', 'Xcaret', 'Isla Mujeres de catamarã'],
  },
  {
    match: ['lisboa', 'portugal'],
    nome: 'Lisboa', uf: 'Portugal', grad: ['#b45309', '#f59e0b'],
    foto: FOTO('1585208798174-6cedd86e019a'),
    aeroporto: 'LIS · Humberto Delgado', cia: 'TAP', voo: 'direto · 9h50',
    hotel: 'Hotel Mundial', regime: 'Café da manhã',
    transfer: 'Privativo + tour Sintra',
    precoBase: 8400,
    destaques: ['Sintra e Cascais', 'Tram 28 e Alfama', 'Pastéis de Belém'],
  },
  {
    match: ['maceio', 'maceió', 'maragogi'],
    nome: 'Maceió', uf: 'AL', grad: ['#0369a1', '#38bdf8'],
    foto: FOTO('1519046904884-53103b34b206'),
    aeroporto: 'MCZ · Zumbi dos Palmares', cia: 'GOL', voo: 'direto · 2h50',
    hotel: 'Jatiúca Hotel & Resort', regime: 'Meia pensão',
    transfer: 'Privativo + passeio Maragogi',
    precoBase: 3100,
    destaques: ['Galés de Maragogi', 'Praia do Francês', 'City tour orla'],
  },
  {
    match: ['noronha', 'fernando de noronha'],
    nome: 'Fernando de Noronha', uf: 'PE', grad: ['#065f46', '#10b981'],
    foto: FOTO('1544551763-46a013bb70d5'),
    aeroporto: 'FEN · via Recife', cia: 'Azul', voo: '1 conexão · 4h20',
    hotel: 'Pousada Maravilha', regime: 'Café da manhã',
    transfer: 'Buggy + taxas ambientais inclusas',
    precoBase: 8900,
    destaques: ['Mergulho no Sancho', 'Trilha Atalaia', 'Pôr do sol no Boldró'],
  },
  {
    match: ['buenos aires', 'argentina', 'bariloche'],
    nome: 'Buenos Aires', uf: 'Argentina', grad: ['#6d28d9', '#a855f7'],
    foto: FOTO('1589909202802-8f4aadce1849'),
    aeroporto: 'EZE · Ezeiza', cia: 'Aerolíneas', voo: 'direto · 2h50',
    hotel: 'Broadway Hotel & Suites', regime: 'Café da manhã',
    transfer: 'Privativo + show de tango',
    precoBase: 3900,
    destaques: ['Caminito e La Boca', 'Show de tango com jantar', 'Puerto Madero'],
  },
]

const GENERICO = {
  nome: null, uf: '', grad: ['#0c6b63', '#5da6aa'],
  foto: FOTO('1436491865332-7a61a109cc05'), // asa de avião — mesma do hero do site
  aeroporto: 'a definir', cia: '', voo: '', hotel: '', regime: '',
  transfer: '', precoBase: 4200,
  destaques: ['Roteiro personalizado', 'Passeios mais vendidos', 'Seguro viagem incluso'],
}

const MESES = {
  janeiro: 0, fevereiro: 1, março: 2, marco: 2, abril: 3, maio: 4, junho: 5,
  julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11,
}

const ORDEM_MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

// "mês que vem" etc não tem nome de mês nenhum — sem isso extrairQuando nunca
// resolve e o chat repete a pergunta pra sempre.
function mesRelativo(offsetMeses) {
  const hoje = new Date()
  const idx = ((hoje.getMonth() + offsetMeses) % 12 + 12) % 12
  return ORDEM_MESES[idx]
}

const SAIDAS = {
  gru: 'GRU · Guarulhos', guarulhos: 'GRU · Guarulhos',
  cgh: 'CGH · Congonhas', congonhas: 'CGH · Congonhas',
  gig: 'GIG · Galeão', 'galeão': 'GIG · Galeão', galeao: 'GIG · Galeão',
  sdu: 'SDU · Santos Dumont',
  bsb: 'BSB · Brasília', 'brasília': 'BSB · Brasília', brasilia: 'BSB · Brasília',
  cnf: 'CNF · Confins', confins: 'CNF · Confins',
  vcp: 'VCP · Viracopos', viracopos: 'VCP · Viracopos', campinas: 'VCP · Viracopos',
  poa: 'POA · Porto Alegre', cwb: 'CWB · Curitiba', rec: 'REC · Recife',
  ssa: 'SSA · Salvador', for: 'FOR · Fortaleza', sp: 'GRU · Guarulhos',
}

const CIAS = ['gol', 'latam', 'azul', 'tap', 'copa', 'aerolíneas', 'aerolineas', 'avianca', 'american', 'emirates', 'iberia']

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

function extrairPax(t) {
  const adultos = t.match(/(\d+)\s*adult/)
  const criancas = t.match(/(\d+)\s*crian/)
  const grupo = t.match(/grupo\s*(?:de)?\s*(\d+)/)
  const pessoas = t.match(/(\d+)\s*(?:pessoas|pax|amigos)/)
  let a = null, c = 0
  if (adultos) a = +adultos[1]
  else if (grupo) a = +grupo[1]
  else if (pessoas) a = +pessoas[1]
  else if (/\bcasal\b|lua de mel/.test(t)) a = 2
  else if (/fam[íi]lia/.test(t)) { a = 2; c = 2 }
  else {
    // Respondeu só o número (ex.: "2" pra "quantas pessoas vão?"), sem palavra
    // ao lado — sem isso o chat fica repetindo a pergunta pra sempre.
    const bare = t.split(',').map((s) => s.trim()).find((s) => /^\d{1,2}$/.test(s))
    if (bare) a = +bare
  }
  if (criancas) c = +criancas[1]
  return a === null ? null : { adultos: a, criancas: c }
}

function extrairNoites(t) {
  const n = t.match(/(\d+)\s*noites?/)
  if (n) return +n[1]
  const d = t.match(/(\d+)\s*dias?/)
  if (d) return Math.max(1, +d[1] - 1)
  return null
}

function extrairQuando(t) {
  for (const nome of Object.keys(MESES)) if (t.includes(nome)) return nome
  if (/r[ée]veillon|ano novo/.test(t)) return 'dezembro'
  if (/f[ée]rias de julho/.test(t)) return 'julho'
  if (/\d{1,2}\/\d{1,2}/.test(t)) return 'data'
  const daqui = t.match(/daqui\s+a\s+(\d+)\s*m[êe]s/)
  if (daqui) return mesRelativo(+daqui[1])
  if (/pr[óo]ximo\s+m[êe]s|m[êe]s\s+que\s+vem/.test(t)) return mesRelativo(1)
  if (/\b(esse|este|nesse|neste)\s+m[êe]s\b/.test(t)) return mesRelativo(0)
  return null
}

function extrairValores(t) {
  const out = { venda: null, custo: null }
  const re = /r\$\s*([\d.,]+)\s*(mil|k)?|\b([\d]{1,3}(?:[.,]\d{3})+|\d+[.,]?\d*)\s*(mil|k)\b/gi
  let m
  while ((m = re.exec(t)) !== null) {
    const bruto = m[1] || m[3]
    const mult = (m[2] || m[4]) ? 1000 : 1
    const v = parseFloat(bruto.replace(/\./g, '').replace(',', '.')) * mult
    if (v < 500) continue
    const antes = t.slice(Math.max(0, m.index - 16), m.index)
    if (/custo|operadora|pago|net/i.test(antes)) { if (!out.custo) out.custo = Math.round(v) }
    else if (!out.venda) out.venda = Math.round(v)
  }
  return out
}

function extrairHotel(texto) {
  const m = texto.match(/\b(?:hotel|pousada|resort)\s+([^,.;\n]{3,32})/i)
  const nome = m ? m[1].replace(/\s+(all inclusive|meia pens[ãa]o|caf[ée].*|com .*)$/i, '').trim() : ''
  const regimeM = texto.match(/all inclusive|meia pens[ãa]o|pens[ãa]o completa|caf[ée] da manh[ãa]/i)
  const regime = regimeM ? regimeM[0] : ''
  if (!nome && !regime) return null
  return { nome: nome || 'Hotel a definir', regime: regime ? regime[0].toUpperCase() + regime.slice(1).toLowerCase() : '' }
}

function extrairVoo(t) {
  const cia = CIAS.find((c) => new RegExp(`\\b${c}\\b`).test(t))
  const detalhe = (t.match(/\bdireto\b|\d\s*conex(?:ão|oes|ões)|com conex[ãa]o/) || [''])[0]
  if (!cia && !detalhe && !/\bvoo|a[ée]reo/.test(t)) return null
  return { cia: cia ? cia.toUpperCase() : 'Cia a definir', detalhe: detalhe || '' }
}

function extrairTransfer(t) {
  const m = t.match(/transfer\s*(privativo|compartilhado)?|traslado|receptivo/)
  if (!m) return null
  return { desc: m[1] ? `Transfer ${m[1]}` : 'Transfer incluso' }
}

function extrairCliente(texto) {
  const m = texto.match(/\bpara\s+(?:a\s+|o\s+)?([A-ZÀ-Ú][a-zà-úâêôãõç]+(?:\s+(?:e\s+)?[A-ZÀ-Ú][a-zà-úâêôãõç]+)?)/)
  return m ? m[1] : ''
}

function extrairSaida(t) {
  for (const [k, v] of Object.entries(SAIDAS)) {
    if (new RegExp(`\\b${k}\\b`).test(t)) return v
  }
  return null
}

function acharDestino(t) {
  for (const d of DESTINOS) {
    if (d.match.some((m) => t.includes(m))) return { ...d, conhecido: true }
  }
  const g = { ...GENERICO, conhecido: false }
  let m = t.match(/(?:para|pra|em|destino)\s+([a-záàâãéêíóôõúç]+(?:\s+(?:de|do|da|dos|das)?\s*[a-záàâãéêíóôõúç]+)?)/i)
  if (!m) {
    // Sem preposição (ex.: o chat pergunta "pra onde é a viagem?" e a pessoa
    // responde só "recife") — o destino é sempre o 1º trecho da frase, porque é
    // sempre a 1ª coisa perguntada. Sem isso, uma cidade fora da lista curada
    // nunca resolve e a Mar.ia fica repetindo a pergunta pra sempre.
    const primeiro = t.split(',')[0].trim()
    if (/^[a-záàâãéêíóôõúç]+(?:\s+[a-záàâãéêíóôõúç]+){0,3}$/i.test(primeiro) && primeiro.length >= 3 && primeiro.length <= 40) {
      m = [null, primeiro]
    }
  }
  if (m && !/^(uns|umas|o|a|os|as|r\$)/.test(m[1])) {
    g.nome = m[1].trim().split(/\s+/).slice(0, 3).map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w)).join(' ')
  }
  return g
}

// O que falta pro mínimo da proposta? (alimenta o chat da Mar.ia)
export function analisar(texto) {
  const t = texto.toLowerCase()
  const destino = acharDestino(t)
  const valores = extrairValores(t)
  const faltantes = []
  if (!destino.nome) faltantes.push('destino')
  if (!extrairQuando(t)) faltantes.push('quando')
  if (!extrairPax(t)) faltantes.push('pax')
  if (!valores.venda) faltantes.push('venda')
  return { faltantes, custoFalta: !valores.custo, precisaChat: faltantes.length > 0 }
}

function montar(texto, destino, fonte) {
  const t = texto.toLowerCase()
  const seed = hash(texto)
  const pax = extrairPax(t) || { adultos: 2, criancas: 0 }
  const noites = extrairNoites(t) || 7
  const valores = extrairValores(t)

  const hoje = new Date()
  let ida
  const mes = extrairQuando(t)
  if (mes && MESES[mes] !== undefined) {
    const ano = MESES[mes] >= hoje.getMonth() ? hoje.getFullYear() : hoje.getFullYear() + 1
    ida = new Date(ano, MESES[mes], 8 + (seed % 14))
  } else {
    ida = new Date(hoje)
    ida.setDate(ida.getDate() + 40 + (seed % 20))
  }
  const volta = new Date(ida)
  volta.setDate(volta.getDate() + noites)

  // Venda é a âncora; custo real se informado, senão estimado (comissão ~11%)
  const fator = noites / 7
  const venda = valores.venda ||
    Math.round((destino.precoBase * pax.adultos + destino.precoBase * 0.7 * pax.criancas) * fator / 10) * 10
  const custoEstimado = !valores.custo
  const custo = valores.custo || Math.round(venda * 0.89)

  const hotelInfo = extrairHotel(texto)
  const vooInfo = extrairVoo(t)
  const transferInfo = extrairTransfer(t)
  const doPdf = !!fonte && destino.conhecido

  return {
    destino,
    pax,
    noites,
    ida,
    volta,
    saida: extrairSaida(t) || (doPdf ? 'GRU · Guarulhos' : ''),
    fonte,
    cliente: extrairCliente(texto),
    codigo: String(1000 + (seed % 9000)),
    itens: {
      voo: vooInfo
        ? { tem: true, cia: vooInfo.cia, detalhe: vooInfo.detalhe, rota: destino.conhecido ? `→ ${destino.aeroporto}` : '' }
        : doPdf ? { tem: true, cia: destino.cia, detalhe: destino.voo, rota: `→ ${destino.aeroporto}` } : { tem: false },
      hotel: hotelInfo
        ? { tem: true, nome: hotelInfo.nome, regime: hotelInfo.regime }
        : doPdf ? { tem: true, nome: destino.hotel, regime: destino.regime } : { tem: false },
      transfer: transferInfo
        ? { tem: true, desc: transferInfo.desc }
        : doPdf ? { tem: true, desc: destino.transfer } : { tem: false },
    },
    financeiro: {
      total: venda,
      entrada: Math.round(venda * 0.25),
      parcelas: 9,
      parcela: Math.round((venda - Math.round(venda * 0.25)) / 9),
      custo,
      custoEstimado,
      comissao: venda - custo,
    },
  }
}

export function gerarViagem(texto) {
  return montar(texto, acharDestino(texto.toLowerCase()), null)
}

// Monta o card a partir do que a IA realmente leu no arquivo importado (ver
// routes/trial.py:/extrair). Só usa o DESTINOS curado (foto/gradiente/aeroporto)
// se o nome bater com um deles — senão mostra o nome real extraído com a capa
// genérica, em vez de fingir ser um destino conhecido que não tem nada a ver.
export function montarDeExtracao(ex, nomeArquivo) {
  const seed = hash(nomeArquivo || JSON.stringify(ex))
  const destinoTxt = (ex.destino || '').toLowerCase()
  const conhecido = DESTINOS.find((d) => d.match.some((m) => destinoTxt.includes(m)))
  const destino = conhecido
    ? { ...conhecido, conhecido: true }
    : { ...GENERICO, nome: ex.destino || null, conhecido: false }

  const pax = { adultos: ex.pax_adultos || 2, criancas: ex.pax_criancas || 0 }

  let ida
  if (ex.data_inicio) {
    ida = new Date(`${ex.data_inicio}T00:00:00`)
    if (Number.isNaN(ida.getTime())) ida = null
  }
  if (!ida) {
    ida = new Date()
    ida.setDate(ida.getDate() + 40 + (seed % 20))
  }

  let volta = ex.data_fim ? new Date(`${ex.data_fim}T00:00:00`) : null
  if (volta && Number.isNaN(volta.getTime())) volta = null
  const noites = ex.noites || (volta ? Math.max(1, Math.round((volta - ida) / 86400000)) : 7)
  if (!volta) { volta = new Date(ida); volta.setDate(volta.getDate() + noites) }

  const fator = noites / 7
  const venda = ex.venda ||
    Math.round((destino.precoBase * pax.adultos + destino.precoBase * 0.7 * pax.criancas) * fator / 10) * 10
  const custoEstimado = !ex.custo
  const custo = ex.custo || Math.round(venda * 0.89)

  return {
    destino,
    pax,
    noites,
    ida,
    volta,
    saida: '',
    fonte: nomeArquivo || null,
    cliente: ex.cliente || '',
    codigo: String(1000 + (seed % 9000)),
    itens: {
      voo: ex.voo?.tem
        ? { tem: true, cia: ex.voo.cia || 'Cia a definir', detalhe: ex.voo.detalhe || '', rota: destino.conhecido ? `→ ${destino.aeroporto}` : '' }
        : { tem: false },
      hotel: ex.hotel?.tem
        ? { tem: true, nome: ex.hotel.nome || 'Hotel a definir', regime: ex.hotel.regime || '' }
        : { tem: false },
      transfer: ex.transfer?.tem
        ? { tem: true, desc: ex.transfer.desc || 'Transfer incluso' }
        : { tem: false },
    },
    financeiro: {
      total: venda,
      entrada: Math.round(venda * 0.25),
      parcelas: 9,
      parcela: Math.round((venda - Math.round(venda * 0.25)) / 9),
      custo,
      custoEstimado,
      comissao: venda - custo,
    },
  }
}

export const fmtBRL = (v) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v)

export const fmtData = (d) =>
  d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
