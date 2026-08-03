import { useRef, useState } from 'react'
import { Search, Plane } from 'lucide-react'

const EXEMPLOS = [
  'Casal, Porto de Galinhas, 7 noites, saída GRU, uns R$ 9 mil',
  'Família, Orlando, 10 dias em janeiro, 2 adultos e 2 crianças',
  'Viagem para Mariana e João, Cancún em setembro, all inclusive',
]

// Hero novo do site: o campo "monte a viagem" que dispara o trial (TrialFlow).
export default function TrialHero({ onGerar, onArquivo }) {
  const [texto, setTexto] = useState('')
  const [arrastando, setArrastando] = useState(false)
  const fileInput = useRef(null)

  function enviar(t = texto) {
    if (t.trim().length < 8) return
    onGerar(t.trim())
  }

  function onDrop(ev) {
    ev.preventDefault()
    setArrastando(false)
    const f = ev.dataTransfer?.files?.[0]
    if (f) onArquivo(f)
  }

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-[#042F2E] via-[#0A3A44] to-[#114552]">
      {/* grade sutil */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#5DA6AA 1px, transparent 1px), linear-gradient(90deg, #5DA6AA 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      {/* aviõezinhos */}
      <Plane size={74} strokeWidth={1.4} className="absolute top-[120px] right-[12%] text-brand-400 opacity-60 animate-floaty" />
      <Plane size={40} strokeWidth={1.4} className="absolute bottom-[90px] left-[9%] text-brand-400 opacity-30 animate-floaty -scale-x-100" style={{ animationDelay: '1.4s' }} />

      <div className="relative flex flex-col items-center text-center px-5 pt-32 pb-20 max-w-[1100px] mx-auto">
        <h1 className="font-display font-extrabold tracking-tight text-white text-balance leading-[1.1]" style={{ fontSize: 'clamp(30px, 4.6vw, 52px)' }}>
          Monte a viagem do seu cliente<br />em 10 segundos
        </h1>
        <p className="mt-5 mb-9 text-[16.5px] leading-relaxed text-brand-200/90 max-w-[640px]">
          Descreva a viagem que você está cotando — ou solte o PDF ou o print da operadora — e ela já nasce dentro do seu sistema, pronta para virar proposta.
        </p>

        <div
          className={`w-full max-w-[780px] bg-white rounded-2xl p-4 pb-2 text-left relative shadow-[0_30px_80px_rgba(2,20,24,0.5)] border-2 transition-colors ${
            arrastando ? 'border-brand-400 bg-teal-50' : 'border-transparent'
          }`}
          onDragOver={(e) => { e.preventDefault(); setArrastando(true) }}
          onDragLeave={(e) => { e.preventDefault(); setArrastando(false) }}
          onDrop={onDrop}
        >
          <div className="inline-block bg-[#eef6f6] text-ink font-semibold text-[15px] px-4 py-2.5 border border-brand-400 border-b-0 rounded-t-xl">
            ✦ Monte a viagem do seu cliente
          </div>
          <div className="flex items-center gap-2.5 border-[1.5px] border-slate-300 rounded-b-xl rounded-tr-xl p-1 pl-4 focus-within:border-ink">
            <Search size={20} className="text-slate-400 shrink-0" />
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviar()}
              placeholder="Casal, Porto de Galinhas, 7 noites, saída GRU, uns R$ 9 mil…"
              className="flex-1 border-none outline-none text-base py-3.5 min-w-0 placeholder:text-slate-400"
            />
            <button
              onClick={() => enviar()}
              aria-label="Gerar"
              className="w-14 h-[52px] shrink-0 rounded-xl bg-coral-500 hover:bg-coral-600 shadow-glow grid place-content-center transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M3 20v-6l8-2-8-2V4l19 8z" /></svg>
            </button>
          </div>
          <button onClick={() => fileInput.current?.click()} className="block w-full text-center text-slate-400 hover:text-ink text-[13.5px] pt-3 pb-2">
            ou <u className="underline-offset-[3px]">arraste o PDF ou o print da cotação da operadora</u> aqui
          </button>
          <input
            ref={fileInput}
            type="file"
            accept=".pdf,application/pdf,image/*"
            hidden
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onArquivo(f); e.target.value = '' }}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-[860px]">
          {EXEMPLOS.map((e) => (
            <button
              key={e}
              onClick={() => { setTexto(e); enviar(e) }}
              className="text-[13px] text-brand-200 bg-white/5 border border-brand-400/35 rounded-full px-3.5 py-2 hover:bg-brand-400/20 hover:text-white transition-colors"
            >
              {e}
            </button>
          ))}
        </div>

        <p className="mt-6 text-[13px] text-brand-300/80">Sem cadastro, sem cartão — você vê a proposta pronta antes de criar conta.</p>
      </div>
    </section>
  )
}
