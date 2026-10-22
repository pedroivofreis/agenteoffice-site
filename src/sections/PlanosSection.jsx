import { useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { Container, SectionBadge, comecarTeste } from '../lib/ui.jsx';
import { PLANS, COMPARATIVO, LINHA_CREDIBILIDADE, NOTA_MIGRACAO, NOTA_CONTRATO, USE_PLAN_CHECKOUT_MODAL } from '../lib/data.js';
import { precoDoPlano } from '../lib/precos.js';
import CheckoutModal from '../checkout/CheckoutModal.jsx';
import TogglePeriodo from '../components/TogglePeriodo.jsx';

const NOMES = PLANS.map((p) => p.name);

function Celula({ v }) {
  if (v === true) return <Check size={18} strokeWidth={2.75} className="text-brand-500 mx-auto" aria-label="Incluso" />;
  if (v === false) return <Minus size={16} className="text-slate-300 mx-auto" aria-label="Não incluso" />;
  return <span className="text-[13px] font-semibold text-ink">{v}</span>;
}

function CardPlano({ plano, periodicidade, onAssinar }) {
  const preco = precoDoPlano(plano.slug, periodicidade);
  const destaque = !!plano.highlight;
  return (
    <article className={`relative flex flex-col rounded-2xl bg-white p-6 sm:p-7 ${destaque ? 'border-2 border-ink shadow-card' : 'border border-slate-200'}`}>
      {plano.badge && (
        <span className="absolute -top-3 left-6 bg-ink text-white text-[11px] font-extrabold px-3 py-1 rounded-md">{plano.badge}</span>
      )}
      <div className="font-display font-extrabold text-xl text-ink">{plano.name}</div>
      <p className="mt-1 text-sm text-slate-500">{plano.desc}</p>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display font-extrabold text-4xl text-ink tracking-tight">{preco ? preco.valor : 'R$ 0'}</span>
        <span className="text-sm text-slate-500">{preco ? preco.sufixo : 'para sempre'}</span>
      </div>
      <div className="mt-1 h-5 text-[13px] font-semibold text-brand-600">
        {preco ? preco.detalhe : 'Sem cartão de crédito'}
      </div>

      {plano.destaqueLinha && (
        <div className="mt-4 border-l-2 border-coral-500 pl-3 text-[13.5px] font-bold text-ink">{plano.destaqueLinha}</div>
      )}

      <ul className="mt-5 space-y-2.5 flex-1">
        {plano.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-slate-700">
            <Check size={17} strokeWidth={2.75} className="text-brand-500 shrink-0 mt-0.5" /> <span>{f}</span>
          </li>
        ))}
      </ul>

      <button type="button" onClick={onAssinar}
        className={`mt-7 w-full py-3.5 rounded-xl text-[15px] font-extrabold transition-colors ${
          plano.slug === 'gratis'
            ? 'bg-coral-500 hover:bg-coral-600 text-white'
            : destaque ? 'bg-ink hover:bg-brand-800 text-white' : 'border-2 border-ink text-ink hover:bg-ink hover:text-white'
        }`}>
        {plano.cta}
      </button>
    </article>
  );
}

function Comparativo() {
  const [planoCel, setPlanoCel] = useState(2); // no celular: um plano por vez (Escala aberto)
  return (
    <div className="mt-20">
      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-ink text-center">Tudo o que vem no AgenteOffice</h3>
      <p className="mt-2 text-center text-slate-500">Plano por plano, sem letra miúda.</p>

      {/* Celular: escolhe o plano e vê a lista */}
      <div className="md:hidden mt-8">
        <div role="tablist" aria-label="Plano" className="sticky top-[68px] z-10 grid grid-cols-3 rounded-xl border border-slate-200 bg-white overflow-hidden">
          {NOMES.map((n, i) => (
            <button key={n} type="button" role="tab" aria-selected={planoCel === i} onClick={() => setPlanoCel(i)}
              className={`py-2.5 text-sm font-extrabold ${planoCel === i ? 'bg-ink text-white' : 'text-slate-500'}`}>{n}</button>
          ))}
        </div>
        {COMPARATIVO.map((g) => (
          <div key={g.grupo} className="mt-6">
            <div className="text-[12px] font-extrabold uppercase tracking-wide text-brand-600">{g.grupo}</div>
            <ul className="mt-2 divide-y divide-slate-100 border-y border-slate-100">
              {g.itens.map(([item, cols]) => (
                <li key={item} className="flex items-start justify-between gap-4 py-3">
                  <span className={`text-[14px] leading-snug ${cols[planoCel] === false ? 'text-slate-400' : 'text-slate-700'}`}>{item}</span>
                  <span className="shrink-0 min-w-[24px] text-right"><Celula v={cols[planoCel]} /></span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Desktop: tabela com o cabeçalho dos planos grudado no topo */}
      <div className="hidden md:block mt-10">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th className="sticky top-[64px] z-10 bg-white py-4 pr-4 border-b-2 border-ink w-[46%]">
                <span className="sr-only">Recurso</span>
              </th>
              {NOMES.map((n) => (
                <th key={n} className="sticky top-[64px] z-10 bg-white py-4 border-b-2 border-ink text-center font-display font-extrabold text-lg text-ink">{n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARATIVO.map((g) => [
              <tr key={g.grupo}>
                <th colSpan={4} className="pt-8 pb-2 text-[12px] font-extrabold uppercase tracking-wide text-brand-600 border-b border-slate-200">{g.grupo}</th>
              </tr>,
              ...g.itens.map(([item, cols]) => (
                <tr key={item} className="hover:bg-sand-50">
                  <td className="py-3.5 pr-6 text-[14.5px] text-slate-700 border-b border-slate-100">{item}</td>
                  {cols.map((c, i) => (
                    <td key={i} className="py-3.5 px-2 text-center border-b border-slate-100"><Celula v={c} /></td>
                  ))}
                </tr>
              )),
            ])}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-1 text-[12.5px] text-slate-500">
        <p>{NOTA_MIGRACAO}</p>
        <p>{NOTA_CONTRATO}</p>
      </div>
    </div>
  );
}

export default function PlanosSection() {
  const [periodicidade, setPeriodicidade] = useState('anual');
  const [checkout, setCheckout] = useState(null); // slug do plano pago

  function assinar(plano) {
    if (plano.slug === 'gratis') { comecarTeste(); return; }
    if (USE_PLAN_CHECKOUT_MODAL) setCheckout(plano.slug);
  }

  return (
    <section id="precos" className="relative py-20 sm:py-28 bg-sand-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <SectionBadge>Planos</SectionBadge>
          <h2 className="mt-5 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.08] text-balance">
            Comece grátis. Assine quando a agência pedir.
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            Embarque a partir de R$ 99/mês e Escala a partir de R$ 199/mês, no plano anual.
          </p>
          <div className="mt-8">
            <TogglePeriodo valor={periodicidade} onChange={setPeriodicidade} />
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 items-stretch">
          {PLANS.map((p) => (
            <CardPlano key={p.slug} plano={p} periodicidade={periodicidade} onAssinar={() => assinar(p)} />
          ))}
        </div>

        <p className="mt-8 text-center text-[13.5px] font-semibold text-slate-600">
          {LINHA_CREDIBILIDADE.join(' · ')}
        </p>

        <Comparativo />
      </Container>

      {checkout && (
        <CheckoutModal
          planoSlug={checkout}
          periodicidadeInicial={periodicidade}
          onFechar={() => setCheckout(null)}
        />
      )}
    </section>
  );
}
