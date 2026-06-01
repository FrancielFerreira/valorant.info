# Notes

## Decisoes Tomadas

- `specs/001-initial/` passa a ser a fonte canonica da documentacao do projeto.
- Arquivos de documentacao na raiz permanecem como atalhos de compatibilidade para evitar confusao durante a transicao.
- O projeto continua sem backend proprio; consumo direto da Valorant API e suficiente para o estado atual.
- Validacao de codigo deve usar `npm run lint`, `npm run test` e `npm run build`.
- Antes de novas features de produto, o projeto tera uma camada inicial de testes com Vitest e Testing Library.

## Aprendizados

- O projeto evoluiu alem do MVP inicial: detalhes de agentes, skins, sprays e filtros ja foram implementados.
- A documentacao precisa ser atualizada junto com cada feature para evitar que a IA implemente com contexto antigo.
- A primeira camada de testes deve focar em comportamento estavel e facil de entender: funcoes puras, componentes simples e interacoes basicas.
- Componentes controlados em testes precisam simular o estado do componente pai para validar interacoes completas.
- O setup de testes limpa o DOM depois de cada teste para evitar que renders anteriores afetem os proximos.

## Problemas Encontrados

- PRD antigo dizia que paginas detalhadas estavam fora do escopo, mas o codigo ja possui detalhes para agentes, skins e sprays.
- Spec antiga nao listava rotas de skins, sprays e detalhes.
- README ainda continha texto padrao do template Vite.
- Nao havia `AGENTS.md` local nem `notes.md` do workflow.
- `npm audit --omit=dev` nao encontrou vulnerabilidades em dependencias de producao.
- `npm audit` completo reportou vulnerabilidades em dependencias de desenvolvimento ligadas a Vite/esbuild; o fix automatico exigiria upgrade potencialmente quebravel para Vite mais novo, entao nao foi aplicado sem uma fase propria.
- Vitest/build exibiram aviso de `Browserslist` desatualizado, sem bloquear a suite.
- Testes com React Router exibem avisos de future flags do React Router v7, sem bloquear a suite.

## Comandos Uteis

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run preview
```

## Links

- Valorant API: https://valorant-api.com/
- Repositorio remoto: https://github.com/FrancielFerreira/valorant.info.git

## Proximos Passos

- Concluir a fase `Feature: Testes Iniciais` antes de novas features de produto.
- Depois dos testes iniciais, escolher a proxima feature antes de codar.
- Candidatas naturais: detalhes de mapas/armas/modos, melhoria de README/acessibilidade ou Docker/Devcontainer.
- Criar branch de feature para qualquer mudanca nao trivial.
