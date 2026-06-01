import { Bot, Clock, MessageSquareText, Sparkles, ArrowRight, MapPin, CalendarDays, Users, CheckCircle2 } from 'lucide-react';
import { Container, SectionBadge } from '../lib/ui.jsx';

const FEATURES = [
  { icon: Clock, title: 'Responde em segundos, 24/7', desc: 'Nenhum cliente fica no vácuo — nem de madrugada, nem no fim de semana.' },
  { icon: MessageSquareText, title: 'Conversa de gente, não de robô', desc: 'Entende o pedido em linguagem natural: destino, datas, quantas pessoas, orçamento.' },
  { icon: Sparkles, title: 'Qualifica sozinho', desc: 'Faz as perguntas certas e separa quem está pronto pra comprar de quem só está olhando.' },
  { icon: ArrowRight, title: 'Entrega pro especialista', desc: 'No momento certo, passa a conversa (e a viagem já criada) pro agente humano fechar.' },
];

export default function AgenteSection() {
  return (
    <section id="agente" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="absolute top-1/3 -right-32 w-[480px] h-[480px] bg-gradient-to-bl from-coral-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />
      <Container className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* texto */}
        <div>
          <SectionBadge icon={Bot} tone="coral">① O Agente de IA</SectionBadge>
          <h2 className="mt-5 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.08] text-balance">
            Ele qualifica.<br />Você só fecha.
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed max-w-lg">
            O pré-atendimento de IA conversa no WhatsApp, entende o que o cliente quer e já organiza tudo no seu sistema — pra você receber a viagem pronta pra orçar.
          </p>
          <div className="mt-8 space-y-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className="shrink-0 w-11 h-11 rounded-2xl bg-coral-50 text-coral-500 grid place-content-center"><f.icon size={20} /></span>
                <div>
                  <div className="font-extrabold text-ink">{f.title}</div>
                  <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* mock: conversa WhatsApp → dados extraídos (mesmo card) */}
        <div className="relative">
          <div className="absolute -inset-3 bg-coral-100/40 rounded-[2.5rem] blur-2xl pointer-events-none" />
          <div className="relative rounded-[2rem] bg-white shadow-card border border-slate-100 overflow-hidden max-w-md mx-auto">
            {/* header whatsapp */}
            <div className="flex items-center gap-3 bg-brand-900 px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-300 to-brand-600 grid place-content-center text-white font-extrabold italic">M</div>
              <div className="leading-tight">
                <div className="text-white text-sm font-bold">Mar.ia · Agente IA</div>
                <div className="text-brand-200 text-[11px] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> digitando…</div>
              </div>
            </div>

            {/* mensagens com papel de parede */}
            <div className="px-3 py-4 space-y-2.5 bg-[#efe7dd]" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px,transparent 1px)', backgroundSize: '16px 16px' }}>
              <div className="flex justify-start"><div className="max-w-[82%] bg-white text-slate-700 rounded-2xl rounded-bl-sm px-3.5 py-2 text-[13px] shadow-sm">Quero viajar em família nas férias de julho ✈️</div></div>
              <div className="flex justify-end"><div className="max-w-[82%] bg-[#d9fdd3] text-slate-800 rounded-2xl rounded-br-sm px-3.5 py-2 text-[13px] shadow-sm">Que ótimo! Pra onde vocês querem ir, quantas pessoas e quantos dias?</div></div>
              <div className="flex justify-start"><div className="max-w-[82%] bg-white text-slate-700 rounded-2xl rounded-bl-sm px-3.5 py-2 text-[13px] shadow-sm">Orlando, 2 adultos e 2 crianças, uns 8 dias 🎢</div></div>
              <div className="flex justify-end"><div className="max-w-[82%] bg-[#d9fdd3] text-slate-800 rounded-2xl rounded-br-sm px-3.5 py-2 text-[13px] shadow-sm">Perfeito! 🙌 Já tô organizando tudo aqui pro especialista 👇</div></div>
            </div>

            {/* painel de dados extraídos (resultado no sistema) */}
            <div className="bg-white p-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-brand-600">
                <Sparkles size={14} /> Mar.ia entendeu e organizou
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { icon: MapPin, l: 'Destino', v: 'Orlando' },
                  { icon: CalendarDays, l: 'Período', v: 'Julho · 8 dias' },
                  { icon: Users, l: 'Pessoas', v: '2 ad · 2 cri' },
                ].map((d) => (
                  <div key={d.l} className="rounded-xl bg-sand-50 border border-slate-100 p-2.5 text-center">
                    <d.icon size={15} className="mx-auto text-brand-400" />
                    <div className="mt-1 text-[10px] uppercase tracking-wide text-slate-400 font-bold">{d.l}</div>
                    <div className="text-[12px] font-extrabold text-ink leading-tight">{d.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-[12px] font-bold text-emerald-600">
                <CheckCircle2 size={15} /> Viagem criada e enviada ao especialista
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
