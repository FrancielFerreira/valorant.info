# Tasks

## Baseline MVP

- [x] Clonar repositorio.
- [x] Validar baseline.
- [x] Remover dependencia `update` nao utilizada.
- [x] Criar documentacao curta do MVP.
- [x] Criar paginas de agentes, mapas, modos e armas.
- [x] Melhorar visual geral.
- [x] Adicionar rewrite da Vercel para SPA.
- [x] Rodar validacao final.

## Feature: Detalhes Dos Agentes

- [x] Criar branch `feature/agent-details`.
- [x] Adicionar rota `/agentes/:agentId`.
- [x] Tornar cards de agentes navegaveis.
- [x] Exibir descricao, funcao e habilidades do agente.
- [x] Rodar validacao final.

## Feature: Skins E Sprays

- [x] Criar branch `feature/skins-sprays`.
- [x] Adicionar rotas `/skins`, `/skins/:skinId`, `/sprays` e `/sprays/:sprayId`.
- [x] Criar listagem de skins com filtro por arma.
- [x] Criar listagem de sprays com filtro por tipo.
- [x] Criar paginas de detalhe para skins e sprays.
- [x] Rodar validacao final.

## Feature: Filtros De Listagem

- [x] Criar branch `feature/list-filters`.
- [x] Adicionar busca por texto nas abas principais.
- [x] Ordenar listas por A-Z como padrao.
- [x] Adicionar ordenacao Z-A.
- [x] Adicionar ordenacao por recentes/antigos onde a API tem data confiavel.
- [x] Rodar validacao final.

## Workflow: Sincronizacao SDD

- [x] Verificar estado Git e branch atual.
- [x] Criar `AGENTS.md` local do projeto.
- [x] Criar estrutura `specs/001-initial/`.
- [x] Atualizar brief, PRD, spec, plan e tasks para o estado real.
- [x] Criar `notes.md` com decisoes e proximos passos.
- [x] Atualizar README do projeto.
- [x] Revisar `git diff` final.

## Feature: Testes Iniciais

- [x] Escolher fase de testes antes de novas features de produto.
- [x] Criar branch `feature/initial-tests`.
- [x] Instalar Vitest, Testing Library e jsdom.
- [x] Configurar ambiente de testes do Vite.
- [x] Adicionar testes unitarios para `src/utils/listFilters.js`.
- [x] Adicionar testes de componente para `ListControls`.
- [x] Adicionar testes de componente para `Card`.
- [x] Atualizar README com comandos de teste.
- [x] Rodar `npm run lint`, `npm run test` e `npm run build`.
- [x] Revisar `git diff` final.

## Proxima Feature De Produto A Definir

- [ ] Escolher proxima fase de produto antes de codar.
- [ ] Criar branch apropriada para a proxima feature.
- [ ] Quebrar a fase em tarefas pequenas e testaveis.
- [ ] Definir validacoes antes da implementacao.
