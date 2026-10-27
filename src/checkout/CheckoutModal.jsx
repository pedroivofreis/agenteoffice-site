import { useEffect, useRef, useState } from 'react';
import { X, Check, Loader2, ExternalLink, ArrowRight } from 'lucide-react';
import { PLANS, NOTA_MIGRACAO, LINHA_CREDIBILIDADE } from '../lib/data.js';
import { precoDoPlano } from '../lib/precos.js';
import TogglePeriodo from '../components/TogglePeriodo.jsx';
import { assinarPlano, urlEntrarNoApp } from './api.js';

export const INPUT = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink placeholder-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20';

export function maskPhoneBR(raw) {
  const d = String(raw || '').replace(/\D/g, '').slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return `(${d}`;
  const r = d.slice(2);
  if (r.length <= 4) return `(${d.slice(0, 2)}) ${r}`;
  const c = r.length - 4;
  return `(${d.slice(0, 2)}) ${r.slice(0, c)}-${r.slice(c)}`;
}

function maskCpfCnpj(raw) {
  const d = String(raw || '').replace(/\D/g, '').slice(0, 14);
  if (d.length <= 11) {
    return d.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return d.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2');
}

const usuarioDoEmail = (email) =>
  String(email || '').split('@')[0].toLowerCase().normalize('NFKD').replace(/[^a-z0-9._-]/g, '').slice(0, 24);

export function Campo({ label, dica, children }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-bold text-ink mb-1.5">{label}</span>
      {children}
      {dica && <span className="block text-[12px] text-slate-400 mt-1">{dica}</span>}
    </label>
  );
}

