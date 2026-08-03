import { useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { criarContaTrial, urlDoApp } from './api.js'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.agenteoffice.com.br'

// Passo 2 da captura (agência + WhatsApp opcional) → cria a conta de verdade →
// tela "conta pronta" que joga a pessoa dentro do app, no card recém-criado.
export default function Onboarding({ email, viagem, onPronto, onFalhou, onVoltar }) {
  const [agencia, setAgencia] = useState('')
  const [whats, setWhats] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [conta, setConta] = useState(null)

  async function criar() {
    const nome = agencia.trim()
    if (nome.length < 2) { setErro('Digite o nome da sua agência'); return }
    setErro('')
    setEnviando(true)
    try {
      const res = await criarContaTrial({ email, agencia: nome, whatsapp: whats.trim(), viagem })
      setConta(res)
      onPronto({ agencia: nome, whats: whats.trim(), conta: res })
    } catch (e) {
      if (e.status === 409) {
        setErro('Você já tem conta com esse e-mail — é só entrar.')
        setConta({ jaExiste: true })
      } else {
        // API fora do ar (ex.: local sem backend): segue na demonstração
        setErro('')
        onFalhou({ agencia: nome, whats: whats.trim() })
      }
    } finally {
      setEnviando(false)
    }
  }

  if (conta?.jaExiste) {
    return (
      <Tela titulo="Você já tem uma conta aqui" onVoltar={onVoltar}>
        <p className="text-[#b7d2d4] text-[15px] leading-relaxed mb-7">
          O e-mail <strong className="text-white">{email}</strong> já tem AgenteOffice. Entre com ele e sua viagem continua de onde parou.
        </p>
        <a href={`${APP_URL}/app/login`} className="inline-flex items-center gap-2 bg-brand-400 hover:bg-brand-300 text-[#06272e] font-extrabold text-base px-7 py-3.5 rounded-xl transition-colors">
          Entrar no AgenteOffice <ArrowRight size={18} />
        </a>
      </Tela>
    )
  }

  if (conta) {
    return (
      <Tela titulo="Sua conta está pronta." onVoltar={null}>
        <p className="text-[#b7d2d4] text-[15px] leading-relaxed mb-6">
          Criamos a agência <strong className="text-white">{conta.user.agencia_nome}</strong> no AgenteOffice, e
          a viagem que você montou já está no seu pipeline, em <strong className="text-white">Em orçamento</strong>.
        </p>

        <div className="bg-white/5 border border-brand-400/30 rounded-xl p-4 mb-6 text-left">
          <div className="font-mono text-[10px] tracking-[1.5px] text-brand-300 mb-2">SEUS DADOS DE ACESSO</div>
          <div className="text-[14px] text-white/90 leading-relaxed">
            <div>Usuário: <strong className="text-white">{conta.username}</strong></div>
            <div>Senha: <strong className="text-white">{conta.senha_temporaria}</strong></div>
          </div>
          <p className="text-[12.5px] text-[#7fa8ac] mt-2.5">
            {conta.email_enviado
              ? <>Também enviamos para <strong className="text-white/80">{email}</strong>. Você pode trocar a senha em Configurações.</>
              : <><strong className="text-amber-300">Anote agora</strong> — não conseguimos enviar o e-mail. Você pode trocar a senha em Configurações.</>}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[13.5px] text-[#b7d2d4] mb-7">
          <Check size={16} className="text-emerald-400 shrink-0" />
          Restam <strong className="text-white">{conta.creditos} viagens</strong> no seu teste grátis.
        </div>

        <a
          href={urlDoApp(conta)}
          className="inline-flex items-center gap-2 bg-brand-400 hover:bg-brand-300 text-[#06272e] font-extrabold text-base px-7 py-3.5 rounded-xl transition-colors"
        >
          Abrir minha viagem no AgenteOffice <ArrowRight size={18} />
        </a>
      </Tela>
    )
  }

  return (
    <Tela titulo="Falta só o nome da sua agência" onVoltar={onVoltar}>
      <p className="text-[#b7d2d4] text-[15px] leading-relaxed mb-6">
        É com ela que sua conta nasce — e a proposta que o cliente abre sai com a <strong className="text-white">sua marca</strong>.
      </p>

      <label className="block text-left mb-4">
        <span className="block text-[12.5px] font-semibold text-white/80 mb-1.5">Nome da agência</span>
        <input
          value={agencia}
          onChange={(e) => setAgencia(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && criar()}
          placeholder="Ex.: Sonhos Viagens"
          autoFocus
          className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 text-[15px] outline-none border-[1.5px] border-transparent focus:border-brand-400"
        />
      </label>

      <label className="block text-left mb-5">
        <span className="block text-[12.5px] font-semibold text-white/80 mb-1.5">
          WhatsApp <span className="font-normal text-[#7fa8ac]">— opcional, para receber a proposta pronta</span>
        </span>
        <input
          value={whats}
          onChange={(e) => setWhats(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && criar()}
          placeholder="(11) 98765-4321"
          className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 text-[15px] outline-none border-[1.5px] border-transparent focus:border-brand-400"
        />
      </label>

      {erro && <p className="text-red-300 text-[13px] mb-3">{erro}</p>}

      <button
        onClick={criar}
        disabled={enviando}
        className="inline-flex items-center gap-2 bg-brand-400 hover:bg-brand-300 disabled:opacity-70 text-[#06272e] font-extrabold text-base px-7 py-3.5 rounded-xl transition-colors"
      >
        {enviando ? <><Loader2 size={18} className="animate-spin" /> Criando sua conta…</> : <>Criar minha conta grátis <ArrowRight size={18} /></>}
      </button>
      <p className="text-[#5d8489] text-[13px] mt-3">Sem cartão. Sua viagem já vai criada junto.</p>
    </Tela>
  )
}

function Tela({ titulo, children, onVoltar }) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-5 py-16 bg-gradient-to-br from-[#042F2E] to-[#114552] relative font-sans text-center">
      {onVoltar && (
        <button onClick={onVoltar} className="absolute top-5 left-6 text-sm text-brand-300 hover:text-white">← Voltar</button>
      )}
      <div className="max-w-[440px] w-full">
        <h1 className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: 'clamp(24px, 3.2vw, 32px)' }}>
          {titulo}
        </h1>
        {children}
      </div>
    </div>
  )
}
