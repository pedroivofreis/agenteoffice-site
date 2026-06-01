import Nav from './components/Nav.jsx';
import Hero from './sections/Hero.jsx';
import LogosStrip from './sections/LogosStrip.jsx';
import AgenteSection from './sections/AgenteSection.jsx';
import SistemaSection from './sections/SistemaSection.jsx';
import TurboSection from './sections/TurboSection.jsx';
import SolicitarSection from './sections/SolicitarSection.jsx';
import { Container } from './lib/ui.jsx';

const scrollTo = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-100 selection:text-ink">
      <Nav />
      <Hero onAgente={scrollTo('agente')} onSistema={scrollTo('sistema')} />
      <LogosStrip />
      <AgenteSection />
      <SistemaSection />
      <TurboSection />
      <SolicitarSection />

      <footer className="bg-brand-900 text-white/70 py-10 text-center text-sm">
        <Container>© {new Date().getFullYear()} AgenteOffice — feito para agências de viagem.</Container>
      </footer>
    </div>
  );
}
