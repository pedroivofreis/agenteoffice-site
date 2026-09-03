---
name: agenteoffice-code-review
description: Revisão de código do site do AgenteOffice (React 18 + Vite + Tailwind, com o funil de trial). Analisa segredo em variável VITE_, StrictMode, integridade do funil, identidade visual e convenções do repo. Use sempre que pedirem para revisar código, auditar mudanças, validar uma PR ou antes de commitar/pushar.
---

# Code Review — site do AgenteOffice

Revisão estruturada do diff em `agenteoffice-site` (React 18, Vite, Tailwind). Leia
`CLAUDE.md` e `docs/REGRAS-DE-TRABALHO.md` **antes** de julgar.

## Regra de ouro

**Nenhum achado vale sem verificação.** Rode `npm run build`, abra o arquivo consumidor,
confira o valor real. Derrubar um achado especulativo com evidência vale mais do que dez
"pontos de atenção" no chute.

```bash
git fetch -q origin
git diff origin/main...HEAD --stat
git diff origin/main...HEAD
```

---

## Critérios, na ordem em que importam aqui

### 🔴 1. Segredo no bundle

- **Toda `VITE_*` é pública.** Chave de IA, de pagamento, de banco ou token de serviço em
  variável de front é 🔴 — vai no JS que qualquer visitante baixa.
- Segredo hardcoded no JSX/JS: mesma coisa.
- Confira também o que o diff manda para APIs externas a partir do browser.

### 🔴 2. Integridade do funil de trial

O funil é a porta de entrada comercial. Quebrar aqui custa lead:

- O caminho de **fallback** continua existindo? (`ia.js` devolve `null` → fluxo local;
  API fora → `Workspace` mockado). Remover isso deixa a demonstração morrer na frente do
  cliente.
- Efeito de inicialização tem trava contra o **duplo mount do StrictMode**? Sem `useRef`, a
  conversa duplica e o crédito é debitado duas vezes.
- A tela **promete só o que aconteceu**? (ex.: usar `email_enviado` antes de dizer que
  enviou e-mail).
- Erro de rede tratado com mensagem — nunca tela em branco ou botão que não responde.
- Dado de lead ainda é capturado na ordem acordada: e-mail → agência → WhatsApp.

### 🟡 3. Contrato com a API

- Mudou o payload de `POST /api/trial/start`? Confira o schema em
  `api-agenteoffice/routes/trial.py` — campo faltando dá 422 silencioso no meio do funil.
- URL de auto-login continua com `redirect` apontando para caminho interno `/app/…`?
- **Preço**: `lib/data.js` (anunciado) precisa bater com `PLANS` de `routes/billing.py`
  (cobrado). Divergência = cliente cobrado diferente do anunciado.

### 🟡 4. Performance e peso

- Dependência nova: precisa mesmo? O site tem que abrir rápido.
- Imagem sem `loading="lazy"`, sem dimensão, ou em resolução exagerada.
- Animação em loop rodando fora da viewport.
- `useEffect` sem cleanup de `setTimeout`/`setInterval`/listener.

### 🟢 5. Identidade e conteúdo

- 🔴 **Badge pílula "● NOVO · X"** (bolinha + caixa alta): proibido no projeto. `SectionBadge`
  é filete + rótulo.
- Cores pelos tokens (`ink`, `brand-*`, `coral-*`, `sand-*`), não hex solto.
- Ao replicar tela do sistema (card do kanban, proposta), usar as cores **do sistema**
  (teal `#0C6B63`) — é o que faz parecer o produto de verdade.
- Texto em português direto, sem jargão. Promessa no site tem que ser verdade no produto.
- Conteúdo (planos, navegação) em `lib/data.js`, não espalhado no JSX.

### ⚫ 6. Não mexa no morto

`src/app.jsx` é o site antigo, não usado (`main.jsx` importa `Landing.jsx`). Mudança ali é
ruído — a não ser que a PR seja justamente para apagá-lo.

---

## Severidade

| | Quando | Exemplo real deste projeto |
|---|---|---|
| 🔴 **Crítico** | Vaza segredo ou quebra o funil | Chave em `VITE_*`; remover o fallback da IA |
| 🟠 **Alto** | Quebra uma etapa do funil ou diverge do cobrado | Payload fora do schema; preço diferente da API |
| 🟡 **Médio** | Peso, manutenção | Dependência desnecessária, efeito sem cleanup |
| 🟢 **Baixo** | Polimento | Hex solto em vez do token |

## O que NÃO apontar

- Estilo resolvido por formatador.
- Preferência de copy sem argumento (a menos que a frase prometa algo falso).
- Refactor fora do escopo.
- Reclamar do `app.jsx` numa PR que não o toca.

---

## Formato do relatório (em português)

````markdown
# Code Review — <branch ou PR>

**Escopo:** N arquivos · +X/−Y · base `origin/main`

## Veredito
🔴 Bloqueia / 🟡 Mergeable com ressalvas / 🟢 Pode mesclar

## Achados confirmados

### 🔴 [Crítico] Título curto
**Onde:** `src/trial/Chat.jsx:88`
**Evidência:** comando rodado + resultado.
**Por que quebra:** cenário concreto.
**Correção:** o que fazer.

## Refutados
O que parecia problema e não é — com a evidência.

## Follow-ups (fora do escopo)
````

Feche com o **veredito** e os bloqueadores. Se não houver, diga com todas as letras.
