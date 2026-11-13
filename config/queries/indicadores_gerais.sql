-- Indicadores gerais da Lumora (base: vendas fictícias de 2026)
SELECT
  CAST(ROUND(SUM(v.quantidade * v.preco_unitario), 2) AS DOUBLE) AS receita_total,
  CAST(SUM(v.quantidade) AS BIGINT) AS itens_vendidos,
  CAST(COUNT(DISTINCT v.loja_id) AS BIGINT) AS lojas_ativas,
  CAST(MAX(v.data_venda) AS STRING) AS atualizado_ate
FROM serverless_stable_zza0u0_catalog.lumora_vendas.vendas v;
