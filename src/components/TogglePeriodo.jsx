// Mensal | Anual (o anual vem marcado por padrão).
export default function TogglePeriodo({ valor, onChange, escuro = false }) {
  const base = 'px-4 sm:px-5 py-2 text-sm font-extrabold transition-colors';
  const on = escuro ? 'bg-white text-ink' : 'bg-ink text-white';
  const off = escuro ? 'text-white/80 hover:text-white' : 'text-slate-500 hover:text-ink';
  return (
    <div role="radiogroup" aria-label="Periodicidade"
      className={`inline-flex rounded-xl border overflow-hidden ${escuro ? 'border-white/25' : 'border-slate-200 bg-white'}`}>
      <button type="button" role="radio" aria-checked={valor === 'mensal'} onClick={() => onChange('mensal')}
        className={`${base} ${valor === 'mensal' ? on : off}`}>Mensal</button>
      <button type="button" role="radio" aria-checked={valor === 'anual'} onClick={() => onChange('anual')}
        className={`${base} ${valor === 'anual' ? on : off}`}>Anual</button>
    </div>
  );
}

