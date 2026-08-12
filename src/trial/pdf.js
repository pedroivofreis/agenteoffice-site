import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

// Extrai o texto de um PDF no navegador (mesma técnica do app real em PipelineView.vue)
// para depois mandar só o texto pro backend — evita ter que enviar o PDF inteiro.
export async function extrairTextoPdf(file) {
  const pdfjs = await import('pdfjs-dist')
  pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc
  const buf = await file.arrayBuffer()
  const data = new Uint8Array(buf).slice()
  const pdf = await pdfjs.getDocument({
    data,
    isOffscreenCanvasSupported: false,
    maxImageSize: -1,
    useSystemFonts: true,
    disableFontFace: false,
    verbosity: 0,
  }).promise

  const chunks = []
  const pages = Math.min(pdf.numPages, 20)
  for (let i = 1; i <= pages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const line = (content.items || []).map((it) => it.str || '').join(' ').replace(/\s+/g, ' ').trim()
    if (line) chunks.push(line)
  }
  return chunks.join('\n').slice(0, 20000)
}
