# Arquitetura — TechAssist OS

## Stack observada

Aplicação SPA em JavaScript/JSX, React, React Router, Vite, Bootstrap e React Bootstrap. Os modais de autenticação, criação e edição de OS e perfil usam `react-bootstrap/Modal`. ESLint está configurado; não existe script de testes automatizados no `package.json`.

## Estrutura atual

| Caminho | Responsabilidade |
| --- | --- |
| `src/main.jsx` | Monta React em StrictMode e importa CSS global/Bootstrap |
| `src/App.jsx` | Importa `App.css` e renderiza as rotas |
| `src/routes/AppRoutes.jsx` | Redirecionamento inicial, login, cadastro e dashboard |
| `src/pages/LoginPage.jsx` | Seleção de técnico e autenticação simulada |
| `src/pages/CadastroTecnicoPage.jsx` | Cadastro local e retorno ao login |
| `src/components/Dashboard/Dashboard.jsx` | Coordena estado, filtros, ordens, usuário e modais |
| `src/components/NavBar/navBar.jsx` | Identidade, perfil, troca e saída |
| `src/components/FilterBar/filterBars.jsx` | Busca, escopo, status e Nova OS |
| `src/components/KpiCards/kpiCards.jsx` | Calcula quatro indicadores sobre as ordens recebidas |
| `src/components/OSTable/OStable.jsx` | Tabela desktop, cartões mobile, estados e ações |
| `src/components/OSTable/OSDetailsModal.jsx` | Visualização e edição persistente de uma OS |
| `src/components/NovaOSModal/novaOSmodal.jsx` | Formulário controlado de criação |
| `src/components/AuthModal/authModal.jsx` | Confirmação demonstrativa na troca de técnico |
| `src/components/ProfileModal/profileModal.jsx` | Exibe dados de perfil |
| `src/components/services/apiServices.js` | Login demonstrativo, consulta, criação e atualização local de OS |
| `src/components/services/tecnicosService.js` | Fonte única, inicialização demo e persistência local de técnicos |
| `src/components/services/sessionService.js` | Sessão demonstrativa por ID de técnico |
| `src/components/services/osConstants.js` | Catálogo de status e formatação BRL |
| `src/index.css`, `src/App.css` | Estilos globais, estilos de template e de componentes |

## Fluxo de dados atual

1. `tecnicosService.getTecnicos()` lê `techassist_tecnicos`; somente quando a chave não existe, persiste os três técnicos demo. Lista vazia ou dados inválidos não são substituídos.
2. Cadastro usa `cadastrarTecnico()`, que preserva a lista, normaliza matrícula para rejeitar duplicatas ignorando espaços externos e caixa, e só confirma sucesso depois de gravar.
3. `apiService.login(tecnicoId, senha)` valida localmente e grava somente o ID do técnico em `techassist_sessao_demo`; não retorna token.
4. A rota `/dashboard` resolve e valida essa sessão. Troca de técnico atualiza a chave e logout a remove.
5. `apiService.getOrdens()` lê `techassist_ordens`; só grava os exemplos quando a chave ainda não existe. Dados legados são normalizados ao ler, incluindo valores BRL antigos em texto.
6. O Dashboard carrega a lista uma vez por tentativa e aplica busca, escopo do técnico ativo e status em uma única filtragem; KPIs recebem esse resultado.
7. `criarOS` valida e normaliza dados, resolve o nome do técnico e persiste a OS. `atualizarOS` valida status/campos e persiste as alterações.

Não há `fetch`, cliente HTTP, contrato de servidor, sincronização em tempo real nem proteção efetiva de dados.
Falhas de leitura, JSON inválido e falhas de escrita dos técnicos são comunicadas aos consumidores; os dados existentes não são apagados silenciosamente.

## Contratos atuais do serviço

