# Regras De IA Do Projeto

Este projeto usa o Nobre SDD Workflow para manter o trabalho com IA controlado, incremental e orientado por contexto.

## Fonte Canonica

- A documentacao principal fica em `specs/001-initial/`.
- Os arquivos `brief.md`, `prd.md`, `spec.md`, `plan.md` e `tasks.md` na raiz sao atalhos de leitura para compatibilidade.
- Antes de editar codigo, leia `specs/001-initial/brief.md`, `specs/001-initial/prd.md`, `specs/001-initial/spec.md`, `specs/001-initial/plan.md`, `specs/001-initial/tasks.md` e `specs/001-initial/notes.md`.

## Fluxo Obrigatorio

- Verificar `git status` antes de alterar arquivos.
- Nao implementar tarefas medias ou grandes sem revisar contexto, escopo e tarefas.
- Planejar e implementar em blocos pequenos, testaveis e revisaveis.
- Atualizar `specs/001-initial/tasks.md` quando uma nova fase for definida ou concluida.
- Atualizar `specs/001-initial/notes.md` quando houver decisao importante, aprendizado ou problema relevante.
- Rodar validacoes aplicaveis, no minimo `npm run lint`, `npm run test` e `npm run build` quando codigo React/Vite for alterado.
- Revisar `git diff` antes de finalizar.

## Ambiente

- Projeto React 18 + Vite + Tailwind CSS.
- O host WSL deve ser usado principalmente para git, gh, docker, opencode e comandos de projeto ja disponiveis.
- Nao assumir novas runtimes ou dependencias sem justificar.
- Se Docker/Devcontainer for adicionado no futuro, comandos de linguagem/framework devem preferir o container.

## Git E GitHub

- Trabalhar em branch por feature para mudancas nao triviais.
- Evitar alteracoes diretas em `main` salvo ajustes pequenos de documentacao ou quando explicitamente combinado.
- Nao commitar segredos, `.env`, caches, `node_modules` ou artefatos desnecessarios.
- Repos no GitHub devem comecar privados quando forem novos.

## Produto

- Manter o app como wiki brasileira simples e visual de Valorant.
- Preservar a identidade tatico/escura inspirada no jogo.
- Preferir melhorias pequenas, claras e manuteniveis a expansoes grandes sem escopo definido.
