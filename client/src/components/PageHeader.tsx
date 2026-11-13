import type { ReactNode } from 'react';

/** Cabeçalho padrão de toda página do portal Lumora. */
export function PageHeader({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}
