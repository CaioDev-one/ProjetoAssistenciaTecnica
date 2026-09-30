# Memória do projeto — TechAssist OS

Registro de contexto e decisões para continuidade. Não é mecanismo automático de memória nem substitui o código atual. Não incluir credenciais ou dados reais de clientes.

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
