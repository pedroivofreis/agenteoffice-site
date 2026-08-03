import { useEffect, useState } from 'react'

const PASSOS_TEXTO = [
  'Lendo sua descrição…',
  'Montando voos, hotel e transfer…',
  'Calculando venda, custo e comissão…',
  'Criando a viagem dentro do seu sistema…',
]
const PASSOS_ARQUIVO = [
  'Abrindo a cotação da operadora…',
  'Extraindo voos, hotel e valores…',
  'Calculando venda, custo e comissão…',
  'Criando a viagem dentro do seu sistema…',
]

export default function Generating({ arquivo = false, onDone }) {
  const passos = arquivo ? PASSOS_ARQUIVO : PASSOS_TEXTO
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    if (atual < passos.length - 1) {
      const t = setTimeout(() => setAtual((a) => a + 1), 620)
      return () => clearTimeout(t)
    }
    const t = setTimeout(onDone, 900)
    return () => clearTimeout(t)
  }, [atual]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-full flex flex-col items-center justify-center gap-9 bg-gradient-to-br from-[#042F2E] to-[#114552] font-sans">
      <div className="w-14 h-14 rounded-full border-4 border-brand-400/20 border-t-brand-400 animate-spin" />
      <div className="flex flex-col gap-3">
        {passos.map((p, i) => (
          <div
            key={p}
            className={`flex items-center gap-2.5 text-[15.5px] transition-colors ${
              i < atual ? 'text-emerald-400' : i === atual ? 'text-white' : 'text-white/25'
            }`}
          >
            <span className="w-4 text-center">{i < atual ? '✓' : '•'}</span> {p}
          </div>
        ))}
      </div>
    </div>
  )
}
