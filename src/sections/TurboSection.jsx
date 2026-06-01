import { useState } from 'react';
import { Send, CheckCheck } from 'lucide-react';

// Proposta showcase — portada do site antigo (com imagens nos cards), tema escuro.
export default function TurboSection() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [photo2Idx, setPhoto2Idx] = useState(0);

  const PHOTOS1 = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&fit=crop',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&fit=crop',
  ];
  const PHOTOS2 = [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&fit=crop',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&fit=crop',
  ];

  const Ticket = ({ orig, origCity, dest, destCity, dep, arr, flight, direct }) => (
    <div className="flex items-center gap-3 bg-gradient-to-r from-[#042F2E] to-[#0F766E] rounded-xl p-3.5 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='13' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")` }} />
      <div className="text-center relative z-10 w-14">
        <div className="text-xl font-black tracking-tight">{orig}</div>
        <div className="text-[8px] text-white/50 font-bold">{origCity}</div>
        <div className="text-[10px] font-bold text-white/80 mt-0.5">{dep}</div>
      </div>
      <div className="flex-1 relative z-10 flex flex-col items-center gap-0.5">
        <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{direct ? 'Voo direto' : 'Com escala'}</div>
        <div className="w-full flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full border-2 border-white/50" />
          <div className="flex-1 h-px bg-white/25" />
          <span className="text-xs">✈</span>
          <div className="flex-1 h-px bg-white/25" />
          <div className="w-1.5 h-1.5 rounded-full border-2 border-white/50" />
        </div>
        <div className="text-[8px] font-bold text-white/40">{flight}</div>
      </div>
      <div className="text-center relative z-10 w-14">
        <div className="text-xl font-black tracking-tight">{dest}</div>
        <div className="text-[8px] text-white/50 font-bold">{destCity}</div>
        <div className="text-[10px] font-bold text-white/80 mt-0.5">{arr}</div>
      </div>
    </div>
  );

  const HotelCard = ({ photos, idx, setIdx, name, location, stars, regime, checkin, checkout, nights, price, desc }) => (
    <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
      <div className="relative h-32">
        <img src={photos[idx]} alt={name} className="w-full h-full object-cover transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <button onClick={() => setIdx((i) => (i - 1 + photos.length) % photos.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center backdrop-blur-sm">‹</button>
        <button onClick={() => setIdx((i) => (i + 1) % photos.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center backdrop-blur-sm">›</button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {photos.map((_, i) => <div key={i} className={`w-1 h-1 rounded-full transition-all ${i === idx ? 'bg-white' : 'bg-white/35'}`} />)}
        </div>
        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] text-white font-bold">{stars}</div>
        <div className="absolute bottom-2.5 left-3">
          <div className="text-white font-black text-xs drop-shadow">{name}</div>
          <div className="text-white/70 text-[9px] font-medium">{location}</div>
        </div>
      </div>
      {desc && <div className="px-3 pt-2 pb-1 bg-white text-[9px] text-slate-500 font-medium leading-relaxed border-b border-slate-50">{desc}</div>}
      <div className="px-3 py-2 bg-white flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-wrap gap-2 text-[10px]">
          <span className="text-slate-500 font-semibold">📅 {checkin} → {checkout}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500 font-semibold">{nights} diárias</span>
          <span className="text-slate-400">·</span>
          <span className="text-[#0F766E] font-bold">{regime}</span>
        </div>
        <span className="text-[10px] font-black text-[#114552]">{price}</span>
      </div>
    </div>
  );

  return (
    <section id="turbo" className="py-14 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg,#0a1f24 0%,#0d2d35 40%,#0a1f24 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-1.5 rounded-full mb-6">
            <Send className="w-3.5 h-3.5 text-[#5DA6AA]" /><span className="text-[#5DA6AA] text-[10px] font-black uppercase tracking-widest">③ Orçamentos Turbo</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            A proposta mais bonita<br />que seu cliente já recebeu.
          </h2>
          <p className="text-white/50 font-medium text-lg max-w-2xl mx-auto">
            Link digital com a cara da sua agência. Sem custo exposto. O cliente abre no celular e já quer confirmar.
          </p>
        </div>

        {/* Layout: browser frame + side features */}
        <div className="lg:grid lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* ── Browser frame ── */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[#5DA6AA]/10 rounded-[3rem] blur-2xl pointer-events-none" />
            <div className="relative bg-white rounded-[1.5rem] shadow-2xl overflow-hidden border border-white/10">

              {/* Chrome */}
              <div className="bg-[#1e1e1e] px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-[#2d2d2d] rounded-md px-3 py-1 flex items-center gap-2">
                  <svg className="w-2.5 h-2.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <span className="text-[10px] font-mono text-slate-400">agenteoffice.com.br/p/88472</span>
                  <CheckCheck size={9} className="ml-auto text-emerald-400" />
                </div>
              </div>

              {/* Hero */}
              <div className="relative h-44 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1400&fit=crop" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                <div className="relative h-full flex flex-col justify-between p-5">
                  <div className="flex items-start justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-white/15 text-white px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">✈ Proposta de Viagem</span>
                    <img src="/logo_hor_white.png" alt="logo" className="h-5 w-auto opacity-90" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-xl mb-2 drop-shadow-lg">Lua de Mel — Toscana & Roma</h3>
                    <div className="flex gap-2 flex-wrap">
                      {['📅 14–22 Abr 2026', '👥 2 viajantes', 'Casal Ferreira'].map((t, i) => (
                        <span key={i} className="text-white/80 text-[10px] font-medium bg-black/25 px-2 py-0.5 rounded-full backdrop-blur-sm">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar */}
              <div className="bg-white border-b border-slate-100 px-4 flex items-center justify-between">
                <div className="flex">
                  {['📄 Proposta', '📋 Voucher'].map((t, i) => (
                    <div key={i} className={`px-4 py-2.5 text-[10px] font-black border-b-2 ${i === 0 ? 'border-[#0F766E] text-[#0F766E]' : 'border-transparent text-slate-400'}`}>{t}</div>
                  ))}
                </div>
                <div className="flex items-center gap-2 py-1.5">
                  <div className="flex gap-1 text-[8px] font-black text-[#0F766E]">
                    <span className="bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">Op. 1</span>
                    <span className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">Op. 2</span>
                  </div>
                  <button className="text-[9px] font-black text-white bg-[#114552] px-2.5 py-1 rounded-lg">⬇ PDF</button>
                </div>
              </div>

              {/* Body */}
              <div className="bg-slate-50 p-3 space-y-3 max-h-[580px] overflow-y-auto">

                {/* Strip */}
                <div className="flex gap-2 overflow-x-auto pb-0.5">
                  {[{ e: '✈️', l: 'Voos', n: 2 }, { e: '🏨', l: 'Hotéis', n: 2 }, { e: '🚌', l: 'Transfers', n: 3 }, { e: '🎭', l: 'Passeios', n: 4 }, { e: '🛡️', l: 'Seguro', n: 1 }].map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-slate-100 shrink-0">
                      <span className="text-sm">{c.e}</span>
                      <div><div className="text-[9px] font-black text-[#114552]">{c.l}</div><div className="text-[8px] text-slate-400">{c.n} {c.n === 1 ? 'item' : 'itens'}</div></div>
                    </div>
                  ))}
                </div>

                {/* Voos */}
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
                    <span>✈️</span><span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Voos</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <Ticket orig="GRU" origCity="São Paulo" dest="FCO" destCity="Roma" dep="08:45" arr="06:05+1" flight="LATAM LA8025" direct={true} />
                    <Ticket orig="FCO" origCity="Roma" dest="GRU" destCity="São Paulo" dep="10:30" arr="18:55" flight="LATAM LA8026" direct={true} />
                  </div>
                </div>

                {/* Hotéis */}
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
                    <span>🏨</span><span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Hotéis</span>
                  </div>
                  <div className="p-3 space-y-2.5">
                    <HotelCard
                      photos={PHOTOS1} idx={photoIdx} setIdx={setPhotoIdx}
                      name="Castello di Casole" location="Toscana, Itália"
                      stars="⭐⭐⭐⭐⭐" regime="☕ Café da manhã"
                      checkin="14/04" checkout="18/04" nights="4" price="✓ Incluso"
                      desc="Hotel boutique histórico em meio aos vinhedos toscanos. Quarto superior com vista para a colina, spa e piscina infinity exclusivos." />
                    <HotelCard
                      photos={PHOTOS2} idx={photo2Idx} setIdx={setPhoto2Idx}
                      name="Hotel de Russie" location="Roma, Itália"
                      stars="⭐⭐⭐⭐⭐" regime="🍽 Meia pensão"
                      checkin="18/04" checkout="22/04" nights="4" price="✓ Incluso"
                      desc="Ícone romano a 2 min da Piazza del Popolo. Jardins secretos, suíte deluxe com banheira e café da manhã no terraço com vista para o Vaticano." />
                  </div>
                </div>

                {/* Passeios */}
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
                    <span>🎭</span><span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Passeios & Experiências</span>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { name: 'Tour privê Vinícolas do Chianti', detail: 'Toscana · Dia inteiro', badge: '🍷 Exclusivo', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&fit=crop' },
                      { name: 'Coliseu com acesso prioritário', detail: 'Roma · Guia bilíngue · 3h', badge: '🏛 Histórico', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&fit=crop' },
                      { name: 'Jantar romântico — Castel Sant\'Angelo', detail: 'Roma · Vista panorâmica', badge: '🌙 Romântico', img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&fit=crop' },
                    ].map((p, i) => (
                      <div key={i} className="flex gap-2.5 items-center">
                        <img src={p.img} alt={p.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-black text-[#114552] leading-tight">{p.name}</div>
                          <div className="text-[9px] text-slate-400 font-medium mt-0.5">{p.detail}</div>
                        </div>
                        <span className="text-[8px] font-black bg-teal-50 text-[#0F766E] px-1.5 py-0.5 rounded-full border border-teal-100 shrink-0">{p.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transfers */}
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
                    <span>🚌</span><span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Transfers</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {[
                      { desc: 'FCO → Castello di Casole (Van privativa)', data: '14/04 · Chegada' },
                      { desc: 'Toscana → Roma (Van privativa)', data: '18/04 · Transferência' },
                      { desc: 'Hotel de Russie → FCO', data: '22/04 · Saída 06h' },
                    ].map((t, i) => (
                      <div key={i} className="px-3 py-2 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-xs">🚌</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold text-slate-700 leading-tight">{t.desc}</div>
                          <div className="text-[9px] text-slate-400">{t.data}</div>
                        </div>
                        <span className="text-[9px] font-black text-[#0F766E] shrink-0">✓ Incluso</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seguro */}
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-50 flex items-center gap-1.5">
                    <span>🛡️</span><span className="text-[10px] font-black text-[#114552] uppercase tracking-widest">Seguro Viagem</span>
                  </div>
                  <div className="px-3 py-2.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-base shrink-0">🛡️</div>
                    <div className="flex-1">
                      <div className="text-[10px] font-black text-slate-700">Assistência Total Premium · Affinity</div>
                      <div className="flex gap-2 mt-0.5 flex-wrap">
                        {['Médico ilimitado', 'Bagagem', 'Covid', 'Odonto'].map((c) => (
                          <span key={c} className="text-[8px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[8px] text-slate-400 font-bold">14 dias · 2 pax</div>
                      <div className="text-[10px] font-black text-[#114552]">✓ Incluso</div>
                    </div>
                  </div>
                </div>

                {/* Mensagem do agente */}
                <div className="bg-gradient-to-r from-teal-50 to-white rounded-xl border border-teal-100 p-3 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5DA6AA] to-[#114552] flex items-center justify-center shrink-0 text-white font-black text-xs" style={{ fontStyle: 'italic' }}>M</div>
                  <div>
                    <div className="text-[9px] font-black text-[#114552] mb-1">Mensagem da sua agente</div>
                    <p className="text-[10px] text-slate-600 font-medium leading-relaxed italic">
                      "Elaboramos cada detalhe desta lua de mel com muito carinho. Dos vinhedos da Toscana às noites eternas de Roma — cada momento foi pensado para ser inesquecível. Qualquer dúvida, estou aqui! 🥂"
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#042F2E 0%,#0F766E 60%,#2DD4BF 100%)' }}>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">Investimento total</div>
                        <div className="text-3xl font-black text-white">R$ 24.048</div>
                        <div className="text-[10px] text-white/50 mt-0.5">Para 2 viajantes · R$ 12.024 / pessoa</div>
                      </div>
                      <button className="bg-white text-[#0F766E] font-black text-xs px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap">✓ Aprovar viagem</button>
                    </div>
                  </div>
                </div>

                <div className="pb-2 text-center text-[9px] text-slate-400 font-medium">💳 Comissão e custo da agência são sempre confidenciais — só você vê.</div>
              </div>
            </div>
          </div>

          {/* ── Side features ── */}
          <div className="hidden lg:flex flex-col gap-4 pt-16">
            {[
              { icon: '🔒', title: '100% confidencial', desc: 'Custo e comissão nunca aparecem para o cliente. Só você tem acesso.' },
              { icon: '📱', title: 'Link no WhatsApp', desc: 'Compartilhe em 1 toque. Abre bonito no celular, tablet ou desktop.' },
              { icon: '🎨', title: 'Com a sua marca', desc: 'Logo, cores e nome da sua agência em tudo — do hero ao rodapé.' },
              { icon: '✅', title: '2 opções por proposta', desc: 'Envie op. 1 e op. 2 para o mesmo cliente. Ele compara e decide.' },
              { icon: '✈️', title: 'Voucher em 1 clique', desc: 'Cliente aprovou? O voucher digital fica pronto na hora. Sem retrabalho.' },
              { icon: '📄', title: 'Exporta em PDF', desc: 'Gera PDF profissional para quem prefere receber por e-mail ou imprimir.' },
            ].map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 hover:bg-white/8 transition-colors">
                <div className="text-2xl shrink-0">{f.icon}</div>
                <div>
                  <div className="text-[12px] font-black text-white mb-0.5">{f.title}</div>
                  <div className="text-[11px] text-white/45 font-medium leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile features */}
        <div className="lg:hidden mt-8 grid grid-cols-2 gap-3">
          {[
            { icon: '🔒', title: '100% confidencial' },
            { icon: '📱', title: 'Link no WhatsApp' },
            { icon: '✅', title: '2 opções por proposta' },
            { icon: '✈️', title: 'Voucher em 1 clique' },
          ].map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2">
              <span className="text-xl">{f.icon}</span>
              <span className="text-[11px] font-black text-white">{f.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
