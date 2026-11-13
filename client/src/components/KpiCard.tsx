import { Card, CardContent, Skeleton } from '@databricks/appkit-ui/react';

/** Cartão de indicador padrão do portal Lumora. */
export function KpiCard({ label, value, loading }: { label: string; value?: string; loading?: boolean }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        {loading ? <Skeleton className="h-8 w-32 mt-2" /> : <p className="text-3xl font-semibold mt-1 text-foreground">{value ?? '—'}</p>}
      </CardContent>
    </Card>
  );
}
