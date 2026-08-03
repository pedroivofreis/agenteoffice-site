export default function LeadWidget({ lead, onReset }) {
  const linhas = [
    ['E-MAIL', lead.email],
    ['AGÊNCIA', lead.agencia],
    ['WHATSAPP', lead.whats],
  ]
  return (
    <div className="fixed bottom-4 left-4 z-[110] bg-[#051c3f]/95 border border-[#24406e] p-3.5 max-w-[250px] flex flex-col gap-1.5 text-xs shadow-2xl rounded-md">
      <span className="font-mono text-[10px] tracking-[1.5px] text-white mb-0.5">LEAD CAPTURADO</span>
      {linhas.map(([rot, val]) => (
        <div key={rot} className="flex items-baseline gap-2">
          <span className="font-mono text-[9px] tracking-wider text-[#5f7ba3] w-[58px] shrink-0">{rot}</span>
          <span className={`truncate ${val ? 'text-emerald-300' : 'text-[#8aa5c8]'}`}>{val || '—'}</span>
        </div>
      ))}
      <button onClick={onReset} className="text-[11px] text-[#5f7ba3] hover:text-white text-left mt-1">
        ↺ recomeçar demo
      </button>
    </div>
  )
}
