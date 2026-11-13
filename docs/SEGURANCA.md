# Segurança dos apps Lumora no Databricks Apps

As regras obrigatórias estão resumidas no `AGENTS.md`. Este documento explica o porquê e traz o checklist de publicação.
Referência oficial: https://docs.databricks.com/aws/en/dev-tools/databricks-apps/best-practices

## 1. Como o app acessa os dados
- Cada app tem um **service principal (SP) próprio**. Por padrão, todas as consultas rodam com a identidade desse SP,
  e todos os usuários do app veem os mesmos dados.
- O SP só enxerga o que for declarado como **recurso do app** (`databricks.yml` e a tela *App resources*):
  - SQL warehouse: `CAN_USE`
  - cada tabela usada nas consultas: `SELECT` (**nunca** `MODIFY` sem aprovação do time de dados)
- **Toda tabela nova usada numa consulta precisa entrar como recurso**; sem isso o build falha com `INSUFFICIENT_PERMISSIONS`.
  Isso é intencional: o app não enxerga nada além do que foi liberado.
- **Autorização do usuário (on-behalf-of, `user_api_scopes`)**: necessária quando cada pessoa deve ver só os dados que ela tem
  permissão de ver (por exemplo, por região ou com máscaras do Unity Catalog). Só ative com aprovação do time de dados e peça
  apenas o escopo `sql`.
- Dados sensíveis (dados pessoais, salários, dados de clientes) **não** entram em apps com SP compartilhado: use autorização do
  usuário e as máscaras e filtros de linha do Unity Catalog.

## 2. Consultas SQL
- Consultas só em `config/queries/*.sql`, chamadas pelo `useAnalyticsQuery` ou pelos gráficos com `queryKey`.
- Valores escolhidos pelo usuário (filtros, datas, região) entram **somente como parâmetros**: `-- @param regiao STRING` no
  arquivo SQL, `:regiao` na consulta e `sql.string(...)`, `sql.number(...)` ou `sql.date(...)` no front-end.
  **Nunca** monte SQL concatenando texto.
- Somente leitura: nada de `INSERT`, `UPDATE`, `DELETE`, `MERGE`, `DROP`, `CREATE` ou `GRANT` nas consultas do app.
- Prefira dados agregados. Se precisar listar linhas, use `LIMIT` (máx. 1.000) e mostre só as colunas necessárias.
- Use sempre nomes completos (`catalogo.schema.tabela`) das tabelas aprovadas.

## 3. Segredos e configuração
- Nenhum token, senha, chave de API, host ou ID de recurso no código. Valores vêm de recursos e variáveis de ambiente
  (`valueFrom` no `app.yaml`); segredos ficam em *secret scopes* declarados como recurso.
- Código em `client/` vai para o navegador de quem usa o app: **nada sensível no front-end**, nem em comentários.
- `.env` é só para desenvolvimento local e nunca vai para o Git (já está no `.gitignore`).

## 4. Código e dependências
- Não adicione pacotes npm sem aprovação; mantenha o `package-lock.json` versionado (builds reproduzíveis).
- Nada de chamadas para serviços externos, CDNs, fontes ou imagens da internet. O app fala só com o workspace.
- Não crie endpoints próprios no servidor para rodar SQL; não altere `server/`, `app.yaml` nem `databricks.yml` sem revisão.
- Erros na tela com mensagem amigável; nunca mostre stack trace, SQL ou detalhes internos ao usuário.
- Logs só em stdout/stderr e sem dados pessoais ou valores sensíveis.

## 5. Compartilhamento e ambientes
- Compartilhe o app com **grupos**, usando `CAN USE`. `CAN MANAGE` só para os donos do app.
- Desenvolvimento e produção em apps (de preferência workspaces) separados; publique em produção só a partir do repositório
  revisado (pull request).
- Se alguém sair do time, revise os donos do app.

## Checklist antes de publicar
- [ ] Todas as tabelas usadas estão declaradas como recurso, com `SELECT`.
- [ ] Nenhuma consulta concatena texto do usuário; filtros usam parâmetros.
- [ ] Nenhum segredo, token, host ou ID no código.
- [ ] Nenhuma dependência nova nem chamada externa.
- [ ] Página tem estados de carregando, sem dados e erro amigável.
- [ ] Cores e logo seguem `docs/MARCA.md`.
- [ ] Revisei a aba **Security** do app no workspace (resultado da varredura de código) depois do deploy.
- [ ] App compartilhado com o grupo certo, com `CAN USE`.
