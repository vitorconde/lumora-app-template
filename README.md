# Lumora · Template de apps de dados

Template oficial da **Lumora Distribuidora** (empresa fictícia) para criar apps de dados no **Databricks Apps**.
Já vem com a identidade visual do portal, o menu, componentes padrão (cabeçalho de página, indicadores) e
uma página de visão geral lendo as vendas no Unity Catalog.

## Usar no workspace (sem instalar nada)
1. **Workspace → Create → Git folder** e cole a URL deste repositório.
2. Abra o **Genie Code** na pasta e peça a página nova, por exemplo:
   _"Seguindo o AGENTS.md, crie uma página Vendas por região com receita por região e top 5 produtos."_
3. **Compute → Apps → Create app → Custom**. Em *App resources* adicione o *SQL warehouse* (`sql-warehouse`, Can use)
   e cada tabela usada (Can select). Faça o deploy a partir da pasta e confira o checklist de `docs/SEGURANCA.md`.

## Estrutura
| Pasta | O que tem |
|---|---|
| `config/queries/` | Consultas SQL (uma por arquivo) |
| `client/src/pages/` | Páginas do portal |
| `client/src/components/` | Componentes padrão Lumora |
| `AGENTS.md` | Regras que os assistentes de IA seguem (o Genie Code lê automaticamente) |
| `docs/MARCA.md` | Cores, logo, tipografia e textos |
| `docs/SEGURANCA.md` | Segurança no Databricks Apps e checklist de publicação |
| `client/public/marca/` | Arquivos oficiais do logo |

Feito com [Databricks AppKit](https://github.com/databricks/appkit). Dados fictícios.
