# PRD

## Objetivo

Manter uma wiki MVP expandida de Valorant com navegacao clara, dados principais em portugues e interface com valor de portfolio.

## Publico

- Jogadores casuais que querem consultar conteudo rapidamente.
- Estudantes de frontend usando o projeto como referencia.
- Visitantes de portfolio avaliando UI, organizacao e consumo de API.

## Requisitos Funcionais

- Home deve apresentar o projeto e links para secoes principais.
- App deve listar agentes jogaveis.
- App deve exibir detalhes de agentes com descricao, funcao, origem, lancamento e habilidades.
- App deve listar mapas.
- App deve listar modos de jogo.
- App deve listar armas.
- App deve listar skins por arma.
- App deve exibir detalhes de skins com edicao, chromas e niveis.
- App deve listar sprays com filtro por tipo.
- App deve exibir detalhes de sprays com tipo e niveis.
- Listagens devem permitir busca textual quando aplicavel.
- Listagens devem ordenar A-Z e Z-A; quando houver data confiavel, tambem recentes/antigos.
- App deve exibir estados de loading e erro em chamadas de API.

## Requisitos Nao Funcionais

- Layout responsivo e mobile-first.
- Visual escuro, tatico e inspirado em Valorant.
- Codigo simples, sem estado global desnecessario.
- Dependencias limitadas a React, React Router, Vite e Tailwind no estado atual.
- Deploy deve suportar rotas SPA por rewrite.

## Fora Do Escopo Atual

- Login.
- Favoritos.
- Banco de dados proprio.
- Backend/cache serverless.
- Comparacao avancada entre armas, skins ou agentes.
- Testes automatizados E2E, ate uma fase especifica de qualidade ser planejada.

## Riscos

- A Valorant API pode mudar campos, retornar datas invalidas ou remover imagens.
- Muitas imagens podem afetar performance em listas grandes.
- Documentacao pode ficar desatualizada se novas features forem feitas sem atualizar `tasks.md` e `notes.md`.

## Mitigacoes

- Usar fallbacks visuais quando imagens ou textos faltarem.
- Manter filtros para reduzir volume de imagens em skins.
- Atualizar docs antes e depois de cada fase de feature.
