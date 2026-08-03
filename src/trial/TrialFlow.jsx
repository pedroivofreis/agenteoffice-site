import { useEffect, useRef, useState } from 'react'
import Chat from './Chat.jsx'
import Generating from './Generating.jsx'
import Preview from './Preview.jsx'
import Workspace from './Workspace.jsx'
import LeadWidget from './LeadWidget.jsx'
import { analisar, gerarViagem, gerarDoPdf } from './mock.js'

const STORAGE = 'ao_trial'

// Overlay full-screen com o funil do trial: chat → generating → preview → app.
// `inicio` = { tipo: 'texto' | 'arquivo', valor } vindo do hero; onFechar volta pro site.
export default function TrialFlow({ inicio, onFechar }) {
  const [tela, setTela] = useState(null)
  const [viagem, setViagem] = useState(null)
  const [lead, setLead] = useState({ email: '', agencia: '', whats: '' })
  const [creditos, setCreditos] = useState(10)
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
      if (salvo) { l = salvo.lead; setLead(salvo.lead); setCreditos(salvo.creditos) }
    } catch { /* estado novo */ }

    if (arquivo) {
      setViagem(gerarDoPdf(inicio.valor))
      debitar(2, l)
      setTela('generating')
    } else if (analisar(inicio.valor).precisaChat) {
      setTela('chat')
    } else {
      setViagem(gerarViagem(inicio.valor))
      debitar(1, l)
      setTela('generating')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function onChatCompleto(fraseFinal) {
    setViagem(gerarViagem(fraseFinal))
    debitar(1)
    setTela('generating')
  }

  function onUnlockEmail(email) {
    const novo = { ...lead, email }
    setLead(novo)
    const c = 10 - custoPendente.current
    custoPendente.current = 0
    setCreditos(c)
    persistir(novo, c)
    console.log('🎯 LEAD (email):', email)
    toast('✓ Conta criada — card salvo no seu CRM')
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
    debitar(1, novo)
    console.log('🎯 LEAD (whats):', numero)
    toast('Enviado no seu WhatsApp! (simulado — 1 crédito)')
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
        <Preview viagem={viagem} lead={lead} onUnlockEmail={onUnlockEmail} onEntrar={() => setTela('app')} onVoltar={onFechar} />
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
