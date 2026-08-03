import { useState } from 'react'
import KanbanCard from './KanbanCard.jsx'

export default function Preview({ viagem, lead, onUnlockEmail, onEntrar, onVoltar }) {
  const [modal, setModal] = useState(false)
  const [campo, setCampo] = useState('')
  const [erro, setErro] = useState('')

  function cta() {
    if (lead.email) onEntrar()
    else { setCampo(''); setErro(''); setModal(true) }
  }

  function confirmar() {
    const val = campo.trim()
    if (!/^\S+@\S+\.\S+$/.test(val)) { setErro('Digite um e-mail válido'); return }
    setModal(false)
    onUnlockEmail(val)
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-5 py-16 bg-gradient-to-br from-[#042F2E] to-[#114552] relative font-sans">
      <button onClick={onVoltar} className="absolute top-5 left-6 text-sm text-brand-300 hover:text-white">← Voltar pro site</button>

      <div className="flex items-center gap-16 max-w-[960px] flex-wrap justify-center">
        <div className="max-w-[460px]">
          <h1 className="font-display font-extrabold text-white leading-tight" style={{ fontSize: 'clamp(26px, 3.4vw, 36px)' }}>
            Pronto. Sua viagem já é<br />um card no AgenteOffice.
          </h1>
          <ul className="mt-5 mb-7 space-y-1">
            {[
              'Voos, hotel e transfer organizados no card',
              <>Financeiro calculado — venda, custo e <strong className="text-white">sua comissão</strong></>,
              'Proposta pronta para enviar ao cliente, com a sua marca',
            ].map((li, i) => (
              <li key={i} className="text-[#b7d2d4] text-[15px] leading-relaxed pl-7 relative">
                <span className="absolute left-0 text-emerald-400 font-bold">✓</span>
                {li}
              </li>
            ))}
          </ul>
          <button
            onClick={cta}
            className="bg-brand-400 hover:bg-brand-300 text-[#06272e] font-extrabold text-base px-7 py-3.5 rounded-xl transition-colors"
          >
            {lead.email ? 'Abrir no meu AgenteOffice →' : 'Ver a proposta pronta →'}
          </button>
          <p className="text-[#5d8489] text-[13px] mt-3">Só o seu e-mail. Sem cartão, sem formulário.</p>
        </div>

        <div className="w-[300px] flex flex-col gap-3" style={{ filter: 'drop-shadow(0 24px 50px rgba(0,0,0,0.45))' }}>
          <KanbanCard viagem={viagem} corEtapa="#42A5F5" etiqueta="Em orçamento" bloqueado={!lead.email} onAbrir={cta} />
          <span className="font-mono text-[10px] tracking-[1.5px] text-[#5d8489] text-center">SEU CARD, COMO FICA NO SISTEMA</span>
        </div>
      </div>

      {modal && (
        <div className="t-overlay" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div className="t-modal">
            <h3>Veja a proposta pronta</h3>
            <p>Seu card fica salvo e sua conta nasce com <strong>10 créditos</strong> pra testar à vontade. Sem cartão.</p>
            <input
              type="email"
              value={campo}
              onChange={(e) => setCampo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmar()}
              placeholder="seu@email.com"
              autoFocus
            />
            {erro && <p className="t-erro">{erro}</p>}
            <button className="t-btn" onClick={confirmar}>Entrar no AgenteOffice</button>
            <p className="t-hint">Protótipo local — nada é enviado de verdade.</p>
          </div>
        </div>
      )}
    </div>
  )
}
