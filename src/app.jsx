import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Menu, X, CheckCircle2, Zap,
  BarChart3, FileText, ShieldCheck, Sparkles, LogIn, Star,
  Play, Copy, Send, Plane, Bell, Wallet, Users, MessageSquare,
  MapPin, Calendar, Clock, TrendingUp, Kanban, Globe,
  ChevronRight, DollarSign, Receipt, Hotel, AlertCircle,
  CheckCheck, LayoutDashboard, Compass, Monitor, Tablet,
  Smartphone, Minimize2, ChevronDown
} from 'lucide-react';

/* ─── PLANOS ─────────────────────────────────────── */
const PLANS = [
  {
    name: 'Solo', price: '97', desc: 'Para o agente autônomo.',
    features: ['1 usuário', 'IA de roteiros ilimitada', 'Pipeline + Orçamentos', 'Propostas e vouchers', 'Suporte por e-mail'],
    cta: 'Começar agora', highlight: false,
  },
  {
    name: 'Team', price: '180', desc: 'Para equipes de até 5 agentes.',
    features: ['Até 5 usuários', 'Tudo do Solo', 'Dashboard por agente', 'Financeiro completo', 'Suporte WhatsApp'],
    cta: 'Escolher Team', highlight: true,
  },
  {
    name: 'Enterprise', price: 'Custom', desc: 'Redes e franquias.',
    features: ['Usuários ilimitados', 'IA treinada sob medida', 'API + integrações', 'Gerente de conta', 'Relatórios customizados'],
    cta: 'Falar com consultor', highlight: false,
  },
];

const TESTIMONIALS = [
  { name: 'Rafaela M.', role: 'Agente sênior — São Paulo', text: 'Copiava o texto da Sakura e redigitava tudo no Word. Hoje colo no chat e em 30 segundos o orçamento está pronto com comissão calculada.', stars: 5 },
  { name: 'Bruno T.', role: 'Diretor — Agência Destinos', text: 'O financeiro mudou nossa operação. Vejo em tempo real o que cada cliente deve, o que pagamos aos fornecedores e quanto a agência ganhou no mês.', stars: 5 },
  { name: 'Carla N.', role: 'Agente — Curitiba', text: 'O voucher digital é lindo. O cliente abre no celular, vê a viagem organizada e me manda elogio. Virou o diferencial da minha agência.', stars: 5 },
];

/* ─── COMPONENTES BASE ───────────────────────────── */
const NavLink = ({ href, children }) => (
  <a href={href} className="text-sm font-semibold text-slate-600 hover:text-[#114552] transition-colors">{children}</a>
);

const SectionBadge = ({ icon, label, color = 'bg-teal-50 border-teal-200 text-teal-700' }) => (
  <div className={`inline-flex items-center gap-2 border px-4 py-1.5 rounded-full mb-6 ${color}`}>
    {icon}<span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </div>
);

const FeatureCheck = ({ children }) => (
  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
    <CheckCircle2 className="w-5 h-5 text-[#5DA6AA] shrink-0 mt-0.5" />{children}
  </li>
);

/* ─── MODAL DEMO ─────────────────────────────────── */
const HORARIOS = ['Manhã — 9h às 12h', 'Tarde — 13h às 17h', 'Final de tarde — 17h às 19h'];