| Método | Entrada | Saída e limitações |
| --- | --- | --- |
| `getTecnicos` | Nenhuma | Lista salva; sem chave, grava e retorna os exemplos demo; falhas são lançadas sem sobrescrever dados existentes |
| `cadastrarTecnico` | Objeto do técnico | Preserva a lista, valida matrícula sem distinguir caixa/espaços nas pontas e grava; erros de duplicidade/armazenamento são lançados |
| `login` | `tecnicoId`, `senha` | Promise com usuário público sem senha; cria sessão local demonstrativa ou rejeita credenciais |
| `getOrdens` | Nenhuma | Promise com OS persistidas; inicializa fixtures apenas se não existir chave; preserva JSON inválido e reporta erro |
| `criarOS` | `dadosOS` | Valida campos, telefone, valor e técnico; retorna e persiste OS com ID único, nome do técnico e valor numérico |
| `atualizarOS` | `id`, `alteracoes` | Valida e persiste alterações, incluindo status |

### Modelo de dados observado

- Técnico: `id`, `nome`, `cargo`, `matricula`, `unidade`, `osConcluidas`, `avaliacao`, `avatar`, `senha`. A senha existe nos exemplos e no armazenamento local.
- OS: `id`, `cliente`, `contato`, `equipamento`, `defeito`, `prioridade`, `status`, `data`, valor numérico, `tecnicoId`, `tecnicoNome`, `tipoEquipamento`, `acessorios`, `numSerie` e `condicaoFisica`.
- Valores antigos em formato textual BRL são convertidos para número na leitura; a apresentação usa `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.
- Armazenamento: `techassist_tecnicos`, `techassist_ordens` e `techassist_sessao_demo`, todos restritos ao navegador/origem.

## Limitações atuais

- A autenticação, a sessão e os dados são demonstrativos e locais; não há backend, autorização no servidor nem proteção para dados reais.
- As senhas de demonstração são mantidas localmente em texto simples; não devem ser reutilizadas.
- `localStorage` não sincroniza entre navegadores/dispositivos e pode ser apagado pelo usuário.
- A filtragem é aplicada no Dashboard após carregar a lista; não há paginação para grandes volumes.
- Build e lint foram verificados localmente no macOS; build Linux não foi executado nesta revisão.

## Evolução proposta, ainda não implementada

| Camada sugerida | Responsabilidade |
| --- | --- |
| `src/services/` | Repositório único de técnicos/OS e adaptadores de persistência |
| `src/data/` | Fixtures demonstrativas e inicialização controlada |
| `src/constants/` | Status, prioridades e tipos de equipamento |
| `src/context/` ou hook de sessão | Usuário ativo, entrada, saída e troca |
| `src/hooks/` | Consulta/criação de OS e estados de erro/carregamento |
| `src/utils/` | Busca defensiva e formatação de datas/moeda |
| `src/styles/` | Tokens e estilos compartilhados |

Migrar em passos pequenos. Não adicionar gerenciador global, TypeScript ou biblioteca de componentes nova sem necessidade concreta. O projeto atual não exige reescrita.

Proposta de modelo futuro: `valorCentavos` inteiro, `criadaEm` em ISO, ID estável e técnico referenciado por ID. Resolver nome a partir do repositório único. A migração deve atualizar fixtures, formulário, serviço e renderização juntos; não misturar os formatos antigo e novo silenciosamente.

Para produção, substituir o adaptador mock por API com autorização no servidor. Definir contrato, sessão e erros antes da integração. Não persistir senha de produção no navegador.

## Execução e validação

Na pasta do projeto: `npm ci`, `npm run dev`, `npm run lint`, `npm run build`; após build, `npm run preview`. Usar versão de Node compatível com os campos `engines` das dependências do lockfile. O servidor de hospedagem precisa encaminhar as rotas SPA para `index.html`.

Na revisão de 15/10/2026: `npm run lint` e `npm run build` passaram no macOS. O caminho versionado `src/components/AuthModal/authModal.jsx` foi confirmado por `git ls-files`, e o Dashboard importa exatamente esse caminho. Em navegador, foram testados criação, detalhes, edição do status, persistência após recarga, rolagem e rodapé visível em 390×500 px, bloqueio de fechamento durante salvamento, foco contido, Escape e retorno do foco ao acionador. O build em Linux e a suíte automatizada continuam pendentes.

Referências: [RULES.md](RULES.md), [TASKS.md](TASKS.md), [MEMORY.md](MEMORY.md).
