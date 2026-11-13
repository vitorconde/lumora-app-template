# Guia de marca dos apps Lumora

Resumo para quem cria páginas (pessoas e assistentes de IA). As regras obrigatórias também estão no `AGENTS.md`.

## Cores
| Nome | Hex | Variável CSS | Onde usar |
|---|---|---|---|
| Azul Lumora | `#12395B` | `--lumora-azul` / `--primary` | cabeçalho, botões principais, primeira série dos gráficos |
| Âmbar Lumora | `#F2A33A` | `--lumora-ambar` | destaque pontual: linha do cabeçalho, 1 número ou 1 série em foco. No máximo 10% da tela |
| Azul médio | `#3E7CB1` | `--chart-3` | séries secundárias |
| Azul claro | `#8FB8DE` | `--chart-4` | séries de comparação, fundos de destaque |
| Cobre | `#C9792B` | `--chart-5` | quinta série, quando necessário |
| Fundo | `#F6F7F9` | `--background` | fundo das páginas |
| Texto | tema AppKit | `--foreground` / `--muted-foreground` | títulos / textos de apoio |
| Alerta e erro | tema AppKit | `--warning` / `--destructive` | só para estados de alerta e erro |

Regras:
- Use sempre as variáveis; **nunca escreva hex nem classes de cor do Tailwind** (`bg-blue-500`, `text-red-600`) nas páginas.
- Ordem das séries nos gráficos: `--chart-1` → `--chart-5`. No máximo 5 séries; acima disso, agrupe em "Outros".
- Vermelho só para erro ou valor negativo. Não use vermelho e verde como únicas formas de diferenciar informação.
- Contraste mínimo AA (4,5:1) para texto. Âmbar nunca é cor de texto sobre fundo branco.

## Logo
- Use o componente `LumoraLogo` (`client/src/components/LumoraLogo.tsx`) ou os arquivos de `client/public/marca/`:
  `lumora-simbolo.svg` (quadrado) e `lumora-logo-horizontal.svg` (símbolo + nome).
- O logo aparece **só no cabeçalho do portal**. Não repita o logo dentro das páginas.
- Não altere cores, proporção, rotação nem aplique sombra ou efeito. Tamanho mínimo: 24 px de altura.
- Área de respiro: no mínimo metade da altura do símbolo em volta do logo.
- Não use logos baixados da internet nem logos de parceiros sem aprovação de Marketing.

## Tipografia
- Fonte do sistema (padrão do AppKit). **Não carregue fontes externas** (Google Fonts, CDNs): além da marca, é uma regra de segurança.
- Hierarquia: título da página `text-2xl font-semibold` (via `PageHeader`); título de cartão `CardTitle`; números de indicador `text-3xl font-semibold` (via `KpiCard`).

## Textos
- Português do Brasil, frases curtas, termos de negócio ("Receita", "Lojas ativas"), sem jargão técnico.
- Valores em reais com `formatBRL`; números com `formatNumero` (`client/src/lib/format.ts`).
- Datas no formato `dd/mm/aaaa` ou "out/2026".
- Estados obrigatórios em toda página: carregando (Skeleton), sem dados ("Nenhum dado para o período selecionado") e erro amigável.
