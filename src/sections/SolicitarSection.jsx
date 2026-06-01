import { useState } from 'react';
import { Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { Container, SectionBadge } from '../lib/ui.jsx';

// Número do especialista (sem o https://wa.me/ para montar o link com texto)
const WPP_NUMBER = '5512936182479';

const BENEFITS = [
  'Agente de IA de pré-atendimento 24/7',
  'Sistema completo: pipeline, clientes e financeiro',
  'Orçamentos Turbo com proposta da sua marca',
  'Onboarding e suporte de verdade',
];

export default function SolicitarSection() {
  const [form, setForm] = useState({ nome: '', agencia: '', whatsapp: '', msg: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    // 1) dispara e-mail para contato@agenteoffice.com.br (sem backend, via FormSubmit)
    try {
      await fetch('https://formsubmit.co/ajax/contato@agenteoffice.com.br', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Novo orçamento — ${form.agencia || form.nome}`,
          Nome: form.nome,
          Agência: form.agencia,
          WhatsApp: form.whatsapp,
          Mensagem: form.msg || '—',
        }),
      });
    } catch {
      /* mesmo se o e-mail falhar, seguimos pro WhatsApp */
    }
    // 2) abre o WhatsApp já preenchido
    const txt =
      `Olá! Quero um orçamento do AgenteOffice.%0A%0A` +
      `*Nome:* ${form.nome}%0A` +
      `*Agência:* ${form.agencia}%0A` +
      `*WhatsApp:* ${form.whatsapp}%0A` +
      (form.msg ? `*Mensagem:* ${form.msg}%0A` : '');
    window.open(`https://wa.me/${WPP_NUMBER}?text=${txt}`, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section id="precos" className="relative py-20 sm:py-28 bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-gradient-to-bl from-brand-400/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <Container className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* texto */}
        <div>
          <SectionBadge icon={MessageCircle} tone="coral">Vamos conversar</SectionBadge>
          <h2 className="mt-5 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.08] text-balance">
            Solicite um orçamento<br />pra sua agência.
          </h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed max-w-md">
            Conte um pouco sobre sua operação e a gente monta a melhor proposta pra você — sem compromisso.
          </p>
          <ul className="mt-7 space-y-2.5">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-white/90">
                <CheckCircle2 size={18} className="text-brand-300 shrink-0" /> <span className="text-[15px]">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* formulário / sucesso */}
        {sent ? (
          <div className="bg-white rounded-3xl shadow-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 grid place-content-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-ink mb-2">Pedido recebido! 💙</h3>
            <p className="text-slate-500 leading-relaxed">
              Enviamos seu contato para a nossa equipe e abrimos o WhatsApp pra você. Se ele não abriu, é só falar com a gente direto:
            </p>
            <a href={`https://wa.me/${WPP_NUMBER}`} target="_blank" rel="noopener"
              className="mt-5 inline-flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-extrabold px-6 py-3 rounded-2xl shadow-glow transition-all">
              <MessageCircle size={18} /> Abrir WhatsApp
            </a>
          </div>
        ) : (
        <form onSubmit={submit} className="bg-white rounded-3xl shadow-card p-6 sm:p-8">
          <div className="space-y-4">
            <Field label="Seu nome" value={form.nome} onChange={set('nome')} placeholder="Ex.: Maria Silva" required />
            <Field label="Nome da agência" value={form.agencia} onChange={set('agencia')} placeholder="Ex.: Silva Turismo" required />
            <Field label="WhatsApp" value={form.whatsapp} onChange={set('whatsapp')} placeholder="(00) 00000-0000" required />
            <div>
              <label className="block text-sm font-bold text-ink mb-1.5">Mensagem (opcional)</label>
              <textarea value={form.msg} onChange={set('msg')} rows={3} placeholder="Quantos agentes? O que mais te interessa?"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none" />
            </div>
          </div>
          <button type="submit" className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-extrabold py-4 rounded-2xl shadow-glow ring-1 ring-white/40 transition-all active:scale-[0.98]">
            <Send size={18} /> Solicitar orçamento
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">Enviamos por e-mail e abrimos o WhatsApp com seus dados. 💙</p>
        </form>
        )}
      </Container>
    </section>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-bold text-ink mb-1.5">{label}</label>
      <input {...props} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300" />
    </div>
  );
}
