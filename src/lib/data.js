// Dados compartilhados da landing (reaproveitados do app.jsx legado).

export const WHATSAPP_ESPECIALISTA_HREF = 'https://wa.me/5512936182479';
export const APP_URL = 'https://app.agenteoffice.com.br';
export const USE_PLAN_CHECKOUT_MODAL = true;

// ─── Planos ─────────────────────────────────────────────────────────────────
// O preço COBRADO mora em `PLANS` de routes/billing.py (API) — o Asaas cobra de lá.
// O que cada plano LIBERA mora em plano_regras.py. Mudou aqui, mude lá (e vice-versa).
export const PLAN_SLUG = { Gratis: 'gratis', Embarque: 'embarque', Escala: 'escala', Founder: 'founder' };

// Usuários do Embarque — o mesmo USUARIOS_EMBARQUE da API.
export const USUARIOS_EMBARQUE = 1;
const usuariosEmbarque = `${USUARIOS_EMBARQUE} usuário${USUARIOS_EMBARQUE === 1 ? '' : 's'}`;

// `anual` = total cobrado de uma vez (ciclo YEARLY do Asaas).
export const PRECOS = {
  embarque: { mensal: 129, anual: 1188 },
  escala: { mensal: 249, anual: 2388 },
};

export const NOTA_MIGRACAO = '*Consulte os sistemas que já importamos.';
export const NOTA_CONTRATO = '**Assinatura eletrônica com registro de data, hora e IP, nos termos da MP 2.200-2/2001.';
export const LINHA_CREDIBILIDADE = [
  'Migração gratuita do seu sistema atual*',
  'Integração com o Tripadvisor',
  'Cancele quando quiser no plano mensal',
];

export const PLANS = [
  {
    slug: 'gratis', name: 'Grátis',
    desc: 'Para começar hoje, sem cartão. Para sempre.',
    features: [
      'Até 3 viagens novas por mês',
      'Proposta online com a sua marca (com o selo "feito com AgenteOffice")',
      'Mar.ia monta a viagem a partir do texto ou do PDF da operadora (3 por mês)',
      'CRM com funil de vendas e cadastro de clientes (pessoa física e empresa)',
    ],
    cta: 'Comece agora, grátis',
  },
  {
    slug: 'embarque', name: 'Embarque',
    desc: 'Para o agente que vende todo dia.',
    destaqueLinha: '1º mês com tudo do Escala',
    features: [
      'Viagens e propostas ilimitadas, sem selo',
      'IA de montagem de orçamento: cole a cotação ou solte o PDF da consolidadora e a viagem sai pronta',
      'Hotéis com fotos e avaliações (integração com o Tripadvisor)',
      'Financeiro: recebimentos, pagamentos a fornecedores e comissões',
      'Recibo para o viajante e agenda com alertas',
      'Migração gratuita do seu sistema atual*',
      usuariosEmbarque,
    ],
    cta: 'Assinar Embarque',
  },
  {
    slug: 'escala', name: 'Escala',
    desc: 'Para a agência com equipe, grupos e excursões.',
    badge: 'Usuários ilimitados',
    features: [
      'Tudo do Embarque, com usuários ilimitados',
      'Grupos e excursões: link por passageiro, check-in por QR Code, pontos de embarque e mapa de assentos',
      'Contratos com aceite online',
      'Mar.ia completa: roteiros com IA, áudio transcrito e lembretes de follow-up',
      'Suporte prioritário e onboarding',
    ],
    cta: 'Assinar Escala',
    highlight: true,
  },
];

