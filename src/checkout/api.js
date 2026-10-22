// Checkout do site → POST /api/billing/checkout (api-agenteoffice).
// A conta nasce ATIVA na hora (no Grátis, com 30 dias de Escala) e a resposta traz
// o token de auto-login E a fatura do Asaas. Quem troca o plano é o webhook do pagamento.
const API_URL = import.meta.env.VITE_API_URL || 'https://web-production-32a87.up.railway.app';
const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.agenteoffice.com.br';

export async function assinarPlano(dados) {
  const resp = await fetch(`${API_URL}/api/billing/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    const d = data?.detail;
    const err = new Error(typeof d === 'string' ? d : d?.mensagem || 'Não foi possível concluir agora. Tente de novo.');
    err.status = resp.status;
    throw err;
  }
  return data;
}

/** Entra no app já logado, no pipeline. */
export function urlEntrarNoApp({ access_token, user }) {
  const params = new URLSearchParams({
    token: access_token,
    user: JSON.stringify(user),
    redirect: '/app/pipeline',
  });
  return `${APP_URL}/app/auto-login?${params.toString()}`;
}
