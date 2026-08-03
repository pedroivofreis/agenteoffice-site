import { useEffect, useRef, useState } from 'react'
import Chat from './Chat.jsx'
import Generating from './Generating.jsx'
import Preview from './Preview.jsx'
import Onboarding from './Onboarding.jsx'
import Workspace from './Workspace.jsx'
import LeadWidget from './LeadWidget.jsx'
import { analisar, gerarViagem, gerarDoPdf, CREDITOS_INICIAIS, CUSTO_VIAGEM } from './mock.js'

const STORAGE = 'ao_trial'

// Overlay full-screen com o funil do trial:
//   chat → generating → preview → onboarding (cria conta REAL) → app real.
// Se a API não responder, cai no workspace mockado para a demonstração não morrer.
// `inicio` = { tipo: 'texto' | 'arquivo', valor } vindo do hero; onFechar volta pro site.
export default function TrialFlow({ inicio, onFechar }) {
  const [tela, setTela] = useState(null)
  const [viagem, setViagem] = useState(null)
  const [lead, setLead] = useState({ email: '', agencia: '', whats: '' })
  const [creditos, setCreditos] = useState(CREDITOS_INICIAIS)
  const [toasts, setToasts] = useState([])
  const custoPendente = useRef(0)
  const iniciado = useRef(false)
  const arquivo = inicio.tipo === 'arquivo'

  function persistir(l, c) {
    localStorage.setItem(STORAGE, JSON.stringify({ lead: l, creditos: c }))
  }

  function toast(msg) {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, msg }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }

  function debitar(custo, l = lead) {
    if (l.email) {
      setCreditos((c) => {
        const novo = Math.max(0, c - custo)
        persistir(l, novo)
        return novo
      })
    } else {
      custoPendente.current = custo // desconta quando a conta nascer
    }
  }

  useEffect(() => {
    if (iniciado.current) return // StrictMode monta 2x em dev — evita debitar crédito em dobro
    iniciado.current = true
    let l = lead
    try {
      const salvo = JSON.parse(localStorage.getItem(STORAGE) || 'null')
      if (salvo) {
        l = salvo.lead
        setLead(salvo.lead)
        setCreditos(Math.min(salvo.creditos, CREDITOS_INICIAIS))
      }
    } catch { /* estado novo */ }

    if (arquivo) {
      setViagem(gerarDoPdf(inicio.valor))
      debitar(CUSTO_VIAGEM, l)
      setTela('generating')
    } else if (analisar(inicio.valor).precisaChat) {
      setTela('chat')
    } else {
      setViagem(gerarViagem(inicio.valor))
      debitar(CUSTO_VIAGEM, l)
      setTela('generating')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function onChatCompleto(fraseFinal) {
    setViagem(gerarViagem(fraseFinal))
    debitar(CUSTO_VIAGEM)
    setTela('generating')
  }

  function onUnlockEmail(email) {
    const novo = { ...lead, email }
    setLead(novo)
    const c = CREDITOS_INICIAIS - custoPendente.current
    custoPendente.current = 0
    setCreditos(c)
    persistir(novo, c)
    console.log('🎯 LEAD (email):', email)
    setTela('onboarding')
  }

  // Conta criada de verdade na API — o botão da tela leva pro app real
  function onContaCriada({ agencia, whats, conta }) {
    const novo = { ...lead, agencia, whats }
    setLead(novo)
    setCreditos(conta.creditos)
    persistir(novo, conta.creditos)
    console.log('🎯 LEAD (conta criada):', { ...novo, orcamento_id: conta.orcamento_id })
  }

  // API indisponível: mantém a demonstração no workspace mockado
  function onOnboardingFalhou({ agencia, whats }) {
    const novo = { ...lead, agencia, whats }
    setLead(novo)
    persistir(novo, creditos)
    toast('Modo demonstração — a API não respondeu agora')
    setTela('app')
  }

  function onSetAgencia(nome) {
    const novo = { ...lead, agencia: nome }
    setLead(novo)
    persistir(novo, creditos)
    console.log('🎯 LEAD (agência):', nome)
    toast(`✓ Proposta agora leva a marca de ${nome}`)
  }

  function onSetWhats(numero) {
    const novo = { ...lead, whats: numero }
    setLead(novo)
    persistir(novo, creditos)
    console.log('🎯 LEAD (whats):', numero)
    toast('Enviado no seu WhatsApp! (simulado)')
  }

  function resetDemo() {
    localStorage.removeItem(STORAGE)
    onFechar()
  }

  if (!tela) return null

  return (
    <div className="trial-overlay trial-scope bg-[#f6f7f9]">
      {tela === 'chat' && <Chat textoInicial={inicio.valor} onCompleto={onChatCompleto} onVoltar={onFechar} />}
      {tela === 'generating' && <Generating arquivo={arquivo} onDone={() => setTela('preview')} />}
      {tela === 'preview' && (
        <Preview viagem={viagem} lead={lead} onUnlockEmail={onUnlockEmail} onEntrar={() => setTela('onboarding')} onVoltar={onFechar} />
      )}
      {tela === 'onboarding' && (
        <Onboarding
          email={lead.email}
          viagem={viagem}
          onPronto={onContaCriada}
          onFalhou={onOnboardingFalhou}
          onVoltar={() => setTela('preview')}
        />
      )}
      {tela === 'app' && (
        <Workspace
          viagem={viagem}
          lead={lead}
          creditos={creditos}
          onSetAgencia={onSetAgencia}
          onSetWhats={onSetWhats}
          onNova={onFechar}
        />
      )}

      <LeadWidget lead={lead} onReset={resetDemo} />

      <div className="t-toasts">
        {toasts.map((t) => <div key={t.id} className="t-toast">{t.msg}</div>)}
      </div>
    </div>
  )
}