function DemoModal({ onClose }) {
  const [form, setForm] = useState({ agencia: '', nome: '', funcionarios: '', whatsapp: '', horario: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="bg-[#114552] px-6 py-5 flex items-center justify-between">
          <div>
            <div className="text-white font-black text-lg">Agendar demonstração</div>
            <div className="text-[#5DA6AA] text-[11px] font-medium mt-0.5">Gratuita · 30 minutos · Online</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <X size={16} className="text-white" />
          </button>
        </div>
        {sent ? (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-[#5DA6AA]" />
            </div>
            <h3 className="text-xl font-black text-[#114552] mb-2">Recebemos seu pedido!</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">Entraremos em contato pelo WhatsApp em breve para confirmar o horário.</p>
            <button onClick={onClose} className="bg-[#114552] text-white font-black px-8 py-3 rounded-xl text-sm">Fechar</button>
          </div>
        ) : (
          <form onSubmit={e => {
            e.preventDefault();
            fetch("https://formsubmit.co/ajax/contato@agenteoffice.com.br", {
              method: "POST",
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify(form)
            });
            setSent(true);
          }} className="px-6 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">Nome da agência *</label>
                <input required value={form.agencia} onChange={e => set('agencia', e.target.value)} placeholder="Ex: Destinos Travel"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#5DA6AA] focus:ring-2 focus:ring-[#5DA6AA]/20 transition-all" />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">Seu nome *</label>
                <input required value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Ex: Rafaela Moura"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#5DA6AA] focus:ring-2 focus:ring-[#5DA6AA]/20 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">Nº de agentes *</label>
                <select required value={form.funcionarios} onChange={e => set('funcionarios', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#5DA6AA] focus:ring-2 focus:ring-[#5DA6AA]/20 transition-all">
                  <option value="">Selecionar</option>
                  <option>Só eu</option><option>2 a 3</option><option>4 a 10</option><option>Mais de 10</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">WhatsApp *</label>
                <input required value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="(11) 99999-9999"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#5DA6AA] focus:ring-2 focus:ring-[#5DA6AA]/20 transition-all" />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">Melhor horário *</label>
                <div className="flex flex-col gap-2">
                  {HORARIOS.map(h => (
                    <label key={h} className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${form.horario === h ? 'border-[#5DA6AA] bg-teal-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.horario === h ? 'border-[#5DA6AA]' : 'border-slate-300'}`}>
                        {form.horario === h && <div className="w-2 h-2 rounded-full bg-[#5DA6AA]" />}
                      </div>
                      <input type="radio" className="hidden" value={h} checked={form.horario === h} onChange={() => set('horario', h)} />
                      <span className="text-sm font-semibold text-slate-700">{h}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#114552] text-white font-black py-4 rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 hover:bg-[#0a2c35] transition-colors mt-2">
              <Sparkles size={15} /> Quero minha demonstração gratuita
            </button>
            <p className="text-[10px] text-slate-400 text-center font-medium">Nenhum cartão exigido. Sem compromisso.</p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─── MODAL PLANO ────────────────────────────────── */
function PlanModal({ planName, onClose }) {
  const [form, setForm] = useState({ plano_escolhido: planName, agencia: '', nome: '', email: '', whatsapp: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="bg-[#114552] px-6 py-5 flex items-center justify-between">
          <div>
            <div className="text-white font-black text-lg">Assinar Plano {planName}</div>
            <div className="text-[#5DA6AA] text-[11px] font-medium mt-0.5">Preencha os dados para prosseguir</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <X size={16} className="text-white" />
          </button>
        </div>
        {sent ? (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-[#5DA6AA]" />
            </div>
            <h3 className="text-xl font-black text-[#114552] mb-2">Pedido recebido!</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">Em instantes nossa equipe entrará em contato para liberar seu acesso ao plano {planName}.</p>
            <button onClick={onClose} className="bg-[#114552] text-white font-black px-8 py-3 rounded-xl text-sm">Entendi</button>
          </div>
        ) : (
          <form onSubmit={e => {
            e.preventDefault();
            fetch("https://formsubmit.co/ajax/contato@agenteoffice.com.br", {
              method: "POST",
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify(form)
            });
            setSent(true);
          }} className="px-6 py-6 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">Nome da agência *</label>
                <input required value={form.agencia} onChange={e => set('agencia', e.target.value)} placeholder="Ex: Destinos Travel"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#5DA6AA] focus:ring-2 focus:ring-[#5DA6AA]/20 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">Seu nome *</label>
                <input required value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Ex: Rafaela Moura"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#5DA6AA] focus:ring-2 focus:ring-[#5DA6AA]/20 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">E-mail *</label>
                <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="voce@agencia.com.br"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#5DA6AA] focus:ring-2 focus:ring-[#5DA6AA]/20 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">WhatsApp *</label>
                <input required value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="(11) 99999-9999"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#5DA6AA] focus:ring-2 focus:ring-[#5DA6AA]/20 transition-all" />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#114552] text-white font-black py-4 rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 hover:bg-[#0a2c35] transition-colors mt-2">
              <Sparkles size={15} /> Solicitar acesso ao Plano {planName}
            </button>
            <p className="text-[10px] text-slate-400 text-center font-medium">Nenhum cartão exigido agora.</p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─── MAR.IA AVATAR ─────────────────────────────── */
const MariaAvatar = ({ size = 'md' }) => {
  const s = size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-7 h-7' : 'w-10 h-10';
  const inner = size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-xs' : 'text-base';
  return (
    <div className={`${s} rounded-full bg-gradient-to-br from-[#5DA6AA] to-[#114552] flex items-center justify-center shadow-md relative shrink-0`}>
      <span className={`font-black text-white ${inner} leading-none`} style={{fontStyle:'italic'}}>M</span>
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
    </div>
  );
};

/* ─── CHAT DEMO ──────────────────────────────────── */
const CHAT = [
  { from: 'user', text: 'Tenho um casal aqui, primeira viagem internacional, julho, abertos a destino. Orçamento de R$ 30k pra dois.' },
  { from: 'ai', text: '🌍 Julho é verão europeu — perfeito! Para **primeira viagem internacional com R$ 30k**, minha sugestão:\n\n🥇 **Portugal + Espanha** — Lisboa · Sintra · Madrid. Mais acessível, seguro, romântico. O favorito dos brasileiros.\n🥈 **Itália clássica** — Roma · Florença · Veneza. Inesquecível, mas mais concorrido em julho.\n🥉 **França + Holanda** — Paris · Amsterdã. Verão lindo, porém mais caro.\n\nPortugal + Espanha cabe bem no orçamento com conforto. Confirmo?' },
  { from: 'user', text: 'Sim! Gera o roteiro dia a dia.' },
  { from: 'ai', text: '📅 **Roteiro 12 dias — Lisboa · Sintra · Sevilha · Madrid**\n\n**Dias 1–4 · Lisboa** — Torre de Belém, Alfama, Elétrico 28, Pastéis de Belém, Fado à noite\n**Dia 5 · Sintra** — Palácio da Pena, Quinta da Regaleira, Cabo da Roca\n**Dias 6–7 · Sevilha** — Real Alcázar, Catedral, tapas no Barrio de Santa Cruz\n**Dias 8–12 · Madrid** — Museo del Prado, Parque del Retiro, Mercado San Miguel\n\nVoos em julho: TAP tem GRU→LIS ida/volta por ~R$ 3.800/pax. Gero o orçamento com comissão?' },
  { from: 'user', text: 'Gera com 18% de comissão!' },
  { from: 'ai', budget: true,
    items: [
      { desc: 'Voos GRU → LIS → MAD → GRU (TAP)', pax: '2', custo: 'R$ 7.600', cliente: 'R$ 8.968' },
      { desc: 'Hotéis boutique 4★ Lisboa 4N + Madrid 5N', pax: '2', custo: 'R$ 8.400', cliente: 'R$ 9.912' },
      { desc: 'Hotel Sintra 1N + Sevilha 2N', pax: '2', custo: 'R$ 2.100', cliente: 'R$ 2.478' },
      { desc: 'Transfers + passeios + guia Lisboa', pax: '2', custo: 'R$ 1.800', cliente: 'R$ 2.124' },
      { desc: 'Seguro viagem premium 12 dias', pax: '2', custo: 'R$ 480', cliente: 'R$ 566' },
    ],
    total: { custo: 'R$ 20.380', cliente: 'R$ 24.048', comissao: 'R$ 3.668' }
  },
];

function ChatDemo() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (step >= CHAT.length) return;
    const delay = step === 0 ? 700 : CHAT[step].budget ? 800 : 2200;
    const t = setTimeout(() => {
      setTyping(true);
      setTimeout(() => { setTyping(false); setStep(s => s + 1); }, CHAT[step].budget ? 1000 : 1600);
    }, delay);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [step, typing]);

  const renderText = (text) => text.split('\n').map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return <span key={i} dangerouslySetInnerHTML={{ __html: bold }} className="block" />;
  });

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
      <div className="bg-[#114552] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MariaAvatar size="md" />
          <div>
            <div className="text-sm font-black text-white tracking-tight">Mar.ia</div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#5DA6AA] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Navegando pela gestão da sua agência
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full text-[10px] text-white font-bold"><Globe size={10}/> Web</div>
          <div className="flex items-center gap-1 bg-green-500/20 px-2.5 py-1 rounded-full text-[10px] text-green-300 font-bold"><Plane size={10}/> Voos</div>
        </div>
      </div>

      <div ref={chatRef} className="bg-slate-50 p-4 space-y-3 min-h-[460px] max-h-[500px] overflow-y-auto">
        {CHAT.slice(0, step).map((msg, i) => {
          if (msg.budget) return (
            <div key={i} className="ml-9 space-y-1.5">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">✅ Orçamento gerado automaticamente</div>
              <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="grid grid-cols-3 gap-0 text-[9px] font-black text-slate-400 uppercase tracking-wider px-3 py-2 border-b border-slate-50">
                  <span className="col-span-1">Serviço</span>
                  <span className="text-right">Custo</span>
                  <span className="text-right">Valor cliente</span>
                </div>
                {msg.items.map((r, j) => (
                  <div key={j} className="grid grid-cols-3 gap-0 px-3 py-2 border-b border-slate-50 last:border-0 items-center">
                    <span className="text-[10px] font-semibold text-slate-600 col-span-1 pr-2 leading-tight">{r.desc}</span>
                    <span className="text-[10px] text-slate-300 text-right">{r.custo}</span>
                    <span className="text-[10px] font-bold text-[#114552] text-right">{r.cliente}</span>
                  </div>
                ))}
                <div className="bg-[#114552]/5 px-3 py-3 flex items-center justify-between border-t border-[#114552]/10">
                  <div>
                    <div className="text-[9px] font-black text-slate-400 uppercase">Comissão (18%)</div>
                    <div className="text-sm font-black text-emerald-600">{msg.total.comissao}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-black text-slate-400 uppercase">Total para o cliente</div>
                    <div className="text-lg font-black text-[#114552]">{msg.total.cliente}</div>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#5DA6AA] text-white text-[11px] font-black py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md mt-1">
                <FileText size={12}/> Gerar Proposta + Voucher em 1 clique
              </button>
            </div>
          );
          return (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start gap-2'}`}>
              {msg.from === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#114552] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={11} className="text-white" />
                </div>
              )}
              <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[12px] leading-relaxed font-medium space-y-0.5
                ${msg.from === 'user' ? 'bg-white border border-slate-200 text-slate-700 rounded-tr-sm shadow-sm' : 'bg-[#114552] text-white rounded-tl-sm'}`}>
                {renderText(msg.text)}
              </div>
            </div>
          );
        })}
        {typing && (
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full bg-[#114552] flex items-center justify-center shrink-0">
              <Sparkles size={11} className="text-white" />
            </div>
            <div className="bg-[#114552]/10 px-3.5 py-2.5 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 bg-[#114552] rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── APP ────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-100 selection:text-[#114552]">
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
      {selectedPlan && <PlanModal planName={selectedPlan} onClose={() => setSelectedPlan(null)} />}

      {/* ── NAV ─────────────────────────────────────── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <img src="/logo_hor_col.png" alt="AgenteOffice" className="h-9 w-auto" />
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#funcionalidades">Funcionalidades</NavLink>
            <NavLink href="#jornada">Jornada</NavLink>
            <NavLink href="#precos">Preços</NavLink>
            <div className="w-px h-4 bg-slate-200" />
            <a href="/app" className="flex items-center gap-1.5 text-sm font-bold text-[#114552] hover:text-[#5DA6AA] transition-colors">
              <LogIn size={15} /> Já sou cliente
            </a>
            <a href="#precos" className="bg-[#114552] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0a2c35] transition-all shadow-md active:scale-95">
              Assinar agora
            </a>
          </div>
          <button className="md:hidden p-2 text-[#114552]" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-4">
            <NavLink href="#funcionalidades">Funcionalidades</NavLink>
            <NavLink href="#jornada">Jornada</NavLink>
            <NavLink href="#precos">Preços</NavLink>
            <a href="/app" className="text-sm font-bold text-[#114552]">Já sou cliente</a>
            <a href="#precos" className="bg-[#114552] text-white text-center py-3 rounded-xl text-sm font-bold">Assinar agora</a>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-32 pb-20 lg:pt-44 lg:pb-28 px-4 bg-slate-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-[#5DA6AA]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#114552]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 px-4 py-1.5 rounded-full mb-7">
              <Sparkles className="w-3.5 h-3.5 text-[#5DA6AA]" />
              <span className="text-[#114552] text-[10px] font-black uppercase tracking-widest">Feito para agências de viagem</span>
            </div>
            <h1 className="text-5xl md:text-6xl xl:text-[68px] font-black text-[#114552] leading-[1.03] mb-6 tracking-tight">
              O sistema<br />definitivo para<br />
              <span className="text-[#5DA6AA]">a sua agência.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-8 leading-relaxed font-medium max-w-lg">
              Do primeiro contato ao embarque — rápido, prático e com IA que realmente funciona. Orçamentos em segundos, financeiro no controle e clientes encantados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#precos" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#114552] text-white rounded-2xl font-bold text-base hover:bg-[#0a2c35] transition-all shadow-xl group">
                Começar agora
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </a>
              <button data-demo-btn onClick={() => setDemoOpen(true)} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-base hover:bg-slate-50 transition-all">
                <Play size={15} className="text-[#5DA6AA]" /> Ver demonstração
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['R','M','C','B','A'].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#114552] to-[#5DA6AA] border-2 border-white flex items-center justify-center text-white text-[10px] font-black">{l}</div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-black text-[#114552]">+200 agências</span>
                  <span className="text-slate-400 font-medium ml-1">já operam com o sistema</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                <div className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
                <CheckCheck size={15} className="text-emerald-500" />
                <span>Sem contrato de fidelidade</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-[#5DA6AA]/20 to-[#114552]/10 rounded-[3rem] blur-3xl" />
            <div className="relative"><ChatDemo /></div>
          </div>
        </div>
      </section>

      {/* ── MÉTRICAS ─────────────────────────────────── */}
      <section className="py-14 bg-[#114552]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '< 1 min', label: 'para gerar um orçamento completo', sub: 'antes levava mais de 1 hora' },
            { value: 'Zero', label: 'redigitações de consolidadora', sub: 'a IA lê e preenche por você' },
            { value: '100%', label: 'das comissões calculadas', sub: 'sem planilha, sem erro' },
            { value: '1 clique', label: 'proposta e voucher ao cliente', sub: 'PDF ou link digital' },
          ].map((m, i) => (
            <div key={i} className="text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl lg:text-4xl font-black text-[#5DA6AA] mb-2">{m.value}</div>
              <div className="text-sm font-bold text-white mb-1">{m.label}</div>
              <div className="text-[11px] text-white/40 font-medium uppercase tracking-wider">{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MULTI-DEVICE ─────────────────────────────── */}
      <section className="py-12 bg-white border-b border-slate-100 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <div className="text-center sm:text-left">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Disponível em</div>
            <div className="text-2xl font-black text-[#114552]">Desktop, tablet ou celular.</div>
            <div className="text-slate-400 text-sm font-medium mt-1">Sem instalar nada — acesse pelo navegador.</div>
          </div>
          <div className="flex items-end gap-8">
            {[
              { icon: <Monitor className="w-7 h-7" />, label: 'Desktop', height: 'h-14', active: true },
              { icon: <Tablet className="w-6 h-6" />, label: 'Tablet', height: 'h-12', active: false },
              { icon: <Smartphone className="w-5 h-5" />, label: 'Mobile', height: 'h-10', active: false },
            ].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`${d.height} aspect-square flex items-center justify-center rounded-2xl transition-all ${d.active ? 'bg-[#114552] text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                  {d.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${d.active ? 'text-[#114552]' : 'text-slate-400'}`}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JORNADA COMPLETA ─────────────────────────── */}
      <section id="jornada" className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge icon={<Zap className="w-3.5 h-3.5"/>} label="Do lead ao embarque" />
            <h2 className="text-4xl lg:text-5xl font-black text-[#114552] tracking-tight mb-4">
              A jornada completa do seu cliente,<br />dentro de um só sistema.
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
              Nada cai no vazio. Cada etapa conectada, com alertas automáticos e histórico completo.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <MessageSquare className="w-6 h-6"/>, color: 'text-blue-500 bg-blue-50', label: '01', title: 'Lead entra no pipeline', desc: 'WhatsApp, e-mail ou indicação. O cliente cai direto no funil visual — você nunca mais perde um lead.' },
              { icon: <Compass className="w-6 h-6"/>, color: 'text-[#5DA6AA] bg-teal-50', label: '02', title: 'Mar.ia monta o roteiro', desc: 'A sua assistente de IA escreve o itinerário, busca voos em tempo real e gera o orçamento enquanto você atende o próximo cliente.' },
              { icon: <FileText className="w-6 h-6"/>, color: 'text-violet-500 bg-violet-50', label: '03', title: 'Orçamento em segundos', desc: 'Sakura, Flytour, Orinter, CVC, Trend — cole a confirmação no chat. A IA preenche o orçamento com a comissão calculada.' },
              { icon: <Send className="w-6 h-6"/>, color: 'text-emerald-500 bg-emerald-50', label: '04', title: 'Proposta linda + Voucher', desc: 'O orçamento vira uma proposta profissional com a sua marca. Aprovado? Gera o voucher digital em 1 clique.' },
              { icon: <Wallet className="w-6 h-6"/>, color: 'text-orange-500 bg-orange-50', label: '05', title: 'Financeiro no controle', desc: 'Recebimentos do cliente, pagamentos a fornecedores e comissões do mês — tudo em um painel, sem planilha.' },
              { icon: <Bell className="w-6 h-6"/>, color: 'text-rose-500 bg-rose-50', label: '06', title: 'Alertas até o embarque', desc: 'O sistema avisa você e o cliente: prazo de documentos, check-in online, transfer e tudo que não pode ser esquecido.' },
            ].map((step, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute -right-2 -top-2 text-[100px] leading-none font-black text-slate-200/40 group-hover:text-slate-200/70 transition-colors pointer-events-none select-none">
                  {step.label}
                </div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${step.color}`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#114552] mb-3">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUNCIONALIDADES ──────────────────────────── */}
      <section id="funcionalidades" className="py-6 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* ── BLOCO 1: Consolidadoras ── */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <SectionBadge icon={<Copy className="w-3.5 h-3.5"/>} label="Zero retrabalho" color="bg-orange-50 border-orange-200 text-orange-700" />
                <h2 className="text-3xl lg:text-4xl font-black text-[#114552] mb-5 tracking-tight">
                  Sakura, Flytour, Orinter,<br />CVC, Trend, Queensberry...<br />
                  <span className="text-[#5DA6AA]">Cole e pronto.</span>
                </h2>
                <p className="text-slate-500 font-medium text-base mb-7 leading-relaxed">
                  Fechou na consolidadora? Copia o texto da confirmação e cola no chat. A IA identifica voos, hotéis, datas, passageiros e preenche o orçamento linha por linha — com a comissão calculada automaticamente.
                </p>
                <ul className="space-y-3">
                  {[
                    'Lê confirmações de todas as principais consolidadoras do mercado',
                    'Reconhece preços, localizadores, datas e itinerários em texto livre',
                    'Preenche o orçamento automaticamente, linha por linha',
                    'Calcula comissão sobre cada serviço sem você digitar nada',
                  ].map((t, i) => <FeatureCheck key={i}>{t}</FeatureCheck>)}
                </ul>
                <div className="flex flex-wrap gap-2 mt-7">
                  {['Sakura', 'Flytour', 'Orinter', 'CVC', 'Trend', 'Queensberry', 'Expedia TAAP', 'Decolar'].map(c => (
                    <span key={c} className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full uppercase tracking-wider">{c}</span>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 p-8 lg:p-10 flex items-center justify-center border-l border-slate-100">
                <div className="w-full max-w-sm space-y-3">
                  {/* Terminal de confirmação */}
                  <div className="bg-[#0f1e2e] rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      <span className="text-[10px] text-white/30 font-bold ml-2">Sakura Tours — confirmação.txt</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-[10px] p-4">
                      <div className="text-green-400/80">GRU-LIS 14OCT2P ADT TAP LA807 R$3.840</div>
                      <div className="text-green-400/80">HTL BAIRRO ALTO LIS 4NTS R$4.200</div>
                      <div className="text-green-400/80">LIS-MAD 18OCT 2ADT IB3141 R$680</div>
                      <div className="text-green-400/80">HTL CANALEJAS MAD 5NTS R$5.600</div>
                      <div className="text-green-400/80">TRANSFER+PASSEIOS R$1.800</div>
                      <div className="text-green-400/80">SEG PREMIUM 2PAX R$480</div>
                    </div>
                  </div>
                  {/* Seta de transformação */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#5DA6AA]" />
                    <div className="bg-[#5DA6AA] text-white text-[10px] font-black px-3 py-1.5 rounded-full whitespace-nowrap shadow">
                      IA lê e preenche ↓
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#5DA6AA]" />
                  </div>
                  {/* Orçamento gerado */}
                  <div className="bg-white rounded-2xl shadow-lg border border-teal-100 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-50">
                      <span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Orçamento gerado</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 font-black px-2 py-0.5 rounded-full">✓ Automático</span>
                    </div>
                    <div className="p-3 space-y-0.5">
                      {[
                        { s: '✈️ Voo GRU→LIS (TAP LA807)', c: 'R$ 7.680', v: 'R$ 9.062' },
                        { s: '🏨 Hotel Lisboa 4N', c: 'R$ 4.200', v: 'R$ 4.956' },
                        { s: '✈️ Voo LIS→MAD (IB3141)', c: 'R$ 1.360', v: 'R$ 1.605' },
                        { s: '🏨 Hotel Madrid 5N', c: 'R$ 5.600', v: 'R$ 6.608' },
                        { s: '🚌 Transfer + passeios', c: 'R$ 1.800', v: 'R$ 2.124' },
                        { s: '🛡️ Seguro viagem', c: 'R$ 480', v: 'R$ 566' },
                      ].map((r, i) => (
                        <div key={i} className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0">
                          <span className="text-[10px] font-semibold text-slate-600 flex-1 pr-2 leading-tight">{r.s}</span>
                          <span className="text-[9px] text-slate-300 mr-2 font-mono">{r.c}</span>
                          <span className="text-[10px] font-black text-[#5DA6AA] font-mono">{r.v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#114552]/5 px-3 py-2.5 flex items-center justify-between border-t border-[#114552]/10">
                      <div>
                        <div className="text-[9px] text-slate-400 font-bold">Comissão (18%)</div>
                        <div className="text-sm font-black text-emerald-600">R$ 4.472</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-slate-400 font-bold">Total cliente</div>
                        <div className="text-base font-black text-[#114552]">R$ 24.921</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BLOCO 2: Proposta e Voucher ── */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-slate-50 p-8 lg:p-10 flex items-center justify-center border-r border-slate-100 order-2 lg:order-1">
                <div className="w-full max-w-xs space-y-3">
                  {/* Proposta bonita */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#114552] to-[#1a6878] px-4 py-3.5 flex items-center justify-between">
                      <img src="/logo_hor_white.png" alt="logo" className="h-5 w-auto" />
                      <span className="text-[9px] bg-white/15 text-white font-black px-2 py-0.5 rounded-full border border-white/20">Proposta ativa</span>
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-black text-[#114552] mb-0.5">🇵🇹 Portugal + Espanha — 12 dias</div>
                      <div className="text-[10px] text-slate-400 mb-3">2 passageiros · Outubro 2026</div>
                      <div className="space-y-1 mb-4">
                        {['✈️ Voos GRU → LIS → MAD → GRU (TAP)', '🏨 Hotéis 4★ boutique com café incluso', '🚌 Transfers e city tours', '🛡️ Seguro viagem premium'].map((item, j) => (
                          <div key={j} className="flex items-center gap-2 text-[10px] font-semibold text-slate-600">
                            <div className="w-1 h-1 rounded-full bg-[#5DA6AA] shrink-0" />{item}
                          </div>
                        ))}
                      </div>
                      <div className="h-px bg-slate-100 mb-3" />
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] text-slate-400 font-medium">Valor total p/ casal</span>
                        <span className="text-lg font-black text-[#114552]">R$ 24.048</span>
                      </div>
                      <button className="w-full bg-[#114552] text-white text-[10px] font-black py-2.5 rounded-xl hover:bg-[#0a2c35] transition-colors">
                        ✓ Aprovar e reservar
                      </button>
                    </div>
                  </div>
                  {/* Voucher */}
                  <div className="bg-gradient-to-br from-[#114552] to-[#1a5f6e] rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[9px] font-black uppercase tracking-widest text-[#5DA6AA]">✈️ Voucher de Viagem</div>
                      <div className="text-[9px] bg-white/10 border border-white/10 px-2 py-0.5 rounded-full font-bold">#VGM-2847</div>
                    </div>
                    <div className="text-sm font-black mb-1">João e Maria Silva</div>
                    <div className="text-[10px] text-white/60 mb-4">Lisboa · Sintra · Sevilha · Madrid</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {[
                        { l: 'Embarque', v: '14 Out 2026' },
                        { l: 'Retorno', v: '26 Out 2026' },
                        { l: 'Voo ida', v: 'TAP LA807' },
                        { l: 'Passageiros', v: '2 adultos' }
                      ].map((f, i) => (
                        <div key={i}>
                          <div className="text-[8px] text-white/40 font-bold uppercase tracking-wider">{f.l}</div>
                          <div className="text-[10px] font-bold">{f.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center font-medium">Custo interno e comissão nunca aparecem para o cliente</p>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center order-1 lg:order-2">
                <SectionBadge icon={<FileText className="w-3.5 h-3.5"/>} label="Proposta + Voucher" color="bg-violet-50 border-violet-200 text-violet-700" />
                <h2 className="text-3xl lg:text-4xl font-black text-[#114552] mb-5 tracking-tight">
                  Orçamento se torna proposta.<br />Aprovado, vira voucher.<br />
                  <span className="text-[#5DA6AA]">Cliente encantado.</span>
                </h2>
                <p className="text-slate-500 font-medium text-base mb-7 leading-relaxed">
                  Sua proposta sai com o logo e a identidade da sua agência. O cliente recebe um link bonito no celular — sem saber o custo, sem exposição de comissão. Aprovou? O voucher está pronto em segundos.
                </p>
                <ul className="space-y-3">
                  {[
                    'Proposta com o layout da sua agência, profissional e limpa',
                    'Link único por cliente, sem precisar instalar nada',
                    'Voucher com voos, hotéis, transfers e passeios organizados',
                    'Custo e comissão ficam visíveis só para você, nunca para o cliente',
                  ].map((t, i) => <FeatureCheck key={i}>{t}</FeatureCheck>)}
                </ul>
              </div>
            </div>
          </div>

          {/* ── BLOCO 3: Financeiro ── */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <SectionBadge icon={<Wallet className="w-3.5 h-3.5"/>} label="Financeiro" color="bg-emerald-50 border-emerald-200 text-emerald-700" />
                <h2 className="text-3xl lg:text-4xl font-black text-[#114552] mb-5 tracking-tight">
                  Sabe exatamente quanto<br />tem a receber — e quanto<br />
                  <span className="text-[#5DA6AA]">já entrou no caixa.</span>
                </h2>
                <p className="text-slate-500 font-medium text-base mb-7 leading-relaxed">
                  Controle de recebimentos por viagem, pagamentos a fornecedores e comissões do mês. Tudo em um painel — sem planilha, sem palpite.
                </p>
                <ul className="space-y-3">
                  {[
                    'Recebimentos: acompanhe o que cada cliente pagou e o que falta',
                    'Fornecedores: marque quando pagou e quando recebeu comissão',
                    'Dashboard com entradas, saídas e saldo projetado do mês',
                    'Alertas de vencimento para nunca perder um pagamento',
                  ].map((t, i) => <FeatureCheck key={i}>{t}</FeatureCheck>)}
                </ul>
              </div>
              <div className="bg-slate-50 p-8 lg:p-10 flex items-center justify-center border-l border-slate-100">
                <div className="w-full max-w-sm space-y-3">
                  {/* Header do painel financeiro */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                    <div className="bg-[#114552] px-4 py-3 flex items-center justify-between">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Financeiro — Março 2026</span>
                      <span className="text-[9px] bg-emerald-400/20 text-emerald-300 font-black px-2 py-0.5 rounded-full">● Ao vivo</span>
                    </div>
                    {/* Totais */}
                    <div className="grid grid-cols-3 gap-0 border-b border-slate-50">
                      {[
                        { l: 'A receber', v: 'R$ 48.200', c: 'text-[#5DA6AA]' },
                        { l: 'Recebido', v: 'R$ 31.400', c: 'text-emerald-600' },
                        { l: 'Comissões', v: 'R$ 7.860', c: 'text-violet-600' },
                      ].map((m, i) => (
                        <div key={i} className={`p-3 text-center ${i < 2 ? 'border-r border-slate-50' : ''}`}>
                          <div className="text-[8px] text-slate-400 font-bold uppercase mb-0.5">{m.l}</div>
                          <div className={`text-xs font-black ${m.c}`}>{m.v}</div>
                        </div>
                      ))}
                    </div>
                    {/* Viagens com progresso */}
                    <div className="p-3 space-y-3">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Recebimentos por viagem</div>
                      {[
                        { name: 'Portugal + Espanha — Silva', total: 'R$ 24.048', pct: 72, recebido: 'R$ 17.315', falta: 'R$ 6.733' },
                        { name: 'Maldivas — Família Costa', total: 'R$ 38.500', pct: 100, recebido: 'R$ 38.500', falta: null },
                        { name: 'Paris — Casal Fernandez', total: 'R$ 19.200', pct: 40, recebido: 'R$ 7.680', falta: 'R$ 11.520' },
                      ].map((v, i) => (
                        <div key={i} className="group">
                          <div className="flex justify-between items-start mb-1.5">
                            <span className="text-[10px] font-bold text-slate-700 leading-tight flex-1 pr-2">{v.name}</span>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${v.pct === 100 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                              {v.pct === 100 ? '✓ Quitado' : `${v.pct}%`}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                            <div className={`h-full rounded-full transition-all ${v.pct === 100 ? 'bg-emerald-400' : 'bg-[#5DA6AA]'}`} style={{width:`${v.pct}%`}} />
                          </div>
                          <div className="flex justify-between text-[9px] font-medium text-slate-400">
                            <span>Recebido: <span className="text-emerald-600 font-bold">{v.recebido}</span></span>
                            {v.falta && <span>Falta: <span className="text-amber-600 font-bold">{v.falta}</span></span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Alertas de pagamento */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-3">
                    <div className="w-7 h-7 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                      <Bell size={13} className="text-amber-600" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-amber-700 mb-0.5">Vence hoje</div>
                      <div className="text-[10px] text-amber-600 font-medium">Pagamento Sakura — Paris/Fernandez · R$ 8.400</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BLOCO 4: Pipeline + Alertas ── */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-slate-50 p-8 lg:p-10 flex items-center justify-center border-r border-slate-100 order-2 lg:order-1">
                <div className="w-full max-w-sm space-y-3">
                  {/* Mini Kanban */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-50 flex items-center gap-2">
                      <LayoutDashboard size={13} className="text-[#5DA6AA]" />
                      <span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Pipeline de vendas</span>
                    </div>
                    <div className="p-3 overflow-x-auto">
                      <div className="flex gap-2.5 min-w-max">
                        {[
                          { col: 'Lead', color: 'bg-blue-50 border-blue-100', dot: 'bg-blue-400', cards: [
                            { name: 'Família Rocha', dest: 'Cancún · Jul', val: 'R$ 22k' },
                            { name: 'Camila S.', dest: 'Disney · Dez', val: '—' },
                          ]},
                          { col: 'Orçamento', color: 'bg-violet-50 border-violet-100', dot: 'bg-violet-400', cards: [
                            { name: 'Silva, João', dest: 'Portugal · Out', val: 'R$ 24k' },
                          ]},
                          { col: 'Fechado', color: 'bg-emerald-50 border-emerald-100', dot: 'bg-emerald-400', cards: [
                            { name: 'Costa, Pedro', dest: 'Maldivas · Ago', val: 'R$ 38k' },
                            { name: 'Fernandez', dest: 'Paris · Set', val: 'R$ 19k' },
                          ]},
                        ].map((col, ci) => (
                          <div key={ci} className="w-[130px] shrink-0">
                            <div className="flex items-center gap-1.5 mb-2">
                              <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">{col.col}</span>
                              <span className="ml-auto text-[9px] bg-slate-100 text-slate-400 font-bold px-1.5 py-0.5 rounded-full">{col.cards.length}</span>
                            </div>
                            <div className="space-y-1.5">
                              {col.cards.map((c, cj) => (
                                <div key={cj} className={`p-2.5 rounded-xl border ${col.color}`}>
                                  <div className="text-[10px] font-black text-[#114552] leading-tight mb-0.5">{c.name}</div>
                                  <div className="text-[9px] text-slate-400 font-medium">{c.dest}</div>
                                  {c.val !== '—' && <div className="text-[9px] font-black text-[#5DA6AA] mt-1">{c.val}</div>}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Alertas */}
                  <div className="bg-white rounded-2xl shadow border border-slate-100 divide-y divide-slate-50">
                    <div className="px-4 py-2.5 flex items-center gap-2">
                      <Bell size={12} className="text-[#5DA6AA]" />
                      <span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Alertas do dia</span>
                    </div>
                    {[
                      { icon: '✈️', label: 'Check-in disponível', sub: 'Silva · TAP LA807 amanhã', color: 'text-blue-600 bg-blue-50' },
                      { icon: '📄', label: 'Visto pendente', sub: 'Costa · Maldivas · 18 dias', color: 'text-amber-600 bg-amber-50' },
                      { icon: '💰', label: 'Pagamento recebido', sub: 'Fernandez · R$ 7.680', color: 'text-emerald-600 bg-emerald-50' },
                    ].map((a, i) => (
                      <div key={i} className="px-3 py-2.5 flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0 ${a.color}`}>{a.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-black text-[#114552]">{a.label}</div>
                          <div className="text-[9px] text-slate-400 font-medium truncate">{a.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center order-1 lg:order-2">
                <SectionBadge icon={<Kanban className="w-3.5 h-3.5"/>} label="Pipeline + Alertas" color="bg-blue-50 border-blue-200 text-blue-700" />
                <h2 className="text-3xl lg:text-4xl font-black text-[#114552] mb-5 tracking-tight">
                  Veja onde cada venda<br />está — e o que precisa<br />
                  <span className="text-[#5DA6AA]">de atenção agora.</span>
                </h2>
                <p className="text-slate-500 font-medium text-base mb-7 leading-relaxed">
                  Pipeline visual por etapa de venda, alertas automáticos de check-in, documentos e vencimentos. Você começa o dia sabendo exatamente o que fazer.
                </p>
                <ul className="space-y-3">
                  {[
                    'Kanban por etapa: lead, orçamento, fechado, embarcado',
                    'Alerta automático de check-in antes do voo',
                    'Aviso de visto, passaporte e documentação pendente',
                    'Histórico completo de cada cliente em um lugar só',
                  ].map((t, i) => <FeatureCheck key={i}>{t}</FeatureCheck>)}
                </ul>
              </div>
            </div>
          </div>

          {/* ── MINI CARDS ── */}
          <div className="grid md:grid-cols-3 gap-6 pt-4 pb-16">
            {[
              { icon: <Compass className="w-6 h-6 text-[#5DA6AA]"/>, title: 'Mar.ia — sua assistente IA', desc: 'Ela gera roteiros, lê confirmações de consolidadora, calcula comissão e ainda responde dúvidas do cliente — tudo para você gastar menos tempo e vender mais.' },
              { icon: <BarChart3 className="w-6 h-6 text-[#5DA6AA]"/>, title: 'Dashboard de vendas', desc: 'Métricas em tempo real: ticket médio, conversão, comissões do mês e ranking de destinos mais vendidos.' },
              { icon: <Users className="w-6 h-6 text-[#5DA6AA]"/>, title: 'CRM de clientes', desc: 'Histórico completo de cada cliente: preferências, documentos, viagens anteriores e o canal por onde veio.' },
              { icon: <Receipt className="w-6 h-6 text-[#5DA6AA]"/>, title: 'Contrato digital', desc: 'Gere o contrato de prestação de serviços direto do orçamento, com os dados já preenchidos. Um clique, pronto.' },
              { icon: <Calendar className="w-6 h-6 text-[#5DA6AA]"/>, title: 'Agenda de viagens', desc: 'Visualize todas as viagens programadas por data. Nunca perca um embarque, check-in ou vencimento.' },
              { icon: <ShieldCheck className="w-6 h-6 text-[#5DA6AA]"/>, title: 'Dados na nuvem', desc: 'Seus dados e os de seus clientes protegidos com criptografia. Acesse de qualquer lugar, sem instalar nada.' },
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-black text-[#114552] mb-3">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ──────────────────────────────── */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-[#114552] tracking-tight">Agentes que viraram fãs.</h2>
            <p className="text-slate-400 font-medium mt-3">De autônomos a equipes com +10 agentes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-7 rounded-[2rem] border border-slate-100 bg-white hover:border-[#5DA6AA]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({length: t.stars}).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400"/>)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="text-sm font-black text-[#114552]">{t.name}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREÇOS ───────────────────────────────────── */}
      <section id="precos" className="py-24 bg-slate-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-[#114552] mb-4 tracking-tight">Planos transparentes.</h2>
            <p className="text-slate-500 font-medium">Sem taxa de setup. Cancele quando quiser.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-7 items-start">
            {PLANS.map((plan, i) => (
              <div key={i} className={`relative flex flex-col p-8 rounded-[2.5rem] bg-white border-2 transition-all ${plan.highlight ? 'border-[#5DA6AA] shadow-2xl md:scale-105 z-10' : 'border-slate-100 shadow-sm'}`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#5DA6AA] text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap">
                    Mais popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 text-[#114552] mb-2">
                    {plan.price !== 'Custom' && <span className="text-xl font-bold">R$</span>}
                    <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-slate-400 font-bold">/mês</span>}
                  </div>
                  <p className="text-slate-400 text-sm font-medium italic">"{plan.desc}"</p>
                </div>
                <div className="h-px bg-slate-100 mb-7" />
                <ul className="space-y-3.5 mb-8 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                      <CheckCircle2 size={17} className={plan.highlight ? 'text-[#5DA6AA]' : 'text-slate-300'}/>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setSelectedPlan(plan.name)} className={`w-full py-4 rounded-2xl font-black text-sm transition-all active:scale-95 ${plan.highlight ? 'bg-[#114552] text-white hover:bg-[#0a2c35] shadow-xl' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-400 font-medium">
            {['Sem contrato de fidelidade', 'Dados exportáveis a qualquer momento', 'Suporte em português'].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#5DA6AA]"/>{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#114552] to-[#0a2c35] px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M10 0L0 0 0 10' fill='none' stroke='white' stroke-width='0.3' opacity='0.15'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E")`}} />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Zap className="w-8 h-8 text-[#5DA6AA]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Chega de planilha.<br />Chega de redigitar.
          </h2>
          <p className="text-xl text-white/60 mb-10 font-medium leading-relaxed">
            Em menos de 1 hora a sua agência opera com IA de verdade. Veja o primeiro orçamento gerado automaticamente — e não volta mais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#precos" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#5DA6AA] text-white rounded-2xl font-black text-lg hover:bg-[#4a8f93] transition-all shadow-xl group">
              Assinar agora <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20}/>
            </a>
            <button onClick={() => setDemoOpen(true)} className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
              <Play size={16}/> Ver demonstração
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="bg-[#0a2c35] py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-b border-white/10 pb-12">
            <img src="/logo_hor_white.png" alt="AgenteOffice" className="h-9 w-auto" />
            <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest">
              <a href="#jornada" className="text-white/50 hover:text-white transition-colors">Jornada</a>
              <a href="#funcionalidades" className="text-white/50 hover:text-white transition-colors">Funcionalidades</a>
              <a href="#precos" className="text-white/50 hover:text-white transition-colors">Preços</a>
              <a href="/app" className="text-[#5DA6AA] hover:text-white transition-colors">Login</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">Suporte</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4 text-white/25 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2026 AgenteOffice CRM. Todos os direitos reservados.</p>
            <p>Feito para agências que pensam grande.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
