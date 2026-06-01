import { Sparkles, Check, Plane, ArrowDown, MessageCircle } from 'lucide-react';
import { Button } from '../lib/ui.jsx';
import { AGENTE_WHATSAPP_HREF } from '../lib/data.js';
import ChatAnimated from '../components/ChatAnimated.jsx';

// Foto full-bleed (estilo editorial / BMW) — asa de avião sobre as nuvens ao pôr do sol
const HERO_IMG = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2000&q=80&fit=crop';

export default function Hero({ onAgente, onSistema }) {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* foto full-bleed + overlays */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-16 lg:py-28 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-12">
        {/* ── Texto ── */}
        <div className="lg:flex-1 lg:max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-white">Novo · Agente de IA</span>
          </span>

          <h1 className="mt-6 font-display font-extrabold tracking-tight text-5xl sm:text-6xl xl:text-[76px] leading-[0.98] text-white text-balance drop-shadow-sm">
            Seu pré-atendimento<br />
            que <span className="text-coral-400">qualifica sozinho</span>.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/85 leading-relaxed max-w-xl">
            Um agente de IA atende seus clientes no WhatsApp <strong className="text-white font-bold">24 horas por dia</strong>, entende o que eles querem e já cria a viagem dentro do seu sistema — pronta para virar orçamento.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button as="a" href={AGENTE_WHATSAPP_HREF} target="_blank" rel="noopener" size="lg" icon={false}>
              <MessageCircle size={18} /> Testar o agente agora
            </Button>
            <button onClick={onSistema} className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-extrabold hover:bg-white/20 transition-all">
              Ver o sistema
            </button>
          </div>
          <p className="mt-3 text-sm text-white/70 font-medium">
            É um agente <span className="font-bold text-white">de verdade</span> respondendo no WhatsApp — manda um “oi” e veja. 😉
          </p>

          {/* prova social */}
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 w-fit">
            <div className="flex -space-x-2">
              {['/agencias/clau.png', '/agencias/citytours.png', '/agencias/flavia.png'].map((s) => (
                <span key={s} className="w-9 h-9 rounded-full ring-2 ring-white bg-white overflow-hidden grid place-content-center">
                  <img src={s} alt="" className="w-7 h-7 object-contain" />
                </span>
              ))}
            </div>
            <div className="text-sm leading-tight">
              <div className="font-extrabold text-white">Clau a Viajante, City Tours, Flávia Prado…</div>
              <div className="text-white/70">agências reais já atendem melhor com o AgenteOffice</div>
            </div>
          </div>
        </div>

        {/* ── Mock: conversa animada → viagem no sistema ── */}
        <div className="lg:flex-1 relative w-full">
          <div className="relative mx-auto max-w-sm">
            <div className="rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
              <div className="flex items-center gap-3 bg-brand-900 px-4 py-3">
                <div className="w-9 h-9 rounded-full bg-brand-400 grid place-content-center text-white font-extrabold">M</div>
                <div className="leading-tight">
                  <div className="text-white text-sm font-bold">Mar.ia · Agente IA</div>
                  <div className="text-brand-200 text-[11px] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> online agora</div>
                </div>
              </div>
              <ChatAnimated />
            </div>

            {/* card flutuante: viagem criada */}
            <div className="absolute -bottom-6 -left-4 sm:-left-10 w-56 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-3.5 animate-floaty hidden sm:block">
              <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-emerald-600">
                <Plane size={14} /> Viagem no sistema
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-brand-50 grid place-content-center text-brand-500"><Plane size={16} /></span>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-ink">Maceió · Janeiro</div>
                  <div className="text-[11px] text-slate-500">2 adultos · 5 noites · de SP</div>
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 flex items-center gap-1"><Check size={10} /> pronta pra orçar</span>
              </div>
            </div>

            <div className="absolute -top-4 -right-2 bg-coral-500 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-glow flex items-center gap-1.5 animate-floaty" style={{ animationDelay: '1.5s' }}>
              <Sparkles size={13} /> responde em segundos
            </div>
          </div>
        </div>
      </div>

      {/* indicador de scroll */}
      <button onClick={onAgente} className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors">
        <ArrowDown size={15} className="animate-bounce" /> veja como o agente funciona
      </button>
    </section>
  );
}
