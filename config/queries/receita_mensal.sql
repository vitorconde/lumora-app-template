-- Receita por mês (todas as lojas)
SELECT
  date_format(date_trunc('MONTH', data_venda), 'yyyy-MM') AS mes,
  CAST(ROUND(SUM(quantidade * preco_unitario), 2) AS DOUBLE) AS receita
FROM serverless_stable_zza0u0_catalog.lumora_vendas.vendas
GROUP BY 1
ORDER BY 1;
