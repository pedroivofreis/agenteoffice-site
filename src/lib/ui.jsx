import { ArrowRight } from 'lucide-react';

// Container padrão
export const Container = ({ className = '', children }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

// Abertura de seção: filete + rótulo. Sem pílula e sem ícone — a pílula
// com ícone em caixa alta dá cara de template genérico.
export const SectionBadge = ({ children, tone = 'brand' }) => {
  const tones = {
    brand: { rule: 'bg-brand-400', text: 'text-brand-600' },
    coral: { rule: 'bg-coral-500', text: 'text-coral-600' },
    sun:   { rule: 'bg-sun-500',   text: 'text-amber-600' },
  };
  const t = tones[tone] || tones.brand;
  return (
    <span className="inline-flex items-center gap-3">
      <span className={`h-px w-8 ${t.rule}`} />
      <span className={`text-[12px] font-bold ${t.text}`}>{children}</span>
    </span>
  );
};

// Botão primário (coral) e variações
export const Button = ({ as = 'button', variant = 'primary', size = 'md', className = '', children, icon = true, ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-extrabold rounded-2xl transition-all active:scale-[0.98] whitespace-nowrap';
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-[15px]', lg: 'px-8 py-4 text-base sm:text-lg' };
  const variants = {
    primary: 'bg-coral-500 hover:bg-coral-600 text-white shadow-glow ring-1 ring-white/40',
    dark: 'bg-ink hover:bg-brand-800 text-white shadow-soft',
    ghost: 'bg-white hover:bg-sand-50 text-ink border border-slate-200 shadow-soft',
    softteal: 'bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200',
  };
  const Comp = as;
  return (
    <Comp className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon && variant === 'primary' && <ArrowRight size={18} className="shrink-0" />}
    </Comp>
  );
};

// Título de seção centralizado
export const SectionHeading = ({ eyebrow, title, subtitle, align = 'center', light = false }) => (
  <div className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${align === 'center' ? '' : ''}`}>
    {eyebrow}
    <h2 className={`mt-5 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.08] ${light ? 'text-white' : 'text-ink'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/80' : 'text-slate-500'}`}>{subtitle}</p>
    )}
  </div>
);
