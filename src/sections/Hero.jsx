import { Sparkles, Check, Plane, ArrowDown, MessageCircle } from 'lucide-react';
import { Container, Button } from '../lib/ui.jsx';
import { AGENTE_WHATSAPP_HREF } from '../lib/data.js';
import ChatAnimated from '../components/ChatAnimated.jsx';

export default function Hero({ onAgente, onSistema }) {
  return (
    <section id="top" className="relative overflow-hidden bg-sand-50 pt-28 sm:pt-32 lg:pt-44 pb-16 lg:pb-24">
      {/* decoração */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[640px] h-[640px] bg-gradient-to-bl from-brand-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-[520px] h-[520px] bg-gradient-to-tr from-coral-100/60 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-10">
        {/* ── Texto ── */}
        <div className="lg:flex-1 lg:max-w-xl">
          <span className="inline-flex items-center gap-2 bg-white border border-coral-100 px-3.5 py-1.5 rounded-full shadow-soft">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-coral-600">Novo · Agente de IA</span>
          </span>

          <h1 className="mt-6 font-display font-extrabold tracking-tight text-4xl sm:text-5xl xl:text-[64px] leading-[1.05] text-ink text-balance">
            Seu pré-atendimento<br />
            que <span className="text-coral-500">qualifica sozinho</span>.
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg">
            Um agente de IA atende seus clientes no WhatsApp <strong className="text-ink font-bold">24 horas por dia</strong>, entende o que eles querem e já cria a viagem dentro do seu sistema — pronta para virar orçamento.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button as="a" href={AGENTE_WHATSAPP_HREF} target="_blank" rel="noopener" size="lg" icon={false}>
              <MessageCircle size={18} /> Testar o agente agora
            </Button>
            <button onClick={onSistema} className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-ink font-extrabold shadow-soft hover:bg-sand-50 transition-all">
              Ver o sistema
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-500 font-medium">
            É um agente <span className="font-bold text-ink">de verdade</span> respondendo no WhatsApp — manda um “oi” e veja. 😉
          </p>

          {/* prova social — reforçada com nomes reais */}
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white border border-slate-100 shadow-soft px-4 py-3 w-fit">
            <div className="flex -space-x-2">
              {['/agencias/clau.png', '/agencias/citytours.png', '/agencias/flavia.png'].map((s) => (
                <span key={s} className="w-9 h-9 rounded-full ring-2 ring-white bg-white overflow-hidden grid place-content-center">
                  <img src={s} alt="" className="w-7 h-7 object-contain" />
                </span>
              ))}
            </div>
            <div className="text-sm leading-tight">
              <div className="font-extrabold text-ink">Clau a Viajante, City Tours, Flávia Prado…</div>
              <div className="text-slate-500">agências reais já atendem melhor com o AgenteOffice</div>
            </div>
          </div>
        </div>

        {/* ── Mock: conversa animada → viagem no sistema ── */}
        <div className="lg:flex-1 relative">
          <div className="relative mx-auto max-w-sm">
            <div className="rounded-[2rem] bg-white shadow-card border border-slate-100 overflow-hidden">
              {/* header whatsapp */}
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
            <div className="absolute -bottom-6 -left-4 sm:-left-10 w-56 bg-white rounded-2xl shadow-card border border-slate-100 p-3.5 animate-floaty hidden sm:block">
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

            <div className="absolute -top-4 -right-2 bg-ink text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-card flex items-center gap-1.5 animate-floaty" style={{ animationDelay: '1.5s' }}>
              <Sparkles size={13} className="text-sun-400" /> responde em segundos
            </div>
          </div>

          <button onClick={onAgente} className="mt-10 mx-auto flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-500 transition-colors">
            <ArrowDown size={15} /> veja como o agente funciona
          </button>
        </div>
      </Container>
    </section>
  );
}
