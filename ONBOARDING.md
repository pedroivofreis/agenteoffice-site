# Onboarding — agenteoffice-site

Site público + o funil de trial que leva o agente de viagem para dentro do sistema.

## Em que ordem ler

1. **`docs/REGRAS-DE-TRABALHO.md`** — regras de trabalho (branch, PR, segredo, banco).
2. **`CLAUDE.md`** — estrutura, o funil de trial, identidade visual e as **armadilhas já
   medidas**.
3. Este arquivo, para rodar.

## Rodando

```bash
npm install
npm run dev        # http://localhost:5173
```

`.env.local` (opcional — sem ele o site aponta para produção):

```
VITE_API_URL=http://127.0.0.1:8010     # API local
VITE_APP_URL=http://localhost:5174     # app local
VITE_GEMINI_API_KEY=…                  # só para desenvolver a Mar.ia
```

⚠️ **Toda `VITE_*` vai no bundle e é pública.** A chave do Gemini no front é aceitável para
desenvolver; **antes de ir a público**, a chamada precisa passar por rota no backend.

## ⚠️ `src/app.jsx` é código morto

O `main.jsx` importa `Landing.jsx`. O `app.jsx` (~186 kB) é o site antigo inteiro — não roda
e tem preços velhos. Não edite, não tire conclusão dele.

## Os três repositórios

| Repo | O quê | Deploy |
|---|---|---|
| **agenteoffice-site** | este site + trial (React) | Vercel, `main` |
| **api-agenteoffice** | a API (FastAPI) | Railway, `main` |
| **app-agenteoffice** | o sistema da agência (Vue 3) | Vercel, `main` |

**`main` é produção nos três.** Mudança que cruza repos sobe **API primeiro** — o site chama
`POST /api/trial/start`; se o endpoint não existir em produção, o funil cai no modo
demonstração em vez de criar conta de verdade.

## Seu primeiro fluxo

```bash
git fetch origin
git switch -c fix/algo-curto origin/main
# … código …
npm run dev          # rodou o funil inteiro na tela?
npm run build        # o build passa?
/revisar-pr
git push -u origin fix/algo-curto
gh pr create --base main
```

Para testar o funil: frase completa (pula o chat), frase incompleta (a Mar.ia entra), PDF e
print. Sem API local, ele cai no workspace mockado — isso é proposital.

## As três coisas que mais quebram aqui

1. **Segredo em `VITE_*`.** Vai no bundle. Sempre.
2. **`React.StrictMode` monta 2× em dev.** Efeito de inicialização sem trava (`useRef`)
   duplica mensagem e debita crédito em dobro. Em produção não acontece — dá para não
   perceber.
3. **Prometer o que não aconteceu.** A tela final só diz "enviamos por e-mail" quando a API
   confirma que enviou (`email_enviado`). Mantenha esse cuidado em toda promessa nova.

## Revisão de código

```
/revisar-pr        # branch atual contra origin/main
/revisar-pr 2      # uma PR específica
```

Movida a evidência: cada achado é confirmado ou refutado rodando algo, com uma seção de
"refutados" no fim.
