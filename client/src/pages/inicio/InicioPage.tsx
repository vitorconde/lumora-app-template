import { useAnalyticsQuery, BarChart, Card, CardContent, CardHeader, CardTitle } from '@databricks/appkit-ui/react';
import { PageHeader } from '../../components/PageHeader';
import { KpiCard } from '../../components/KpiCard';
import { formatBRL, formatNumero } from '../../lib/format';

export function InicioPage() {
  const { data, loading, error } = useAnalyticsQuery('indicadores_gerais', {});
  const kpi = data?.[0];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader title="Visão geral" description={kpi ? `Dados atualizados até ${kpi.atualizado_ate}` : 'Indicadores de vendas da Lumora'} />
      {error && <div className="text-destructive bg-destructive/10 p-3 rounded-md mb-4">Não foi possível carregar os indicadores agora. Tente novamente em alguns minutos.</div>}
      {!loading && !error && data && data.length === 0 && (
        <div className="text-muted-foreground bg-muted p-3 rounded-md mb-4">Nenhum dado para o período selecionado.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard label="Receita total" value={kpi ? formatBRL(Number(kpi.receita_total)) : undefined} loading={loading} />
        <KpiCard label="Itens vendidos" value={kpi ? formatNumero(Number(kpi.itens_vendidos)) : undefined} loading={loading} />
        <KpiCard label="Lojas ativas" value={kpi ? formatNumero(Number(kpi.lojas_ativas)) : undefined} loading={loading} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Receita por mês</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart queryKey="receita_mensal" parameters={{}} />
        </CardContent>
      </Card>
    </div>
  );
}
