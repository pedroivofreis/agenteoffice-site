import { useState } from 'react';
import Nav from './components/Nav.jsx';
import TrialHero from './sections/TrialHero.jsx';
import LogosStrip from './sections/LogosStrip.jsx';
import AgenteSection from './sections/AgenteSection.jsx';
import SistemaSection from './sections/SistemaSection.jsx';
import TurboSection from './sections/TurboSection.jsx';
import ExcursaoSection from './sections/ExcursaoSection.jsx';
import SolicitarSection from './sections/SolicitarSection.jsx';
import TrialFlow from './trial/TrialFlow.jsx';
import { Container } from './lib/ui.jsx';

export default function App() {
  // Trial "monte a viagem": disparado pelo hero, roda como overlay por cima do site
  const [trial, setTrial] = useState(null); // null | { tipo: 'texto'|'arquivo', valor }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-100 selection:text-ink">
      <Nav />
      <TrialHero
        onGerar={(texto) => setTrial({ tipo: 'texto', valor: texto })}
        onArquivo={(file) => setTrial({ tipo: 'arquivo', valor: file.name })}
      />
      <LogosStrip />
      <AgenteSection />
      <SistemaSection />
      <TurboSection />
      <ExcursaoSection />
      <SolicitarSection />

      <footer className="bg-brand-900 text-white/70 py-10 text-center text-sm">
        <Container>© {new Date().getFullYear()} AgenteOffice — feito para agências de viagem.</Container>
      </footer>

      {trial && <TrialFlow key={trial.valor} inicio={trial} onFechar={() => setTrial(null)} />}
    </div>
  );
}
