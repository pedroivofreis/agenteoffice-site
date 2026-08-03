import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { analisar } from './mock.js'
import { conversar, iaDisponivel } from './ia.js'

// Chat da Mar.ia: junta o mínimo pra proposta. Gemini conduz; sem key/erro → fluxo local.
const PERGUNTAS = {
  destino: { p: 'Adorei! Pra onde é a viagem?', chips: ['Porto de Galinhas', 'Orlando', 'Gramado'] },
  quando: { p: 'E quando eles querem ir? Pode ser o mês, e por quantas noites.', chips: ['7 noites em setembro', 'Férias de julho, 10 dias', 'Réveillon'] },
  pax: { p: 'Quantas pessoas vão?', chips: ['Casal', '2 adultos e 2 crianças', '4 pessoas'] },
  venda: { p: 'Qual o valor de venda pro cliente? Pode ser aproximado.', chips: ['R$ 5 mil', 'R$ 9 mil', 'R$ 15 mil'] },
  custo: { p: 'Última: tem o custo na operadora? Se não tiver, eu estimo sua comissão.', chips: ['Pular — pode estimar'] },
}

export default function Chat({ textoInicial, onCompleto, onVoltar }) {
  const [msgs, setMsgs] = useState([])
  const [chips, setChips] = useState([])
  const [input, setInput] = useState('')
  const [pensando, setPensando] = useState(false)
  const scroller = useRef(null)
  const campo = useRef(null)
  const iniciado = useRef(false)
  const estado = useRef({ usandoIA: iaDisponivel, acumulado: textoInicial, custoPerguntado: false, msgs: [] })

  const rolar = () => requestAnimationFrame(() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' }))

  function pushMsg(m) {
    estado.current.msgs = [...estado.current.msgs, m]
    setMsgs(estado.current.msgs)
    rolar()
  }

  function perguntar(p, c) {
    pushMsg({ de: 'maria', texto: p })
    setChips(c || [])
    setPensando(false)
    setTimeout(() => campo.current?.focus(), 50)
  }

  function proximaLocal() {
    const e = estado.current
    const a = analisar(e.acumulado)
    if (a.faltantes.length === 0 && a.custoFalta && !e.custoPerguntado) {
      e.custoPerguntado = true
      perguntar(PERGUNTAS.custo.p, PERGUNTAS.custo.chips)
      return
    }
    if (a.faltantes.length === 0) { onCompleto(e.acumulado); return }
    const q = PERGUNTAS[a.faltantes[0]]
    perguntar(q.p, q.chips)
  }

  async function avancar() {
    const e = estado.current
    setPensando(true)
    setChips([])
    rolar()
    if (e.usandoIA) {
      const resp = await conversar(e.msgs)
      if (resp === null) {
        e.usandoIA = false // Gemini indisponível → segue local, sem quebrar a conversa
        proximaLocal()
        return
      }
      if (resp.completo) {
        pushMsg({ de: 'maria', texto: 'Perfeito! Já tô montando tudo aqui 👇' })
        setTimeout(() => onCompleto(resp.frase || e.acumulado), 700)
        return
      }
      perguntar(resp.pergunta, resp.sugestoes)
    } else {
      proximaLocal()
    }
  }

  function responder(texto) {
    const t = (texto ?? input).trim()
    if (!t || pensando) return
    setInput('')
    pushMsg({ de: 'usuario', texto: t })
    if (!/^pular/i.test(t)) estado.current.acumulado += ', ' + t
    avancar()
  }

  useEffect(() => {
    if (iniciado.current) return // StrictMode monta 2x em dev — roda o kickoff só uma vez
    iniciado.current = true
    pushMsg({ de: 'usuario', texto: textoInicial })
    avancar()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-14 bg-gradient-to-br from-[#042F2E] to-[#114552] relative font-sans">
      <button onClick={onVoltar} className="absolute top-5 left-6 text-sm text-brand-300 hover:text-white">← Voltar pro site</button>

      <div className="w-full max-w-[480px] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col" style={{ height: 'min(620px, 80vh)' }}>
        <header className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white">
          <div className="w-[38px] h-[38px] rounded-full bg-[#0C6B63] text-white font-extrabold grid place-content-center">M</div>
          <div className="leading-tight">
            <strong className="block text-[15px] text-slate-900">Mar.ia</strong>
            <span className="text-xs text-slate-400">{pensando ? 'digitando…' : 'online'}</span>
          </div>
        </header>

        <div ref={scroller} className="flex-1 overflow-y-auto p-4 bg-[#f4f6f9] flex flex-col gap-2">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`max-w-[82%] px-3.5 py-2.5 text-[14.5px] leading-snug rounded-2xl whitespace-pre-wrap ${
                m.de === 'usuario'
                  ? 'self-end bg-[#0C6B63] text-white rounded-br-sm'
                  : 'self-start bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
              }`}
            >
              {m.texto}
            </div>
          ))}
          {pensando && (
            <div className="self-start bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3.5 flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-[7px] h-[7px] rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}
        </div>

        {chips.length > 0 && (
          <div className="flex gap-2 flex-wrap px-4 pt-2.5 pb-1 bg-[#f4f6f9]">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => responder(c)}
                className="text-[13px] font-medium text-[#0A5C55] bg-white border border-[#CCFBF1] rounded-full px-3.5 py-1.5 hover:bg-[#E8F2F0] transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 p-3.5 bg-[#f4f6f9]">
          <input
            ref={campo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && responder()}
            disabled={pensando}
            placeholder="Responda aqui…"
            className="flex-1 border-[1.5px] border-slate-200 rounded-full px-4 py-2.5 text-[14.5px] outline-none bg-white focus:border-[#0C6B63]"
          />
          <button
            onClick={() => responder()}
            aria-label="Enviar"
            className="w-11 h-11 rounded-full shrink-0 bg-[#0C6B63] hover:bg-[#0A5C55] grid place-content-center text-white"
          >
            <Send size={17} />
          </button>
        </div>
      </div>

      <p className="text-brand-300 text-[13px] mt-4">Faltam só alguns detalhes pra sua proposta ficar pronta.</p>
    </div>
  )
}
