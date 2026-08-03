// Cliente do onboarding de trial (POST /api/trial/start na api-agenteoffice).
// Local: aponte VITE_API_URL para a API local (ex.: http://127.0.0.1:8010).

const API_URL = import.meta.env.VITE_API_URL || 'https://web-production-32a87.up.railway.app'
const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.agenteoffice.com.br'

const iso = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : null)

// Traduz a viagem montada no site para o payload do endpoint
export function payloadDaViagem(v) {
  const itens = []
  if (v.itens.voo.tem) {
    itens.push({
      tipo: 'voo',
      titulo: v.itens.voo.cia,
      subtitulo: [v.saida, v.itens.voo.rota, v.itens.voo.detalhe].filter(Boolean).join(' '),
    })
  }
  if (v.itens.hotel.tem) {
    itens.push({
      tipo: 'hotel',
      titulo: v.itens.hotel.nome,
      subtitulo: [v.itens.hotel.regime, `${v.noites} noites`].filter(Boolean).join(' · '),
    })
  }
  if (v.itens.transfer.tem) {
    itens.push({ tipo: 'transfer', titulo: v.itens.transfer.desc })
  }

  return {
    titulo: v.cliente ? `Viagem de ${v.cliente}` : `Viagem ${v.destino.nome}`,
    destino: v.destino.nome,
    destinos: [v.destino.nome],
    data_inicio: iso(v.ida),
    data_fim: iso(v.volta),
    noites: v.noites,
    pax_adultos: v.pax.adultos,
    pax_criancas: v.pax.criancas,
    cliente_nome: v.cliente || null,
    venda: v.financeiro.total,
    custo: v.financeiro.custoEstimado ? null : v.financeiro.custo,
    hero_img: v.destino.foto,
    itens,
    obs: 'Viagem criada pelo trial do site',
  }
}

export async function criarContaTrial({ email, agencia, whatsapp, viagem }) {
  const resp = await fetch(`${API_URL}/api/trial/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      agencia_nome: agencia,
      whatsapp: whatsapp || null,
      viagem: payloadDaViagem(viagem),
      origem: 'site-hero',
    }),
  })

  const data = await resp.json().catch(() => ({}))
  if (!resp.ok) {
    const err = new Error(data?.detail || 'Não foi possível criar sua conta agora.')
    err.status = resp.status
    throw err
  }
  return data
}

// URL de auto-login do app, já apontando para o card criado
export function urlDoApp({ access_token, user, orcamento_id }) {
  const destino = orcamento_id ? `/app/pipeline?open=${orcamento_id}` : '/app/pipeline'
  const params = new URLSearchParams({
    token: access_token,
    user: JSON.stringify(user),
    redirect: destino,
  })
  return `${APP_URL}/app/auto-login?${params.toString()}`
}
