import { Container } from '../lib/ui.jsx';

const LOGOS = [
  { src: '/agencias/clau.png', alt: 'Clau a Viajante' },
  { src: '/agencias/citytours.png', alt: 'City Tours Brazil' },
  { src: '/agencias/flavia.png', alt: 'Flávia Prado Turismo' },
];

export default function LogosStrip() {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-slate-100">
      <Container>
        <p className="text-center text-xs font-extrabold uppercase tracking-[0.2em] text-slate-400">
          Agências que já vendem com o AgenteOffice
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10 sm:gap-16">
          {LOGOS.map((l) => (
            <img
              key={l.src}
              src={l.src}
              alt={l.alt}
              className="h-14 sm:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
