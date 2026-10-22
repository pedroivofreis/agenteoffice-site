import { PRECOS } from './data.js';

export const brl = (v) =>
  Number(v).toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL',
    minimumFractionDigits: Number.isInteger(Number(v)) ? 0 : 2, maximumFractionDigits: 2,
  }).replace(/ /g, ' ');

/** Preço do card conforme Mensal | Anual. `null` para o Grátis. */
export function precoDoPlano(slug, periodicidade) {
  const p = PRECOS[slug];
  if (!p) return null;
  if (periodicidade === 'anual') {
    const porMes = Math.round((p.anual / 12) * 100) / 100;
    return {
      valor: brl(porMes),
      sufixo: '/mês',
      detalhe: `${brl(p.anual)} por ano · economize ${brl(p.mensal * 12 - p.anual)}`,
      cobrado: p.anual,
    };
  }
  return { valor: brl(p.mensal), sufixo: '/mês', detalhe: 'cobrado todo mês', cobrado: p.mensal };
}
