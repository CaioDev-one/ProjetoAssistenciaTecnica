# Design e experiência — TechAssist OS

## Escopo da avaliação

Revisão estática dos componentes JSX e estilos em 30/09/2026. Não houve renderização em navegador nem medição de contraste da interface final. Os problemas identificados no código estão separados de propostas e verificações visuais pendentes. Nenhuma alteração visual foi aplicada nesta entrega.

## Direção visual

Preservar azul, superfícies claras e a marca TechAssist OS/FIX. A interface já separa indicadores, filtros e tabela em componentes, usa uma grade responsiva nos KPIs e oferece feedback de envio no login e criação. A evolução deve priorizar leitura rápida, previsibilidade e uma aparência consistente entre login, cadastro e painel.

## Diagnóstico por tela

| Área | Evidência no código | Melhoria proposta |
| --- | --- | --- |
| Login | Bloco institucional vem antes do formulário também no celular | Resumir o bloco no mobile para aproximar o acesso do topo; manter composição em duas colunas no desktop |
| Título do login | `h1` recebe cor global de `index.css`, enquanto o painel pai é escuro | Definir cor do título explicitamente no componente/estilo da página; verificar contraste nos dois temas do sistema |
| Cadastro | Estilos inline, `outline: none` e labels sem associação | Compartilhar estilos de campo com login, restaurar foco visível e associar labels |
| Dashboard | Não há título principal de página antes dos indicadores | Adicionar “Ordens de serviço”, contexto do escopo e ação principal “Nova OS” |
| KPIs | Recebem `ordensFiltradas`; manutenção tem cor diferente do badge da tabela | Explicar o escopo dos números e padronizar a cor de cada status |
| Filtros | Grupo comprido com rolagem e scrollbar escondida; falta status de retirada | Incluir todos os estados; no mobile usar select de status ou quebra de linha com indicação clara de seleção |
| Tabela | Oito colunas e `text-nowrap` em toda a tabela | Permitir quebra em equipamento/defeito e criar cartões resumidos para celular |
| Urgência | Nome/avatar do cliente mudam para vermelho | Acrescentar badge textual “Urgente”, preservando legibilidade do nome |
| Ações | “Ver” e “Editar” não possuem handlers | Implementar as ações antes de dar aparência de recurso completo |
| Nova OS | Quatro blocos com borda/sombra; atalhos com `py-0`; modal com altura fixa relativa | Reduzir decoração, ampliar áreas clicáveis e manter rodapé acessível com rolagem interna |
| Perfil | Eficiência 98%, “Online” e conta verificada são apresentados sem fonte real | Remover ou identificar como exemplo; usar “Não informado” quando faltar dado |
| Estados | Vazio é genérico; leitura/criação não exibem todos os erros | Diferenciar ausência de OS e ausência de resultados; oferecer recuperação |

## Sistema visual proposto

Os valores abaixo são um ponto de partida para implementação e verificação, não tokens já aplicados.

| Token | Valor proposto | Uso |
| --- | --- | --- |
| `--color-primary` | `#2563EB` | Ação principal e seleção |
| `--color-primary-hover` | `#1D4ED8` | Hover de ações primárias |
| `--color-heading` | `#0F172A` | Títulos e navegação |
| `--color-text` | `#334155` | Texto principal |
| `--color-muted` | `#475569` | Texto secundário |
| `--color-page` | `#F8FAFC` | Fundo do painel |
| `--color-surface` | `#FFFFFF` | Cards, campos e modais |
| `--color-border` | `#E2E8F0` | Separadores e bordas decorativas |
| `--radius-control` | `8px` | Campos e botões |
| `--radius-card` | `12px` | Cards e tabela |
| `--radius-modal` | `16px` | Modais |
| `--shadow-card` | `0 2px 8px rgba(15,23,42,.06)` | Elevação discreta |

- Fonte: `system-ui, 'Segoe UI', sans-serif`; base de 16 px e entrelinha 1.5.
- Escala: título de página 28–32 px; seção 20 px; texto 16 px; metadados 14 px; número do KPI 28–32 px.
- Espaçamento: 4, 8, 12, 16, 24 e 32 px. Padding de página 16 px no celular e 24–32 px em telas maiores.
- Container sugerido: largura máxima de 1440 px, centralizado; ajustar após conferir a densidade da tabela.
- Altura alvo de controles: pelo menos 44 px nas interações principais e em dispositivos de toque.
- Foco: contorno visível de 2 px com offset; verificar visibilidade sobre a navbar escura.
- Validar contraste de texto e estados antes de aprovar os tokens; borda decorativa não deve ser a única pista de que um elemento é interativo.

