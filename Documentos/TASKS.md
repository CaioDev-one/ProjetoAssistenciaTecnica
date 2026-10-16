# Tarefas — TechAssist OS

Atualizado em 15/10/2026. `[x]` significa implementado e verificado no escopo descrito; `[ ]` significa pendente ou com verificação de aceite incompleta.

## Entrega documental

- [x] Ler páginas, componentes, serviço, estilos, rotas e configuração.
- [x] Criar PRD, arquitetura, regras, análise de design, tarefas e memória na raiz.
- [x] Corrigir o import de autenticação para usar exatamente a capitalização versionada e confirmar a resolução no build.

## P0 — Corrigir a base da demonstração

- [x] **T01 — Corrigir import de AuthModal.** O Dashboard importa `../AuthModal/authModal.jsx`, igual ao caminho retornado por `git ls-files`. `npm run build` passou no macOS. Build Linux continua pendente.
- [x] **T02 — Unificar técnicos.** Implementado em `src/components/services/tecnicosService.js` e conectado ao login, cadastro, autenticação, Dashboard, menu/troca e Nova OS. Exemplos são persistidos somente quando a chave não existe; cadastro preserva a lista e rejeita matrícula duplicada ignorando espaços externos e caixa. Erros de leitura, JSON inválido e gravação são comunicados sem apagar dados.
- [ ] **T03 — Corrigir “Minhas OS”.** Arquivos: dashboard e `apiServices.js`. Remover identidade 1 fixa e unificar a filtragem. Aceite: técnicos 1, 2, 3 e recém-cadastrado recebem somente suas ordens; alternar usuário atualiza o resultado. Depende de T02.
- [ ] **T04 — Persistir OS no modo demo.** `apiService` usa `techassist_ordens`, sem sobrescrever uma chave existente. Criação e persistência após recarga foram verificadas no navegador; combinação com filtros e falha de armazenamento ainda precisam de teste. Depende de T02.
- [ ] **T05 — Corrigir contrato de nova OS e busca.** Inicializar `numSerie`/`condicaoFisica`, resolver responsável, garantir ID estável e proteger campos opcionais. Aceite: criar OS e buscar termo sem correspondência não lança exceção; técnico aparece; nenhum aviso de input controlado. Depende de T02/T04.
- [ ] **T06 — Representar o modo demonstrativo corretamente.** Remover promessas de TLS/API, tempo real e dados de perfil sem fonte; definir sessão demonstrativa e guarda de navegação. Aceite: URL direta sem sessão redireciona ao login, sair encerra sessão e nenhum texto descreve o mock como segurança real.

## P1 — Interface e fluxos essenciais

- [ ] **T07 — Completar filtros e indicadores.** Incluir Pronto para Retirada e busca por número da OS; adicionar Limpar filtros. Confirmar escopo dos KPIs conforme PRD. Aceite: tabela/contagem correspondem aos filtros combinados e números têm escopo compreensível. Depende de T03/T05.
- [ ] **T08 — Unificar estilos.** Consolidar tokens, tipografia, raios e sombras; resolver utilitários sem definição e cor do título do login; revisar CSS inativo/tema. Aceite: login, cadastro e dashboard usam o padrão de DESIGN e funcionam com preferências clara/escura do sistema.
- [ ] **T09 — Adaptar tabela para celular.** Implementar cartões ou alternativa validada e quebra de textos longos, além de badge Urgente. Aceite: 360/390 px exibem informações essenciais e ações sem corte; desktop mantém tabela legível. Depende de T08.
- [x] **T10 — Melhorar acessibilidade dos modais de OS.** Campos de Nova OS têm labels associados; seleção de acessórios usa `aria-pressed`; foco permanece no modal, Escape fecha e o foco retorna ao acionador. Testado para Nova OS e detalhes/edição em navegador. Fluxos de cadastro e troca de técnico por teclado não foram revalidados nesta revisão.
- [ ] **T11 — Estados de carregamento, erro, vazio e sucesso.** Tratar falhas de leitura/gravação; reativar loading; preservar formulário e permitir repetir. Aceite: falha simulada mostra mensagem, não perde dados e não duplica OS. Depende de T04/T05.
- [x] **T12 — Implementar detalhes e edição.** “Ver” exibe detalhes; edição altera status/campos e persiste. Criação, visualização, edição de status e recarga foram testadas no navegador. Falha de gravação e cancelamento sem alteração ainda não foram testados.
- [x] **T17 — Corrigir rolagem e fechamento dos modais.** Formulários ocupam a área flexível, corpo rola internamente e rodapé permanece visível. Em OSDetailsModal, X, botão Fechar, Escape e backdrop não fecham durante salvamento. Verificado em 390×500 px e com salvamento deliberadamente atrasado.
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

## Verificação em 15/10/2026

- `npm run lint`: aprovado.
- `npm run build`: aprovado no macOS; ambiente Linux não foi usado.
- `git ls-files`: confirmou o caminho versionado `src/components/AuthModal/authModal.jsx`; o Dashboard usa a mesma capitalização.
- Navegador, viewport 390×500 px: criação de OS, abertura de detalhes, edição do status para Finalizado e persistência da edição após recarregar aprovadas.
- Rolagem: Nova OS mediu corpo de 1.557 px em área de 361 px; detalhes mediu 764 px em área de 332 px. Em ambas, rodapé ficou dentro da viewport.
- Durante edição com atraso simulado: X e botão Fechar desabilitados; Escape e clique no fundo mantiveram o modal aberto.
- Teclado: tabulação permaneceu contida nos modais de criação e detalhes; Escape fechou e foco retornou ao botão acionador.
- Ao final, as chaves de OS e sessão geradas para teste foram removidas; a lista de técnicos demo foi preservada. Não existe suíte Playwright versionada; os fluxos foram exercitados manualmente no navegador integrado.

Continuam pendentes as verificações completas de filtros combinados/alternância de técnico, falhas forçadas de leitura e gravação, build Linux e cadastro/troca de técnico por teclado.
