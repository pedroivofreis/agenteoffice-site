// Mar.ia de verdade: Gemini conduz a conversa até ter o mínimo da proposta.
// Se a primeira frase já tiver tudo, ele devolve completo=true de cara (sem chat).
// Qualquer erro/timeout → null, e o Chat.vue cai no fluxo mockado local.

const KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash'

export const iaDisponivel = !!KEY

const INSTRUCOES = `Você é a Mar.ia, agente de IA do AgenteOffice (CRM para agências de viagem no Brasil).
Um AGENTE DE VIAGENS (não o viajante) está descrevendo uma viagem que está cotando para o cliente dele.
Seu objetivo é reunir o MÍNIMO necessário para montar a proposta:
1. destino; 2. quando (mês/período aproximado serve); 3. quantas pessoas; 4. valor de VENDA para o cliente (aproximado serve).
Opcional (pergunte no máximo UMA vez, aceite pular): custo na operadora — se não tiver, a comissão será estimada.
Extras que você deve aproveitar SE o agente mencionar (nunca pergunte sobre eles): hotel, companhia aérea/voo, transfer, cidade de saída, nº de noites, nome do cliente.

REGRAS:
- Se a conversa já contém os 4 itens essenciais, responda completo=true IMEDIATAMENTE (não pergunte mais nada além do custo, e só se ainda não perguntou).
- Uma pergunta por vez, curta e calorosa, em pt-BR. Nunca repita pergunta já respondida.
- Sempre ofereça 3 sugestões curtas de resposta (chips).
- Quando completo=true, monte "frase": UMA linha em português com tudo que foi coletado, no formato:
  "<N> adultos e <N> crianças, <destino>, <N> noites em <mês>, saída <cidade/aeroporto>, venda R$ <valor>, custo R$ <valor>, hotel <nome>, voo <cia>, transfer, para <nome do cliente>"
  — incluindo APENAS os pedaços que o agente informou (custo só se deu; hotel só se deu; etc).

Responda SEMPRE em JSON puro: {"completo": boolean, "pergunta": string|null, "sugestoes": string[], "frase": string|null}`

export async function conversar(mensagens) {
  if (!KEY) return null
  const contents = mensagens.map((m) => ({
    role: m.de === 'usuario' ? 'user' : 'model',
    parts: [{ text: m.texto }],
  }))
  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), 14000)
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({
          system_instruction: { parts: [{ text: INSTRUCOES }] },
          contents,
          generationConfig: { response_mime_type: 'application/json', temperature: 0.3, maxOutputTokens: 4096 },
        }),
      },
    )
    if (!resp.ok) return null
    const data = await resp.json()
    const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!texto) return null
    const json = JSON.parse(texto)
    if (typeof json.completo !== 'boolean') return null
    return {
      completo: json.completo,
      pergunta: json.pergunta || null,
      sugestoes: Array.isArray(json.sugestoes) ? json.sugestoes.slice(0, 3) : [],
      frase: json.frase || null,
    }
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}
