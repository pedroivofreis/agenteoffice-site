import { LayoutDashboard, Kanban, Users, Wallet, CalendarClock, Plane } from 'lucide-react';
import { Container, SectionBadge } from '../lib/ui.jsx';

const FEATURES = [
  { icon: Kanban, title: 'Suas vendas, etapa por etapa', desc: 'Veja cada viagem andando do primeiro contato ao embarque — nada se perde no caminho.' },
  { icon: Users, title: 'Clientes com histórico', desc: 'Todo o histórico do viajante num lugar: viagens, documentos e preferências.' },
  { icon: Wallet, title: 'Financeiro de verdade', desc: 'Recebimentos, pagamentos a fornecedores e comissões — em tempo real.' },
  { icon: CalendarClock, title: 'Agenda + alertas', desc: 'Embarques, vencimentos e tarefas avisando na hora certa.' },
];

// Etapas e cores REAIS do sistema (chronodesk · stores/app.js)
const COLS = [
  { name: 'Novas viagens', color: '#90A4AE', cards: [{ t: 'Maceió · Jan', s: 'Família Souza', v: 'novo' }] },
  { name: 'Em orçamento', color: '#42A5F5', cards: [{ t: 'Orlando · Jul', s: 'Fam. Lima', v: 'R$ 14.200' }, { t: 'Buenos Aires', s: 'Rafael', v: 'R$ 5.800' }] },
  { name: 'Em decisão', color: '#FFA726', cards: [{ t: 'Europa · 12 dias', s: 'Casal Dias', v: 'R$ 32.000' }] },
  { name: 'Em pagamento', color: '#AB47BC', cards: [{ t: 'Cancún · Dez', s: 'Marcos', v: 'R$ 9.400' }] },
  { name: 'Confirmada', color: '#26A69A', cards: [{ t: 'Lisboa · Set', s: 'Carla N.', v: 'R$ 11.900' }] },
];

const SIDE = [
  { icon: LayoutDashboard }, { icon: Kanban, active: true }, { icon: Users }, { icon: Wallet }, { icon: CalendarClock },
];

export default function SistemaSection() {
  return (
    <section id="sistema" className="relative py-20 sm:py-28 bg-sand-50 overflow-hidden">
      <Container className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* mock fiel ao sistema (esquerda no desktop) */}
        <div className="order-2 lg:order-1 min-w-0">
          <div className="rounded-2xl bg-white shadow-card border border-slate-100 overflow-hidden">
            {/* chrome do navegador */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
              <span className="w-3 h-3 rounded-full bg-red-300" />
              <span className="w-3 h-3 rounded-full bg-amber-300" />
              <span className="w-3 h-3 rounded-full bg-emerald-300" />
              <div className="ml-3 flex-1 h-6 rounded-md bg-white border border-slate-200 flex items-center px-3 text-[11px] text-slate-400">app.agenteoffice.com.br/vendas</div>
            </div>

            <div className="flex">
              {/* sidebar do app */}
              <div className="hidden sm:flex flex-col items-center gap-1 py-4 px-2.5" style={{ background: '#0C6B63' }}>
                <div className="w-8 h-8 rounded-xl bg-white/15 grid place-content-center text-white mb-2"><Plane size={16} /></div>
                {SIDE.map((s, i) => (
                  <div key={i} className={`w-9 h-9 rounded-xl grid place-content-center ${s.active ? 'bg-white text-[#0C6B63]' : 'text-white/70'}`}>
                    <s.icon size={17} />
                  </div>
                ))}
              </div>

              {/* conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <div className="font-extrabold text-ink text-sm">Suas vendas</div>
                  <div className="text-[11px] font-bold text-white px-2.5 py-1 rounded-lg" style={{ background: '#0C6B63' }}>+ Nova viagem</div>
                </div>
                <div className="p-3 flex gap-2 bg-[#F6F7F9] overflow-x-auto">
                  {COLS.map((col) => (
                    <div key={col.name} className="w-[88px] shrink-0 sm:w-auto sm:flex-1">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                        <span className="text-[9px] font-extrabold uppercase tracking-wide text-slate-500 truncate">{col.name}</span>
                      </div>
                      <div className="space-y-2">
                        {col.cards.map((c) => (
                          <div key={c.t} className="rounded-lg bg-white border border-slate-100 shadow-sm overflow-hidden">
                            <div className="h-1" style={{ background: col.color }} />
                            <div className="p-2">
                              <div className="text-[10px] font-extrabold text-ink leading-tight truncate">{c.t}</div>
                              <div className="text-[9px] text-slate-400 truncate">{c.s}</div>
                              <div className="text-[10px] font-bold mt-0.5" style={{ color: col.color }}>{c.v}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* texto (direita no desktop) */}
        <div className="order-1 lg:order-2">
          <SectionBadge icon={Kanban}>O Sistema</SectionBadge>
          <h2 className="mt-5 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.08] text-balance">
            Sua agência inteira,<br />num lugar só.
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed max-w-lg">
            Do primeiro contato ao embarque: vendas, clientes, agenda e dinheiro organizados — sem planilha, sem conversa solta.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <span className="inline-flex w-10 h-10 rounded-xl bg-brand-50 text-brand-500 items-center justify-center mb-2"><f.icon size={18} /></span>
                <div className="font-extrabold text-ink">{f.title}</div>
                <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
