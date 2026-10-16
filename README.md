# TechAssist OS

**Front-end para organização de ordens de serviço de uma assistência técnica.**

O TechAssist OS reúne cadastro de técnicos, consulta de atendimentos e criação de ordens de serviço em uma interface construída com React e Bootstrap. O projeto explora componentização, gerenciamento de estado, navegação entre páginas e armazenamento local.

> **Em desenvolvimento:** a versão atual é uma demonstração front-end. A autenticação é simulada e não há integração com backend ou banco de dados.

## Funcionalidades

- **Acesso demonstrativo:** seleção de técnico e validação local de senha.
- **Cadastro de técnicos:** armazenamento no navegador, validação de matrícula duplicada e tratamento de falhas de leitura e gravação.
- **Fonte única de técnicos:** login, cadastro, troca de usuário e atribuição de OS utilizam o mesmo serviço.
- **Dashboard:** indicadores calculados a partir das ordens filtradas.
- **Consulta de OS:** busca por número, cliente, equipamento, defeito, contato e técnico, com filtros por status e responsável.
- **Criação de OS:** validação de campos, telefone, técnico responsável e valor; ordens demonstrativas persistem no `localStorage`.
- **Visualização e edição:** detalhes da OS e alteração de campos/status com persistência local.
- **Sessão demonstrativa:** mantém o técnico ativo após recarga e a encerra ao sair; acesso direto sem sessão retorna ao login.
- **Telas pequenas:** cartões de OS e modais com corpo rolável e rodapé acessível.
- **Perfil do técnico:** cartão com identificação, cargo, matrícula, unidade e indicadores disponíveis.
- **Troca de técnico:** confirmação de senha demonstrativa antes de alternar o usuário.

As limitações restantes estão listadas em [Limitações atuais](#limitações-atuais).

## Tecnologias

| Tecnologia | Aplicação |
| --- | --- |
| React | Componentes e gerenciamento de estado |
| JavaScript / JSX | Lógica e estrutura da interface |
| React Router | Navegação entre páginas |
| Bootstrap | Grade, estilos e componentes visuais |
| React Bootstrap | Modais de autenticação, nova OS, detalhes/edição e perfil |
| Vite | Servidor de desenvolvimento e build |
| ESLint | Análise estática do código |
| localStorage | Persistência local de técnicos, ordens e sessão demonstrativa |

## Como executar

Tenha Git, Node.js e npm instalados. Utilize uma versão do Node.js compatível com as dependências do projeto.

### 1. Clone o repositório

```bash
git clone https://github.com/CaioDev-one/ProjetoAssistenciaTecnica.git
cd ProjetoAssistenciaTecnica
```

### 2. Instale as dependências

```bash
npm ci
```

O comando instala as dependências conforme o `package-lock.json`. A pasta `node_modules` não precisa ser versionada.

### 3. Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

Abra o endereço informado pelo Vite no terminal.

### Comandos disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run lint` | Executa a análise do ESLint |
| `npm run build` | Gera os arquivos de distribuição em `dist/` |
| `npm run preview` | Permite conferir localmente um build já gerado |

Na revisão do commit `66e75af`, `npm run lint` e `npm run build` foram executados e aprovados no macOS. O build não foi executado em Linux nesta revisão.

## Acesso à demonstração

Quando não há dados de técnicos salvos no navegador, o sistema inicializa os perfis de exemplo:

- Caio Costa
- Mariana Silva
- Lucas Mendes

Selecione um perfil de demonstração e utilize a credencial local configurada para esse perfil. Técnicos cadastrados usam a senha definida no cadastro.

Os técnicos ficam armazenados no navegador e na origem em que a aplicação é executada. Esses dados não são compartilhados automaticamente com outros dispositivos ou navegadores.

**Não utilize senhas reais nesta demonstração:** as senhas dos técnicos são armazenadas localmente em texto simples e a validação ocorre no front-end. A chave de sessão local não é uma credencial de segurança de produção.

## Estrutura principal

| Caminho | Responsabilidade |
| --- | --- |
| `src/main.jsx` | Inicialização da aplicação |
| `src/App.jsx` | Componente principal |
| `src/routes/AppRoutes.jsx` | Definição das rotas |
| `src/pages/LoginPage.jsx` | Tela de acesso |
| `src/pages/CadastroTecnicoPage.jsx` | Cadastro de técnicos |
| `src/components/Dashboard/` | Estado e composição do painel |
| `src/components/NavBar/` | Navegação e troca de técnico |
| `src/components/FilterBar/` | Busca e filtros |
| `src/components/KpiCards/` | Indicadores das ordens |
| `src/components/OSTable/` | Tabela de ordens de serviço |
| `src/components/NovaOSModal/` | Formulário de nova OS |
| `src/components/AuthModal/` | Confirmação de acesso na troca de técnico |
| `src/components/ProfileModal/` | Cartão de perfil |
| `src/components/services/apiServices.js` | Simulação de login, consulta e criação de OS |
| `src/components/services/tecnicosService.js` | Fonte única e persistência dos técnicos |
| `src/App.css` e `src/index.css` | Estilos da aplicação |

## Limitações atuais

- **Persistência é local ao navegador/origem:** não sincroniza entre dispositivos, navegadores ou usuários.
- **Autenticação é demonstrativa:** não há backend, autorização no servidor nem proteção de dados de produção.
- **Os técnicos, senhas e ordens de exemplo não representam uma operação real.**
- **Não existe suíte automatizada de regressão no pacote:** os fluxos manuais verificados estão registrados em [Documentos/TASKS.md](Documentos/TASKS.md).

## Próximos passos

- [x] Centralizar os técnicos em um serviço compartilhado.
- [x] Validar matrículas duplicadas no cadastro.
- [x] Reformular o modal de perfil como cartão.
- [x] Corrigir o filtro “Minhas OS” para o técnico ativo.
- [x] Persistir as ordens de serviço na demonstração local.
- [x] Completar dados de novas OS e proteger a busca contra campos ausentes.
- [x] Implementar visualização de detalhes e edição persistente.
- [x] Incluir todos os status disponíveis nos filtros.
- [x] Apresentar ordens em cartões em telas pequenas.
- [x] Melhorar rótulos, estados de seleção e comportamento de foco dos modais.
- [ ] Integrar backend, autenticação e banco de dados de produção.

## Autor

Desenvolvido por **Caio Cabral**.

[Perfil no GitHub](https://github.com/CaioDev-one)
