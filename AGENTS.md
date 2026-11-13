# Padrões do portal de dados Lumora

Este repositório é o **template oficial** de apps de dados da Lumora Distribuidora.
Toda página nova segue os passos abaixo. Assistentes de IA (Genie Code, Claude Code, Cursor) devem seguir este arquivo.

## Dados
- Catálogo e schema: `serverless_stable_zza0u0_catalog.lumora_vendas`
- Tabelas: `vendas` (venda_id, data_venda, loja_id, produto_id, quantidade, preco_unitario),
  `lojas` (loja_id, loja, cidade, regiao), `produtos` (produto_id, produto, categoria, preco)
- Receita = `quantidade * preco_unitario`

## Como criar uma página
1. **Consulta**: crie `config/queries/<nome>.sql` (o nome do arquivo é a chave da consulta). Sempre use nomes completos de tabela e `CAST(... AS DOUBLE)` para valores.
2. **Página**: crie `client/src/pages/<nome>/<Nome>Page.tsx` usando os componentes de `client/src/components`:
   - `PageHeader` para título e descrição
   - `KpiCard` para indicadores, com `formatBRL` / `formatNumero` de `client/src/lib/format.ts`
   - gráficos do `@databricks/appkit-ui/react` (`BarChart`, `LineChart`, `DonutChart`) com `queryKey="<nome>"`
   - `useAnalyticsQuery('<nome>', {})` quando precisar dos valores
3. **Menu**: adicione a página na lista `PAGINAS` em `client/src/App.tsx`.

## Regras
- Textos da interface em português do Brasil.
- Não use cores fixas; use as variáveis de tema (`--lumora-azul`, `--lumora-ambar`, `--chart-1..5`).
- Não altere `app.yaml`, `databricks.yml` nem o cabeçalho do portal.
- Não crie endpoints próprios para consultas SQL: use sempre `config/queries`.

## Como publicar
No workspace: **Compute → Apps → Create app → Custom**, aponte para esta pasta e clique em **Deploy**.
