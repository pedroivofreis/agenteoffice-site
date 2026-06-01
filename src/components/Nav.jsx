import { useState, useEffect } from 'react';
import { Menu, X, LogIn, ChevronDown } from 'lucide-react';
import { Container } from '../lib/ui.jsx';
import { PRODUCT_NAV, APP_URL, WHATSAPP_ESPECIALISTA_HREF } from '../lib/data.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const onDark = !scrolled; // topo sobre a foto escura do hero
  const link = `text-sm font-bold transition-colors ${onDark ? 'text-white/90 hover:text-white' : 'text-ink hover:text-brand-400'}`;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-soft py-3' : 'bg-transparent py-5'}`}>
      <Container className="flex items-center justify-between">
        <a href="#top" className="flex items-center">
          <img src={onDark ? '/logo_hor_white.png' : '/logo_hor_col.png'} alt="AgenteOffice" className="h-9 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <div className="relative" onMouseEnter={() => setProdOpen(true)} onMouseLeave={() => setProdOpen(false)}>
            <button className={`flex items-center gap-1 ${link}`}>
              Produto <ChevronDown size={15} className={`transition-transform ${prodOpen ? 'rotate-180' : ''}`} />
            </button>
            {prodOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                <div className="w-72 bg-white rounded-2xl shadow-card border border-slate-100 p-2 animate-pop-in">
                  {PRODUCT_NAV.map((p) => (
                    <a key={p.id} href={`#${p.id}`} className="block px-3 py-2.5 rounded-xl hover:bg-sand-50 transition-colors">
                      <div className="text-sm font-extrabold text-ink">{p.label}</div>
                      <div className="text-xs text-slate-500">{p.desc}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="#precos" className={link}>Preços</a>
          <div className={`w-px h-4 ${onDark ? 'bg-white/30' : 'bg-slate-200'}`} />
          <a href={APP_URL} className={`flex items-center gap-1.5 ${link}`}>
            <LogIn size={15} /> Já sou cliente
          </a>
          <a href={WHATSAPP_ESPECIALISTA_HREF} target="_blank" rel="noopener" className="bg-coral-500 hover:bg-coral-600 text-white px-5 py-2.5 rounded-xl text-sm font-extrabold shadow-glow ring-1 ring-white/40 transition-all active:scale-95">
            Falar com a gente
          </a>
        </div>

        <button className={`md:hidden p-2 ${onDark ? 'text-white' : 'text-ink'}`} onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-5 py-5 flex flex-col gap-3 shadow-soft">
          {PRODUCT_NAV.map((p) => (
            <a key={p.id} href={`#${p.id}`} onClick={() => setMenuOpen(false)} className="text-sm font-bold text-ink">{p.label}</a>
          ))}
          <a href="#precos" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-ink">Preços</a>
          <a href={APP_URL} className="text-sm font-bold text-ink">Já sou cliente</a>
          <a href={WHATSAPP_ESPECIALISTA_HREF} target="_blank" rel="noopener" onClick={() => setMenuOpen(false)} className="bg-coral-500 text-white text-center py-3.5 rounded-xl text-sm font-extrabold w-full shadow-glow">
            Falar com a gente
          </a>
        </div>
      )}
    </nav>
  );
}
