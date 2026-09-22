# Instruções de Sistema para Agentes de IA

## Padrão de Versionamento e GitHub (Issues e PRs)

Para garantir a organização, rastreabilidade e qualidade do projeto, todos os agentes de IA que atuarem neste repositório devem considerar o seguinte fluxo de trabalho como **regra absoluta**:

1. **Issues Obrigatórias:**
   - Todo o trabalho realizado (seja uma **Correção/Bugfix**, uma **Melhoria** ou uma **Nova Funcionalidade**) deve ter uma Issue correspondente no GitHub.
   - O escopo do que será feito deve estar claro e associado a essa tarefa.

2. **Gerenciamento via Pull Requests (PRs) e Deploys:**
   - Modificações não devem ser empurradas diretamente para a branch principal (`main`/`master`).
   - O trabalho deve ser realizado em branches específicas (ex: `feature/nova-tela`, `fix/erro-login`).
   - Todo deploy e integração de código deve ser gerenciado através de **Pull Requests (PRs)**.

3. **Vinculação de PR e Issue:**
   - Ao preparar a documentação, os commits ou orientar a criação de um Pull Request, a descrição DEVE sempre referenciar a Issue que está sendo resolvida.
   - Utilize as palavras-chave padrão do GitHub na descrição do PR (ex: `Closes #123`, `Fixes #456`, `Resolves #789`) para fechamento e rastreamento automático.
