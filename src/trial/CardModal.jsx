import { fmtBRL, fmtData } from './mock.js'

export default function CardModal({ viagem: v, lead, onFechar, onPedirAgencia, onPedirWhats }) {
  const d = v.destino
  const { adultos, criancas } = v.pax
  let paxLabel = `${adultos} adulto${adultos > 1 ? 's' : ''}`
  if (criancas) paxLabel += ` + ${criancas} criança${criancas > 1 ? 's' : ''}`
  const linkProposta = `app.agenteoffice.com.br/proposta/${v.codigo}`
  const est = v.financeiro.custoEstimado

  const Row = ({ rotulo, children, ghost }) => (
    <div className={`flex gap-3 py-2.5 border-b border-slate-50 ${ghost ? 'cursor-pointer group' : ''}`}>
      <span className="font-mono text-[9.5px] tracking-wider text-slate-400 w-[66px] shrink-0 pt-1">{rotulo}</span>
      <div className={`text-[13.5px] ${ghost ? 'text-slate-400 text-[13px] group-hover:text-[#0C6B63]' : 'text-slate-800'}`}>{children}</div>
    </div>
  )

  return (
    <div className="t-overlay" onClick={(e) => e.target === e.currentTarget && onFechar()}>
      <div className="bg-white rounded-2xl w-full max-w-[700px] max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* capa com foto */}
        <div className="relative p-6 pb-5 text-white overflow-hidden" style={{ background: `linear-gradient(135deg, ${d.grad[0]}, ${d.grad[1]})` }}>
          <img src={d.foto} alt="" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
          <button onClick={onFechar} className="absolute top-3 right-4 text-white/80 hover:text-white text-[26px] leading-none z-10">×</button>
          <div className="relative z-10">
            <span className="font-mono text-[10px] tracking-[1.5px] opacity-90">#{v.codigo} · EM ORÇAMENTO</span>
            <h3 className="text-[23px] font-bold my-1">{v.cliente ? `Viagem de ${v.cliente}` : `Viagem ${d.nome}`}</h3>
            <span className="text-[13.5px] opacity-95">
              {d.nome}{d.uf ? ` — ${d.uf}` : ''} · {fmtData(v.ida)} – {fmtData(v.volta)} · {paxLabel}
            </span>
          </div>
        </div>

        <div className="p-6 pt-5">
          <div className="grid sm:grid-cols-[1.2fr_1fr] gap-6">
            {/* Resumo */}
            <section>
              <h4 className="font-mono text-[10.5px] tracking-[1.3px] text-slate-400 mb-2.5">RESUMO DA VIAGEM</h4>
              {v.itens.voo.tem ? (
                <Row rotulo="VOO">
                  <strong>{v.itens.voo.cia}</strong>{v.itens.voo.detalhe ? ` · ${v.itens.voo.detalhe}` : ''}
                  {(v.saida || v.itens.voo.rota) && <small className="block text-slate-400 text-xs mt-0.5">{v.saida} {v.itens.voo.rota}</small>}
                </Row>
              ) : (
                <Row rotulo="VOO" ghost>+ Adicionar voo</Row>
              )}
              {v.itens.hotel.tem ? (
                <Row rotulo="HOTEL">
                  <strong>{v.itens.hotel.nome}</strong>
                  <small className="block text-slate-400 text-xs mt-0.5">{[v.itens.hotel.regime, `${v.noites} noites`].filter(Boolean).join(' · ')}</small>
                </Row>
              ) : (
                <Row rotulo="HOTEL" ghost>+ Adicionar hospedagem</Row>
              )}
              {v.itens.transfer.tem ? (
                <Row rotulo="TRANSFER"><strong>{v.itens.transfer.desc}</strong></Row>
              ) : (
                <Row rotulo="TRANSFER" ghost>+ Adicionar transfer</Row>
              )}
              {d.conhecido && (
                <Row rotulo="SUGESTÕES"><small className="text-slate-500 text-[12.5px]">{d.destaques.join(' · ')}</small></Row>
              )}
            </section>

            {/* Financeiro */}
            <section>
              <h4 className="font-mono text-[10.5px] tracking-[1.3px] text-slate-400 mb-2.5">FINANCEIRO</h4>
              <div className="border border-slate-200 rounded-xl px-4 py-3 text-sm">
                <div className="flex justify-between py-0.5"><span>Venda</span><strong className="tabular-nums">{fmtBRL(v.financeiro.total)}</strong></div>
                <div className="flex justify-between py-0.5 text-slate-400 text-[12.5px]"><span>Entrada (25%)</span><span>{fmtBRL(v.financeiro.entrada)}</span></div>
                <div className="flex justify-between py-0.5 text-slate-400 text-[12.5px]"><span>+ {v.financeiro.parcelas}x</span><span>{fmtBRL(v.financeiro.parcela)}</span></div>
                <div className="border-t border-dashed border-slate-300 my-2" />
                <div className="flex justify-between py-0.5"><span>Custo{est ? ' (estimado)' : ''}</span><span className="tabular-nums">{fmtBRL(v.financeiro.custo)}</span></div>
                <div className="flex justify-between py-0.5"><span>Sua comissão{est ? ' (estimada)' : ''}</span><strong className="text-green-700 tabular-nums">{fmtBRL(v.financeiro.comissao)}</strong></div>
              </div>
              <p className="text-[11.5px] text-slate-400 mt-2 leading-snug">💳 Comissão e custo da agência são sempre confidenciais — só você vê.</p>
            </section>
          </div>

          {/* Link do cliente */}
          <section className="mt-5 border-t border-slate-100 pt-4">
            <h4 className="font-mono text-[10.5px] tracking-[1.3px] text-slate-400 mb-2">PROPOSTA PARA O CLIENTE</h4>
            <p className="text-[13px] text-slate-600 mb-2.5">Link digital com a cara da sua agência. Sem custo exposto. O cliente abre no celular e já quer confirmar.</p>
            <div className="text-xs text-[#0A5C55] bg-[#E8F2F0] border border-[#CCFBF1] rounded-lg px-3.5 py-2 mb-3 truncate">{linkProposta}</div>

            {!lead.agencia ? (
              <div className="flex items-center justify-between gap-3 flex-wrap bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-[13px] text-amber-800 mb-3">
                <span>A proposta ainda está <strong>sem a sua marca</strong>.</span>
                <button className="t-btn !px-3.5 !py-2 !text-[13px] !w-auto" onClick={onPedirAgencia}>Colocar a marca da minha agência</button>
              </div>
            ) : (
              <div className="text-green-700 text-[13.5px] font-medium mb-3">✓ Proposta com a marca de <strong>{lead.agencia}</strong></div>
            )}

            {!lead.whats ? (
              <button className="t-btn t-btn-green w-full" onClick={onPedirWhats}>Receber a proposta no meu WhatsApp</button>
            ) : (
              <div className="text-green-700 text-[13.5px] font-medium">✓ Enviada para {lead.whats} <small className="text-slate-400 font-normal">(simulado no protótipo)</small></div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
