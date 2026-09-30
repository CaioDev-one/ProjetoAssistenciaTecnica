# PRD — TechAssist OS

Data da revisão: 30/09/2026. Base: código do ZIP fornecido pelo autor.

## Objetivo

Organizar o atendimento de uma assistência técnica: identificar o técnico, registrar equipamentos recebidos e acompanhar ordens de serviço (OS) por responsável e status.

O produto atual é um protótipo de front-end. Login e ordens usam um serviço simulado, sem chamadas HTTP, backend ou banco de dados. As propostas abaixo não devem ser interpretadas como funcionalidades entregues.

## Usuários e jornadas

- Técnico: entrar, consultar suas OS, buscar um atendimento e registrar uma nova OS.
- Equipe de atendimento (público proposto, sem papel próprio implementado): cadastrar recebimentos e consultar todas as OS.
- Administrador (evolução futura): gerenciar usuários e permissões. Não existe controle de papéis no código atual.

Jornada principal: `/login` → seleção de técnico e senha → `/dashboard` → consulta/filtro → Nova OS → preenchimento → criação → visualização na lista.

## Estado atual

| Área | Implementação observada | Limitação |
| --- | --- | --- |
| Login | Seleção de técnicos lidos pela fonte local compartilhada, senha, erro e envio | Validação local; token fictício e não utilizado como sessão |
| Cadastro de técnico | Cadastro preserva a lista central em `localStorage` e rejeita matrícula duplicada sem distinguir caixa/espaços externos | Armazenamento restrito ao navegador; erros de leitura/gravação impedem a operação e são exibidos |
| Dashboard | Navbar, quatro indicadores, filtros, tabela e lista central de técnicos para troca e Nova OS | Rota aberta diretamente; sem estado de navegação seleciona o primeiro técnico salvo |
| Consulta | Busca por cliente, equipamento e nome do técnico | Não busca por número da OS; nome do técnico ausente pode quebrar a busca |
| Filtros | Todas/Minhas e seleção de status | Serviço fixa técnico 1; filtro omite “Pronto para Retirada” |
| Nova OS | Formulário com cliente, contato, equipamento, defeito, acessórios, responsável, prioridade e valor | Registro apenas no estado React; desaparece ao recarregar ou refazer consulta |
| Perfil e troca | Modal de perfil e troca mediante senha simulada; menu recebe a lista central | Indicadores do perfil podem ser fictícios |
| Ver/Editar | Botões exibidos na tabela | Sem ação implementada |

## Escopo proposto para a próxima versão demonstrável

| ID | Requisito | Critério de aceite |
| --- | --- | --- |
| RF01 | Ter uma fonte única de técnicos | Técnico cadastrado aparece no login, menu e atribuição de OS; política de manutenção dos exemplos é explícita |
| RF02 | Definir sessão demonstrativa e proteger a navegação | Acesso direto sem sessão vai ao login; sair encerra a sessão; atualizar a página não seleciona silenciosamente outro técnico |
| RF03 | Corrigir filtro por responsável | Cada técnico vê somente suas OS em “Minhas OS”, inclusive após alternar usuário |
| RF04 | Persistir OS na demonstração | Criar, filtrar, navegar e atualizar a página preserva os registros no mesmo navegador |
| RF05 | Buscar e filtrar de forma combinada | Busca por OS, cliente, equipamento e técnico funciona com qualquer status e com dados incompletos, sem exceção |
| RF06 | Oferecer todos os status suportados | Todos, Em Análise, Em Manutenção, Pronto para Retirada e Finalizado estão disponíveis no filtro |
| RF07 | Validar nova OS | Campos obrigatórios rejeitam espaços; valor não aceita negativos; responsável válido é exibido na tabela |
| RF08 | Exibir e editar uma OS | “Ver” mostra dados completos; “Editar” salva mudanças e atualiza lista e indicadores |
| RF09 | Comunicar o estado das operações | Carregamento, erro com repetição, vazio e sucesso têm feedback claro, sem apagar o formulário em falha |

Sugestão para RF04: persistência local apenas para demonstração. A escolha de backend e armazenamento de produção permanece em aberto.

## Regras de produto propostas

- Nova OS começa em “Em Análise”. Fluxo sugerido: Em Análise → Em Manutenção → Pronto para Retirada → Finalizado. Confirmar reabertura e transições permitidas antes de implementá-las.
- Prioridade e status são conceitos distintos: uma OS pode estar em análise e ser urgente.
- “Finalizado” não é sinônimo de “Pronto para Retirada”.
- Proposta para indicadores: considerar o escopo Todas/Minhas; busca e status afetam a lista. Hoje todos os filtros afetam os indicadores. Confirmar essa mudança antes de aplicá-la e explicar o escopo na interface.
- Usar valores monetários numéricos e datas estruturadas internamente na evolução; formatar BRL e datas brasileiras na apresentação.
- Perfil sem informação deve mostrar “Não informado”; não gerar avaliações, eficiência ou verificações fictícias como se fossem fatos.

## Requisitos de qualidade

- Layout utilizável em 360, 390, 768, 1024 e 1440 px, sem corte de controles.
- Navegação por teclado, foco visível, rótulos associados e modais com retorno de foco.
- Ações de envio evitam duplicidade e mantêm os dados quando há erro.
- Instalação reproduzível pelo lockfile; build em sistema com caminhos sensíveis a maiúsculas e minúsculas.
- Demonstração identificada como tal. Autenticação real exige validação e autorização no servidor; bloquear rotas no React não substitui isso.

## Fora do escopo desta entrega

Esta entrega adiciona documentação e uma análise estática de design. Não implementa correções, redesign, API, publicação, emissão fiscal, impressão, pagamentos, WhatsApp, estoque ou relatórios.

## Decisões pendentes

1. O objetivo imediato é demonstração acadêmica/portfólio ou uso operacional?
2. Quem pode cadastrar técnicos e consultar OS de outras pessoas?
3. Os indicadores representam o escopo de trabalho ou os resultados filtrados?
4. Quais transições de status, campos de contato e regras de edição são obrigatórios?
5. Qual backend, política de sessão e armazenamento serão usados em produção?

Prioridades executáveis: [TASKS.md](TASKS.md). Interface: [DESIGN.md](DESIGN.md).
