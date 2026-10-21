// Dados compartilhados da landing (reaproveitados do app.jsx legado).

export const WHATSAPP_ESPECIALISTA_HREF = 'https://wa.me/5512936182479';
export const APP_URL = 'https://app.agenteoffice.com.br';
export const USE_PLAN_CHECKOUT_MODAL = true;

export const PLAN_SLUG = { Experimente: 'trial', Embarque: 'embarque', Escala: 'escala', Founder: 'founder' };

export const PLANS = [
  {
    name: 'Experimente', price: null, priceLabel: 'Grátis',
    desc: 'Sem cartão. Explore o sistema com 3 orçamentos completos.',
    badge: null,
    features: [
      '3 orçamentos/viagens',
      'Orçamento Turbo completo',
      'Proposta com sua marca',
      'Voucher digital',
    ],
    cta: 'Começar grátis agora', highlight: false, trial: true,
  },
  {
    name: 'Embarque', price: '99,90', priceLabel: null,
    desc: 'Para o agente que quer vender mais e trabalhar menos.',
    badge: null,
    features: [
      '1 usuário',
      'Orçamentos ilimitados',
      'Orçamento Turbo',
      'Proposta premium com sua marca',
      'Voucher digital',
      'Estúdio de Vendas',
      'Financeiro — recebimentos e comissões',
      'Agenda do Agente + alertas',
      'Histórico completo (voos, hotéis, transfers, seguro)',
      'Suporte por e-mail',
    ],
    cta: 'Assinar Embarque — R$ 99,90', highlight: false, trial: false,
  },
  {
    name: 'Escala', price: '299,90', priceLabel: null,
    desc: 'Para a agência que quer crescer com controle e IA.',
    badge: 'Mais popular',
    features: [
      '3 usuários (+R$ 29,90/extra)',
      'Tudo do Embarque',
      'Grupos e Excursões com landing pública',
      'Contratos digitais com aceite online',
      'Roteiros IA completos',
      'Suporte prioritário + onboarding',
    ],
    cta: 'Assinar Escala — R$ 299,90', highlight: true, trial: false,
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