// Tabela "Tudo o que vem no AgenteOffice". Célula: true (tem), false (não tem) ou texto.
// Colunas na ordem [Grátis, Embarque, Escala] — alinhadas com as flags de plano_regras.py.
export const COMPARATIVO = [
  {
    grupo: 'Vendas e propostas',
    itens: [
      ['Funil de vendas (CRM) com etapas', [true, true, true]],
      ['Proposta online com a sua marca, com até 5 opções para o cliente escolher', ['Com selo', true, true]],
      ['IA de montagem: cole a cotação ou solte o PDF da consolidadora e a viagem sai pronta', ['3 por mês', true, true]],
      ['Hotéis com fotos e avaliações do Tripadvisor', [false, true, true]],
      ['Imagens de capa para a proposta (busca integrada)', [false, true, true]],
      ['Página de captação de leads com formulário próprio', [false, true, true]],
      ['Estúdio de Vendas: artes de divulgação a partir dos seus modelos', [false, false, true]],
    ],
  },
  {
    grupo: 'Clientes e documentos',
    itens: [
      ['Cadastro de clientes pessoa física e empresa', [true, true, true]],
      ['Office Drive: documentos da agência e de cada viagem salvos na nuvem', [false, true, true]],
      ['Anexos por viagem e por passageiro', [false, true, true]],
      ['Histórico de reservas: voos, hotéis, transfers e seguros', [false, true, true]],
    ],
  },
  {
    grupo: 'Financeiro',
    itens: [
      ['Recebimentos, pagamentos a fornecedores e comissões', [false, true, true]],
      ['Recibo para o viajante com a logo da agência', [false, true, true]],
      ['Agenda, tarefas e lembretes de follow-up', [false, true, true]],
    ],
  },
  {
    grupo: 'Contratos',
    itens: [
      ['Contratos com aceite digital com validade jurídica**', [false, false, true]],
    ],
  },
  {
    grupo: 'Grupos e excursões',
    itens: [
      ['Página pública de venda da excursão', [false, false, true]],
      ['Link individual por passageiro, check-in por QR Code', [false, false, true]],
      ['Pontos de embarque e mapa de assentos por veículo', [false, false, true]],
      ['Painel de embarque ao vivo para vários operadores', [false, false, true]],
    ],
  },
  {
    grupo: 'Mar.ia, a secretária virtual',
    itens: [
      ['Monta a viagem a partir da cotação', ['3 por mês', '30 por mês', 'Sem limite']],
      ['Roteiros completos com IA, áudio transcrito', [false, false, true]],
      ['Lembra prazos e follow-ups', [false, true, true]],
    ],
  },
  {
    grupo: 'Plataforma',
    itens: [
      ['App no celular (instalável)', [true, true, true]],
      ['Usuários', ['1', String(USUARIOS_EMBARQUE), 'Ilimitados']],
      ['Migração gratuita do seu sistema atual*', [false, true, true]],
      ['Suporte', ['Central de ajuda', 'E-mail', 'Prioritário + onboarding']],
    ],
  },
];

export const TESTIMONIALS = [
  { name: 'Rafaela M.', role: 'Agente sênior — São Paulo', text: 'Copiava o texto da Sakura e redigitava tudo no Word. Hoje colo no chat e em 30 segundos o orçamento está pronto com comissão calculada.', stars: 5 },
  { name: 'Bruno T.', role: 'Diretor — Agência Destinos', text: 'O financeiro mudou nossa operação. Vejo em tempo real o que cada cliente deve, o que pagamos aos fornecedores e quanto a agência ganhou no mês.', stars: 5 },
  { name: 'Carla N.', role: 'Agente — Curitiba', text: 'O voucher digital é lindo. O cliente abre no celular, vê a viagem organizada e me manda elogio. Virou o diferencial da minha agência.', stars: 5 },
];

// Navegação — produto em 3 pilares (Proposta rápida → CRM → Excursões)
export const PRODUCT_NAV = [
  { id: 'turbo', label: 'Proposta rápida', desc: 'Da cotação à proposta com a sua marca em minutos' },
  { id: 'sistema', label: 'CRM da agência', desc: 'Vendas, clientes, agenda e financeiro' },
  { id: 'excursoes', label: 'Grupos e Excursões', desc: 'Embarque por QR e painel ao vivo' },
];
