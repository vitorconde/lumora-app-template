# Lumora · Template de apps de dados

Template oficial da **Lumora Distribuidora** (empresa fictícia) para criar apps de dados no **Databricks Apps**.
Já vem com a identidade visual do portal, o menu, componentes padrão (cabeçalho de página, indicadores) e
uma página de visão geral lendo as vendas no Unity Catalog.

## Usar no workspace (sem instalar nada)
1. **Workspace → Create → Git folder** e cole a URL deste repositório.
2. Abra o **Genie Code** na pasta e peça a página nova, por exemplo:
   _"Seguindo o AGENTS.md, crie uma página Vendas por região com receita por região e top 5 produtos."_
3. **Compute → Apps → Create app → Custom**, adicione o recurso *SQL warehouse* (`sql-warehouse`) e faça o
   deploy a partir da pasta.

## Estrutura
| Pasta | O que tem |
|---|---|
| `config/queries/` | Consultas SQL (uma por arquivo) |
| `client/src/pages/` | Páginas do portal |
| `client/src/components/` | Componentes padrão Lumora |
| `AGENTS.md` | Padrões que os assistentes de IA seguem |

Feito com [Databricks AppKit](https://github.com/databricks/appkit). Dados fictícios.
