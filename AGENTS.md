# Padrões do portal de dados Lumora

Este repositório é o **template oficial** de apps de dados da Lumora Distribuidora no Databricks Apps.
Assistentes de IA (Genie Code, Claude Code, Cursor) e pessoas devem seguir este arquivo. Detalhes e justificativas:
`docs/MARCA.md` (cores, logo, textos) e `docs/SEGURANCA.md` (segurança e checklist de publicação).

## Dados aprovados
- Catálogo e schema: `serverless_stable_zza0u0_catalog.lumora_vendas`
- Tabelas: `vendas` (venda_id, data_venda, loja_id, produto_id, quantidade, preco_unitario),
  `lojas` (loja_id, loja, cidade, regiao), `produtos` (produto_id, produto, categoria, preco)
- Receita = `quantidade * preco_unitario`
- Use só essas tabelas. Para usar outra tabela, avise a pessoa que ela precisa ser liberada como recurso do app (ver Segurança).

## Como criar uma página
1. **Consulta**: crie `config/queries/<nome>.sql` (o nome do arquivo é a chave da consulta). Use nomes completos de tabela,
   `CAST(... AS DOUBLE)` para valores e dados agregados.
2. **Página**: crie `client/src/pages/<nome>/<Nome>Page.tsx` com os componentes de `client/src/components`:
   - `PageHeader` para título e descrição
   - `KpiCard` para indicadores, com `formatBRL` / `formatNumero` de `client/src/lib/format.ts`
   - gráficos do `@databricks/appkit-ui/react` (`BarChart`, `LineChart`, `DonutChart`) com `queryKey="<nome>"`
   - `useAnalyticsQuery('<nome>', {})` quando precisar dos valores
   - estados de carregando (`Skeleton`), sem dados e erro com mensagem amigável
3. **Menu**: adicione a página na lista `PAGINAS` em `client/src/App.tsx`.

## Marca (obrigatório)
- Cores **só por variáveis de tema**: `--lumora-azul` (#12395B, principal), `--lumora-ambar` (#F2A33A, destaque, no máximo 10%
  da tela), gráficos em `--chart-1` a `--chart-5`, nessa ordem e com no máximo 5 séries.
  Proibido escrever hex ou classes de cor do Tailwind (`bg-blue-500`, `text-red-600`) nas páginas.
- Logo: só o componente `LumoraLogo`, e só no cabeçalho do portal (já está lá). Não recolorir, distorcer nem repetir o logo nas páginas.
  Não usar imagens ou logos da internet.
- Fonte do sistema; não carregar fontes externas. Não alterar o cabeçalho nem o rodapé do portal.
- Textos em português do Brasil, linguagem de negócio, valores em R$.

## Segurança (obrigatório)
1. **SQL só em `config/queries/`**, somente leitura (`SELECT`). Proibido `INSERT`, `UPDATE`, `DELETE`, `MERGE`, `DROP`,
   `CREATE` ou `GRANT`. Não crie endpoints no servidor para rodar SQL.
2. **Filtros do usuário sempre como parâmetro**: `-- @param regiao STRING` + `:regiao` no SQL e `sql.string(...)`,
   `sql.number(...)` ou `sql.date(...)` no front-end. Nunca concatene texto em SQL.
3. **Mínimo privilégio**: o app enxerga só os recursos declarados (warehouse com `CAN_USE`, tabelas com `SELECT`).
   Toda tabela nova precisa ser declarada em `databricks.yml` e adicionada em *App resources*. Nunca peça `MODIFY` nem
   `CAN_MANAGE`.
4. **Sem segredos no código**: nenhum token, senha, host, ID de warehouse ou chave em arquivos. Configuração vem do
   `app.yaml` (`valueFrom`). Tudo em `client/` é visível no navegador.
5. **Sem dependências ou chamadas externas**: não adicione pacotes npm, CDNs, APIs ou imagens da internet.
6. **Dados sensíveis** (dados pessoais, salários, clientes): não exibir neste template. Exigem autorização do usuário
   (`user_api_scopes: [sql]`) e aprovação do time de dados.
7. **Erros e logs**: mensagem amigável na tela, sem stack trace ou SQL; logs sem dados pessoais.
8. **Não altere** `app.yaml`, `databricks.yml`, `server/` nem `package.json` sem pedir revisão a uma pessoa.
9. Ao terminar, mostre à pessoa o checklist de `docs/SEGURANCA.md` e quais tabelas precisam estar liberadas no app.

## Como publicar
No workspace: **Compute → Apps → Create app → Custom**. Em *App resources* adicione o **SQL warehouse** (Can use, chave
`sql-warehouse`) e cada **tabela** usada (Can select). Depois clique em **Deploy** e escolha esta pasta.
Compartilhe com grupos usando **Can use** e revise a aba **Security** do app depois do deploy.
