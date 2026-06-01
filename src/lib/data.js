// Dados compartilhados da landing (reaproveitados do app.jsx legado).

export const WHATSAPP_ESPECIALISTA_HREF = 'https://wa.me/5512936182479';
// Agente de IA real — para testar ao vivo (botão "Demonstração")
export const AGENTE_WHATSAPP_HREF = 'https://wa.me/5512991032731?text=Oi!%20Quero%20testar%20o%20agente%20de%20IA%20da%20AgenteOffice';
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
    name: 'Embarque', price: '59,90', priceLabel: null,
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
    cta: 'Assinar Embarque — R$ 59,90', highlight: false, trial: false,
  },
  {
    name: 'Escala', price: '149,90', priceLabel: null,
    desc: 'Para a agência que quer crescer com controle e IA.',
    badge: 'Mais popular',
    features: [
      '3 usuários (+R$ 29,90/extra)',
      'Tudo do Embarque',
      'Agente de IA — pré-atendimento 24/7',
      'Mar.ia — IA secretária virtual',
      'Grupos e Excursões com landing pública',
      'Contratos digitais com aceite online',
      'WhatsApp centralizado',
      'Roteiros IA completos',
      'Suporte prioritário + onboarding',
    ],
    cta: 'Assinar Escala — R$ 149,90', highlight: true, trial: false,
  },
];

export const TESTIMONIALS = [
  { name: 'Rafaela M.', role: 'Agente sênior — São Paulo', text: 'Copiava o texto da Sakura e redigitava tudo no Word. Hoje colo no chat e em 30 segundos o orçamento está pronto com comissão calculada.', stars: 5 },
  { name: 'Bruno T.', role: 'Diretor — Agência Destinos', text: 'O financeiro mudou nossa operação. Vejo em tempo real o que cada cliente deve, o que pagamos aos fornecedores e quanto a agência ganhou no mês.', stars: 5 },
  { name: 'Carla N.', role: 'Agente — Curitiba', text: 'O voucher digital é lindo. O cliente abre no celular, vê a viagem organizada e me manda elogio. Virou o diferencial da minha agência.', stars: 5 },
];

// Navegação — produto em 3 pilares (Agente → Sistema → Turbo)
export const PRODUCT_NAV = [
  { id: 'agente', label: 'Agente de IA', desc: 'Pré-atendimento 24/7 no WhatsApp' },
  { id: 'sistema', label: 'Sistema', desc: 'Viagens, clientes, agenda e financeiro' },
  { id: 'turbo', label: 'Orçamentos Turbo', desc: 'Proposta linda em minutos' },
];
