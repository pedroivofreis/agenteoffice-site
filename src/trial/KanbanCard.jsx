import { fmtBRL, fmtData } from './mock.js'

// Réplica do kanban-card do app real (PipelineView) — CSS em index.css (.trial-scope)
export default function KanbanCard({ viagem: v, corEtapa = '#42A5F5', etiqueta = '', bloqueado = false, onAbrir }) {
  const d = v.destino
  const nomeCard = v.cliente ? `Viagem de ${v.cliente}` : `Viagem ${d.nome}`
  const partes = (v.cliente || 'Sem Cliente').split(/\s+/)
  const iniciais = ((partes[0]?.[0] || '') + (partes[1]?.[0] || partes[0]?.[1] || '')).toUpperCase()
  const est = v.financeiro.custoEstimado

  return (
    <button type="button" className="kanban-card" style={{ '--col-color': corEtapa }} onClick={onAbrir}>
      <div className="kanban-card-cover" style={{ background: `linear-gradient(135deg, ${d.grad[0]}, ${d.grad[1]})` }}>
        <img src={d.foto} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} />
        <div className="kanban-card-cover-shade" />
        <span className="kanban-card-cover-fallback-label">{d.nome}{d.uf ? ` · ${d.uf}` : ''}</span>
      </div>
      {etiqueta && (
        <span className="stage-badge" style={{ background: `${corEtapa}22`, color: corEtapa, borderColor: `${corEtapa}44` }}>
          {etiqueta}
        </span>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 4 }}>
        <div className="card-name" style={{ flex: 1 }}>{nomeCard}</div>
        <span className="card-codigo">#{v.codigo}</span>
      </div>
      <div className="card-dest">✈️ {d.nome}{d.uf ? ` — ${d.uf}` : ''}</div>

      <div className="card-client-row">
        <div className="card-avatar">{iniciais}</div>
        <span className="card-client-name">{v.cliente || 'Sem cliente'}</span>
        <span className="card-pax">{v.pax.adultos + v.pax.criancas} pax</span>
      </div>

      <div className="card-fin-grid">
        <div className="card-fin-cell">
          <span className="card-fin-label">Venda</span>
          <span className="card-fin-value">{fmtBRL(v.financeiro.total)}</span>
        </div>
        <div className="card-fin-cell">
          <span className="card-fin-label">Custo{est ? ' est.' : ''}</span>
          <span className={`card-fin-value${bloqueado ? ' valor-borrado' : ''}`}>{fmtBRL(v.financeiro.custo)}</span>
        </div>
        <div className="card-fin-cell">
          <span className="card-fin-label">Comissão{est ? ' est.' : ''}</span>
          <span className={`card-fin-value${bloqueado ? ' valor-borrado' : ''}`} style={{ color: 'var(--green)' }}>
            {fmtBRL(v.financeiro.comissao)}
          </span>
        </div>
      </div>

      <div className="card-dates-row">
        <span className="card-date">📅 {fmtData(v.ida)} – {fmtData(v.volta)}</span>
        <span style={{ fontSize: 13, opacity: 0.55 }}>💬</span>
      </div>
    </button>
  )
}
