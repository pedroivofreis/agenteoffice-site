import { useState } from 'react'
import { Home, Plane, Users, Contact, CheckSquare, Sparkles, Wallet, Bot, MessageCircle } from 'lucide-react'
import KanbanCard from './KanbanCard.jsx'
import CardModal from './CardModal.jsx'

// Réplica do shell do app real (AppLayout + PipelineView) com as etapas/cores reais
const ETAPAS = [
  { key: 'novo', label: 'Novas viagens', color: '#90A4AE' },
  { key: 'orcamento', label: 'Em orçamento', color: '#42A5F5' },
  { key: 'decisao', label: 'Em decisão', color: '#FFA726' },
  { key: 'pagamento', label: 'Em pagamento', color: '#AB47BC' },
  { key: 'confirmado', label: 'Viagem confirmada', color: '#26A69A' },
  { key: 'perdido', label: 'Perdido', color: '#EF5350' },
]

const MENU = [
  { secao: 'Principal', itens: [{ nome: 'Dashboard', Icone: Home }] },
  { secao: 'Operação', itens: [
    { nome: 'Viagens', Icone: Plane, ativo: true },
    { nome: 'Grupos & Excursões', Icone: Users },
    { nome: 'Clientes', Icone: Contact },
    { nome: 'Atividades', Icone: CheckSquare },
  ]},
  { secao: 'Vendas', itens: [
    { nome: 'Estúdio de Vendas ✦', Icone: Sparkles },
    { nome: 'Financeiro', Icone: Wallet },
  ]},
  { secao: 'IA', itens: [
    { nome: 'Maria', Icone: Bot },
    { nome: 'Atendimento WhatsApp', Icone: MessageCircle },
  ]},
]

