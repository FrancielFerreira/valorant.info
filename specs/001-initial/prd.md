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
- App deve permitir filtrar agentes por funcao.
- App deve exibir detalhes de agentes com descricao, funcao, origem, lancamento e habilidades.
- App deve listar mapas.
- App deve listar modos de jogo.
- App deve listar armas.
- App deve permitir filtrar armas por categoria.
- App deve listar skins por categoria de arma, por arma e por edicao/raridade.
- App deve exibir detalhes de skins com edicao, chromas e niveis.
- App deve listar sprays com filtro por tipo.
- App deve exibir detalhes de sprays com tipo e niveis.
- Listagens devem permitir busca textual quando aplicavel.
- Listagens devem ordenar A-Z e Z-A; quando houver data confiavel, tambem recentes/antigos.
- Listagens grandes devem usar paginacao para evitar excesso de cards renderizados.
- App deve evitar chamadas repetidas para a mesma URL durante a mesma sessao de navegacao.
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
- Cache persistente entre sessoes.
- Comparacao avancada entre armas, skins ou agentes.
- Testes automatizados E2E, ate uma fase especifica de qualidade ser planejada.

## Riscos

- A Valorant API pode mudar campos, retornar datas invalidas ou remover imagens.
- Muitas imagens podem afetar performance em listas grandes.
- Filtros combinados podem confundir se nao houver contagem de resultados e paginacao clara.
- A API nao informa origem de aquisicao das skins, como passe de batalha ou loja, entao esse filtro nao deve ser inferido sem fonte confiavel.
- Documentacao pode ficar desatualizada se novas features forem feitas sem atualizar `tasks.md` e `notes.md`.

## Mitigacoes

- Usar fallbacks visuais quando imagens ou textos faltarem.
- Manter filtros para reduzir volume de imagens em skins.
- Usar selects consistentes para filtros de categoria, arma e tipo.
- Usar `contentTierUuid` para filtros confiaveis de edicao/raridade das skins.
- Limitar listas grandes a 48 itens por pagina, preservando grids de 2 ou 3 colunas.
- Usar cache em memoria no frontend para respostas bem-sucedidas da API, sem salvar erros.
- Atualizar docs antes e depois de cada fase de feature.
