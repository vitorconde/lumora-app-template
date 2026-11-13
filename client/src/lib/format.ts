/** Formatação padrão de números do portal Lumora. */
export const formatBRL = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
export const formatNumero = (n: number) => n.toLocaleString('pt-BR');
