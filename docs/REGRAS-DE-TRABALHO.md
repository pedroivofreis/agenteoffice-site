# Regras de trabalho — AgenteOffice

Valem para os três repositórios: **api-agenteoffice**, **app-agenteoffice** e
**agenteoffice-site**. São regras, não sugestões.

---

## 1. Branch e PR

- **Sempre abra uma branch nova a partir de `origin/main`.** Nunca commite na branch que
  estava checada out, nunca direto na `main`.
  ```bash
  git fetch origin
  git switch -c feat/nome-curto origin/main
  ```
- Prefixos: `feat/` · `fix/` · `chore/` · `perf/` · `docs/`.
- **`main` é produção.** Nos três repos o merge dispara deploy (Railway na API, Vercel no app
  e no site). Não existe staging.
- **Ordem de deploy quando a mudança cruza repos: API primeiro.** O front que chama um
  endpoint inexistente quebra em produção.
- Uma PR = um assunto. Refactor não pedido vira PR separada.

## 2. Commits e PRs

- Mensagem em **português**, no imperativo, explicando **por quê** — não o que o diff já diz.
  ```
  fix(pipeline): não baixar a lista inteira para abrir um card

  hydrateGrupoFromApi puxava GET /api/grupos (12 MB) só para pegar 1.
  ```
- **Nunca** inclua rodapé de ferramenta de IA ("Generated with…", "Co-authored-by: Claude")
  em commit ou PR.
- Na descrição da PR, diga o que foi **testado de fato** e o que ficou pendente.

## 3. Segredo nunca entra no repositório

- `.env`, `.env.local` e chaves ficam fora do git (já estão no `.gitignore`).
- **No front, toda variável `VITE_*` é pública** — ela vai no bundle e qualquer um lê no
  navegador. Chave de API de IA, de pagamento ou de banco **nunca** pode ser `VITE_*`;
  precisa passar por rota no backend.
- Antes de dar push, confira: `git diff origin/main..HEAD | grep -iE 'api[_-]?key|secret|token|postgres://'`.

## 4. Banco de dados

- A `DATABASE_URL` de produção é **produção de verdade**: tem clientes reais, orçamentos
  reais e dinheiro real. Consulta é livre; **escrita só com motivo e sabendo o que apaga**.
- ⚠️ O `.env` local da API aponta para um **Neon que é cópia velha**. Medição feita por ele
  **não descreve produção** — não conclua nada de performance ou de dados por ali.
- Nada de `DROP`, `TRUNCATE` ou `DELETE` amplo sem backup e sem pedido explícito.

## 5. Infra

- **Não altere Dockerfile, compose, `railway.toml`, `vercel.json` ou workflow** sem pedido
  explícito. Problema de aplicação se resolve no código da aplicação.
- Migration nova entra no `run_migrations()` do `database.py` e roda **a cada boot** — pense
  no custo antes de adicionar.

## 6. Multi-tenant (a regra que mais dói quando se esquece)

Toda query precisa filtrar por `agencia_id` vindo do **token**, nunca de parâmetro do
cliente. Endpoint público precisa **sanitizar** o que devolve: custo e comissão da agência
nunca podem chegar ao cliente final.

## 7. Antes de pedir review

- [ ] Rodou local e viu funcionar (não só "compilou")
- [ ] `npm run build` passa (front) / a API sobe sem erro
- [ ] Nenhum segredo no diff
- [ ] Filtro por `agencia_id` em toda query nova
- [ ] A PR diz o que foi testado

Depois rode a revisão automática:

```
/revisar-pr           # branch atual contra origin/main
/revisar-pr 113       # uma PR específica
```

## 8. Conduta da revisão

- **Achado sem evidência não é achado.** Confirme ou refute rodando algo.
- "Sem bloqueadores" é uma resposta ótima — não invente problema para parecer útil.
- Escopo é o diff. O resto é follow-up sugerido.
