# Tarefas — TechAssist OS

Atualizado em 30/09/2026. `[x]` significa concluído; `[ ]` significa pendente. As correções e propostas abaixo não foram implementadas nesta entrega.

## Entrega documental

- [x] Ler páginas, componentes, serviço, estilos, rotas e configuração.
- [x] Criar PRD, arquitetura, regras, análise de design, tarefas e memória na raiz.
- [x] Verificar resolução de imports locais e registrar a divergência de capitalização.

## P0 — Corrigir a base da demonstração

- [ ] **T01 — Corrigir import de AuthModal.** Arquivo: `src/components/Dashboard/Dashboard.jsx`; import procura `AuthModal.jsx`, arquivo é `authModal.jsx`. Escolher capitalização consistente. Aceite: imports resolvidos e `npm run build` aprovado em Linux.
- [x] **T02 — Unificar técnicos.** Implementado em `src/components/services/tecnicosService.js` e conectado ao login, cadastro, autenticação, Dashboard, menu/troca e Nova OS. Exemplos são persistidos somente quando a chave não existe; cadastro preserva a lista e rejeita matrícula duplicada ignorando espaços externos e caixa. Erros de leitura, JSON inválido e gravação são comunicados sem apagar dados.
- [ ] **T03 — Corrigir “Minhas OS”.** Arquivos: dashboard e `apiServices.js`. Remover identidade 1 fixa e unificar a filtragem. Aceite: técnicos 1, 2, 3 e recém-cadastrado recebem somente suas ordens; alternar usuário atualiza o resultado. Depende de T02.
- [ ] **T04 — Persistir OS no modo demo.** Arquivos: serviço e dashboard. Criar fonte única de ordens; não reconstruir exemplos a cada filtro. Aceite: criar OS, mudar filtros e atualizar a página mantém o registro no mesmo navegador; falha de armazenamento produz mensagem. Depende de T02.
- [ ] **T05 — Corrigir contrato de nova OS e busca.** Inicializar `numSerie`/`condicaoFisica`, resolver responsável, garantir ID estável e proteger campos opcionais. Aceite: criar OS e buscar termo sem correspondência não lança exceção; técnico aparece; nenhum aviso de input controlado. Depende de T02/T04.
- [ ] **T06 — Representar o modo demonstrativo corretamente.** Remover promessas de TLS/API, tempo real e dados de perfil sem fonte; definir sessão demonstrativa e guarda de navegação. Aceite: URL direta sem sessão redireciona ao login, sair encerra sessão e nenhum texto descreve o mock como segurança real.

## P1 — Interface e fluxos essenciais

- [ ] **T07 — Completar filtros e indicadores.** Incluir Pronto para Retirada e busca por número da OS; adicionar Limpar filtros. Confirmar escopo dos KPIs conforme PRD. Aceite: tabela/contagem correspondem aos filtros combinados e números têm escopo compreensível. Depende de T03/T05.
- [ ] **T08 — Unificar estilos.** Consolidar tokens, tipografia, raios e sombras; resolver utilitários sem definição e cor do título do login; revisar CSS inativo/tema. Aceite: login, cadastro e dashboard usam o padrão de DESIGN e funcionam com preferências clara/escura do sistema.
- [ ] **T09 — Adaptar tabela para celular.** Implementar cartões ou alternativa validada e quebra de textos longos, além de badge Urgente. Aceite: 360/390 px exibem informações essenciais e ações sem corte; desktop mantém tabela legível. Depende de T08.
- [ ] **T10 — Melhorar acessibilidade de formulários, menu e modais.** Associar labels, nomear ícones, restaurar foco, expor seleção e suportar teclado. Aceite: concluir login/criação/troca por teclado, Escape fechar quando permitido e foco retornar ao acionador. Depende de T08.
- [ ] **T11 — Estados de carregamento, erro, vazio e sucesso.** Tratar falhas de leitura/gravação; reativar loading; preservar formulário e permitir repetir. Aceite: falha simulada mostra mensagem, não perde dados e não duplica OS. Depende de T04/T05.
- [ ] **T12 — Implementar detalhes e edição.** Criar handlers e interface de Ver/Editar; definir transições de status antes de habilitá-las. Aceite: salvar reflete em lista/indicadores e permanece após recarga; cancelar não altera dados. Depende de T04/T05/T10/T11.
- [ ] **T13 — Revisar validação e metadados.** Rejeitar campos só com espaços e valores negativos, validar responsável e contato; usar `lang="pt-BR"` e título TechAssist OS em `index.html`. Aceite: mensagens próximas aos campos e valores/datas apresentados no padrão brasileiro.

## P2 — Preparação para evolução

- [ ] **T14 — Reduzir acoplamento.** Mover serviço para `src/services`, extrair constantes e hooks quando justificado, atualizar imports e arquitetura. Aceite: comportamento preservado, sem novas cópias de dados.
- [ ] **T15 — Atualizar README e verificações.** Substituir texto de template por setup, fluxo demo e limitações; adicionar testes de regressão para T03/T04/T05 e sessão, com ferramenta escolhida explicitamente. Aceite: lint/build e regressões executados com resultado registrado.
- [ ] **T16 — Planejar produção.** Definir backend, contrato, permissões, sessão e persistência. Aceite: decisão documentada antes de usar dados reais; validação e autorização executadas no servidor. Não implementar uma API fictícia apenas para cumprir esta tarefa.

## Ordem recomendada

T01 → T02 → T03/T04 → T05/T06 → T07 e melhorias de interface → T12 → organização e produção. Barras indicam trabalhos que não exigem ordem entre si, não autorização para execução automática por agentes.

## Cenários de regressão para a implementação

| Cenário | Resultado esperado |
| --- | --- |
| Mariana entra e seleciona Minhas OS | Exibe apenas ordens de Mariana |
| Lucas assume sessão com Minhas OS ativo | Lista passa a refletir Lucas |
| Nova OS seguida de busca sem correspondência | Lista vazia; nenhuma exceção |
| Nova OS seguida de alteração de status e recarga | Registro continua disponível ao limpar o filtro |
| Primeiro cadastro em navegador limpo | Fontes de técnicos continuam coerentes em todas as telas |
| Abertura direta do dashboard após sair | Redirecionamento para login |
| Falha ao salvar | Formulário preservado, erro legível, botão liberado para repetir |
| Celular e teclado | Campos, filtros, ações e modal acessíveis |

## Verificação desta entrega

T02 verificada em 30/09/2026: `npm run lint` e `npm run build` aprovados. No navegador, foi cadastrado um técnico temporário, confirmado na lista do login, autenticado e selecionado como responsável na Nova OS; o teste também bloqueou matrícula duplicada com caixa diferente e espaços externos. JSON inválido, falha de leitura e falha de gravação exibiram erro, sem substituir a lista existente. Os dados temporários foram removidos/restaurados após os testes.

Na primeira execução do lint foi apontado um import `React` não utilizado preexistente em `FilterBar`; removido no arquivo já alterado para desabilitar Nova OS quando técnicos não estão disponíveis. A execução final do lint passou. Build executado no Windows; o caminho de `AuthModal` com capitalização divergente continua como risco preexistente em sistemas sensíveis a caixa (T01), não coberto pelo build local. As demais tarefas continuam pendentes.
