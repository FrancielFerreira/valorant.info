# Brief

## Contexto

Valorant Info e uma wiki brasileira de hobby para consultar informacoes principais de Valorant usando a Valorant API publica.

O projeto tambem serve como laboratorio/portfolio para praticar React, Vite, Tailwind CSS, consumo de API e desenvolvimento assistido por IA com controle de escopo.

## Objetivo

Entregar uma experiencia visual inspirada em Valorant, responsiva e simples de manter, com secoes navegaveis para consultar conteudo essencial do jogo em portugues.

## Escopo Atual

- Home com acesso rapido as secoes.
- Listagem de agentes jogaveis.
- Detalhes de agentes.
- Listagem de mapas.
- Listagem de modos de jogo.
- Listagem de armas.
- Listagem e detalhes de skins.
- Listagem e detalhes de sprays.
- Busca e ordenacao nas listagens principais.
- Estados de loading e erro.
- Deploy SPA na Vercel.

## Restricoes

- Dados carregados diretamente da Valorant API publica em `pt-BR`.
- Sem login, banco de dados proprio ou backend dedicado no estado atual.
- Evitar dependencias novas sem justificativa clara.
- Priorizar mudancas pequenas e testaveis.

## Criterios De Sucesso

- Usuario consegue navegar pelas secoes principais sem quebrar rotas.
- Listagens carregam dados da API com estados de loading e erro.
- O visual permanece consistente com a identidade tatico/escura do app.
- `npm run lint`, `npm run test` e `npm run build` passam quando houver alteracao de codigo.
