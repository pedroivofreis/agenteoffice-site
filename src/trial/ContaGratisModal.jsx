import { useEffect, useRef, useState } from 'react';
import { X, Loader2, ArrowRight } from 'lucide-react';
import { INPUT, Campo, maskPhoneBR } from '../checkout/CheckoutModal.jsx';
import { NOTA_TESTE } from '../lib/ui.jsx';
import { criarContaGratis, urlDoApp } from './api.js';

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.agenteoffice.com.br';
// A conta nasce sem viagem: a pessoa já cai na "Nova viagem" do app.
const DESTINO_NO_APP = '/app/pipeline?novo=completo';

// "Comece agora, grátis": e-mail, agência e senha (WhatsApp se quiser) e a pessoa
// já entra no sistema. O resto da agência (logo, CNPJ…) ela completa lá dentro.
export default function ContaGratisModal({ onFechar }) {
  const [form, setForm] = useState({ email: '', agencia: '', senha: '', whatsapp: '' });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [jaTemConta, setJaTemConta] = useState(false);
  const primeiro = useRef(null);

  useEffect(() => {
    primeiro.current?.focus();
    const esc = (e) => e.key === 'Escape' && onFechar();
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onFechar]);

  const set = (k) => (e) => {
    const v = k === 'whatsapp' ? maskPhoneBR(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
  };

  async function criar(e) {
    e.preventDefault();
    setErro('');
    setJaTemConta(false);
    if (form.senha.length < 6) { setErro('A senha precisa ter pelo menos 6 caracteres.'); return; }
    if (form.whatsapp.replace(/\D/g, '').length < 10) { setErro('Informe o WhatsApp com DDD.'); return; }
    setEnviando(true);
    try {
      const conta = await criarContaGratis({
        email: form.email.trim(),
        agencia: form.agencia.trim(),
        senha: form.senha,
        whatsapp: form.whatsapp.trim(),
      });
      window.location.href = urlDoApp(conta, DESTINO_NO_APP);
    } catch (err) {
      if (err.status === 409) setJaTemConta(true);
      else setErro(err.message);
      setEnviando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="conta-gratis-titulo">
      <div className="absolute inset-0 bg-ink/60" onClick={onFechar} />
      <div className="relative w-full sm:max-w-md max-h-[100dvh] sm:max-h-[92vh] overflow-y-auto bg-white sm:rounded-2xl shadow-card p-6 sm:p-8">
        <button type="button" onClick={onFechar} aria-label="Fechar"
          className="absolute top-3 right-3 w-9 h-9 grid place-content-center rounded-lg text-slate-500 hover:bg-slate-100">
          <X size={18} />
        </button>

        <form onSubmit={criar} className="space-y-4">
          <div>
            <h2 id="conta-gratis-titulo" className="font-display font-extrabold text-2xl text-ink pr-10">Crie sua conta grátis</h2>
            <p className="mt-1 text-[14px] text-slate-500">Leva meio minuto. Você já entra no AgenteOffice e monta a sua primeira viagem.</p>
          </div>
          <Campo label="Seu e-mail">
            <input ref={primeiro} required type="email" autoComplete="email" value={form.email} onChange={set('email')}
              placeholder="voce@suaagencia.com.br" className={INPUT} />
          </Campo>
          <Campo label="Nome da agência">
            <input required autoComplete="organization" value={form.agencia} onChange={set('agencia')}
              placeholder="Ex.: Sonhos Viagens" className={INPUT} />
          </Campo>
          <Campo label="Crie uma senha" dica="Mínimo 6 caracteres. Você entra com o e-mail e esta senha.">
            <input required type="password" autoComplete="new-password" minLength={6} value={form.senha} onChange={set('senha')}
              placeholder="••••••" className={INPUT} />
          </Campo>
          <Campo label="WhatsApp">
            <input required inputMode="numeric" autoComplete="tel" value={form.whatsapp} onChange={set('whatsapp')}
              placeholder="(11) 98765-4321" className={INPUT} />
          </Campo>

          {erro && <p className="text-[13px] font-semibold text-red-600 bg-red-50 rounded-lg px-3 py-2">{erro}</p>}
          {jaTemConta && (
            <p className="text-[13px] text-ink bg-brand-50 rounded-lg px-3 py-2" data-testid="ja-tem-conta">
              Já existe uma conta com esse e-mail.{' '}
              <a href={`${APP_URL}/app/login`} className="font-bold underline underline-offset-2">Entrar no AgenteOffice</a>
            </p>
          )}

          <button type="submit" disabled={enviando}
            className="w-full inline-flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 disabled:opacity-70 text-white font-extrabold text-[15px] py-4 rounded-xl transition-colors">
            {enviando ? <><Loader2 size={18} className="animate-spin" /> Criando sua conta…</> : <>Criar conta e entrar <ArrowRight size={18} /></>}
          </button>
          <p className="text-center text-[12px] text-slate-400">{NOTA_TESTE.replace(/^\*/, '')}</p>
          <p className="text-center text-[13px] text-slate-500">
            Já tem conta? <a href={`${APP_URL}/app/login`} className="font-bold text-brand-600 hover:text-ink">Entrar</a>
          </p>
        </form>
      </div>
    </div>
  );
}
