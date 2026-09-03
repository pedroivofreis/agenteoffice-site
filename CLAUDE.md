# agenteoffice-site — contexto do projeto

Site público do AgenteOffice (`agenteoffice.com.br`) e o **trial "monte a viagem"** — o funil
que leva o agente de viagem do hero até dentro do sistema, com conta e card reais.
**React 18 + Vite + Tailwind**, deploy na Vercel.

> Leia também `docs/REGRAS-DE-TRABALHO.md` (como trabalhar aqui) e `ONBOARDING.md`.

---

## ⚠️ Antes de qualquer coisa: `src/app.jsx` é código morto

O `main.jsx` importa **`Landing.jsx`**. O `src/app.jsx` (~186 kB) é o site antigo inteiro num
arquivo só — não roda, mas ainda contém preços e textos desatualizados. **Não edite** e não
tire conclusão dele.

---

## Estrutura

```
src/
  main.jsx            → monta Landing.jsx (com React.StrictMode)
  Landing.jsx         composição da página: Nav → TrialHero → LogosStrip → Agente →
                      Sistema → Turbo → Excursao → Solicitar → footer
  components/Nav.jsx, ChatAnimated.jsx, PropostaMock.jsx
  sections/           TrialHero, AgenteSection, SistemaSection, TurboSection,
                      ExcursaoSection, SolicitarSection, LogosStrip
  lib/data.js         PLANS, PRODUCT_NAV, URLs, depoimentos
  lib/ui.jsx          Container, Button, SectionBadge, SectionHeading
  trial/              o funil completo (ver abaixo)
```

### O trial (`src/trial/`)

| Arquivo | Papel |
|---|---|
| `TrialFlow.jsx` | orquestra: chat → generating → preview → onboarding → app real |
| `mock.js` | extração determinística da frase + catálogo de destinos e fotos |
| `ia.js` | Mar.ia via Gemini; devolve `null` em erro para o fluxo local assumir |
| `api.js` | fala com `POST /api/trial/start` e monta a URL de auto-login |
| `Chat.jsx` | conversa até ter destino, quando, pax e valor de venda |
| `Preview.jsx` | card com a comissão borrada + gate de e-mail |
| `Onboarding.jsx` | agência (+WhatsApp) → cria conta real → entra no sistema |
| `KanbanCard.jsx` | **réplica** do card do app (CSS copiado do sistema) |
| `Workspace.jsx` | fallback mockado quando a API não responde |

Princípio do funil: **a pessoa vê o valor antes de se cadastrar**. Só o e-mail destrava; o
resto é capturado depois, cada dado entregando algo em troca.

---

## Identidade visual

Tokens no `tailwind.config.js` — use os nomes, não hex solto:

```
ink / brand-900  #114552   petróleo (títulos, hero)
brand-400        #5DA6AA   teal
coral-500        #FF6A3D   CTA
sand-50          #FBF9F5   fundo claro
fontes: Inter (sans) · Plus Jakarta Sans (display)
```

⚠️ O **sistema** (app-agenteoffice) usa outra paleta: teal `#0C6B63`. Ao replicar telas do
sistema aqui (como o `KanbanCard`), use as cores do **sistema**, não as do site — a graça é
parecer o produto de verdade.

### Regras de design do projeto

- 🔴 **Proibido** o badge pílula "● NOVO · TAL COISA" (bolinha + caixa alta). Foi removido de
  propósito; o `SectionBadge` é filete + rótulo.
- Fundo chapado em vez de gradiente exagerado; sombra contida; emoji só quando replicando
  uma UI do sistema que já usa.
- O aviãozinho flutuando do hero (`animate-floaty`) fica.

---

## Armadilhas medidas (não redescobrir)

1. **`React.StrictMode` monta tudo 2× em dev.** Efeito de inicialização precisa de trava
   (`useRef`), senão a conversa duplica e o crédito é debitado duas vezes. Em produção não
   acontece — é fácil não perceber.
2. **Toda `VITE_*` é pública.** Vai no bundle e qualquer um lê. Hoje `VITE_GEMINI_API_KEY`
   está no front: aceitável em protótipo local, **não** em produção — a chamada precisa
   passar por rota no backend.
3. **A API pode não responder.** `TrialFlow` cai no `Workspace` mockado de propósito, para a
   demonstração não morrer. Ao mexer no funil, preserve esse caminho.
4. **Sem `VITE_API_URL`/`VITE_APP_URL`**, o `api.js` usa produção por padrão. Em local,
   aponte no `.env.local`.
5. **A tela só promete o que aconteceu.** `POST /api/trial/start` devolve `email_enviado`; a
   tela final usa isso para não dizer "enviamos por e-mail" quando o envio foi pulado.
6. Preço aparece em **dois lugares**: `lib/data.js` (o que o site anuncia) e `PLANS` do
   `routes/billing.py` na API (o que o Asaas cobra). Divergir gera cobrança diferente do
   anunciado.

---

## Convenções

- Componente em PascalCase, um por arquivo; seção da home em `src/sections/`.
- Estilo por Tailwind com os tokens do tema; CSS solto só quando não há jeito.
- Texto e microcopy em **português**, direto, sem jargão de marketing.
- Dado de conteúdo (planos, navegação, depoimentos) em `lib/data.js`, não espalhado no JSX.
- Nada de dependência nova sem necessidade real — o site precisa carregar rápido.