// Checkout simples: um formulário só. Ao confirmar, abre a fatura do Asaas numa aba nova
// e entra no app já logado — a conta funciona antes de o pagamento compensar.
export default function CheckoutModal({ planoSlug, periodicidadeInicial = 'anual', onFechar }) {
  const plano = PLANS.find((p) => p.slug === planoSlug);
  const [periodicidade, setPeriodicidade] = useState(periodicidadeInicial);
  const [form, setForm] = useState({
    agencia_nome: '', admin_nome: '', agencia_email: '', agencia_telefone: '', agencia_cnpj: '',
    admin_username: '', admin_senha: '', coupon: '',
  });
  const [usuarioMexido, setUsuarioMexido] = useState(false);
  const [mostrarCupom, setMostrarCupom] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [pronto, setPronto] = useState(null); // { fatura, app }
  const primeiro = useRef(null);

  useEffect(() => {
    primeiro.current?.focus();
    const esc = (e) => e.key === 'Escape' && onFechar();
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onFechar]);

  if (!plano) return null;
  const preco = precoDoPlano(plano.slug, periodicidade);
  const set = (k) => (e) => {
    let v = e.target.value;
    if (k === 'agencia_telefone') v = maskPhoneBR(v);
    if (k === 'agencia_cnpj') v = maskCpfCnpj(v);
    if (k === 'admin_username') { v = v.toLowerCase().replace(/\s/g, ''); setUsuarioMexido(true); }
    if (k === 'coupon') v = v.toUpperCase();
    setForm((f) => {
      const novo = { ...f, [k]: v };
      if (k === 'agencia_email' && !usuarioMexido) novo.admin_username = usuarioDoEmail(v);
      return novo;
    });
  };

  async function enviar(e) {
    e.preventDefault();
    setErro('');
    const doc = form.agencia_cnpj.replace(/\D/g, '');
    if (doc.length !== 11 && doc.length !== 14) { setErro('Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) — vai na nota fiscal.'); return; }
    if (form.admin_senha.length < 6) { setErro('A senha precisa ter pelo menos 6 caracteres.'); return; }

    // A aba da fatura abre JÁ no clique: depois do await o navegador bloquearia o pop-up.
    let aba = null;
    try { aba = window.open('', '_blank'); } catch { aba = null; }
    setEnviando(true);
    try {
      const r = await assinarPlano({
        plano_slug: plano.slug,
        periodicidade,
        agencia_nome: form.agencia_nome.trim(),
        agencia_email: form.agencia_email.trim(),
        agencia_telefone: form.agencia_telefone.trim(),
        agencia_cnpj: form.agencia_cnpj.trim(),
        admin_nome: form.admin_nome.trim(),
        admin_username: form.admin_username.trim(),
        admin_senha: form.admin_senha,
        ...(form.coupon.trim() && { coupon: form.coupon.trim() }),
      });
      const fatura = r.invoice_url || r.checkout_url || '';
      const app = r.access_token ? urlEntrarNoApp(r) : '';
      if (fatura && aba && !aba.closed) aba.location.href = fatura;
      else aba?.close?.();
      if (app && fatura && aba && !aba.closed) {
        window.location.href = app; // fatura na aba nova, o app nesta
        return;
      }
      setPronto({ fatura, app }); // pop-up bloqueado: dois botões
    } catch (err) {
      aba?.close?.();
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="checkout-titulo">
      <div className="absolute inset-0 bg-ink/60" onClick={onFechar} />
      <div className="relative w-full sm:max-w-4xl max-h-[100dvh] sm:max-h-[92vh] overflow-y-auto bg-white sm:rounded-2xl shadow-card grid md:grid-cols-[1fr_1.15fr]">
        <button type="button" onClick={onFechar} aria-label="Fechar"
          className="absolute top-3 right-3 z-10 w-9 h-9 grid place-content-center rounded-lg text-slate-500 hover:bg-slate-100 md:text-white md:hover:bg-white/10">
          <X size={18} />
        </button>

        {/* O que vem no plano */}
        <aside className="bg-ink text-white p-6 sm:p-8">
          <div className="text-[12px] font-extrabold uppercase tracking-wide text-brand-300">Plano {plano.name}</div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-display font-extrabold text-4xl">{preco.valor}</span>
            <span className="text-white/70 text-sm">{preco.sufixo}</span>
          </div>
          <div className="mt-1 text-[13px] text-brand-200">{preco.detalhe}</div>
          <div className="mt-5"><TogglePeriodo valor={periodicidade} onChange={setPeriodicidade} escuro /></div>
          {plano.destaqueLinha && (
            <div className="mt-6 border-l-2 border-coral-500 pl-3 text-[14px] font-bold">{plano.destaqueLinha}</div>
          )}
          <ul className="mt-5 space-y-2.5">
            {plano.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-white/90">
                <Check size={17} strokeWidth={2.75} className="text-brand-300 shrink-0 mt-0.5" /> <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12px] text-white/60">{LINHA_CREDIBILIDADE.join(' · ')}</p>
          <p className="mt-1 text-[12px] text-white/45">{NOTA_MIGRACAO}</p>
        </aside>

        {/* Formulário */}
        <div className="p-6 sm:p-8">
          {pronto ? (
            <div className="h-full flex flex-col justify-center">
              <h2 id="checkout-titulo" className="font-display font-extrabold text-2xl text-ink">Sua conta está pronta.</h2>
              <p className="mt-2 text-slate-500">
                Você já pode usar o AgenteOffice. Pague a fatura por Pix, boleto ou cartão: quando o pagamento confirmar, o plano {plano.name} entra sozinho.
              </p>
              {pronto.fatura && (
                <a href={pronto.fatura} target="_blank" rel="noopener"
                  className="mt-6 inline-flex items-center justify-center gap-2 border-2 border-ink text-ink font-extrabold py-3.5 rounded-xl hover:bg-ink hover:text-white transition-colors">
                  Abrir a fatura <ExternalLink size={17} />
                </a>
              )}
              {pronto.app && (
                <a href={pronto.app}
                  className="mt-3 inline-flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-extrabold py-3.5 rounded-xl transition-colors">
                  Entrar no AgenteOffice <ArrowRight size={17} />
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={enviar} className="space-y-4">
              <div>
                <h2 id="checkout-titulo" className="font-display font-extrabold text-2xl text-ink pr-10">Assinar o {plano.name}</h2>
                <p className="mt-1 text-[14px] text-slate-500">Você entra no sistema assim que confirmar. Sem esperar o pagamento.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Campo label="Nome da agência">
                  <input ref={primeiro} required value={form.agencia_nome} onChange={set('agencia_nome')} placeholder="Ex.: Sonhos Viagens" className={INPUT} />
                </Campo>
                <Campo label="Seu nome">
                  <input required value={form.admin_nome} onChange={set('admin_nome')} placeholder="Ex.: Rafaela Moura" className={INPUT} />
                </Campo>
                <Campo label="E-mail">
                  <input required type="email" value={form.agencia_email} onChange={set('agencia_email')} placeholder="voce@suaagencia.com.br" className={INPUT} />
                </Campo>
                <Campo label="WhatsApp">
                  <input required inputMode="numeric" value={form.agencia_telefone} onChange={set('agencia_telefone')} placeholder="(11) 98765-4321" className={INPUT} />
                </Campo>
              </div>
              <Campo label="CPF ou CNPJ" dica="Para a nota fiscal e a cobrança no Asaas.">
                <input required inputMode="numeric" value={form.agencia_cnpj} onChange={set('agencia_cnpj')} placeholder="000.000.000-00 ou 00.000.000/0001-00" className={INPUT} />
              </Campo>
              <div className="grid sm:grid-cols-2 gap-4">
                <Campo label="Usuário para entrar">
                  <input required value={form.admin_username} onChange={set('admin_username')} placeholder="rafaela" autoComplete="username" className={INPUT} />
                </Campo>
                <Campo label="Senha">
                  <input required type="password" value={form.admin_senha} onChange={set('admin_senha')} placeholder="Mínimo 6 caracteres" autoComplete="new-password" className={INPUT} />
                </Campo>
              </div>
              {mostrarCupom ? (
                <Campo label="Cupom de desconto">
                  <input value={form.coupon} onChange={set('coupon')} placeholder="CODIGO" className={`${INPUT} font-mono tracking-widest`} />
                </Campo>
              ) : (
                <button type="button" onClick={() => setMostrarCupom(true)} className="text-[13px] font-bold text-brand-600 hover:text-ink">Tenho um cupom</button>
              )}

              {erro && <p className="text-[13px] font-semibold text-red-600 bg-red-50 rounded-lg px-3 py-2">{erro}</p>}

              <button type="submit" disabled={enviando}
                className="w-full inline-flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 disabled:opacity-70 text-white font-extrabold text-[15px] py-4 rounded-xl transition-colors">
                {enviando ? <><Loader2 size={18} className="animate-spin" /> Criando sua conta…</> : <>Criar conta e abrir a fatura</>}
              </button>
              <p className="text-center text-[12px] text-slate-400">
                {periodicidade === 'anual' ? `${preco.detalhe.split(' · ')[0]}, cobrado uma vez.` : 'Cobrado todo mês. Cancele quando quiser.'} A fatura abre numa aba nova.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
