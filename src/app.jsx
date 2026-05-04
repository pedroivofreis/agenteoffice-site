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
const USE_PLAN_CHECKOUT_MODAL = true;

const PLANS = [
  {
    name: 'Experimente', price: null, priceLabel: 'Grátis',
    desc: 'Sem cartão. Explore o sistema com 3 orçamentos completos.',
    badge: null,
    features: [
      '3 orçamentos/viagens',
      'Orçamento Turbo completo',
      'Proposta com sua marca',
      'Voucher digital',
    ],
    cta: 'Começar grátis agora', highlight: false, trial: true,
  },
  {
    name: 'Embarque', price: '59,90', priceLabel: null,
    desc: 'Para o agente que quer vender mais e trabalhar menos.',
    badge: null,
    features: [
      '1 usuário',
      'Orçamentos ilimitados',
      'Orçamento Turbo',
      'Proposta premium com sua marca',
      'Voucher digital',
      'Estúdio de Vendas',
      'Financeiro — recebimentos e comissões',
      'Agenda do Agente + alertas',
      'Histórico completo (voos, hotéis, transfers, seguro)',
      'Suporte por e-mail',
    ],
    cta: 'Assinar Embarque — R$ 59,90', highlight: false, trial: false,
  },
  {
    name: 'Escala', price: '149,90', priceLabel: null,
    desc: 'Para a agência que quer crescer com controle e IA.',
    badge: 'Mais popular',
    features: [
      '3 usuários (+R$ 29,90/extra)',
      'Tudo do Embarque',
      'Mar.ia — IA secretária virtual',
      'Grupos e Excursões com landing pública',
      'Contratos digitais com aceite online',
      'WhatsApp centralizado',
      'Roteiros IA completos',
      'Suporte prioritário + onboarding',
    ],
    cta: 'Assinar Escala — R$ 149,90', highlight: true, trial: false,
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

/* ─── MODAL CHECKOUT ─────────────────────────────── */
const API_URL = 'https://web-production-32a87.up.railway.app';
const PLAN_SLUG = { Experimente: 'trial', Embarque: 'embarque', Escala: 'escala', Founder: 'founder' };
const INPUT_CLS = 'w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#5DA6AA] focus:ring-2 focus:ring-[#5DA6AA]/20 transition-all';
const LABEL_CLS = 'text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5';

function PlanModal({ planName, onClose, openDemo }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    agencia_nome: '', agencia_email: '', agencia_telefone: '', agencia_cnpj: '',
    admin_nome: '', admin_username: '', admin_senha: '', admin_senha2: '',
    coupon: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const isTrial = planName === 'Experimente';
  const priceMap = { Experimente: 'Grátis · sem cartão', Embarque: 'R$ 59,90/mês', Escala: 'R$ 149,90/mês', Founder: 'R$ 90/mês · Oferta Fundador' };

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.admin_senha !== form.admin_senha2) { setError('As senhas não coincidem.'); return; }
    if (form.admin_senha.length < 6) { setError('Senha deve ter ao menos 6 caracteres.'); return; }
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/billing/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plano_slug: PLAN_SLUG[planName],
          agencia_nome: form.agencia_nome,
          agencia_email: form.agencia_email,
          agencia_telefone: form.agencia_telefone,
          agencia_cnpj: form.agencia_cnpj,
          admin_nome: form.admin_nome,
          admin_username: form.admin_username,
          admin_senha: form.admin_senha,
          ...(form.coupon.trim() && { coupon: form.coupon.trim() }),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Erro ao processar.');
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else if (data.access_token) {
        const params = new URLSearchParams({
          token: data.access_token,
          user: JSON.stringify(data.user),
        });
        window.location.href = `https://app.agenteoffice.com.br/app/auto-login?${params.toString()}`;
      } else {
        setError('Não foi possível obter o link de pagamento. Tente novamente.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-[#114552] px-6 py-5 flex items-center justify-between">
          <div>
            <div className="text-white font-black text-lg">{isTrial ? 'Experimente grátis' : `Plano ${planName} — ${priceMap[planName]}`}</div>
            <div className="text-[#5DA6AA] text-[11px] font-medium mt-0.5">
              {isTrial ? (step === 1 ? 'Dados da sua agência' : 'Crie seu acesso') : (step === 1 ? 'Dados da sua agência' : 'Crie seu acesso ao sistema')}
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><X size={16} className="text-white"/></button>
        </div>

        {/* Steps indicator */}
        <div className="flex border-b border-slate-100">
          {['Agência', 'Acesso'].map((label, i) => (
            <div key={i} className={`flex-1 py-2.5 text-center text-[10px] font-black uppercase tracking-wider transition-colors ${step === i+1 ? 'text-[#114552] border-b-2 border-[#114552]' : 'text-slate-300'}`}>{label}</div>
          ))}
        </div>

        <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setError(''); setStep(2); } : handleSubmit}
          className="px-6 py-6 space-y-4">

          {step === 1 && <>
            <div>
              <label className={LABEL_CLS}>Nome da agência *</label>
              <input required value={form.agencia_nome} onChange={e => set('agencia_nome', e.target.value)}
                placeholder="Ex: Destinos Travel" className={INPUT_CLS}/>
            </div>
            <div>
              <label className={LABEL_CLS}>E-mail *</label>
              <input required type="email" value={form.agencia_email} onChange={e => set('agencia_email', e.target.value)}
                placeholder="contato@suaagencia.com.br" className={INPUT_CLS}/>
            </div>
            <div>
              <label className={LABEL_CLS}>WhatsApp / Telefone</label>
              <input type="tel" value={form.agencia_telefone} onChange={e => set('agencia_telefone', e.target.value)}
                placeholder="(11) 99999-9999" className={INPUT_CLS}/>
            </div>
            {!isTrial && (
              <>
                <div>
                  <label className={LABEL_CLS}>CPF ou CNPJ {form.coupon.trim() ? '(opcional com cupom)' : '*'}</label>
                  <input value={form.agencia_cnpj} onChange={e => set('agencia_cnpj', e.target.value)}
                    required={!form.coupon.trim()}
                    placeholder="00.000.000/0000-00 ou 000.000.000-00" className={INPUT_CLS}/>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">Necessário para emissão da nota fiscal.</p>
                </div>
                <div>
                  <label className={LABEL_CLS}>Cupom de desconto <span className="normal-case font-medium">(opcional)</span></label>
                  <input value={form.coupon} onChange={e => set('coupon', e.target.value.toUpperCase())}
                    placeholder="CODIGO-DO-CUPOM"
                    className={INPUT_CLS + ' font-mono tracking-widest uppercase'}/>
                </div>
              </>
            )}
          </>}

          {step === 2 && <>
            <div>
              <label className={LABEL_CLS}>Seu nome completo *</label>
              <input required value={form.admin_nome} onChange={e => set('admin_nome', e.target.value)}
                placeholder="Ex: Rafaela Moura" className={INPUT_CLS}/>
            </div>
            <div>
              <label className={LABEL_CLS}>Usuário para login *</label>
              <input required value={form.admin_username} onChange={e => set('admin_username', e.target.value.toLowerCase().replace(/\s/g,''))}
                placeholder="rafaela.moura" className={INPUT_CLS}/>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Sem espaços ou caracteres especiais.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL_CLS}>Senha *</label>
                <input required type="password" value={form.admin_senha} onChange={e => set('admin_senha', e.target.value)}
                  placeholder="Mín. 6 caracteres" className={INPUT_CLS}/>
              </div>
              <div>
                <label className={LABEL_CLS}>Confirmar *</label>
                <input required type="password" value={form.admin_senha2} onChange={e => set('admin_senha2', e.target.value)}
                  placeholder="Repita a senha" className={INPUT_CLS}/>
              </div>
            </div>
          </>}

          {error && <p className="text-red-500 text-xs font-semibold bg-red-50 rounded-lg px-3 py-2">{error}</p>}

          <div className="flex gap-3 pt-1">
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)}
                className="px-5 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
                Voltar
              </button>
            )}
            <button type="submit" disabled={loading}
              className="flex-1 bg-[#114552] text-white font-black py-3.5 rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 hover:bg-[#0a2c35] transition-colors disabled:opacity-60">
              {loading
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>&nbsp;Processando…</>
                : step === 1
                  ? <>Continuar <ArrowRight size={15}/></>
                  : isTrial
                    ? <><Sparkles size={15}/> Criar conta grátis — entrar agora</>
                    : <><Sparkles size={15}/> Ir para pagamento</>
              }
            </button>
          </div>
          {step === 2 && !isTrial && (
            <p className="text-[10px] text-slate-400 text-center font-medium">
              Você será redirecionado ao Asaas para inserir os dados do cartão com segurança.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

/* ─── MODAL DE PERFIL ────────────────────────────── */
const PROFILES = [
  {
    icon: '✨',
    title: 'Sou agente solo ou micro agência',
    subtitle: 'Quero impressionar meu cliente com tecnologia — sem complicação.',
    borderCls: 'border-[#5DA6AA]',
    bgCls: 'hover:bg-teal-50/40',
    planSlug: 'Embarque',
    modal: {
      heading: 'Para o agente que quer impressionar',
      desc: 'Você atende bem, conhece o produto — só faltava a ferramenta certa para mostrar isso. Com o AgenteOffice, você chega na frente de 90% dos concorrentes com uma proposta que o cliente abre no celular e já quer confirmar.',
      plan: 'Embarque', price: 'R$ 59,90/mês',
      highlights: [
        { icon: '⚡', title: 'Orçamento Turbo', desc: 'Cole o texto da Sakura, CVC, Orinter, Flytour... O orçamento sai pronto com comissão calculada. Em menos de 2 minutos.' },
        { icon: '🎨', title: 'Proposta com a sua marca', desc: 'Seu cliente recebe um link bonito no celular — com seu logo, suas cores, sua mensagem. Nada de PDF feio por e-mail.' },
        { icon: '🧾', title: 'Voucher digital em 1 clique', desc: 'Aprovou? O voucher com todos os detalhes fica pronto na hora. Sem retrabalho.' },
        { icon: '💰', title: 'Financeiro — comissões e recebimentos', desc: 'Controle o que você tem a receber, o que já entrou e suas comissões. Tudo em tempo real, sem planilha.' },
      ],
    },
  },
  {
    icon: '📊',
    title: 'Sou agência com equipe',
    subtitle: 'Preciso organizar vendas, financeiro e gestão das viagens.',
    borderCls: 'border-slate-200',
    bgCls: 'hover:bg-slate-50',
    planSlug: 'Escala',
    modal: {
      heading: 'Para a agência que quer crescer com controle',
      desc: 'Mais de 1 agente, mais clientes, mais viagens — e a sensação de que está tudo no ar. O AgenteOffice coloca tudo em um painel só, do lead ao financeiro.',
      plan: 'Escala', price: 'R$ 149,90/mês',
      highlights: [
        { icon: '📦', title: 'Pipeline de vendas', desc: 'Kanban visual: lead, orçamento, fechado, embarcado. Você sabe onde cada cliente está sem precisar perguntar.' },
        { icon: '💰', title: 'Financeiro real', desc: 'Quanto a receber, quanto já entrou, comissões do mês — ao vivo, sem planilha, sem chute.' },
        { icon: '📋', title: 'Contratos digitais', desc: 'Gere e envie contratos para o cliente assinar online. Sem impressora, sem escaneador.' },
        { icon: '✨', title: 'Mar.ia — IA secretária virtual', desc: 'Sugestões de destino, roteiro dia a dia, dicas de visto. A IA trabalha enquanto você fecha a venda.' },
      ],
    },
  },
  {
    icon: '🚌',
    title: 'Sou agência de excursões e terrestres',
    subtitle: 'Trabalho com grupos, ônibus e saídas programadas.',
    borderCls: 'border-slate-200',
    bgCls: 'hover:bg-slate-50',
    planSlug: 'Escala',
    modal: {
      heading: 'Para a operadora que move grupos',
      desc: 'Controlar assentos em planilha, lista de passageiros no papel, ligar pra todo mundo na véspera — isso acaba com o plano Escala.',
      plan: 'Escala', price: 'R$ 149,90/mês',
      highlights: [
        { icon: '🚌', title: 'Grupos e Excursões', desc: 'Crie excursões com destino, data, ônibus e cotas. Controle de passageiros e ocupação em tempo real.' },
        { icon: '📋', title: 'Contratos digitais', desc: 'Gere e envie contratos para o passageiro assinar online. Tudo documentado antes do embarque.' },
        { icon: '💬', title: 'WhatsApp centralizado', desc: 'Toda a equipe no mesmo número via API oficial do Meta. Histórico vinculado ao cliente no CRM.' },
        { icon: '📈', title: 'Relatórios de ocupação', desc: 'Rentabilidade por excursão, custo por assento, comparativo de saídas. Decisão com número.' },
      ],
    },
  },
];

function ProfileModal({ profile, onClose, onSelectPlan }) {
  const { modal } = profile;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="bg-[#114552] px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <div className="text-white font-black text-lg leading-tight">{modal.heading}</div>
            <div className="text-[#5DA6AA] text-[11px] font-medium mt-0.5">Plano {modal.plan} · {modal.price}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0 ml-4">
            <X size={16} className="text-white" />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">
          <p className="text-slate-500 text-sm font-medium leading-relaxed mb-5">{modal.desc}</p>
          <div className="space-y-3 mb-6">
            {modal.highlights.map((h, i) => (
              <div key={i} className="flex gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xl shrink-0 mt-0.5">{h.icon}</span>
                <div>
                  <div className="text-sm font-black text-[#114552] mb-0.5">{h.title}</div>
                  <div className="text-xs text-slate-500 font-medium leading-relaxed">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => { onClose(); onSelectPlan(profile.planSlug); }}
            className="flex items-center justify-center gap-2 w-full bg-[#114552] text-white font-black py-4 rounded-xl text-sm hover:bg-[#0a2c35] transition-colors">
            Assinar plano {modal.plan} — {modal.price} <ArrowRight size={14}/>
          </button>
          <p className="text-[10px] text-slate-400 text-center font-medium mt-3">Sem contrato de fidelidade · Cancele quando quiser</p>
        </div>
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

/* ─── HERO PROPOSTA PREVIEW ─────────────────────── */
function HeroPropostaPreview() {
  const Ticket = ({ orig, origCity, dest, destCity, dep, arr, flight }) => (
    <div className="flex items-center gap-3 bg-gradient-to-r from-[#042F2E] to-[#0F766E] rounded-xl p-3 text-white relative overflow-hidden">
      <div className="text-center w-12">
        <div className="text-lg font-black">{orig}</div>
        <div className="text-[8px] text-white/50">{origCity}</div>
        <div className="text-[9px] font-bold mt-0.5">{dep}</div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-0.5">
        <div className="text-[7px] font-bold text-white/40 uppercase">Voo direto</div>
        <div className="w-full flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full border-2 border-white/40"/>
          <div className="flex-1 h-px bg-white/25"/>
          <span className="text-xs">✈</span>
          <div className="flex-1 h-px bg-white/25"/>
          <div className="w-1.5 h-1.5 rounded-full border-2 border-white/40"/>
        </div>
        <div className="text-[8px] text-white/40">{flight}</div>
      </div>
      <div className="text-center w-12">
        <div className="text-lg font-black">{dest}</div>
        <div className="text-[8px] text-white/50">{destCity}</div>
        <div className="text-[9px] font-bold mt-0.5">{arr}</div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
      {/* Browser bar */}
      <div className="bg-[#1e1e1e] px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"/>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"/>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"/>
        </div>
        <div className="flex-1 bg-[#2d2d2d] rounded-md px-3 py-1 flex items-center gap-2">
          <svg className="w-2.5 h-2.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span className="text-[10px] font-mono text-slate-400">agenteoffice.com.br/p/88472</span>
          <CheckCheck size={9} className="ml-auto text-emerald-400"/>
        </div>
      </div>

      {/* Destination hero — fora do scroll */}
      <div className="relative h-44 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&fit=crop" alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"/>
        <div className="absolute top-3 left-4 right-4 flex justify-between items-start">
          <span className="text-[9px] font-black uppercase tracking-widest bg-white/15 text-white px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">✈ Proposta de Viagem</span>
          <img src="/logo_hor_white.png" alt="logo" className="h-4 w-auto opacity-90"/>
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <div className="text-white font-black text-lg mb-1.5 drop-shadow-lg">Portugal + Espanha · 12 dias</div>
          <div className="flex gap-2 flex-wrap">
            {['📅 Out 2026','👥 Casal Silva','2 pax'].map((t,i)=>(
              <span key={i} className="text-white/80 text-[9px] font-medium bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-slate-100 px-3 flex items-center justify-between">
        <div className="flex">
          {['📄 Proposta','🧾 Voucher'].map((t,i)=>(
            <div key={i} className={`px-3 py-2 text-[9px] font-black border-b-2 ${i===0?'border-[#0F766E] text-[#0F766E]':'border-transparent text-slate-300'}`}>{t}</div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 py-1.5">
          <span className="text-[8px] font-black bg-teal-50 border border-teal-200 text-[#0F766E] px-1.5 py-0.5 rounded">Op.1</span>
          <span className="text-[8px] font-black bg-slate-50 border border-slate-200 text-slate-400 px-1.5 py-0.5 rounded">Op.2</span>
          <button className="text-[8px] font-black text-white bg-[#114552] px-2 py-1 rounded-lg ml-1">⬇ PDF</button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="bg-slate-50 p-3 space-y-2.5 overflow-y-auto" style={{maxHeight:'480px'}}>

        {/* Categorias strip */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {[{e:'✈️',l:'Voos',n:2},{e:'🏨',l:'Hotéis',n:2},{e:'🗺️',l:'Roteiro',n:'12d'},{e:'🚌',l:'Transfers',n:3},{e:'🛡️',l:'Seguro',n:1}].map((c,i)=>(
            <div key={i} className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-slate-100 shrink-0">
              <span className="text-sm">{c.e}</span>
              <div><div className="text-[9px] font-black text-[#114552]">{c.l}</div><div className="text-[8px] text-slate-400">{c.n} {typeof c.n==='number'?c.n===1?'item':'itens':''}</div></div>
            </div>
          ))}
        </div>

        {/* Voos */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
            <span>✈️</span><span className="text-[9px] font-black text-[#114552] uppercase tracking-widest">Voos</span>
          </div>
          <div className="p-2.5 space-y-2">
            <Ticket orig="GRU" origCity="São Paulo" dest="LIS" destCity="Lisboa" dep="08:45" arr="06:05+1" flight="TAP LA807"/>
            <Ticket orig="MAD" origCity="Madrid" dest="GRU" destCity="São Paulo" dep="11:30" arr="19:55" flight="LATAM LA8026"/>
          </div>
        </div>

        {/* Hotéis */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
            <span>🏨</span><span className="text-[9px] font-black text-[#114552] uppercase tracking-widest">Hotéis</span>
          </div>
          <div className="p-2.5 space-y-2">
            {[
              {img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&fit=crop', name:'Bairro Alto Hotel', loc:'Lisboa · 4 noites', stars:'⭐⭐⭐⭐⭐', regime:'☕ Café incluso'},
              {img:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&fit=crop', name:'Hotel Canalejas', loc:'Madrid · 5 noites', stars:'⭐⭐⭐⭐⭐', regime:'🍽 Meia pensão'},
            ].map((h,i)=>(
              <div key={i} className="rounded-xl overflow-hidden border border-slate-100">
                <div className="relative h-20">
                  <img src={h.img} alt={h.name} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                  <div className="absolute bottom-2 left-2.5">
                    <div className="text-white font-black text-[10px]">{h.name} {h.stars}</div>
                    <div className="text-white/60 text-[8px]">{h.loc} · {h.regime}</div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/40 px-1.5 py-0.5 rounded-full text-[8px] text-white font-bold">✓ Incluso</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roteiro */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
            <span>🗺️</span><span className="text-[9px] font-black text-[#114552] uppercase tracking-widest">Roteiro Dia a Dia</span>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              {dias:'Dias 1–4', local:'Lisboa', desc:'Torre de Belém · Alfama · Elétrico 28 · Pastéis de Belém · Fado à noite'},
              {dias:'Dia 5', local:'Sintra', desc:'Palácio da Pena · Quinta da Regaleira · Cabo da Roca'},
              {dias:'Dias 6–7', local:'Sevilha', desc:'Real Alcázar · Catedral · tapas no Barrio de Santa Cruz'},
              {dias:'Dias 8–12', local:'Madrid', desc:'Museo del Prado · Parque del Retiro · Mercado San Miguel'},
            ].map((r,i)=>(
              <div key={i} className="px-3 py-2 flex gap-2.5">
                <div className="shrink-0 text-center w-14">
                  <div className="text-[8px] font-black text-[#5DA6AA]">{r.dias}</div>
                  <div className="text-[9px] font-black text-[#114552]">{r.local}</div>
                </div>
                <div className="text-[9px] text-slate-500 font-medium leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Passeios */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
            <span>🎭</span><span className="text-[9px] font-black text-[#114552] uppercase tracking-widest">Passeios & Experiências</span>
          </div>
          <div className="p-2.5 space-y-2">
            {[
              {img:'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=200&fit=crop', name:'Sintra Day Trip — Palácio da Pena', det:'Lisboa · Dia inteiro · Guia pt-br', badge:'🏰 Histórico'},
              {img:'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&fit=crop', name:'Tour Flamenco + Tapas — Sevilha', det:'Sevilha · À noite', badge:'💃 Cultural'},
              {img:'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=200&fit=crop', name:'Museu do Prado + Retiro', det:'Madrid · Manhã · Guia bilíngue', badge:'🎨 Arte'},
            ].map((p,i)=>(
              <div key={i} className="flex gap-2 items-center">
                <img src={p.img} alt={p.name} className="w-10 h-10 rounded-lg object-cover shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-black text-[#114552] leading-tight">{p.name}</div>
                  <div className="text-[8px] text-slate-400 mt-0.5">{p.det}</div>
                </div>
                <span className="text-[7px] font-black bg-teal-50 text-[#0F766E] px-1.5 py-0.5 rounded-full border border-teal-100 shrink-0">{p.badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transfers */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
            <span>🚌</span><span className="text-[9px] font-black text-[#114552] uppercase tracking-widest">Transfers</span>
          </div>
          <div className="divide-y divide-slate-50">
            {['Aeroporto LIS → Hotel (chegada)','Lisboa → Sevilha (van privativa)','Sevilha → Madrid (van privativa)','Hotel → Aeroporto MAD (saída)'].map((t,i)=>(
              <div key={i} className="px-3 py-1.5 flex items-center justify-between">
                <span className="text-[9px] font-semibold text-slate-600">🚌 {t}</span>
                <span className="text-[9px] font-black text-[#0F766E]">✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Seguro */}
        <div className="bg-white rounded-xl border border-slate-100 px-3 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-base shrink-0">🛡️</div>
          <div className="flex-1">
            <div className="text-[9px] font-black text-slate-700">Assistência Total Premium · Affinity · 12 dias</div>
            <div className="flex gap-1.5 mt-0.5 flex-wrap">
              {['Médico ilimitado','Bagagem','Covid','Odonto'].map(c=>(
                <span key={c} className="text-[7px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>
          <span className="text-[9px] font-black text-[#0F766E] shrink-0">✓ Incluso</span>
        </div>

        {/* Mensagem da agente */}
        <div className="bg-gradient-to-r from-teal-50 to-white rounded-xl border border-teal-100 p-3 flex gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5DA6AA] to-[#114552] flex items-center justify-center shrink-0 text-white font-black text-[10px]" style={{fontStyle:'italic'}}>M</div>
          <div>
            <div className="text-[8px] font-black text-[#114552] mb-0.5">Mensagem da sua agente</div>
            <p className="text-[9px] text-slate-600 font-medium leading-relaxed italic">"Preparei este roteiro com muito carinho. Cada detalhe foi escolhido para que vocês aproveitem o melhor de Lisboa, Sintra, Sevilha e Madrid. Qualquer dúvida, estou aqui! 🥂"</p>
          </div>
        </div>

        {/* Total */}
        <div className="rounded-xl overflow-hidden" style={{background:'linear-gradient(135deg,#042F2E 0%,#0F766E 60%,#2DD4BF 100%)'}}>
          <div className="p-3.5 flex items-start justify-between">
            <div>
              <div className="text-[8px] font-black uppercase tracking-widest text-white/50 mb-0.5">Investimento total</div>
              <div className="text-3xl font-black text-white">R$ 24.048</div>
              <div className="text-[9px] text-white/50 mt-0.5">2 viajantes · R$ 12.024/pax</div>
            </div>
            <button className="bg-white text-[#0F766E] font-black text-[10px] px-3.5 py-2.5 rounded-xl shadow-lg whitespace-nowrap mt-1">✓ Aprovar viagem</button>
          </div>
        </div>

        <div className="text-center text-[9px] text-slate-400 font-medium pb-2">
          💳 Comissão e custo são <strong>sempre confidenciais</strong> — só você vê
        </div>
      </div>
    </div>
  );
}

/* ─── VOUCHER PREVIEW ────────────────────────────── */
function HeroVoucherPreview() {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
      {/* Browser bar */}
      <div className="bg-[#1e1e1e] px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"/>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"/>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"/>
        </div>
        <div className="flex-1 bg-[#2d2d2d] rounded-md px-3 py-1 flex items-center gap-2">
          <svg className="w-2.5 h-2.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span className="text-[10px] font-mono text-slate-400">agenteoffice.com.br/p/88472</span>
          <CheckCheck size={9} className="ml-auto text-emerald-400"/>
        </div>
      </div>

      {/* Destination hero */}
      <div className="relative h-44 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&fit=crop" alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"/>
        <div className="absolute top-3 left-4 right-4 flex justify-between items-start">
          <span className="text-[9px] font-black uppercase tracking-widest bg-white/15 text-white px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">🧾 Voucher Digital</span>
          <img src="/logo_hor_white.png" alt="logo" className="h-4 w-auto opacity-90"/>
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <div className="text-white font-black text-lg mb-1.5 drop-shadow-lg">Portugal + Espanha · 12 dias</div>
          <div className="flex gap-2 flex-wrap">
            {['📅 Out 2026','👥 Casal Silva','2 pax'].map((t,i)=>(
              <span key={i} className="text-white/80 text-[9px] font-medium bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar — Voucher selecionado */}
      <div className="bg-white border-b border-slate-100 px-3 flex items-center justify-between">
        <div className="flex">
          {['📄 Proposta','🧾 Voucher'].map((t,i)=>(
            <div key={i} className={`px-3 py-2 text-[9px] font-black border-b-2 ${i===1?'border-[#0F766E] text-[#0F766E]':'border-transparent text-slate-300'}`}>{t}</div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 py-1.5">
          <span className="text-[8px] font-black bg-teal-50 border border-teal-200 text-[#0F766E] px-1.5 py-0.5 rounded">Op.1</span>
          <button className="text-[8px] font-black text-white bg-[#114552] px-2 py-1 rounded-lg ml-1">⬇ PDF</button>
        </div>
      </div>

      {/* Voucher body */}
      <div className="bg-slate-50 p-3 space-y-2.5 overflow-y-auto" style={{maxHeight:'480px'}}>

        {/* Status confirmado */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-black shrink-0">✓</div>
          <div>
            <div className="text-white font-black text-[10px]">RESERVA CONFIRMADA</div>
            <div className="text-white/70 text-[8px]">Localizador: AO-88472 · Emitido em 18/10/2025</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-white/50 text-[7px] uppercase tracking-wider">Total pago</div>
            <div className="text-white font-black text-sm">R$ 24.048</div>
          </div>
        </div>

        {/* Voos confirmados */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
            <span>✈️</span><span className="text-[9px] font-black text-[#114552] uppercase tracking-widest">Voos Confirmados</span>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              {loc:'TAP8807', rota:'GRU → LIS', data:'15 Out 2026', hora:'08:45 → 06:05+1', classe:'Econômica', status:'Confirmado'},
              {loc:'LA8026', rota:'MAD → GRU', data:'27 Out 2026', hora:'11:30 → 19:55', classe:'Econômica', status:'Confirmado'},
            ].map((v,i)=>(
              <div key={i} className="px-3 py-2.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#042F2E] flex items-center justify-center text-white text-xs shrink-0">✈</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-black text-[#114552]">{v.rota} · {v.data}</div>
                  <div className="text-[8px] text-slate-400">{v.hora} · {v.classe}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[7px] font-black bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-200">{v.status}</div>
                  <div className="text-[7px] text-slate-400 mt-0.5">{v.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roteiro com imagens */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
            <span>🗺️</span><span className="text-[9px] font-black text-[#114552] uppercase tracking-widest">Roteiro — Dia a Dia</span>
          </div>
          <div className="space-y-0 divide-y divide-slate-50">
            {[
              {dias:'Dias 1–4', local:'Lisboa', img:'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=400&fit=crop', desc:'Torre de Belém · Alfama · Elétrico 28 · Pastéis de Belém · Fado à noite'},
              {dias:'Dia 5', local:'Sintra', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop', desc:'Palácio da Pena · Quinta da Regaleira · Cabo da Roca'},
              {dias:'Dias 6–7', local:'Sevilha', img:'https://images.unsplash.com/photo-1559685573-3f6a2bc0c1f4?w=400&fit=crop', desc:'Real Alcázar · Catedral · tapas no Barrio de Santa Cruz'},
              {dias:'Dias 8–12', local:'Madrid', img:'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&fit=crop', desc:'Museo del Prado · Parque del Retiro · Mercado San Miguel'},
            ].map((r,i)=>(
              <div key={i} className="flex gap-0 overflow-hidden">
                <div className="relative w-16 h-16 shrink-0">
                  <img src={r.img} alt={r.local} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"/>
                </div>
                <div className="flex-1 px-2.5 py-2 flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[7px] font-black text-[#5DA6AA] uppercase">{r.dias}</span>
                    <span className="text-[8px] font-black text-[#114552]">· {r.local}</span>
                  </div>
                  <p className="text-[8px] text-slate-500 font-medium leading-snug">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hotéis */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
            <span>🏨</span><span className="text-[9px] font-black text-[#114552] uppercase tracking-widest">Hospedagens</span>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              {img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&fit=crop', name:'Bairro Alto Hotel', loc:'Lisboa · check-in 15 Out · 4 noites', loc2:'checkout: 19 Out', voucher:'BAH-2026-7743'},
              {img:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&fit=crop', name:'Hotel Canalejas', loc:'Madrid · check-in 22 Out · 5 noites', loc2:'checkout: 27 Out', voucher:'HC-2026-4412'},
            ].map((h,i)=>(
              <div key={i} className="flex gap-2.5 items-center px-3 py-2.5">
                <img src={h.img} alt={h.name} className="w-12 h-12 rounded-xl object-cover shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-black text-[#114552] leading-tight">{h.name}</div>
                  <div className="text-[8px] text-slate-400 mt-0.5">{h.loc}</div>
                  <div className="text-[7px] text-slate-300 mt-0.5">Voucher: {h.voucher}</div>
                </div>
                <span className="text-[7px] font-black bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-200 shrink-0">✓ OK</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contato agente */}
        <div className="bg-gradient-to-r from-teal-50 to-white rounded-xl border border-teal-100 p-3 flex gap-2.5 items-center">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5DA6AA] to-[#114552] flex items-center justify-center shrink-0 text-white font-black text-[10px]" style={{fontStyle:'italic'}}>M</div>
          <div className="flex-1">
            <div className="text-[8px] font-black text-[#114552]">Sua agente Maria · em caso de emergência</div>
            <div className="text-[8px] text-slate-400">📱 (11) 99999-0000 · maria@agencia.com.br</div>
          </div>
          <button className="text-[8px] font-black bg-[#25D366] text-white px-2 py-1 rounded-lg shrink-0">WhatsApp</button>
        </div>
      </div>
    </div>
  );
}

/* ─── HERO SLIDER ────────────────────────────────── */
function HeroSlider() {
  const [active, setActive] = React.useState(0);
  const slides = [
    { label: 'Proposta', component: <HeroPropostaPreview /> },
    { label: 'Voucher', component: <HeroVoucherPreview /> },
  ];

  React.useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[2rem]">
        {slides.map((s, i) => (
          <div key={i} className={`transition-all duration-700 ${i === active ? 'opacity-100 translate-y-0' : 'opacity-0 absolute inset-0 translate-y-4 pointer-events-none'}`}>
            {s.component}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        {slides.map((s, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black transition-all ${i === active ? 'bg-[#114552] text-white shadow' : 'bg-white/70 text-slate-400 border border-slate-200 hover:bg-white'}`}>
            {i === 0 ? '📄' : '🧾'} {s.label}
          </button>
        ))}
      </div>
      <p className="text-center text-[9px] text-slate-300 font-medium mt-2">* meramente ilustrativo</p>
    </div>
  );
}

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
          <div className="w-10 h-10 rounded-xl bg-[#5DA6AA]/30 border border-[#5DA6AA]/40 flex items-center justify-center shrink-0">
            <Zap size={18} className="text-[#5DA6AA]" />
          </div>
          <div>
            <div className="text-sm font-black text-white tracking-tight">Orçamento Turbo</div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#5DA6AA] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Do texto da consolidadora ao orçamento — em segundos
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full text-[10px] text-white font-bold"><Plane size={10}/> Voos</div>
          <div className="flex items-center gap-1 bg-green-500/20 px-2.5 py-1 rounded-full text-[10px] text-green-300 font-bold"><FileText size={10}/> Proposta</div>
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

/* ─── PROPOSTA SHOWCASE ──────────────────────────── */
function PropostaShowcase() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [photo2Idx, setPhoto2Idx] = useState(0);

  const PHOTOS1 = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&fit=crop',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&fit=crop',
  ];
  const PHOTOS2 = [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&fit=crop',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&fit=crop',
  ];

  const Ticket = ({ orig, origCity, dest, destCity, dep, arr, flight, direct }) => (
    <div className="flex items-center gap-3 bg-gradient-to-r from-[#042F2E] to-[#0F766E] rounded-xl p-3.5 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='13' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`}} />
      <div className="text-center relative z-10 w-14">
        <div className="text-xl font-black tracking-tight">{orig}</div>
        <div className="text-[8px] text-white/50 font-bold">{origCity}</div>
        <div className="text-[10px] font-bold text-white/80 mt-0.5">{dep}</div>
      </div>
      <div className="flex-1 relative z-10 flex flex-col items-center gap-0.5">
        <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{direct ? 'Voo direto' : 'Com escala'}</div>
        <div className="w-full flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full border-2 border-white/50" />
          <div className="flex-1 h-px bg-white/25" />
          <span className="text-xs">✈</span>
          <div className="flex-1 h-px bg-white/25" />
          <div className="w-1.5 h-1.5 rounded-full border-2 border-white/50" />
        </div>
        <div className="text-[8px] font-bold text-white/40">{flight}</div>
      </div>
      <div className="text-center relative z-10 w-14">
        <div className="text-xl font-black tracking-tight">{dest}</div>
        <div className="text-[8px] text-white/50 font-bold">{destCity}</div>
        <div className="text-[10px] font-bold text-white/80 mt-0.5">{arr}</div>
      </div>
    </div>
  );

  const HotelCard = ({ photos, idx, setIdx, name, location, stars, regime, checkin, checkout, nights, price, desc }) => (
    <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
      <div className="relative h-32">
        <img src={photos[idx]} alt={name} className="w-full h-full object-cover transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <button onClick={() => setIdx(i => (i - 1 + photos.length) % photos.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center backdrop-blur-sm">‹</button>
        <button onClick={() => setIdx(i => (i + 1) % photos.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center backdrop-blur-sm">›</button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {photos.map((_, i) => <div key={i} className={`w-1 h-1 rounded-full transition-all ${i === idx ? 'bg-white' : 'bg-white/35'}`} />)}
        </div>
        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] text-white font-bold">{stars}</div>
        <div className="absolute bottom-2.5 left-3">
          <div className="text-white font-black text-xs drop-shadow">{name}</div>
          <div className="text-white/70 text-[9px] font-medium">{location}</div>
        </div>
      </div>
      {desc && <div className="px-3 pt-2 pb-1 bg-white text-[9px] text-slate-500 font-medium leading-relaxed border-b border-slate-50">{desc}</div>}
      <div className="px-3 py-2 bg-white flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-wrap gap-2 text-[10px]">
          <span className="text-slate-500 font-semibold">📅 {checkin} → {checkout}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500 font-semibold">{nights} diárias</span>
          <span className="text-slate-400">·</span>
          <span className="text-[#0F766E] font-bold">{regime}</span>
        </div>
        <span className="text-[10px] font-black text-[#114552]">{price}</span>
      </div>
    </div>
  );

  return (
    <section className="py-14 md:py-24 overflow-hidden" style={{background:'linear-gradient(160deg,#0a1f24 0%,#0d2d35 40%,#0a1f24 100%)'}}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-1.5 rounded-full mb-6">
            <Send className="w-3.5 h-3.5 text-[#5DA6AA]"/><span className="text-[#5DA6AA] text-[10px] font-black uppercase tracking-widest">O que o cliente recebe</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            A proposta mais bonita<br />que seu cliente já recebeu.
          </h2>
          <p className="text-white/50 font-medium text-lg max-w-2xl mx-auto">
            Link digital com a cara da sua agência. Sem custo exposto. O cliente abre no celular e já quer confirmar.
          </p>
        </div>

        {/* Layout: browser frame + side features */}
        <div className="lg:grid lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* ── Browser frame ── */}
          <div className="relative hidden md:block">
            <div className="absolute -inset-4 bg-[#5DA6AA]/10 rounded-[3rem] blur-2xl pointer-events-none" />
            <div className="relative bg-white rounded-[1.5rem] shadow-2xl overflow-hidden border border-white/10">

              {/* Chrome */}
              <div className="bg-[#1e1e1e] px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-[#2d2d2d] rounded-md px-3 py-1 flex items-center gap-2">
                  <svg className="w-2.5 h-2.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span className="text-[10px] font-mono text-slate-400">agenteoffice.com.br/p/88472</span>
                  <CheckCheck size={9} className="ml-auto text-emerald-400" />
                </div>
              </div>

              {/* Hero */}
              <div className="relative h-44 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1400&fit=crop" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                <div className="relative h-full flex flex-col justify-between p-5">
                  <div className="flex items-start justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-white/15 text-white px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">✈ Proposta de Viagem</span>
                    <img src="/logo_hor_white.png" alt="logo" className="h-5 w-auto opacity-90" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-xl mb-2 drop-shadow-lg">Lua de Mel — Toscana & Roma</h3>
                    <div className="flex gap-2 flex-wrap">
                      {['📅 14–22 Abr 2026','👥 2 viajantes','Casal Ferreira'].map((t,i) => (
                        <span key={i} className="text-white/80 text-[10px] font-medium bg-black/25 px-2 py-0.5 rounded-full backdrop-blur-sm">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar */}
              <div className="bg-white border-b border-slate-100 px-4 flex items-center justify-between">
                <div className="flex">
                  {['📄 Proposta','📋 Voucher'].map((t, i) => (
                    <div key={i} className={`px-4 py-2.5 text-[10px] font-black border-b-2 ${i === 0 ? 'border-[#0F766E] text-[#0F766E]' : 'border-transparent text-slate-400'}`}>{t}</div>
                  ))}
                </div>
                <div className="flex items-center gap-2 py-1.5">
                  <div className="flex gap-1 text-[8px] font-black text-[#0F766E]">
                    <span className="bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">Op. 1</span>
                    <span className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">Op. 2</span>
                  </div>
                  <button className="text-[9px] font-black text-white bg-[#114552] px-2.5 py-1 rounded-lg">⬇ PDF</button>
                </div>
              </div>

              {/* Body */}
              <div className="bg-slate-50 p-3 space-y-3 max-h-[580px] overflow-y-auto">

                {/* Strip */}
                <div className="flex gap-2 overflow-x-auto pb-0.5">
                  {[{e:'✈️',l:'Voos',n:2},{e:'🏨',l:'Hotéis',n:2},{e:'🚌',l:'Transfers',n:3},{e:'🎭',l:'Passeios',n:4},{e:'🛡️',l:'Seguro',n:1}].map((c,i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-slate-100 shrink-0">
                      <span className="text-sm">{c.e}</span>
                      <div><div className="text-[9px] font-black text-[#114552]">{c.l}</div><div className="text-[8px] text-slate-400">{c.n} {c.n===1?'item':'itens'}</div></div>
                    </div>
                  ))}
                </div>

                {/* Voos */}
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
                    <span>✈️</span><span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Voos</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <Ticket orig="GRU" origCity="São Paulo" dest="FCO" destCity="Roma" dep="08:45" arr="06:05+1" flight="LATAM LA8025" direct={true} />
                    <Ticket orig="FCO" origCity="Roma" dest="GRU" destCity="São Paulo" dep="10:30" arr="18:55" flight="LATAM LA8026" direct={true} />
                  </div>
                </div>

                {/* Hotéis */}
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
                    <span>🏨</span><span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Hotéis</span>
                  </div>
                  <div className="p-3 space-y-2.5">
                    <HotelCard
                      photos={PHOTOS1} idx={photoIdx} setIdx={setPhotoIdx}
                      name="Castello di Casole" location="Toscana, Itália"
                      stars="⭐⭐⭐⭐⭐" regime="☕ Café da manhã"
                      checkin="14/04" checkout="18/04" nights="4" price="✓ Incluso"
                      desc="Hotel boutique histórico em meio aos vinhedos toscanos. Quarto superior com vista para a colina, spa e piscina infinity exclusivos." />
                    <HotelCard
                      photos={PHOTOS2} idx={photo2Idx} setIdx={setPhoto2Idx}
                      name="Hotel de Russie" location="Roma, Itália"
                      stars="⭐⭐⭐⭐⭐" regime="🍽 Meia pensão"
                      checkin="18/04" checkout="22/04" nights="4" price="✓ Incluso"
                      desc="Ícone romano a 2 min da Piazza del Popolo. Jardins secretos, suíte deluxe com banheira e café da manhã no terraço com vista para o Vaticano." />
                  </div>
                </div>

                {/* Passeios */}
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
                    <span>🎭</span><span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Passeios & Experiências</span>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { name: 'Tour privê Vinícolas do Chianti', detail: 'Toscana · Dia inteiro', badge: '🍷 Exclusivo', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&fit=crop' },
                      { name: 'Coliseu com acesso prioritário', detail: 'Roma · Guia bilíngue · 3h', badge: '🏛 Histórico', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&fit=crop' },
                      { name: 'Jantar romântico — Castel Sant\'Angelo', detail: 'Roma · Vista panorâmica', badge: '🌙 Romântico', img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&fit=crop' },
                    ].map((p, i) => (
                      <div key={i} className="flex gap-2.5 items-center">
                        <img src={p.img} alt={p.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-black text-[#114552] leading-tight">{p.name}</div>
                          <div className="text-[9px] text-slate-400 font-medium mt-0.5">{p.detail}</div>
                        </div>
                        <span className="text-[8px] font-black bg-teal-50 text-[#0F766E] px-1.5 py-0.5 rounded-full border border-teal-100 shrink-0">{p.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transfers */}
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
                    <span>🚌</span><span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Transfers</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {[
                      { desc: 'FCO → Castello di Casole (Van privativa)', data: '14/04 · Chegada' },
                      { desc: 'Toscana → Roma (Van privativa)', data: '18/04 · Transferência' },
                      { desc: 'Hotel de Russie → FCO', data: '22/04 · Saída 06h' },
                    ].map((t, i) => (
                      <div key={i} className="px-3 py-2 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-xs">🚌</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold text-slate-700 leading-tight">{t.desc}</div>
                          <div className="text-[9px] text-slate-400">{t.data}</div>
                        </div>
                        <span className="text-[9px] font-black text-[#0F766E] shrink-0">✓ Incluso</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seguro */}
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
                    <span>🛡️</span><span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Seguro Viagem</span>
                  </div>
                  <div className="px-3 py-2.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-base shrink-0">🛡️</div>
                    <div className="flex-1">
                      <div className="text-[10px] font-black text-slate-700">Assistência Total Premium · Affinity</div>
                      <div className="flex gap-2 mt-0.5 flex-wrap">
                        {['Médico ilimitado','Bagagem','Covid','Odonto'].map(c => (
                          <span key={c} className="text-[8px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[8px] text-slate-400 font-bold">14 dias · 2 pax</div>
                      <div className="text-[10px] font-black text-[#114552]">✓ Incluso</div>
                    </div>
                  </div>
                </div>

                {/* Mensagem do agente */}
                <div className="bg-gradient-to-r from-teal-50 to-white rounded-xl border border-teal-100 p-3 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5DA6AA] to-[#114552] flex items-center justify-center shrink-0 text-white font-black text-xs" style={{fontStyle:'italic'}}>M</div>
                  <div>
                    <div className="text-[9px] font-black text-[#114552] mb-1">Mensagem da sua agente</div>
                    <p className="text-[10px] text-slate-600 font-medium leading-relaxed italic">
                      "Elaboramos cada detalhe desta lua de mel com muito carinho. Dos vinhedos da Toscana às noites eternas de Roma — cada momento foi pensado para ser inesquecível. Qualquer dúvida, estou aqui! 🥂"
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className="rounded-xl overflow-hidden" style={{background:'linear-gradient(135deg,#042F2E 0%,#0F766E 60%,#2DD4BF 100%)'}}>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">Investimento total</div>
                        <div className="text-3xl font-black text-white">R$ 24.048</div>
                        <div className="text-[10px] text-white/50 mt-0.5">Para 2 viajantes · R$ 12.024 / pessoa</div>
                      </div>
                      <button className="bg-white text-[#0F766E] font-black text-xs px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap">✓ Aprovar viagem</button>
                    </div>
                  </div>
                </div>

                <div className="pb-2 text-center text-[9px] text-slate-400 font-medium">💳 Comissão e custo da agência são sempre confidenciais — só você vê.</div>
              </div>
            </div>
          </div>

          {/* ── Side features ── */}
          <div className="hidden lg:flex flex-col gap-4 pt-16">
            {[
              { icon: '🔒', title: '100% confidencial', desc: 'Custo e comissão nunca aparecem para o cliente. Só você tem acesso.' },
              { icon: '📱', title: 'Link no WhatsApp', desc: 'Compartilhe em 1 toque. Abre bonito no celular, tablet ou desktop.' },
              { icon: '🎨', title: 'Com a sua marca', desc: 'Logo, cores e nome da sua agência em tudo — do hero ao rodapé.' },
              { icon: '✅', title: '2 opções por proposta', desc: 'Envie op. 1 e op. 2 para o mesmo cliente. Ele compara e decide.' },
              { icon: '✈️', title: 'Voucher em 1 clique', desc: 'Cliente aprovou? O voucher digital fica pronto na hora. Sem retrabalho.' },
              { icon: '📄', title: 'Exporta em PDF', desc: 'Gera PDF profissional para quem prefere receber por e-mail ou imprimir.' },
            ].map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 hover:bg-white/8 transition-colors">
                <div className="text-2xl shrink-0">{f.icon}</div>
                <div>
                  <div className="text-[12px] font-black text-white mb-0.5">{f.title}</div>
                  <div className="text-[11px] text-white/45 font-medium leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile features (visible only on small screens) */}
        <div className="lg:hidden mt-8 grid grid-cols-2 gap-3">
          {[
            { icon: '🔒', title: '100% confidencial' },
            { icon: '📱', title: 'Link no WhatsApp' },
            { icon: '✅', title: '2 opções por proposta' },
            { icon: '✈️', title: 'Voucher em 1 clique' },
          ].map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2">
              <span className="text-xl">{f.icon}</span>
              <span className="text-[11px] font-black text-white">{f.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── GESTÃO SHOWCASE ───────────────────────────── */
function GestaoShowcase() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % 2), 6000);
    return () => clearInterval(id);
  }, []);

  const VIAGENS = [
    { dest: 'Portugal + Espanha', datas: '15–27 Out 2026', pax: '2 pax', val: 'R$ 24.048', status: 'Proposta enviada', statusColor: 'bg-violet-100 text-violet-700', img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&fit=crop' },
    { dest: 'Maldivas', datas: '03–12 Ago 2026', pax: '2 pax', val: 'R$ 38.500', status: 'Fechado ✓', statusColor: 'bg-emerald-100 text-emerald-700', img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&fit=crop' },
    { dest: 'Disney Orlando', datas: '20 Dez–02 Jan', pax: '4 pax', val: 'R$ 52.200', status: 'Em breve ✈', statusColor: 'bg-blue-100 text-blue-700', img: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=600&fit=crop' },
    { dest: 'Cancún', datas: '10–20 Jul 2026', pax: '2 pax', val: 'R$ 18.400', status: 'Lead', statusColor: 'bg-slate-100 text-slate-500', img: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&fit=crop' },
    { dest: 'Paris + Amsterdam', datas: '05–18 Set 2026', pax: '2 pax', val: 'R$ 19.200', status: 'Fechado ✓', statusColor: 'bg-emerald-100 text-emerald-700', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&fit=crop' },
    { dest: 'Safari Tanzânia', datas: 'Nov 2026', pax: '4 pax', val: 'R$ 94.000', status: 'Orçamento', statusColor: 'bg-amber-100 text-amber-700', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&fit=crop' },
  ];

  const KANBAN = [
    { col: 'Lead', dot: 'bg-slate-400', header: 'bg-slate-50 border-slate-200', total: 'R$ 40k', cards: [
      { name: 'Família Rocha', dest: 'Cancún · Jul', val: 'R$ 18k', avatar: 'FR' },
      { name: 'Camila Souza', dest: 'Disney · Dez', val: '—', avatar: 'CS' },
      { name: 'Grupo Alfa', dest: 'Nordeste · Out', val: 'R$ 22k', avatar: 'GA' },
    ]},
    { col: 'Proposta', dot: 'bg-violet-400', header: 'bg-violet-50 border-violet-200', total: 'R$ 136k', cards: [
      { name: 'Silva, João', dest: 'Portugal · Out', val: 'R$ 24k', avatar: 'SJ' },
      { name: 'Nakamura', dest: 'Tóquio · Mar', val: 'R$ 48k', avatar: 'NK' },
      { name: 'Casal Ferrari', dest: 'Itália · Abr', val: 'R$ 34k', avatar: 'CF' },
      { name: 'Lima, Ana', dest: 'Roma · Mai', val: 'R$ 30k', avatar: 'LA' },
    ]},
    { col: 'Aprovado', dot: 'bg-amber-400', header: 'bg-amber-50 border-amber-200', total: 'R$ 131k', cards: [
      { name: 'Costa, Pedro', dest: 'Maldivas · Ago', val: 'R$ 38k', avatar: 'CP' },
      { name: 'Alves Fam.', dest: 'Dubai · Nov', val: 'R$ 61k', avatar: 'AF' },
      { name: 'Grupo Viena', dest: 'Europa · Set', val: 'R$ 32k', avatar: 'GV' },
    ]},
    { col: 'Fechado', dot: 'bg-emerald-400', header: 'bg-emerald-50 border-emerald-200', total: 'R$ 133k', cards: [
      { name: 'Fernandez', dest: 'Paris · Set', val: 'R$ 19k', avatar: 'FZ' },
      { name: 'Pereira, R.', dest: 'NYC · Jan', val: 'R$ 52k', avatar: 'PR' },
      { name: 'Tan, Michelle', dest: 'Bali · Fev', val: 'R$ 31k', avatar: 'TM' },
      { name: 'Santos, B.', dest: 'Disney · Dez', val: 'R$ 31k', avatar: 'SB' },
    ]},
    { col: 'Embarcado', dot: 'bg-teal-400', header: 'bg-teal-50 border-teal-200', total: 'R$ 94k', cards: [
      { name: 'Gomes, C.', dest: 'Tanzânia ✈', val: 'R$ 94k', avatar: 'GC' },
    ]},
  ];

  const BrowserChrome = ({ activeTab }) => (
    <div className="bg-[#1e1e1e] px-4 py-2.5 flex items-center gap-3">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"/>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"/>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"/>
      </div>
      <div className="flex-1 bg-[#2d2d2d] rounded-md px-3 py-1 flex items-center gap-2">
        <svg className="w-2.5 h-2.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span className="text-[10px] font-mono text-slate-400">app.agenteoffice.com.br/{activeTab}</span>
      </div>
    </div>
  );

  const AppNav = ({ active: nav }) => (
    <div className="bg-white border-b border-slate-100 px-4 flex items-center gap-0">
      {[['🏠','Dashboard'],['🧳','Minhas Viagens'],['📦','Pipeline'],['💰','Financeiro']].map(([ico, lbl], i) => {
        const slug = i===1 ? 'viagens' : i===2 ? 'pipeline' : i===0 ? 'dashboard' : 'financeiro';
        const isActive = slug === nav;
        return (
          <div key={i} className={`px-3 py-2.5 text-[9px] font-black border-b-2 flex items-center gap-1 ${isActive ? 'border-[#0F766E] text-[#0F766E]' : 'border-transparent text-slate-300'}`}>
            <span>{ico}</span><span>{lbl}</span>
          </div>
        );
      })}
    </div>
  );

  const ViagensMock = () => (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
      <BrowserChrome activeTab="viagens" />
      <AppNav active="viagens" />
      <div className="bg-slate-50 p-4 space-y-4" style={{maxHeight:'520px', overflowY:'auto'}}>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { l: 'Viagens ativas', v: '12', c: 'text-[#114552]' },
            { l: 'Este mês', v: 'R$ 284k', c: 'text-emerald-600' },
            { l: 'Próximas partidas', v: '3', c: 'text-blue-600' },
            { l: 'Pendentes', v: '2', c: 'text-amber-600' },
          ].map((s,i)=>(
            <div key={i} className="bg-white rounded-xl border border-slate-100 p-2.5 text-center">
              <div className="text-[8px] text-slate-400 font-bold uppercase mb-0.5">{s.l}</div>
              <div className={`text-sm font-black ${s.c}`}>{s.v}</div>
            </div>
          ))}
        </div>
        {/* Search + filtro */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="text-slate-300 text-xs">🔍</span>
            <span className="text-[9px] text-slate-300 font-medium">Buscar viagem, cliente...</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-[9px] font-bold text-slate-400">Filtros</div>
          <div className="bg-[#114552] rounded-xl px-3 py-2 text-[9px] font-black text-white">+ Nova</div>
        </div>
        {/* Cards grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {VIAGENS.map((v,i)=>(
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-20">
                <img src={v.img} alt={v.dest} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                <div className="absolute top-1.5 right-1.5">
                  <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full ${v.statusColor}`}>{v.status}</span>
                </div>
                <div className="absolute bottom-1.5 left-2">
                  <div className="text-white font-black text-[9px] leading-tight">{v.dest}</div>
                </div>
              </div>
              <div className="p-2">
                <div className="text-[8px] text-slate-400 font-medium">{v.datas} · {v.pax}</div>
                <div className="text-[10px] font-black text-[#5DA6AA] mt-0.5">{v.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PipelineMock = () => (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
      <BrowserChrome activeTab="pipeline" />
      <AppNav active="pipeline" />
      <div className="bg-slate-50" style={{maxHeight:'520px', overflowY:'auto'}}>
        {/* Pipeline header */}
        <div className="bg-white border-b border-slate-100 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-[#114552]">Pipeline de Vendas</span>
            <span className="text-[8px] bg-teal-50 border border-teal-200 text-[#0F766E] px-2 py-0.5 rounded-full font-black">15 clientes</span>
          </div>
          <div className="text-right">
            <div className="text-[8px] text-slate-400 font-medium">Total em negociação</div>
            <div className="text-[11px] font-black text-[#114552]">R$ 534k</div>
          </div>
        </div>
        {/* Kanban */}
        <div className="p-3 overflow-x-auto">
          <div className="flex gap-2.5 min-w-max pb-1">
            {KANBAN.map((col, ci)=>(
              <div key={ci} className="w-[130px] shrink-0">
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border mb-2 ${col.header}`}>
                  <div className={`w-2 h-2 rounded-full ${col.dot}`}/>
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-wide flex-1">{col.col}</span>
                  <span className="text-[8px] font-black text-slate-500">{col.cards.length}</span>
                </div>
                <div className="text-[8px] font-bold text-slate-400 mb-2 px-1">{col.total}</div>
                <div className="space-y-2">
                  {col.cards.map((c,cj)=>(
                    <div key={cj} className="bg-white rounded-xl border border-slate-100 p-2.5 shadow-sm hover:shadow transition-shadow">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#5DA6AA] to-[#114552] flex items-center justify-center shrink-0">
                          <span className="text-[6px] font-black text-white">{c.avatar}</span>
                        </div>
                        <div className="text-[9px] font-black text-[#114552] leading-tight truncate">{c.name}</div>
                      </div>
                      <div className="text-[8px] text-slate-400 font-medium mb-1">{c.dest}</div>
                      {c.val !== '—' && <div className="text-[9px] font-black text-[#5DA6AA]">{c.val}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const slides = [
    { label: 'Minhas Viagens', icon: '🧳', component: <ViagensMock /> },
    { label: 'Pipeline', icon: '📦', component: <PipelineMock /> },
  ];

  return (
    <section className="py-14 md:py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 px-4 py-1.5 rounded-full mb-6">
            <LayoutDashboard className="w-3.5 h-3.5 text-[#5DA6AA]"/>
            <span className="text-xs font-black text-[#114552] uppercase tracking-widest">Gestão completa</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#114552] tracking-tight mb-4">
            Tudo que você precisa ver,<br/><span className="text-[#5DA6AA]">numa tela só.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            Minhas Viagens com cards lindos por destino. Pipeline Kanban completo para nunca perder um lead. Tudo conectado, tudo ao vivo.
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-5xl mx-auto hidden md:block">
          <div className="absolute -inset-8 bg-gradient-to-tr from-[#5DA6AA]/15 to-[#114552]/8 rounded-[3rem] blur-3xl"/>
          <div className="relative overflow-hidden rounded-[2rem]">
            {slides.map((s,i)=>(
              <div key={i} className={`transition-all duration-700 ${i===active ? 'opacity-100 translate-y-0' : 'opacity-0 absolute inset-0 translate-y-4 pointer-events-none'}`}>
                {s.component}
              </div>
            ))}
          </div>
          {/* Controls */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {slides.map((s,i)=>(
              <button key={i} onClick={()=>setActive(i)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${i===active ? 'bg-[#114552] text-white shadow' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
          <p className="text-center text-[9px] text-slate-300 font-medium mt-2">* meramente ilustrativo</p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: '🧳', title: 'Minhas Viagens', desc: 'Cards por destino com foto, status, datas e valor. Visão de todas as viagens ativas de um jeito bonito e prático.' },
            { icon: '📦', title: 'Pipeline Kanban', desc: 'Lead → Proposta → Aprovado → Fechado → Embarcado. Arraste o cliente de coluna e nunca deixe um negócio cair.' },
            { icon: '🔔', title: 'Alertas automáticos', desc: 'Check-in disponível, visto pendente, pagamento chegando — você começa o dia sabendo exatamente o que fazer.' },
          ].map((f,i)=>(
            <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-black text-[#114552] text-base mb-2">{f.title}</div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HELPERS ────────────────────────────────────── */
function NavLeft() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M15 18l-6-6 6-6"/></svg>;
}
function NavRight() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M9 18l6-6-6-6"/></svg>;
}

/* ─── APP ────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openProfile, setOpenProfile] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    // Abre modal via ?plano=trial|embarque|escala|founder
    const slugToName = { trial: 'Experimente', embarque: 'Embarque', escala: 'Escala', founder: 'Founder' };
    const p = new URLSearchParams(window.location.search).get('plano');
    if (p && slugToName[p]) setSelectedPlan(slugToName[p]);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-100 selection:text-[#114552]">
      {USE_PLAN_CHECKOUT_MODAL ? (
        <>
          {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
          {selectedPlan && (
            <PlanModal
              planName={selectedPlan}
              onClose={() => setSelectedPlan(null)}
              openDemo={() => {
                setSelectedPlan(null);
                setDemoOpen(true);
              }}
            />
          )}
        </>
      ) : (
        (demoOpen || selectedPlan) && (
          <DemoModal
            onClose={() => {
              setDemoOpen(false);
              setSelectedPlan(null);
            }}
          />
        )
      )}
      {openProfile && <ProfileModal profile={openProfile} onClose={() => setOpenProfile(null)} onSelectPlan={setSelectedPlan} />}

      {/* ── NAV ─────────────────────────────────────── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <img src="/logo_hor_col.png" alt="AgenteOffice" className="h-9 w-auto" />
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#funcionalidades">Funcionalidades</NavLink>
            <NavLink href="#jornada">Jornada</NavLink>
            <NavLink href="#precos">Preços</NavLink>
            <div className="w-px h-4 bg-slate-200" />
            <a href="https://app.agenteoffice.com.br" className="flex items-center gap-1.5 text-sm font-bold text-[#114552] hover:text-[#5DA6AA] transition-colors">
              <LogIn size={15} /> Já sou cliente
            </a>
            <button onClick={() => setSelectedPlan('Experimente')} className="bg-[#114552] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0a2c35] transition-all shadow-md active:scale-95">
              Experimente grátis
            </button>
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
            <a href="https://app.agenteoffice.com.br" className="text-sm font-bold text-[#114552]">Já sou cliente</a>
            <button onClick={() => { setMenuOpen(false); setSelectedPlan('Experimente'); }} className="bg-[#114552] text-white text-center py-3 rounded-xl text-sm font-bold w-full">Experimente grátis</button>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-28 pb-10 sm:pt-32 lg:pt-44 lg:pb-12 px-4 bg-slate-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-[#5DA6AA]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#114552]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 px-4 py-1.5 rounded-full mb-7">
              <Zap className="w-3.5 h-3.5 text-[#5DA6AA]" />
              <span className="text-[#114552] text-[10px] font-black uppercase tracking-widest">Teste grátis — sem cartão de crédito</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-black text-[#114552] leading-[1.03] mb-6 tracking-tight">
              Proposta linda<br />para o cliente.<br />
              <span className="text-[#5DA6AA]">Em menos de 2 minutos.</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-500 mb-8 leading-relaxed font-medium max-w-lg">
              Cole o texto da consolidadora, a IA lê tudo e monta o orçamento com comissão calculada. Aprovou — a proposta vai para o cliente com a cara da sua agência. Sem digitar nada de novo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button onClick={() => setSelectedPlan('Experimente')} className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#114552] text-white rounded-2xl font-bold text-base hover:bg-[#0a2c35] transition-all shadow-xl group">
                Experimente de graça — sem cartão
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
              <button data-demo-btn onClick={() => setDemoOpen(true)} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-base hover:bg-slate-50 transition-all">
                <Play size={15} className="text-[#5DA6AA]" /> Ver demonstração
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-sm text-slate-600 font-semibold">
                <ShieldCheck size={16} className="text-[#5DA6AA]" />
                <span>Sem contrato de fidelidade — cancele quando quiser</span>
              </div>
            </div>
            <div className="mt-5 inline-flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3">
              <span className="text-lg">🎬</span>
              <p className="text-sm font-semibold text-amber-800">
                <strong className="font-black">CUSTA MENOS QUE O NETFLIX</strong> — e faz sua agência vender mais.
              </p>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 bg-gradient-to-tr from-[#5DA6AA]/20 to-[#114552]/10 rounded-[3rem] blur-3xl" />
            <div className="relative"><HeroSlider /></div>
          </div>
        </div>
      </section>

      {/* ── MÓDULOS STRIP ────────────────────────────── */}
      <div className="bg-[#114552] py-5 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-2 gap-y-2">
          {[
            { icon: '⚡', label: 'Orçamento Turbo' },
            { icon: '🎨', label: 'Estúdio de Vendas' },
            { icon: '✨', label: 'Mar.ia — IA' },
            { icon: '🗺️', label: 'Roteiro Personalizado' },
            { icon: '🧾', label: 'Voucher Digital' },
            { icon: '📦', label: 'Pipeline de Vendas' },
            { icon: '💰', label: 'Financeiro' },
            { icon: '📋', label: 'Contratos' },
            { icon: '🚌', label: 'Módulo Excursão' },
            { icon: '👥', label: 'Portal do Passageiro' },
          ].map((m, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full px-3 py-1 text-[11px] font-bold text-white/70">
              <span>{m.icon}</span>{m.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── INTEGRAÇÕES ──────────────────────────────── */}
      <div className="bg-white border-y border-slate-100 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 mb-7">
            Integrado com as ferramentas que você já usa
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">

            {/* TripAdvisor */}
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
              <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
                   alt="TripAdvisor" className="h-6 grayscale" />
              <span className="text-[10px] text-slate-400 font-semibold">Hotéis &amp; Fotos</span>
            </div>

            {/* Google */}
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
              <svg className="h-6 w-auto" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z"/>
                <path fill="#34A853" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.70-8.23-4.70-4.95 0-11.84 4.37-11.59 12.93z"/>
                <path fill="#EA4335" d="M35.29 41.41V32h31.77c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.03 9.66C16.32 69.35.36 53.89.36 35.33.36 16.77 16.32 1.31 35.35 1.31c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.54.17z"/>
              </svg>
              <span className="text-[10px] text-slate-400 font-semibold">Pesquisa de Fotos</span>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-[10px] text-slate-400 font-semibold">Atendimento</span>
            </div>

            {/* Anthropic / Claude */}
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#D97757" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.827 3.52l4.12 11.378H15.33l-.83-2.398H10.22l-.851 2.398H6.844L10.964 3.52zm-.888 6.87l-1.22-3.657-1.257 3.657zm-3.618 5.136l-4.12-11.378H7.84l2.624 7.616 2.684-7.616h2.526l-4.12 11.378z"/>
                </svg>
                <span className="text-[15px] font-black text-slate-600" style={{letterSpacing:'-0.02em'}}>Claude</span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">IA Mar.ia</span>
            </div>

            {/* Asaas */}
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
              <span className="text-[20px] font-black text-slate-500" style={{letterSpacing:'-0.03em'}}>asaas</span>
              <span className="text-[10px] text-slate-400 font-semibold">Pagamentos</span>
            </div>

            {/* Meta / WhatsApp Business API */}
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
              <svg className="h-6 w-auto" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z" fill="#1877F2"/>
                <path d="M26.2 31.2V25h2.1l.4-2.7h-2.5v-1.7c0-.8.4-1.5 1.5-1.5h1.2v-2.3s-1.1-.2-2.1-.2c-2.1 0-3.5 1.3-3.5 3.6V22.3H21v2.7h2.3v6.2h2.9z" fill="white"/>
              </svg>
              <span className="text-[10px] text-slate-400 font-semibold">API Oficial Meta</span>
            </div>

          </div>
        </div>
      </div>

      {/* ── O AGENTEOFFICE É PARA VOCÊ? ──────────────── */}
      <section className="py-12 md:py-20 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 px-4 py-1.5 rounded-full mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-700">O AgenteOffice é para você?</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#114552] tracking-tight mb-4">
              Me identifiquei.<br className="hidden lg:block"/><span className="text-[#5DA6AA]">Quero ver o que muda.</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">
              Clique no perfil que mais te representa — veja os diferenciais certos para você.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PROFILES.map((p, i) => (
              <button key={i} onClick={() => setOpenProfile(p)}
                className={`text-left rounded-[2rem] border-2 ${p.borderCls} p-7 bg-white ${p.bgCls} transition-all group hover:shadow-lg cursor-pointer w-full`}>
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-black text-[#114552] text-base mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-5">{p.subtitle}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#5DA6AA] group-hover:gap-2.5 transition-all">
                  Ver diferenciais <ArrowRight size={14}/>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUNCIONALIDADES ──────────────────────────── */}
      <section id="funcionalidades" className="py-12 md:py-20 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5 text-[#5DA6AA]"/>
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-700">Tudo dentro de um só sistema</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#114552] tracking-tight mb-4">
              Do texto da consolidadora<br />à proposta no celular do cliente.
              <span className="text-[#5DA6AA]"> Em 2 minutos.</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
              O Orçamento Turbo é só o começo — tem pipeline, financeiro, contratos e módulo de excursões quando você crescer.
            </p>
          </div>
        <div className="space-y-8">

          {/* ── BLOCO 1: Consolidadoras ── */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <SectionBadge icon={<Zap className="w-3.5 h-3.5"/>} label="Orçamento Turbo" color="bg-orange-50 border-orange-200 text-orange-700" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#114552] mb-5 tracking-tight">
                  Sakura, Flytour, Orinter,<br />CVC, Trend, Queensberry...<br />
                  <span className="text-[#5DA6AA]">Cole e pronto.</span>
                </h2>
                <p className="text-slate-500 font-medium text-base mb-7 leading-relaxed">
                  Fechou na consolidadora? Copia o texto da confirmação, cola no chat. A IA identifica voos, hotéis, datas e passageiros e monta o orçamento linha por linha — com a comissão calculada. O cliente recebe uma proposta linda em menos de 2 minutos.
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
                  {['Sakura', 'Flytour', 'Orinter', 'CVC', 'Trend', 'Queensberry', 'Expedia TAAP', 'TBO'].map(c => (
                    <span key={c} className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full uppercase tracking-wider">{c}</span>
                  ))}
                </div>
              </div>
              <div className="hidden lg:flex bg-slate-50 p-8 lg:p-10 items-center justify-center border-l border-slate-100">
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

          {/* ── BLOCO 2: Atendimento WhatsApp ── */}
          <div className="rounded-[2.5rem] overflow-hidden" style={{background: 'linear-gradient(135deg, #0a2e29 0%, #0d3b34 50%, #114532 100%)'}}>
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Lado esquerdo — texto */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                {/* Badge Meta Oficial */}
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 w-fit">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7.5c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5s.5-.224.5-.5v-5c0-.276-.224-.5-.5-.5zM12 7c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5s.5-.224.5-.5v-9c0-.276-.224-.5-.5-.5zM7.5 9.5c-.276 0-.5.224-.5.5v3c0 .276.224.5.5.5s.5-.224.5-.5v-3c0-.276-.224-.5-.5-.5z" fill="#25D366"/>
                  </svg>
                  <span className="text-[11px] font-black text-green-300 uppercase tracking-widest">API Oficial WhatsApp · Meta Business</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                  Toda a equipe atendendo<br />no mesmo WhatsApp.
                  <span className="text-green-400"> Dentro do CRM.</span>
                </h2>
                <p className="text-white/60 font-medium text-base mb-8 leading-relaxed">
                  Conecte o número da sua agência via <strong className="text-white/90">API oficial do WhatsApp Business (Meta)</strong> e atenda todos os clientes sem sair do AgenteOffice. Sem risco de bloqueio. Sem aba extra.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    { icon: '✅', text: 'Integração oficial Meta — conta verificada, sem bloqueio' },
                    { icon: '👥', text: 'Múltiplos agentes no mesmo número ao mesmo tempo' },
                    { icon: '📋', text: 'Histórico da conversa vinculado ao cliente no CRM' },
                    { icon: '🔔', text: 'Notificações em tempo real para toda a equipe' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-base leading-none mt-0.5">{item.icon}</span>
                      <span className="text-white/75 font-medium text-sm leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Selos */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                    <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white text-[10px] font-black">M</div>
                    <span className="text-[11px] font-bold text-white/80">Meta Business Partner</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                    <ShieldCheck className="w-4 h-4 text-green-400"/>
                    <span className="text-[11px] font-bold text-white/80">Conta verificada</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                    <span className="text-green-400 text-sm">●</span>
                    <span className="text-[11px] font-bold text-white/80">Disponível Operador & Enterprise</span>
                  </div>
                </div>
              </div>

              {/* Lado direito — mockup CRM + chat */}
              <div className="hidden lg:flex p-8 lg:p-10 items-center justify-center">
                <div className="w-full max-w-[360px]">
                  {/* Janela do CRM */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{background:'#0f1923'}}>
                    {/* Topbar CRM */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10" style={{background:'#1a2a35'}}>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"/>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="bg-white/10 rounded-md px-3 py-0.5 text-[10px] text-white/50 font-medium">app.agenteoffice.com.br/atendimento</div>
                      </div>
                    </div>

                    {/* Layout CRM */}
                    <div className="flex" style={{height:'320px'}}>
                      {/* Mini sidebar */}
                      <div className="w-10 border-r border-white/10 flex flex-col items-center py-3 gap-3" style={{background:'#111c26'}}>
                        {['🏠','✈️','💬','⚙️'].map((ic,i) => (
                          <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center text-[12px] ${i===2 ? 'bg-green-500/30 ring-1 ring-green-400/50' : 'opacity-30'}`}>{ic}</div>
                        ))}
                      </div>

                      {/* Lista de conversas */}
                      <div className="w-28 border-r border-white/10 overflow-hidden" style={{background:'#141f2b'}}>
                        <div className="px-2 py-2 border-b border-white/10">
                          <span className="text-[9px] font-black text-white/40 uppercase tracking-wider">Conversas</span>
                        </div>
                        {[
                          { name: 'Rafaela M.', msg: 'Oi! Quero orçamento...', unread: 2, active: true },
                          { name: 'João P.', msg: 'Quanto fica Cancún?', unread: 0, active: false },
                          { name: 'Ana Silva', msg: 'Passaporte ok ✓', unread: 0, active: false },
                        ].map((c,i) => (
                          <div key={i} className={`px-2 py-2 border-b border-white/5 cursor-pointer ${c.active ? 'bg-green-500/15' : ''}`}>
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[9px] font-black text-white/80 truncate">{c.name}</span>
                              {c.unread > 0 && <span className="bg-green-500 text-white text-[7px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">{c.unread}</span>}
                            </div>
                            <span className="text-[8px] text-white/40 truncate block">{c.msg}</span>
                          </div>
                        ))}
                      </div>

                      {/* Chat principal */}
                      <div className="flex-1 flex flex-col" style={{background:'#1a2a35'}}>
                        {/* Header do chat */}
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[9px] font-black">R</div>
                          <div>
                            <div className="text-[10px] font-black text-white">Rafaela M.</div>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400"/>
                              <span className="text-[8px] text-green-400">online</span>
                            </div>
                          </div>
                        </div>

                        {/* Mensagens */}
                        <div className="flex-1 px-2 py-2 space-y-2 overflow-hidden">
                          {[
                            { from: 'c', msg: 'Oi! Quero orçamento pra Portugal em outubro 🙏', time: '09:12' },
                            { from: 'a', msg: 'Oi Rafaela! Quantas pessoas?', time: '09:14' },
                            { from: 'c', msg: '2 pessoas, ~R$ 25k', time: '09:15' },
                            { from: 'a', msg: 'Perfeito! Já monto as opções 😊', time: '09:16' },
                          ].map((m,i) => (
                            <div key={i} className={`flex ${m.from==='a' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] px-2 py-1.5 rounded-xl text-[9px] font-medium leading-relaxed ${m.from==='a' ? 'bg-[#dcf8c6] text-slate-800' : 'bg-white/15 text-white/85'}`}>
                                {m.msg}
                                <div className="text-[7px] text-right mt-0.5 opacity-50">{m.time} ✓✓</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Input */}
                        <div className="px-2 py-2 border-t border-white/10 flex items-center gap-1.5">
                          <div className="flex-1 bg-white/10 rounded-lg px-2 py-1 text-[9px] text-white/30">Responder Rafaela...</div>
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Label abaixo */}
                  <div className="text-center mt-3 text-[10px] text-white/30 font-medium">
                    WhatsApp Business integrado · API Oficial Meta
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BLOCO 3: Proposta e Voucher ── */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="hidden lg:flex bg-slate-50 p-8 lg:p-10 items-center justify-center border-r border-slate-100 order-2 lg:order-1">
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#114552] mb-5 tracking-tight">
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

          {/* ── BLOCO 4: Financeiro ── */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <SectionBadge icon={<Wallet className="w-3.5 h-3.5"/>} label="Financeiro" color="bg-emerald-50 border-emerald-200 text-emerald-700" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#114552] mb-5 tracking-tight">
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
              <div className="hidden lg:flex bg-slate-50 p-8 lg:p-10 items-center justify-center border-l border-slate-100">
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

          {/* ── BLOCO 5: Pipeline + Alertas ── */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="hidden lg:flex bg-slate-50 p-8 lg:p-10 items-center justify-center border-r border-slate-100 order-2 lg:order-1">
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#114552] mb-5 tracking-tight">
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

          {/* ── BLOCO 6: Atendimento WhatsApp (removido — movido para BLOCO 2) ── */}
          {false && <div className="rounded-[2.5rem] overflow-hidden" style={{background: 'linear-gradient(135deg, #0a2e29 0%, #0d3b34 50%, #114532 100%)'}}>
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Lado esquerdo — texto */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                {/* Badge Meta Oficial */}
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 w-fit">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7.5c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5s.5-.224.5-.5v-5c0-.276-.224-.5-.5-.5zM12 7c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5s.5-.224.5-.5v-9c0-.276-.224-.5-.5-.5zM7.5 9.5c-.276 0-.5.224-.5.5v3c0 .276.224.5.5.5s.5-.224.5-.5v-3c0-.276-.224-.5-.5-.5z" fill="#25D366"/>
                  </svg>
                  <span className="text-[11px] font-black text-green-300 uppercase tracking-widest">API Oficial WhatsApp · Meta Business</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                  Toda a equipe atendendo<br />no mesmo WhatsApp.
                  <span className="text-green-400"> Dentro do CRM.</span>
                </h2>
                <p className="text-white/60 font-medium text-base mb-8 leading-relaxed">
                  Conecte o número da sua agência via <strong className="text-white/90">API oficial do WhatsApp Business (Meta)</strong> e atenda todos os clientes sem sair do AgenteOffice. Sem risco de bloqueio. Sem aba extra.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    { icon: '✅', text: 'Integração oficial Meta — conta verificada, sem bloqueio' },
                    { icon: '👥', text: 'Múltiplos agentes no mesmo número ao mesmo tempo' },
                    { icon: '📋', text: 'Histórico da conversa vinculado ao cliente no CRM' },
                    { icon: '🔔', text: 'Notificações em tempo real para toda a equipe' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-base leading-none mt-0.5">{item.icon}</span>
                      <span className="text-white/75 font-medium text-sm leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Selos */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                    <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white text-[10px] font-black">M</div>
                    <span className="text-[11px] font-bold text-white/80">Meta Business Partner</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                    <ShieldCheck className="w-4 h-4 text-green-400"/>
                    <span className="text-[11px] font-bold text-white/80">Conta verificada</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                    <span className="text-green-400 text-sm">●</span>
                    <span className="text-[11px] font-bold text-white/80">Disponível Operador & Enterprise</span>
                  </div>
                </div>
              </div>

              {/* Lado direito — mockup CRM + chat */}
              <div className="hidden lg:flex p-8 lg:p-10 items-center justify-center">
                <div className="w-full max-w-[360px]">
                  {/* Janela do CRM */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{background:'#0f1923'}}>
                    {/* Topbar CRM */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10" style={{background:'#1a2a35'}}>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"/>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="bg-white/10 rounded-md px-3 py-0.5 text-[10px] text-white/50 font-medium">app.agenteoffice.com.br/atendimento</div>
                      </div>
                    </div>

                    {/* Layout CRM */}
                    <div className="flex" style={{height:'320px'}}>
                      {/* Mini sidebar */}
                      <div className="w-10 border-r border-white/10 flex flex-col items-center py-3 gap-3" style={{background:'#111c26'}}>
                        {['🏠','✈️','💬','⚙️'].map((ic,i) => (
                          <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center text-[12px] ${i===2 ? 'bg-green-500/30 ring-1 ring-green-400/50' : 'opacity-30'}`}>{ic}</div>
                        ))}
                      </div>

                      {/* Lista de conversas */}
                      <div className="w-28 border-r border-white/10 overflow-hidden" style={{background:'#141f2b'}}>
                        <div className="px-2 py-2 border-b border-white/10">
                          <span className="text-[9px] font-black text-white/40 uppercase tracking-wider">Conversas</span>
                        </div>
                        {[
                          { name: 'Rafaela M.', msg: 'Oi! Quero orçamento...', unread: 2, active: true },
                          { name: 'João P.', msg: 'Quanto fica Cancún?', unread: 0, active: false },
                          { name: 'Ana Silva', msg: 'Passaporte ok ✓', unread: 0, active: false },
                        ].map((c,i) => (
                          <div key={i} className={`px-2 py-2 border-b border-white/5 cursor-pointer ${c.active ? 'bg-green-500/15' : ''}`}>
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[9px] font-black text-white/80 truncate">{c.name}</span>
                              {c.unread > 0 && <span className="bg-green-500 text-white text-[7px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">{c.unread}</span>}
                            </div>
                            <span className="text-[8px] text-white/40 truncate block">{c.msg}</span>
                          </div>
                        ))}
                      </div>

                      {/* Chat principal */}
                      <div className="flex-1 flex flex-col" style={{background:'#1a2a35'}}>
                        {/* Header do chat */}
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[9px] font-black">R</div>
                          <div>
                            <div className="text-[10px] font-black text-white">Rafaela M.</div>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400"/>
                              <span className="text-[8px] text-green-400">online</span>
                            </div>
                          </div>
                        </div>

                        {/* Mensagens */}
                        <div className="flex-1 px-2 py-2 space-y-2 overflow-hidden">
                          {[
                            { from: 'c', msg: 'Oi! Quero orçamento pra Portugal em outubro 🙏', time: '09:12' },
                            { from: 'a', msg: 'Oi Rafaela! Quantas pessoas?', time: '09:14' },
                            { from: 'c', msg: '2 pessoas, ~R$ 25k', time: '09:15' },
                            { from: 'a', msg: 'Perfeito! Já monto as opções 😊', time: '09:16' },
                          ].map((m,i) => (
                            <div key={i} className={`flex ${m.from==='a' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] px-2 py-1.5 rounded-xl text-[9px] font-medium leading-relaxed ${m.from==='a' ? 'bg-[#dcf8c6] text-slate-800' : 'bg-white/15 text-white/85'}`}>
                                {m.msg}
                                <div className="text-[7px] text-right mt-0.5 opacity-50">{m.time} ✓✓</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Input */}
                        <div className="px-2 py-2 border-t border-white/10 flex items-center gap-1.5">
                          <div className="flex-1 bg-white/10 rounded-lg px-2 py-1 text-[9px] text-white/30">Responder Rafaela...</div>
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Label abaixo */}
                  <div className="text-center mt-3 text-[10px] text-white/30 font-medium">
                    WhatsApp Business integrado · API Oficial Meta
                  </div>
                </div>
              </div>
            </div>
          </div>}

        </div>
        </div>
      </section>

      {/* ── PROPOSTA SHOWCASE ────────────────────────── */}
      <PropostaShowcase />

      {/* ── GESTÃO SHOWCASE ──────────────────────────── */}
      <GestaoShowcase />

      {/* ── ROTEIRO PERSONALIZADO ────────────────────── */}
      <section className="py-14 md:py-24 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionBadge icon={<Sparkles className="w-3.5 h-3.5"/>} label="Roteiro Personalizado" color="bg-violet-50 border-violet-200 text-violet-700"/>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#114552] tracking-tight mb-5 leading-tight">
              Você conhece o cliente.<br/>A Mar.ia monta o roteiro.<br/>
              <span className="text-[#5DA6AA]">Você assina a viagem.</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg mb-8 leading-relaxed">
              Descreva o perfil do cliente — destino, datas, orçamento, estilo de viagem. A Mar.ia sugere roteiro dia a dia, opções de hotel, passeios e até dicas de restaurante. Você refina com a sua experiência e envia uma proposta que parece feita à mão.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Descreva o cliente e receba sugestões de destino em segundos',
                'Roteiro dia a dia detalhado — atividades, transfers e dicas',
                'Você edita, personaliza e coloca sua marca no resultado final',
                'Proposta vai para o cliente com a cara da sua agência',
              ].map((t,i) => <FeatureCheck key={i}>{t}</FeatureCheck>)}
            </ul>
            <div className="inline-flex items-center gap-3 bg-white border border-violet-100 rounded-2xl px-5 py-3 shadow-sm">
              <span className="text-2xl">🧳</span>
              <p className="text-sm font-semibold text-slate-600">
                O cliente sente que você<br/><strong className="text-[#114552] font-black">conhece a viagem de cor.</strong>
              </p>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 bg-gradient-to-tr from-violet-200/30 to-[#5DA6AA]/10 rounded-[3rem] blur-3xl"/>
            <div className="relative"><ChatDemo/></div>
          </div>
        </div>
      </section>

      {/* ── PREÇOS ───────────────────────────────────── */}
      <section id="precos" className="py-14 md:py-24 bg-slate-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge icon={<Sparkles className="w-3.5 h-3.5"/>} label="IA incluída em todos os planos" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#114552] mb-4 tracking-tight">Planos transparentes.</h2>
            <p className="text-slate-500 font-medium">Sem taxa de setup. Cancele quando quiser. Usuário extra por <strong>+R$ 29,90/mês</strong>.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan, i) => (
              <div key={i} className={`relative flex flex-col p-7 rounded-[2rem] bg-white border-2 transition-all ${plan.highlight ? 'border-[#5DA6AA] shadow-2xl lg:scale-105 z-10' : 'border-slate-100 shadow-sm'}`}>
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#5DA6AA] text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-7">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 text-[#114552] mb-2">
                    {plan.price !== null && <span className="text-lg font-bold">R$</span>}
                    <span className="text-4xl font-black tracking-tight">{plan.price ?? plan.priceLabel}</span>
                    {plan.price !== null && <span className="text-slate-400 font-bold text-sm">/mês</span>}
                  </div>
                  <p className="text-slate-400 text-xs font-medium italic">"{plan.desc}"</p>
                </div>
                <div className="h-px bg-slate-100 mb-6" />
                <ul className="space-y-3 mb-7 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-xs font-semibold text-slate-600">
                      <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-[#5DA6AA]' : 'text-slate-300'}`}/>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setSelectedPlan(plan.name)} className={`w-full py-3.5 rounded-xl font-black text-sm transition-all active:scale-95 ${plan.highlight ? 'bg-[#114552] text-white hover:bg-[#0a2c35] shadow-xl' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          {/* Usuário extra */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm">
              <span className="text-lg">👤</span>
              <div>
                <span className="text-sm font-black text-[#114552]">Precisa de mais usuários? </span>
                <span className="text-sm font-semibold text-slate-500">Adicione quantos quiser por <strong className="text-[#114552]">+R$ 29,90/mês</strong> cada.</span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-slate-400 font-medium">
            {['Sem contrato de fidelidade', 'Dados exportáveis a qualquer momento', 'Suporte em português'].map((item, i) => (
              <div key={i} className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#5DA6AA]"/>{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────── */}
      <section className="py-14 md:py-24 bg-gradient-to-br from-[#114552] to-[#0a2c35] px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M10 0L0 0 0 10' fill='none' stroke='white' stroke-width='0.3' opacity='0.15'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E")`}} />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Zap className="w-8 h-8 text-[#5DA6AA]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Sua agência merece<br />um sistema de verdade.<br />
            <span className="text-[#5DA6AA]">Simples assim.</span>
          </h2>
          <p className="text-xl text-white/60 mb-10 font-medium leading-relaxed">
            Comece hoje mesmo. Em minutos você está criando orçamentos, enviando propostas bonitas e vendo o financeiro da agência em tempo real. Sem contrato, sem complicação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setSelectedPlan('Experimente')} className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#5DA6AA] text-white rounded-2xl font-black text-lg hover:bg-[#4a8f93] transition-all shadow-xl group">
              Experimente de graça <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20}/>
            </button>
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
              <a href="https://app.agenteoffice.com.br" className="text-[#5DA6AA] hover:text-white transition-colors">Login</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">Suporte</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4 text-white/25 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2026 AgenteOffice. Todos os direitos reservados.</p>
            <p>Do papel ao sistema. Da planilha à proposta. Da ideia ao embarque.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