export default function Workspace({ viagem, lead, creditos, onSetAgencia, onSetWhats, onNova }) {
  const [modalCard, setModalCard] = useState(false)
  const [modalCampo, setModalCampo] = useState(null) // null | 'agencia' | 'whats'
  const [campo, setCampo] = useState('')
  const [erro, setErro] = useState('')

  function abrirCampo(qual) {
    setCampo('')
    setErro('')
    setModalCampo(qual)
  }

  function confirmarCampo() {
    const val = campo.trim()
    if (modalCampo === 'agencia') {
      if (val.length < 2) { setErro('Digite o nome da agência'); return }
      onSetAgencia(val)
    } else {
      if (val.replace(/\D/g, '').length < 10) { setErro('Digite um número com DDD'); return }
      onSetWhats(val)
    }
    setModalCampo(null)
  }

  const iniciais = (lead.email[0] || 'a').toUpperCase() + (lead.email[1] || '').toUpperCase()

  return (
    <div className="min-h-full flex bg-[#f6f7f9]">
      {/* ══ SIDEBAR (réplica do AppLayout) ══ */}
      <aside className="w-[232px] shrink-0 bg-[#f4f5f7] border-r border-slate-900/10 hidden md:flex flex-col px-2.5 py-4 sticky top-0 h-screen overflow-y-auto">
        <div className="px-2 pb-4"><img src="/logo_hor_col.png" alt="AgenteOffice" className="h-[26px]" onError={(e) => { e.currentTarget.src = '/logo_hor_white.png' }} /></div>
        <nav>
          {MENU.map((grupo) => (
            <div key={grupo.secao}>
              <div className="text-[10px] font-bold tracking-wider uppercase text-[#7a8699] px-2.5 pt-3 pb-1.5">{grupo.secao}</div>
              {grupo.itens.map(({ nome, Icone, ativo }) => (
                <button
                  key={nome}
                  className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-[13.5px] transition-colors ${
                    ativo
                      ? 'bg-[#d0e4e0] text-[#1a2332] font-bold shadow-[inset_3px_0_0_#0C6B63]'
                      : 'text-[#4a5568] font-medium hover:bg-[#e2ebe9] hover:text-[#1a2332]'
                  }`}
                >
                  <Icone size={16} className={ativo ? 'text-[#0C6B63]' : 'text-[#5c6778]'} />
                  <span className="truncate">{nome}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="mt-auto font-mono text-[10px] tracking-wider text-[#0A5C55] bg-[#0d6b63]/15 border border-[#0d6b63]/25 rounded-lg px-2.5 py-2 text-center">
          MODO TESTE · {creditos} CRÉDITOS
        </div>
      </aside>

      {/* ══ CONTEÚDO ══ */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-6 pt-5 pb-3.5">
          <div>
            <h2 className="text-[21px] font-bold text-slate-900">Viagens</h2>
            <span className="text-[13px] text-slate-400">Gerencie suas viagens por fase — do primeiro contato ao embarque.</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onNova} className="t-btn t-btn-ghost !px-4 !py-2 !text-sm">+ Nova viagem</button>
            <div title={lead.email} className="w-9 h-9 rounded-full bg-[#0C6B63] text-white text-[13px] font-bold grid place-content-center">{iniciais}</div>
          </div>
        </header>

        {/* Onboarding em etapas: captura o restante sem formulário */}
        <div className="flex items-center gap-2 flex-wrap mx-6 mb-3.5 px-3.5 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[13px]">
          <span className="font-semibold text-amber-800">Complete sua conta:</span>
          <span className="text-[12.5px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">✓ E-mail</span>
          <button
            onClick={() => !lead.agencia && abrirCampo('agencia')}
            className={`text-[12.5px] font-semibold rounded-full px-3 py-1 transition-colors ${
              lead.agencia
                ? 'text-green-700 bg-green-50 border border-green-200 cursor-default'
                : 'text-amber-800 bg-white border border-dashed border-amber-400 hover:bg-amber-100'
            }`}
          >
            {lead.agencia ? `✓ ${lead.agencia}` : 'Marca da agência'}
          </button>
          <button
            onClick={() => !lead.whats && abrirCampo('whats')}
            className={`text-[12.5px] font-semibold rounded-full px-3 py-1 transition-colors ${
              lead.whats
                ? 'text-green-700 bg-green-50 border border-green-200 cursor-default'
                : 'text-amber-800 bg-white border border-dashed border-amber-400 hover:bg-amber-100'
            }`}
          >
            {lead.whats ? '✓ WhatsApp' : 'WhatsApp'}
          </button>
        </div>

        <main className="flex-1 px-6 pb-6 overflow-x-auto">
          <div className="kanban-board">
            {ETAPAS.map((etapa) => (
              <div key={etapa.key} className="kanban-col" style={{ '--col-color': etapa.color }}>
                <div className="kanban-col-header">
                  <div className="col-dot" style={{ background: etapa.color }} />
                  <span className="col-label">{etapa.label}</span>
                  <span className="col-count" style={{ color: etapa.color, borderColor: `${etapa.color}22`, background: `${etapa.color}12` }}>
                    {etapa.key === 'orcamento' ? 1 : 0}
                  </span>
                </div>
                <div className="kanban-col-body">
                  {etapa.key === 'orcamento' && (
                    <KanbanCard viagem={viagem} corEtapa={etapa.color} onAbrir={() => setModalCard(true)} />
                  )}
                </div>
                <button className="kanban-add" onClick={onNova}>+ Adicionar viagem</button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ══ Card aberto (proposta) ══ */}
      {modalCard && (
        <CardModal
          viagem={viagem}
          lead={lead}
          onFechar={() => setModalCard(false)}
          onPedirAgencia={() => abrirCampo('agencia')}
          onPedirWhats={() => abrirCampo('whats')}
        />
      )}

      {/* ══ Capturas em etapas ══ */}
      {modalCampo && (
        <div className="t-overlay" onClick={(e) => e.target === e.currentTarget && setModalCampo(null)}>
          <div className="t-modal">
            {modalCampo === 'agencia' ? (
              <>
                <h3>Como se chama sua agência?</h3>
                <p>A proposta e o link do cliente saem com a <strong>sua marca</strong> — logo, cores e nome, do hero ao rodapé.</p>
                <input value={campo} onChange={(e) => setCampo(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && confirmarCampo()} placeholder="Ex.: Sonhos Viagens" autoFocus />
              </>
            ) : (
              <>
                <h3>Seu WhatsApp</h3>
                <p>Te mandamos <strong>exatamente o que o cliente recebe</strong>, no seu número — de graça, quantas vezes quiser. <em>(simulado no protótipo)</em></p>
                <input value={campo} onChange={(e) => setCampo(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && confirmarCampo()} placeholder="(11) 98765-4321" autoFocus />
              </>
            )}
            {erro && <p className="t-erro">{erro}</p>}
            <button className="t-btn" onClick={confirmarCampo}>{modalCampo === 'agencia' ? 'Aplicar minha marca' : 'Me manda no WhatsApp'}</button>
            <p className="t-hint">Protótipo local — nada é enviado de verdade.</p>
          </div>
        </div>
      )}
    </div>
  )
}
