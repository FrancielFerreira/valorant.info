# Plan

## Estado Atual

O projeto ja passou pelo MVP inicial e por tres features incrementais: detalhes de agentes, skins/sprays e filtros de listagem.

Branch atual: `main`.

Ultimo merge conhecido: `merge: add list search and sorting`.

## Arquitetura

- `src/main.jsx`: configuracao de rotas com React Router.
- `src/App.jsx`: layout base com header, aside, outlet e footer.
- `src/api/api.js`: fabrica de requests da Valorant API.
- `src/Hooks/useFetch.jsx`: hook de fetch reutilizavel.
- `src/Pages/`: paginas de listagem e detalhes.
- `src/Components/`: componentes compartilhados.
- `src/utils/listFilters.js`: busca, normalizacao e ordenacao de listas.
- `src/Components/Pagination.jsx`: paginacao reutilizavel para listas grandes.

## Validacao

Quando codigo for alterado, rodar:

```bash
npm run lint
npm run test
npm run build
```

Para documentacao pura, revisar `git diff` e garantir consistencia entre `brief`, `prd`, `spec`, `plan`, `tasks` e `notes`.

## Decisoes Tecnicas

- Manter consumo direto da Valorant API no frontend por enquanto.
- Evitar backend ate haver necessidade real de cache, limites, analytics ou transformacao de dados.
- Manter Tailwind inline nos componentes enquanto o design ainda esta pequeno.
- Usar branches por feature para mudancas nao triviais.
- Usar 48 itens por pagina em listas grandes, por ser menor que 50 e multiplo de 2 e 3 para o grid responsivo.

## Proximas Fases Possiveis

1. Sincronizar documentacao com o Nobre SDD Workflow.
2. Criar detalhes de mapas, armas e modos.
3. Melhorar acessibilidade e estados vazios.
4. Adicionar Docker/Devcontainer se o projeto virar estudo serio ou portfolio mais longo.
5. Planejar testes automatizados se o app continuar crescendo.

## Riscos Atuais

- Duplicacao de padroes entre paginas pode crescer se novas secoes forem adicionadas sem refatoracao leve.
- README ainda precisava sair do template Vite antes desta sincronizacao.
- A suite de testes ainda e inicial; paginas com fetch mockado e fluxos mais completos podem ser cobertos em fases futuras.
