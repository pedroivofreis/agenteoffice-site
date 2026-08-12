import { useEffect, useRef, useState } from 'react'
import Chat from './Chat.jsx'
import Generating from './Generating.jsx'
import Preview from './Preview.jsx'
import Onboarding from './Onboarding.jsx'
import { analisar, gerarViagem, montarDeExtracao, CREDITOS_INICIAIS, CUSTO_VIAGEM } from './mock.js'
import { extrairArquivo, urlDoApp } from './api.js'
import { extrairTextoPdf } from './pdf.js'

const STORAGE = 'ao_trial'
const STORAGE_CONTA = 'ao_trial_conta'
const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.agenteoffice.com.br'

// Overlay full-screen com o funil do trial:
//   chat → generating → preview → onboarding (cria conta REAL) → app real.
// Se a API não responder, manda pra plataforma de verdade (/app/dashboard) em vez de
// um workspace mockado — sem token válido o app pede login, mas não há demonstração falsa.
// `inicio` = { tipo: 'texto' | 'arquivo', valor } vindo do hero; onFechar volta pro site.
export default function TrialFlow({ inicio, onFechar }) {
  const [tela, setTela] = useState(null)
  const [viagem, setViagem] = useState(null)
  const [lead, setLead] = useState({ email: '', agencia: '', whats: '' })
  const [creditos, setCreditos] = useState(CREDITOS_INICIAIS)
  const [conta, setConta] = useState(null) // token/user da última conta criada nesta sessão — permite reabrir já logado
  const [erroArquivo, setErroArquivo] = useState('')
  const custoPendente = useRef(0)
  const iniciado = useRef(false)
  const arquivo = inicio.tipo === 'arquivo'

  function persistir(l, c) {
    localStorage.setItem(STORAGE, JSON.stringify({ lead: l, creditos: c }))
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

  // Lê o arquivo de verdade (imagem → visão da IA; PDF → texto extraído no navegador
  // e mandado pro backend) — antes disso o card mostrava um destino sorteado do nome
  // do arquivo, às vezes sem nenhuma relação com o que a pessoa importou.
  async function processarArquivo(l) {
    setErroArquivo('')
    setTela('generating')
    const file = inicio.valor
    try {
      const isImagem = String(file.type || '').startsWith('image/')
      let payload
      if (isImagem) {
        const b64 = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = () => reject(new Error('Não foi possível abrir esta imagem.'))
          reader.readAsDataURL(file)
        })
        payload = { tipo: 'imagem', conteudo: b64 }
      } else {
        const texto = await extrairTextoPdf(file)
        if (texto.trim().length < 40) {
          throw new Error('Quase nenhum texto neste PDF (costuma ser só imagem escaneada). Tente enviar um print ou foto da cotação.')
        }
        payload = { tipo: 'texto', conteudo: texto }
      }
      const extraido = await extrairArquivo({ ...payload, nomeArquivo: file.name })
      setViagem(montarDeExtracao(extraido, file.name))
      debitar(CUSTO_VIAGEM, l)
    } catch (e) {
      setErroArquivo(e.message || 'Não foi possível ler este documento.')
      setTela('erro-arquivo')
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
    try {
      const contaSalva = JSON.parse(localStorage.getItem(STORAGE_CONTA) || 'null')
      if (contaSalva?.access_token) setConta(contaSalva)
    } catch { /* sem conta salva */ }

    if (arquivo) {
      void processarArquivo(l)
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
    setTela('onboarding')
  }

  // Conta criada de verdade na API — o botão da tela leva pro app real. Guarda o
  // token pra, se a pessoa voltar nesta mesma sessão, "Abrir no meu AgenteOffice"
  // já cair logada em vez de pedir os dados de novo.
  function onContaCriada({ agencia, whats, conta: contaNova }) {
    const novo = { ...lead, agencia, whats }
    setLead(novo)
    setCreditos(contaNova.creditos)
    persistir(novo, contaNova.creditos)
    setConta(contaNova)
    localStorage.setItem(STORAGE_CONTA, JSON.stringify(contaNova))
  }

  // Se já temos um token desta sessão, o CTA da preview pula o onboarding e manda
  // direto pro app autenticado; sem token, segue o funil normal de criar conta.
  function onEntrarNoApp() {
    if (conta?.access_token) window.location.href = urlDoApp(conta)
    else setTela('onboarding')
  }

  // API indisponível: em vez de cair num workspace mockado, manda pra plataforma de
  // verdade (login pede autenticação já que não temos token, mas é o app real).
  function onOnboardingFalhou({ agencia, whats }) {
    const novo = { ...lead, agencia, whats }
    setLead(novo)
    persistir(novo, creditos)
    window.location.href = `${APP_URL}/app/dashboard`
  }

  if (!tela) return null

  return (
    <div className="trial-overlay trial-scope bg-[#f6f7f9]">
      {tela === 'chat' && <Chat textoInicial={inicio.valor} onCompleto={onChatCompleto} onVoltar={onFechar} />}
      {tela === 'generating' && <Generating arquivo={arquivo} pronto={!!viagem} onDone={() => setTela('preview')} />}
      {tela === 'erro-arquivo' && (
        <TelaErroArquivo mensagem={erroArquivo} onTentarDeNovo={() => processarArquivo(lead)} onVoltar={onFechar} />
      )}
      {tela === 'preview' && (
        <Preview viagem={viagem} lead={lead} onUnlockEmail={onUnlockEmail} onEntrar={onEntrarNoApp} onVoltar={onFechar} />
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
    </div>
  )
}

function TelaErroArquivo({ mensagem, onTentarDeNovo, onVoltar }) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-5 py-16 bg-gradient-to-br from-[#042F2E] to-[#114552] relative text-center font-sans">
      <button onClick={onVoltar} className="absolute top-5 left-6 text-sm text-brand-300 hover:text-white">← Voltar pro site</button>
      <div className="max-w-[420px]">
        <div className="text-4xl mb-4">🧐</div>
        <h1 className="font-display font-extrabold text-white text-2xl mb-3">Não consegui ler esse arquivo</h1>
        <p className="text-[#b7d2d4] text-[15px] leading-relaxed mb-7">{mensagem}</p>
        <button
          onClick={onTentarDeNovo}
          className="bg-brand-400 hover:bg-brand-300 text-[#06272e] font-extrabold text-base px-7 py-3.5 rounded-xl transition-colors"
        >
          Tentar de novo
        </button>
      </div>
    </div>
  )
}
