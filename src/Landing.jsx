import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import TrialHero from './sections/TrialHero.jsx';
import LogosStrip from './sections/LogosStrip.jsx';
import SistemaSection from './sections/SistemaSection.jsx';
import TurboSection from './sections/TurboSection.jsx';
import ExcursaoSection from './sections/ExcursaoSection.jsx';
import SolicitarSection from './sections/SolicitarSection.jsx';
import PlanosSection from './sections/PlanosSection.jsx';
import MetraFooter from './sections/MetraFooter.jsx';
import TrialFlow from './trial/TrialFlow.jsx';
import ContaGratisModal from './trial/ContaGratisModal.jsx';
import { Container, EVENTO_COMECAR } from './lib/ui.jsx';

export default function App() {
  // Trial "monte a viagem": disparado pelo hero, roda como overlay por cima do site
  const [trial, setTrial] = useState(null); // null | { tipo: 'texto'|'arquivo', valor }
  // "Comece agora, grátis" (menu, planos, rodapé): cadastro curto e já entra no app
  const [contaGratis, setContaGratis] = useState(false);

  useEffect(() => {
    const abrir = () => setContaGratis(true);
    window.addEventListener(EVENTO_COMECAR, abrir);
    return () => window.removeEventListener(EVENTO_COMECAR, abrir);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-100 selection:text-ink">
      <Nav />
      <TrialHero
        onGerar={(texto) => setTrial({ tipo: 'texto', valor: texto })}
        onArquivo={(file) => setTrial({ tipo: 'arquivo', valor: file })}
      />
      <LogosStrip />
      <TurboSection />
      <SistemaSection />
      <ExcursaoSection />
      <PlanosSection />
      <SolicitarSection />

      <MetraFooter />

      {trial && (
        <TrialFlow
          key={typeof trial.valor === 'string' ? trial.valor : `${trial.valor.name}-${trial.valor.lastModified}`}
          inicio={trial}
          onFechar={() => setTrial(null)}
        />
      )}
      {contaGratis && <ContaGratisModal onFechar={() => setContaGratis(false)} />}
    </div>
  );
}
