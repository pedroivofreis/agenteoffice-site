import { useState, useEffect, useRef } from 'react';
import { CheckCheck, Sparkles } from 'lucide-react';

const SCRIPT = [
  { from: 'them', text: 'Oi! Vi vocês no Instagram 😍 queria viajar nas férias' },
  { from: 'me',   text: 'Oii! Que máximo 💙 Tô aqui pra te ajudar. Pra onde você sonha em ir?' },
  { from: 'them', text: 'Tava pensando em Maceió, mas tô aberta a ideias' },
  { from: 'me',   text: 'Amei! Maceió nessa época é perfeita 🏖️ Vão quantas pessoas e por quantas noites?' },
  { from: 'them', text: '2 adultos, uns 5 dias' },
  { from: 'me',   text: 'E vocês saem de qual cidade? Tem data certa ou é flexível?' },
  { from: 'them', text: 'Saindo de SP, primeira semana de janeiro ✈️' },
  { from: 'me',   text: 'Perfeito! 🙌 Já anotei tudinho e passei pro nosso especialista montar um roteiro lindo. Ele te chama já já 💙' },
  { from: 'sys',  text: 'Viagem criada no sistema · enviada ao especialista' },
];

const Bubble = ({ from, children }) => {
  if (from === 'sys') {
    return (
      <div className="flex justify-center my-1">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-emerald-100">
          <Sparkles size={12} /> {children}
        </div>
      </div>
    );
  }
  return (
    <div className={`flex ${from === 'me' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm animate-pop-in ${
        from === 'me' ? 'bg-[#d9fdd3] text-slate-800 rounded-br-sm' : 'bg-white text-slate-700 rounded-bl-sm'
      }`}>
        {children}
        {from === 'me' && <span className="ml-1.5 inline-flex align-bottom"><CheckCheck size={12} className="text-sky-500" /></span>}
      </div>
    </div>
  );
};

const Typing = () => (
  <div className="flex justify-end">
    <div className="bg-[#d9fdd3] rounded-2xl rounded-br-sm px-3 py-2.5 flex gap-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  </div>
);

export default function ChatAnimated() {
  const [count, setCount] = useState(0);   // mensagens visíveis
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    let alive = true;
    const step = (i) => {
      if (!alive) return;
      if (i >= SCRIPT.length) {
        // pausa e recomeça
        timer.current = setTimeout(() => { if (alive) { setCount(0); step(0); } }, 3500);
        return;
      }
      const msg = SCRIPT[i];
      const showTyping = msg.from === 'me';
      const reveal = () => {
        setTyping(false);
        setCount(i + 1);
        timer.current = setTimeout(() => step(i + 1), msg.from === 'sys' ? 1400 : 1100);
      };
      if (showTyping) {
        setTyping(true);
        timer.current = setTimeout(reveal, 850);
      } else {
        reveal();
      }
    };
    step(0);
    return () => { alive = false; clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [count, typing]);

  return (
    <div
      ref={scrollRef}
      className="h-[300px] overflow-y-auto px-3 py-4 space-y-2.5 bg-[#efe7dd] scroll-smooth"
      style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px,transparent 1px)', backgroundSize: '16px 16px' }}
    >
      {SCRIPT.slice(0, count).map((m, i) => (
        <Bubble key={i} from={m.from}>{m.text}</Bubble>
      ))}
      {typing && <Typing />}
    </div>
  );
}
