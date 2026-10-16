# Memória do projeto — TechAssist OS

Registro de contexto e decisões para continuidade. Não é mecanismo automático de memória nem substitui o código atual. Não incluir credenciais ou dados reais de clientes.

## 15/10/2026 — revisão do commit 66e75af

### Correções

- O Dashboard importa `../AuthModal/authModal.jsx`, correspondente ao caminho versionado. `git ls-files` confirmou o casing; `npm run build` passou no macOS.
- NovaOSModal associa label de condição ao campo, define `id="nova-os-defeito"` no textarea e anuncia seleção de acessórios com `aria-pressed`.
- Formulários dos modais usam layout flexível, corpo rolável e rodapé fora da área de rolagem. OSDetailsModal bloqueia X, botão Fechar, Escape e backdrop enquanto salva.
- README, arquitetura e tarefas foram revisados para não descrever persistência em memória, token fictício ou ações Ver/Editar como estado atual.

### Verificação executada

- `npm run lint` e `npm run build`: aprovados no macOS; build Linux não executado.
- Navegador em 390×500 px: criação, detalhes, edição do status e persistência após recarga aprovadas.
- Corpo rolável: Nova OS 1.557 px/361 px; detalhes 764 px/332 px. Rodapés permaneceram visíveis.
- Durante salvamento deliberadamente atrasado, os dois comandos de fechar ficaram desabilitados; Escape e clique no backdrop não fecharam o modal.
- Tabulação permaneceu dentro dos modais de OS; Escape fechou e devolveu o foco ao acionador.
- A criação/edição usou armazenamento local isolado e restaurou os valores anteriores; ao concluir a verificação de teclado, foram removidas as chaves de OS/sessão de teste e preservada a lista demo de técnicos. Não foi adicionada suíte automatizada ao repositório.

### Pendências

- Validar build em Linux e cenários de falha de persistência.
- Testar no navegador filtros combinados, troca de técnico e navegação por teclado nos fluxos de login/cadastro/troca.
- Autenticação, senhas locais e persistência continuam apenas demonstrativas; não usar dados reais.

## 30/09/2026 — T02: fonte única de técnicos

### Entregue

- Criado `src/components/services/tecnicosService.js` como ponto único de leitura e cadastro em `techassist_tecnicos`.
- Os exemplos demo são gravados apenas quando a chave não existe. Cadastro preserva dados existentes e rejeita matrículas repetidas ignorando espaços nas pontas e diferenças de caixa.
- Login, autenticação simulada, Dashboard, troca de usuário e seletor de responsável da Nova OS usam a lista central.
- Erros de leitura, JSON inválido e gravação são exibidos sem apagar/substituir dados silenciosamente; cadastro não confirma sucesso se a gravação falhar.

### Verificação

- `npm run lint`: aprovado após remover um import `React` não utilizado que já existia no FilterBar.
- `npm run build`: aprovado no Windows. O import de `AuthModal` com capitalização divergente permanece como risco preexistente para sistemas sensíveis a caixa (T01); build Linux não executado.
- Fluxo de navegador: cadastro temporário, preservação dos três exemplos, login do novo técnico e seleção como responsável na Nova OS aprovados. Duplicidade com caixa/espaços diferentes bloqueada. JSON inválido, leitura bloqueada e escrita bloqueada comunicaram erro; lista anterior preservada. Dados de teste removidos/restaurados.
- O lint apontou inicialmente chamadas síncronas de `setState` em efeitos nos componentes alterados; substituídas por inicialização do estado, e lint final passou.

### Limites mantidos

- Autenticação, armazenamento de técnicos e ordens continuam demonstrativos e locais ao navegador. Nenhum backend ou outra tarefa foi implementado.
- O Dashboard ainda contém fallback para primeiro técnico ao abrir diretamente sem estado de navegação; guarda de rota/sessão é T06 e permanece pendente.

## 30/09/2026 — Revisão inicial e documentação

### Pedido do autor

Ler `ProjetoAssistenciaTecnica.zip`, acrescentar `PRD.md`, `ARCHITECTURE.md`, `RULES.md`, `DESIGN.md`, `TASKS.md` e `MEMORY.md`, e identificar possíveis melhorias de design.

### Entregue

- Seis documentos na raiz, específicos para os fontes recebidos.
- Inventário de arquitetura e contratos atuais, limitações de dados/sessão e backlog priorizado.
- Análise de design baseada no código, propostas por tela e tokens sugeridos.
- Fontes da aplicação preservados. Correções e redesign permanecem pendentes.
- Pacote de fontes/documentação sem `node_modules/` e `dist/`, ambos já ignorados pelo `.gitignore` original. Dependências devem ser reinstaladas pelo lockfile; build precisa ser regenerado após resolver o import divergente.

### Fatos confirmados por leitura

- Nome na interface: TechAssist OS; símbolo textual: FIX.
- Stack: React, React Router, Bootstrap e Vite; JavaScript/JSX.
- Rotas: `/` redireciona para `/login`; existem `/login`, `/cadastro-tecnico` e `/dashboard`.
- Autenticação e OS são simuladas. Técnicos cadastrados ficam em `localStorage`; ordens novas ficam em memória React.
- Import de AuthModal não corresponde à capitalização do arquivo.
- Serviço de “Minhas OS” usa o técnico 1; dashboard volta a filtrar pelo usuário ativo.
- Criação não preenche `tecnicoNome`; busca pode falhar quando chega a esse campo ausente.
- Listas de técnicos se repetem e não incorporam cadastro de modo uniforme.
- Ver/Editar não estão implementados; filtro não contém Pronto para Retirada.
- Há classes sem definição própria, estilos de template e modais sem gerenciamento completo de foco.
- Build antigo no ZIP precede alterações dos fontes; não representa necessariamente a aplicação atual.

### Decisões desta entrega

- Preservar a aplicação e documentar as correções em vez de tratar sugestões como implementadas.
- Manter português brasileiro, React/Bootstrap e identidade azul como base das propostas.
- Priorizar integridade de dados/filtros antes de acabamento visual.
- Documentar claramente demo versus produção.

### Propostas que ainda exigem decisão

- Persistência local de OS para a demo, com possibilidade futura de adaptador HTTP.
- KPIs por escopo Todas/Minhas, independentes da busca/status.
- Cartões de OS em celular e consolidação de tokens CSS.
- Fonte única de técnicos, política para exemplos e sessão demonstrativa.
- Backend, permissões e regras de transição de status.

### Evidências e limites

Foram lidos os fontes e configurações e conferida a resolução dos imports relativos. Foi encontrado um import local não resolvido: Dashboard → `../AuthModal/AuthModal.jsx`. Não foram executados npm install/ci, lint, build ou navegador. A revisão não certifica aparência renderizada, contraste ou funcionamento ponta a ponta.

### Próxima ação recomendada

Começar por T01 a T06 de [TASKS.md](TASKS.md). Depois consolidar o design conforme [DESIGN.md](DESIGN.md), registrando quais propostas foram aceitas e verificadas.

## Como atualizar este registro

Adicionar entradas cronológicas com data, pedido, alterações, decisões confirmadas, validação executada e pendências. Corrigir informações antigas que ficarem obsoletas, preservando o contexto da decisão. A documentação deve acompanhar a implementação, sem afirmar que planos já funcionam.
