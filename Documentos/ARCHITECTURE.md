# Arquitetura — TechAssist OS

## Stack observada

Aplicação SPA em JavaScript/JSX, React, React Router, Vite e Bootstrap. Versões resolvidas no `package-lock.json`: React 19.2.8, React Router DOM 7.18.3, Vite 8.2.2 e Bootstrap 5.3.8. `react-bootstrap` está declarado, mas os componentes revisados usam marcação e classes Bootstrap diretamente. ESLint está configurado. Não existe script de testes no `package.json`.

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
| `src/components/OSTable/OStable.jsx` | Tabela, carregamento e vazio |
| `src/components/NovaOSModal/novaOSmodal.jsx` | Formulário controlado de criação |
| `src/components/AuthModal/authModal.jsx` | Confirma senha na troca de técnico |
| `src/components/ProfileModal/profileModal.jsx` | Exibe dados de perfil |
| `src/components/services/apiServices.js` | Simula login, consulta e criação com atrasos artificiais |
| `src/index.css`, `src/App.css` | Estilos globais, estilos de template e de componentes |

## Fluxo de dados atual

1. Login lê técnicos do armazenamento, com fallback para exemplos locais.
2. `apiService.login(tecnicoId, senha)` valida localmente e retorna `{ token, user }`. O token é fictício.
3. Login passa `user` pelo estado da navegação. O dashboard usa esse estado ou o primeiro técnico da lista fixa.
4. O dashboard consulta `getOrdens` ao alterar escopo/status. O serviço recria os três exemplos a cada chamada.
5. `useMemo` aplica filtros novamente. O resultado alimenta tabela e KPIs.
6. `criarOS` retorna um objeto que é inserido no estado React. Não o grava em uma base durável.

Não há `fetch`, cliente HTTP, contrato de servidor, sincronização em tempo real nem proteção efetiva de dados.

## Contratos atuais do serviço

| Método | Entrada | Saída e limitações |
| --- | --- | --- |
| `login` | `tecnicoId`, `senha` | Promise com token fictício e usuário sem senha; pode rejeitar credenciais |
| `getOrdens` | `token`, `apenasMinhas=false`, `status='Todos'` | Promise de array fixo; token ignorado; “minhas” fixa `tecnicoId === 1` |
| `criarOS` | `token`, `dadosOS` | Promise de OS; ID aleatório de quatro dígitos, status/data/valor formatados; sem `tecnicoNome` derivado |

### Modelo de dados observado

- Técnico: `id`, `nome`, `cargo`, `matricula`, `unidade`, `osConcluidas`, `avaliacao`, `avatar`, `senha`. A senha existe nos exemplos e no armazenamento local.
- OS de exemplo: `id`, `cliente`, `contato`, `equipamento`, `defeito`, `prioridade`, `status`, `data`, `valor`, `tecnicoId`, `tecnicoNome`.
- Formulário acrescenta `tipoEquipamento`, `acessorios`, `numSerie` e `condicaoFisica`. Os dois últimos não estão inicializados em `novaOSInicial`.
- Armazenamento: chave `techassist_tecnicos`. Login e serviço usam os técnicos salvos quando o array não está vazio; dashboard mantém sua própria lista.

## Problemas arquiteturais confirmados por leitura

- Import de `../AuthModal/AuthModal.jsx` difere do arquivo `authModal.jsx`. A checagem estática não resolve esse caminho em Linux.
- Três definições de técnicos divergem. O primeiro cadastro grava somente o novo registro quando não havia armazenamento; login deixa de usar os exemplos, enquanto o dashboard continua exibindo-os.
- Filtro aplicado no serviço e no dashboard, com identidades diferentes; técnicos 2 e 3 podem receber lista vazia em “Minhas OS”.
- Trocar status/escopo recarrega exemplos e descarta OS criadas em memória.
- Nova OS não recebe `tecnicoNome`; a busca pode executar `undefined.toLowerCase()` quando cliente/equipamento não correspondem ao termo.
- Efeitos de leitura e criação não oferecem tratamento de erro completo; carregamento não é reativado nas novas consultas.
- Não há guarda da rota, sessão centralizada ou revogação no logout.
- `dist/` no ZIP foi gerado antes de alterações nos fontes; não deve servir como referência para a interface atual.

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

Nesta entrega não foram executados instalação, build, lint ou testes em navegador. Foi realizada leitura dos fontes e checagem dos imports locais. O import divergente precisa ser corrigido antes de considerar o build validado.

Referências: [RULES.md](RULES.md), [TASKS.md](TASKS.md), [MEMORY.md](MEMORY.md).
