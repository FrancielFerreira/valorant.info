# Spec

## Stack

- React 18.
- Vite.
- React Router DOM.
- Tailwind CSS.
- Valorant API publica.

## Rotas

- `/`: home.
- `/agentes`: listagem de agentes jogaveis.
- `/agentes/:agentId`: detalhes de agente.
- `/mapas`: listagem de mapas.
- `/modos`: listagem de modos de jogo.
- `/armas`: listagem de armas.
- `/skins`: listagem de skins por arma.
- `/skins/:skinId`: detalhes de skin.
- `/sprays`: listagem de sprays.
- `/sprays/:sprayId`: detalhes de spray.
- `/about`: pagina institucional herdada.
- `/contact`: pagina de contato herdada.

## Comportamento Esperado

- Cada pagina de listagem busca dados da Valorant API em `pt-BR`.
- Enquanto a API carrega, o usuario ve estado de loading.
- Se a API falha, o usuario ve estado de erro.
- Listagens com busca devem filtrar ignorando maiusculas/minusculas e acentos.
- Agentes devem permitir filtro por funcao: controlador, duelista, iniciador e sentinela, conforme dados retornados pela API.
- Ordenacao A-Z deve ser padrao.
- Ordenacao por data deve ignorar datas invalidas ou placeholder `1970-01-01`.
- Armas devem permitir filtro por categoria: pistolas, submetralhadoras, escopetas, fuzis, fuzis de precisao, metralhadoras e corpo a corpo.
- Skins devem permitir filtro por categoria de arma, arma especifica e edicao/raridade via `contentTierUuid`.
- Skins sem `contentTierUuid` devem aparecer como `Sem edicao`, sem assumir que vieram de passe de batalha.
- Sprays devem permitir filtro por tipo em select.
- Listagens grandes devem paginar com 48 itens por pagina.
- Cards navegaveis devem usar React Router, sem recarregar a pagina.

## Design

- Tema escuro tatico.
- Acento principal vermelho Valorant (`#ff4655`).
- Tipografia de display para titulos.
- Cards com bordas, gradientes e hover states.
- Layout responsivo mobile-first.
- Sidebar vira grade no mobile e menu lateral em telas medias.

## Dados

Os dados sao carregados diretamente da Valorant API em `pt-BR`.

Endpoints usados atualmente:

- `/agents?language=pt-BR&isPlayableCharacter=true`
- `/agents/:agentId?language=pt-BR`
- `/maps?language=pt-BR`
- `/gamemodes?language=pt-BR`
- `/weapons?language=pt-BR`
- `/weapons/skins/:skinId?language=pt-BR`
- `/sprays?language=pt-BR`
- `/sprays/:sprayId?language=pt-BR`
- `/contenttiers?language=pt-BR`

Uma camada de cache serverless pode ser adicionada futuramente se o projeto crescer.

## Estados E Erros

- `useFetch` centraliza `data`, `loading`, `error` e `request`.
- Paginas devem retornar `Loading` durante chamadas.
- Paginas devem retornar `Error` quando a chamada falhar.
- Paginas devem retornar `null` quando ainda nao ha dados nem loading ativo.
