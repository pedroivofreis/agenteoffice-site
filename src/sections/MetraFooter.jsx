import { ArrowRight, Compass, Landmark } from 'lucide-react';
import { Container } from '../lib/ui.jsx';

/**
 * Quem faz: a Metra e os produtos da casa. Mesmo bloco do site do Agente Bank,
 * para as duas marcas se apresentarem como irmãs.
 */
const PRODUTOS = [
  { n: 'AgenteOffice', d: 'O sistema operacional da agência de viagem: CRM, propostas, financeiro e a Mar.ia.', url: '/', icon: Compass, atual: true },
  { n: 'Agente Bank', d: 'A conta da agência de viagens, com o Agente Pay: link de pagamento com split e cartão para o fornecedor.', url: 'https://app-agentepay.agenteoffice.com.br', icon: Landmark },
];

export default function MetraFooter() {
  return (
    <footer className="bg-brand-900 text-white">
      <Container className="pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <a href="https://somosmetra.com.br" target="_blank" rel="noopener" aria-label="Metra"
               className="inline-flex items-end gap-1 font-bold text-[34px] tracking-[-0.04em] leading-none">
              metra<span className="w-2.5 h-2.5 rounded-full bg-[#2ead5e] mb-1" />
            </a>
            <p className="text-white/60 text-[14px] mt-4 max-w-[38ch]">
              O AgenteOffice é um produto da Metra, a software house por trás do Agente Bank. Mesmo time, mesma stack,
              mesma obsessão pela rotina de quem vende viagem.
            </p>
            <a href="https://somosmetra.com.br" target="_blank" rel="noopener"
               className="inline-flex items-center gap-1.5 mt-5 text-[13.5px] font-semibold text-brand-300 hover:text-white">
              somosmetra.com.br <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="lg:col-span-8">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">Produtos Metra</div>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {PRODUTOS.map((pr) => {
                const Icon = pr.icon;
                return (
                  <a key={pr.n} href={pr.url} target={pr.atual ? undefined : '_blank'} rel="noopener"
                     className={`rounded-xl border p-4 flex items-start gap-3 transition-colors ${pr.atual ? 'border-brand-300/40 bg-brand-400/20' : 'border-white/10 bg-white/[.04] hover:bg-white/[.08]'}`}>
                    <span className={`w-10 h-10 rounded-lg grid place-items-center shrink-0 ${pr.atual ? 'bg-brand-300 text-ink' : 'bg-white/10 text-white'}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="font-bold text-[15px]">{pr.n}</span>
                        {pr.atual && <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-brand-300">você está aqui</span>}
                      </span>
                      <span className="block text-[12.5px] text-white/60 mt-0.5">{pr.d}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 text-[12.5px] text-white/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} AgenteOffice — feito para agências de viagem.</span>
          <span>Uma empresa Metra.</span>
        </div>
      </Container>
    </footer>
  );
}
