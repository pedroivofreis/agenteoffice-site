import { useRef, useState } from 'react'
import { Search, Plane } from 'lucide-react'
import PropostaMock from '../components/PropostaMock.jsx'

const EXEMPLOS = [
  'Casal, Porto de Galinhas, 7 noites, saída GRU, uns R$ 9 mil',
  'Família, Orlando, 10 dias em janeiro, 2 adultos e 2 crianças',
  'Viagem para Mariana e João, Cancún em setembro, all inclusive',
]

// Hero do site: o campo "monte a viagem" (dispara o trial) ao lado da proposta
// que sai dele — mostrar o resultado vende melhor do que descrevê-lo.
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
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#5DA6AA 1px, transparent 1px), linear-gradient(90deg, #5DA6AA 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <Plane size={64} strokeWidth={1.4} className="absolute top-[110px] left-[6%] text-brand-400 opacity-25 animate-floaty hidden lg:block" />
      <Plane size={34} strokeWidth={1.4} className="absolute bottom-[80px] right-[5%] text-brand-400 opacity-20 animate-floaty -scale-x-100 hidden lg:block" style={{ animationDelay: '1.4s' }} />

      <div className="relative max-w-[1240px] mx-auto px-5 sm:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-14">
        {/* ── coluna do campo ── */}
        <div className="lg:flex-1 lg:max-w-[620px] text-center lg:text-left">
          <h1 className="font-display font-extrabold tracking-tight text-white text-balance leading-[1.1]" style={{ fontSize: 'clamp(30px, 4.2vw, 50px)' }}>
            Monte a viagem do seu cliente<br className="hidden sm:block" /> em 10 segundos
          </h1>
          <p className="mt-5 text-[16.5px] leading-relaxed text-brand-200/90 max-w-[560px] mx-auto lg:mx-0">
            Descreva a viagem que você está cotando — ou solte o PDF da operadora — e ela nasce dentro do seu sistema,
            com a proposta pronta pra enviar.
          </p>

          <div
            className={`mt-8 bg-white rounded-2xl p-4 pb-2 text-left relative shadow-[0_30px_80px_rgba(2,20,24,0.5)] border-2 transition-colors ${
              arrastando ? 'border-brand-400 bg-teal-50' : 'border-transparent'
            }`}
            onDragOver={(e) => { e.preventDefault(); setArrastando(true) }}
            onDragLeave={(e) => { e.preventDefault(); setArrastando(false) }}
            onDrop={onDrop}
          >
            <div className="inline-block bg-[#eef6f6] text-ink font-semibold text-[14.5px] px-4 py-2.5 border border-brand-400 border-b-0 rounded-t-xl">
              ✦ Monte a viagem do seu cliente
            </div>
            <div className="flex items-center gap-2.5 border-[1.5px] border-slate-300 rounded-b-xl rounded-tr-xl p-1 pl-4 focus-within:border-ink">
              <Search size={20} className="text-slate-400 shrink-0" />
              <input
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && enviar()}
                placeholder="Casal, Porto de Galinhas, 7 noites, saída GRU…"
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
              ou <u className="underline-offset-[3px]">arraste o PDF ou o print da cotação</u> aqui
            </button>
            <input
              ref={fileInput}
              type="file"
              accept=".pdf,application/pdf,image/*"
              hidden
              onChange={(e) => { const f = e.target.files?.[0]; if (f) onArquivo(f); e.target.value = '' }}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2 justify-center lg:justify-start">
            {EXEMPLOS.map((e) => (
              <button
                key={e}
                onClick={() => { setTexto(e); enviar(e) }}
                className="text-[12.5px] text-brand-200 bg-white/5 border border-brand-400/35 rounded-full px-3.5 py-2 hover:bg-brand-400/20 hover:text-white transition-colors"
              >
                {e}
              </button>
            ))}
          </div>

          <p className="mt-5 text-[13px] text-brand-300/80">
            Sem cadastro, sem cartão — você vê a proposta pronta antes de criar conta.
          </p>
        </div>

        {/* ── coluna da proposta que sai dali ── */}
        <div className="lg:flex-1 w-full">
          <PropostaMock />
        </div>
      </div>
    </section>
  )
}