### Mapa de status proposto

| Estado | Cor semântica | Texto / fundo sugeridos |
| --- | --- | --- |
| Em Análise | Âmbar | `#92400E` / `#FEF3C7` |
| Em Manutenção | Azul | `#1E40AF` / `#DBEAFE` |
| Pronto para Retirada | Ciano | `#155E75` / `#CFFAFE` |
| Finalizado | Verde | `#166534` / `#DCFCE7` |
| Urgente (prioridade) | Vermelho | `#991B1B` / `#FEE2E2` |

Aplicar o mesmo mapa à tabela, aos indicadores e às telas de detalhe. Manter os rótulos visíveis.

## Composição proposta do painel

1. Navbar compacta com marca e conta.
2. Cabeçalho com título, contexto e Nova OS como única ação primária de criação.
3. Indicadores com tamanhos consistentes e escopo explícito.
4. Filtros com busca, Todas/Minhas, status e opção “Limpar filtros” quando aplicável.
5. Contagem de resultados e tabela; em celular, lista de cartões com OS, cliente, equipamento, status e ações.

No desktop, permitir quebra no defeito e manter valores/ações compactos. Paginação é uma evolução quando o volume justificar; os três exemplos atuais não precisam dela.

## Modais e formulários

- Manter as quatro seções de Nova OS, com títulos claros e separadores discretos, sem sombra em cada bloco interno.
- No celular, usar uma coluna e modal amplo, com cabeçalho/rodapé acessíveis mesmo com teclado virtual aberto.
- Não transformar o formulário em múltiplas etapas sem evidência de necessidade.
- Mostrar quais campos são obrigatórios; conectar erros ao respectivo campo.
- Usar `type="tel"` para telefone e validação coerente com o formato aceito. Valor precisa de limite mínimo e formatação BRL na leitura.
- Troca de técnico deve manter foco contido no modal; fechar devolve foco ao botão inicial. Nomear botões “Fechar”.
- Reutilizar um comportamento de modal acessível; `react-bootstrap` já é uma dependência candidata, a ser avaliada antes de implementação.

## Textos sugeridos

| Atual | Proposta |
| --- | --- |
| “Dashboard em tempo real” | “Acompanhe suas ordens de serviço” |
| “Autenticação Segura” | “Confirmar troca de técnico” |
| “Senha enviada com criptografia TLS para a API” | “Acesso de demonstração com validação local” |
| “Carregando dados com segurança...” | “Carregando ordens de serviço...” |
| Vazio único | “Nenhuma OS cadastrada” ou “Nenhum resultado para estes filtros” |

## Consolidação do CSS

- `fs-7`, `fs-8` e `transition-all` aparecem no JSX, mas não possuem definição nos estilos próprios. Definir utilitários explícitos ou substituir por classes existentes adequadas.
- `.dashboard-container`, `.custom-modal`, `.filter-toggle-group` e `.filter-status-group` têm estilos sem aplicação nos componentes revisados. Não assumir que resolvem o layout atual.
- Remover estilos de template somente depois de mapear usos. `index.css` ainda contém cores roxas e alternância automática de tema não integrada ao restante da interface.
- Estabelecer importação deliberada: Bootstrap, base/tokens, componentes. Evitar correções globais que dependam acidentalmente da ordem de carregamento.
- Preferir `width: 100%` no layout e corrigir a causa de transbordamentos; `100vw` e `overflow-x: hidden` globais exigem revisão.

## Checklist para a futura implementação

- [ ] Conferir 360, 390, 768, 1024 e 1440 px com nomes e equipamentos longos.
- [ ] Conferir preferências clara/escura do sistema; não oferecer tema parcialmente aplicado.
- [ ] Percorrer login, cadastro, menu, filtros e modais apenas por teclado.
- [ ] Verificar contraste de texto, seleção, foco, erro e botões desabilitados.
- [ ] Testar 0, 1 e muitas OS, além de atraso e falha de gravação.
- [ ] Verificar zoom em 200%, rolagem de modal e teclado virtual.
- [ ] Registrar screenshots antes/depois na implementação, sem usar o `dist` antigo como fonte atual.

Execução por prioridade: [TASKS.md](TASKS.md).
