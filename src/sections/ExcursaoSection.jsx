import { Bus, QrCode, MapPin, Users, Paperclip, Armchair } from 'lucide-react';
import { Container, SectionBadge } from '../lib/ui.jsx';

const FEATURES = [
  { icon: QrCode, title: 'Embarque por QR', desc: 'Cada passageiro recebe um link próprio com QR e código curto. Você lê no celular e o embarque é registrado na hora.' },
  { icon: MapPin, title: 'Pontos de embarque', desc: 'Cadastre os pontos da ida, distribua os passageiros e acompanhe quantos já subiram em cada parada.' },
  { icon: Armchair, title: 'Assentos e veículos', desc: 'Mapa de poltronas por veículo — na hora do embarque você vê o assento de cada um.' },
  { icon: Paperclip, title: 'Documentos da viagem', desc: 'Anexos gerais e por passageiro: cada um abre o link e encontra os documentos dele.' },
];

// Passageiros do mock — o painel real agrupa por ponto e mostra o progresso
const PAX = [
  { nome: 'Ana Souza', assento: '12A', ok: true },
  { nome: 'Bruno Lima', assento: '12B', ok: true },
  { nome: 'Carla Nunes', assento: '14A', ok: true },
  { nome: 'Diego Reis', assento: '14B', ok: false },
  { nome: 'Elisa Prado', assento: '15A', ok: false },
];

export default function ExcursaoSection() {
  const embarcados = PAX.filter((p) => p.ok).length;
  const pct = Math.round((embarcados / PAX.length) * 100);

  return (
    <section id="excursoes" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <Container className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* texto */}
        <div>
          <SectionBadge tone="coral">Novo módulo</SectionBadge>
          <h2 className="mt-5 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.08] text-balance">
            Grupos e excursões,<br />do ônibus ao embarque.
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed max-w-lg">
            Acabou a lista impressa e a chamada no grito. Cada passageiro tem seu link, você lê o QR na porta do ônibus
            e todo mundo da equipe vê o embarque acontecendo ao mesmo tempo.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <span className="inline-flex w-10 h-10 rounded-xl bg-coral-50 text-coral-500 items-center justify-center mb-2"><f.icon size={18} /></span>
                <div className="font-extrabold text-ink">{f.title}</div>
                <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* painel de embarque (mock fiel ao app) */}
        <div className="min-w-0">
          <div className="rounded-2xl bg-white shadow-card border border-slate-100 overflow-hidden max-w-[420px] mx-auto">
            <div className="px-4 py-3 flex items-center justify-between" style={{ background: '#0C6B63' }}>
              <div className="min-w-0">
                <div className="text-white font-extrabold text-sm truncate">Excursão Gramado · Julho</div>
                <div className="text-white/70 text-[11px]">Perna: ida · embarque aberto</div>
              </div>
              <span className="text-[10px] font-extrabold text-[#0C6B63] bg-white px-2.5 py-1 rounded-full shrink-0">ao vivo</span>
            </div>

            <div className="px-4 py-3 border-b border-slate-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-coral-500" /> Rodoviária · 06h30</span>
                <span>{embarcados} de {PAX.length}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#0C6B63' }} />
              </div>
            </div>

            <div className="divide-y divide-slate-50">
              {PAX.map((p) => (
                <div key={p.nome} className="px-4 py-2.5 flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full grid place-content-center text-[11px] font-extrabold shrink-0 ${
                      p.ok ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-300'
                    }`}
                  >
                    {p.ok ? '✓' : '—'}
                  </span>
                  <span className={`flex-1 text-[13px] font-semibold truncate ${p.ok ? 'text-ink' : 'text-slate-400'}`}>{p.nome}</span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 rounded-md px-1.5 py-0.5 shrink-0">
                    {p.assento}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-white border border-slate-200 grid place-content-center text-ink shrink-0">
                <QrCode size={17} />
              </span>
              <div className="text-[11px] text-slate-500 leading-tight">
                Aponte para o QR do passageiro<br />
                <strong className="text-ink">ou digite o código de 6 dígitos</strong>
              </div>
            </div>
          </div>

          <p className="text-center text-[12.5px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
            <Users size={14} /> Vários operadores embarcando ao mesmo tempo, sem conflito.
          </p>
        </div>
      </Container>
    </section>
  );
}
