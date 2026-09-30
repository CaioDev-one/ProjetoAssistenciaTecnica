# Regras de desenvolvimento — TechAssist OS

Estas são convenções propostas para as próximas mudanças. A presença deste arquivo não significa que ferramentas o carreguem automaticamente; colaboradores e assistentes devem ser orientados a consultá-lo.

## Contexto e escopo

1. Ler `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `TASKS.md` e o registro recente em `MEMORY.md` antes de mudanças relevantes.
2. Separar comportamento atual, decisão aceita e proposta. Não registrar tarefa como concluída sem implementação e verificação.
3. Manter a identidade TechAssist OS/FIX e o idioma português brasileiro, salvo solicitação do responsável.
4. Fazer mudanças focadas. Não migrar framework, reescrever a aplicação ou adicionar dependências apenas para reorganização visual.

## Código e dados

- Manter componentes funcionais e hooks. Preservar JavaScript/JSX enquanto não houver decisão de migração.
- Novos componentes e arquivos de componente devem usar PascalCase. Ao ajustar os existentes, corrigir todos os imports e testar caminhos sensíveis a maiúsculas/minúsculas.
- Manter regras de negócio e persistência nos serviços; componentes apresentam dados e disparam ações.
- Centralizar técnicos, status e prioridades. Não criar novas cópias de fixtures em páginas.
- Inicializar todos os campos controlados com tipos consistentes, incluindo strings opcionais vazias e arrays vazios.
- Usar IDs estáveis para entidades e `key`; não usar índices como identidade de OS.
- Tratar campos opcionais antes de buscar, formatar ou renderizar.
- Validar limites, espaços em branco, referências a técnicos e duplicidade de matrícula. Normalizar valores antes de salvar.
- Manter formatos de dados explícitos. Uma alteração de valor/data deve atualizar consumidores e documentar eventual migração.

## Estado e operações assíncronas

- Usar uma fonte de verdade para o técnico ativo. Não escolher automaticamente o técnico 1 quando a sessão falta.
- Evitar filtros contraditórios entre serviço e interface.
- Cada leitura/escrita deve prever carregamento, sucesso e erro. Cancelar ou ignorar respostas obsoletas quando necessário.
- Evitar envio duplicado e preservar formulário se a gravação falhar.
- Definir política de armazenamento para a demo e tratar JSON inválido, falha de leitura e falha de escrita.
- Persistência local é restrita ao mesmo navegador; não descrevê-la como compartilhamento entre usuários/dispositivos.

## Interface e acessibilidade

- Usar tokens de `DESIGN.md` na futura consolidação de estilos. Evitar cores, sombras e raios novos sem motivo.
- Não remover contorno de foco sem substituição visível.
- Associar `label` e campo, nomear botões de ícone e expor seleção dos filtros com semântica acessível.
- Modais devem controlar foco, fechar por Escape quando permitido, impedir interação com o fundo e devolver foco ao acionador.
- Status e urgência precisam de texto; cor sozinha não comunica o estado.
- Não exibir ações aparentemente disponíveis sem comportamento. Implementar ou comunicar indisponibilidade.
- Validar conteúdo longo, teclado e telas pequenas; não esconder overflow global para disfarçar defeitos de layout.
- Textos sobre segurança, tempo real, eficiência ou verificação devem corresponder à implementação.

## Segurança e demonstração

- Não versionar segredos nem usar credenciais reais nas fixtures.
- Manter visível que o login atual é demonstrativo. Senhas locais e token fictício não são autenticação de produção.
- Não transportar a solução de senhas em `localStorage` para produção.
- Backend futuro deve validar identidade, permissões e entradas independentemente do front-end.

## Verificação proporcional à mudança

- Documentação: conferir fidelidade ao código, links relativos, nomes e estado das tarefas.
- Alterações funcionais: executar lint/build e verificar o fluxo afetado; registrar falhas preexistentes separadamente.
- Regressões prioritárias: filtro por cada técnico, persistência de OS, busca com dados incompletos e cadastro consistente.
- Alterações visuais: conferir larguras de 360 a 1440 px, foco, contraste, textos longos e estados vazio/erro/carregamento.
- Não declarar build, lint, acessibilidade ou funcionamento aprovados sem executar a verificação correspondente.

## Documentação e entrega

- Atualizar arquitetura quando responsabilidades/contratos mudarem e PRD quando o comportamento esperado mudar.
- Marcar progresso em `TASKS.md`; registrar decisões, evidências e limitações em `MEMORY.md`.
- Não guardar dados pessoais reais, senhas ou tokens no histórico documental.
- Não versionar `node_modules/` ou `dist/`. O lockfile deve acompanhar as fontes.
- Em pacotes de entrega, indicar exclusão de dependências/arquivos gerados e instruções de instalação.
