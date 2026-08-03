import { useEffect, useState } from 'react'

// Prévia da proposta no hero: mostra, em vez de prometer, o que sai em 1 minuto.
// Versão enxuta da proposta do TurboSection — os blocos entram um a um.
const BLOCOS = ['capa', 'voo', 'hotel', 'passeios', 'total']

export default function PropostaMock() {
  const [visiveis, setVisiveis] = useState(1)

  useEffect(() => {
    if (visiveis >= BLOCOS.length) return
    const t = setTimeout(() => setVisiveis((v) => v + 1), 900)
    return () => clearTimeout(t)
  }, [visiveis])

  const on = (nome) => BLOCOS.indexOf(nome) < visiveis

  return (
    <div className="relative w-full max-w-[330px] mx-auto">
      {/* selo de tempo */}
      <div className="absolute -top-3 -right-2 z-20 bg-coral-500 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-glow flex items-center gap-1.5 animate-floaty">
        pronta em 1 minuto
      </div>

      <div className="rounded-[1.75rem] bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
        {/* barra do navegador */}
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border-b border-slate-100">
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="flex-1 text-center text-[9.5px] font-semibold text-slate-400 truncate">
            agenteoffice.com.br/p/88472
          </div>
        </div>

        <div className="max-h-[440px] overflow-hidden bg-slate-50">
          {/* capa */}
          <div className={`relative h-[132px] transition-all duration-500 ${on('capa') ? 'opacity-100' : 'opacity-0'}`}>
            <img
              src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=700&q=70&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
            <div className="absolute left-3.5 right-3.5 bottom-3">
              <div className="text-[9px] font-bold text-white/80 tracking-wide">SONHOS VIAGENS</div>
              <div className="text-[15px] font-extrabold text-white leading-tight font-display">Lua de Mel — Toscana &amp; Roma</div>
              <div className="text-[10px] text-white/85 mt-0.5">Europa · 12 dias · 2 pessoas</div>
            </div>
          </div>

          <div className="p-2.5 space-y-2">
            {/* voo */}
            <Bloco visivel={on('voo')} icone="✈️" titulo="VOOS">
              <div className="flex items-center gap-2">
                <div className="text-center">
                  <div className="text-[12px] font-extrabold text-[#114552] leading-none">GRU</div>
                  <div className="text-[8px] text-slate-400">08:45</div>
                </div>
                <div className="flex-1 border-t border-dashed border-slate-200 relative">
                  <span className="absolute -top-[7px] left-1/2 -translate-x-1/2 text-[9px]">✈️</span>
                </div>
                <div className="text-center">
                  <div className="text-[12px] font-extrabold text-[#114552] leading-none">FCO</div>
                  <div className="text-[8px] text-slate-400">06:05+1</div>
                </div>
                <span className="text-[7.5px] font-bold bg-teal-50 text-[#0F766E] px-1.5 py-0.5 rounded-full border border-teal-100">direto</span>
              </div>
            </Bloco>

            {/* hotel */}
            <Bloco visivel={on('hotel')} icone="🏨" titulo="HOSPEDAGEM">
              <div className="flex gap-2.5 items-center">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=70&fit=crop"
                  alt=""
                  className="w-11 h-11 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[10.5px] font-extrabold text-[#114552] leading-tight truncate">Castello di Casole</div>
                  <div className="text-[8.5px] text-slate-400 mt-0.5">Toscana · ⭐⭐⭐⭐⭐ · 4 noites</div>
                </div>
              </div>
            </Bloco>

            {/* passeios */}
            <Bloco visivel={on('passeios')} icone="🎭" titulo="EXPERIÊNCIAS">
              <div className="space-y-1">
                {['Tour privê Vinícolas do Chianti', 'Coliseu com acesso prioritário'].map((p) => (
                  <div key={p} className="flex items-center gap-1.5">
                    <span className="text-emerald-500 text-[9px]">✓</span>
                    <span className="text-[9.5px] text-slate-600 font-medium truncate">{p}</span>
                  </div>
                ))}
              </div>
            </Bloco>

            {/* total */}
            <div className={`transition-all duration-500 ${on('total') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <div className="bg-[#114552] rounded-xl px-3.5 py-3 flex items-center justify-between">
                <div>
                  <div className="text-[8.5px] font-bold text-white/60 tracking-wide">INVESTIMENTO TOTAL</div>
                  <div className="text-[16px] font-extrabold text-white leading-tight">R$ 28.400</div>
                </div>
                <div className="text-[9px] text-white/70 text-right leading-tight">
                  em até<br /><strong className="text-white">10x</strong>
                </div>
              </div>
              <div className="text-[8.5px] text-slate-400 text-center mt-1.5">
                Custo e comissão ficam só com você.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Bloco({ visivel, icone, titulo, children }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-100 overflow-hidden transition-all duration-500 ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <div className="px-2.5 py-1.5 border-b border-slate-50 flex items-center gap-1.5">
        <span className="text-[10px]">{icone}</span>
        <span className="text-[8.5px] font-extrabold text-[#114552] tracking-widest">{titulo}</span>
      </div>
      <div className="p-2.5">{children}</div>
    </div>
  )
}
