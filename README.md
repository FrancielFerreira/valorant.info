# valorant.info

Wiki brasileira de Valorant feita com React, Vite e Tailwind CSS, consumindo dados publicos da [Valorant API](https://valorant-api.com/) em `pt-BR`.

## Funcionalidades

- Home com atalhos para as secoes principais.
- Listagem de agentes por funcao e detalhes de agentes.
- Listagem de mapas, modos de jogo e armas.
- Listagem de armas com filtro por categoria.
- Listagem de skins por categoria, arma, edicao e detalhes de skins.
- Listagem de sprays por tipo e detalhes de sprays.
- Busca e ordenacao nas listagens.
- Paginacao em listagens grandes.
- Estados de loading e erro.
- Rewrite para rotas SPA na Vercel.
- Cache em memoria para reduzir requests repetidos durante a mesma sessao.

## Stack

- React 18.
- Vite 5.
- React Router DOM 6.
- Tailwind CSS 3.
- ESLint.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validacao

```bash
npm run lint
npm run test
npm run build
```

## Testes

O projeto usa Vitest com Testing Library.

- `npm run test`: roda a suite uma vez, ideal para validar antes de finalizar uma tarefa.
- `npm run test:watch`: mantem os testes rodando durante o desenvolvimento.

A camada inicial cobre funcoes puras de filtro/ordenacao e componentes reutilizaveis sem depender da API externa.

## Workflow Com IA

Este projeto usa o Nobre SDD Workflow.

Antes de implementar novas features, leia:

- `AGENTS.md`
- `specs/001-initial/brief.md`
- `specs/001-initial/prd.md`
- `specs/001-initial/spec.md`
- `specs/001-initial/plan.md`
- `specs/001-initial/tasks.md`
- `specs/001-initial/notes.md`

Para mudancas nao triviais, escolha uma proxima fase, crie branch de feature, quebre em tarefas pequenas e valide com lint/test/build.
