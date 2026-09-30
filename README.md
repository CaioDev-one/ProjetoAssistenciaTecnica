# TechAssist OS

**Front-end para organização de ordens de serviço de uma assistência técnica.**

O TechAssist OS reúne cadastro de técnicos, consulta de atendimentos e criação de ordens de serviço em uma interface construída com React e Bootstrap. O projeto explora componentização, gerenciamento de estado, navegação entre páginas e armazenamento local.

> **Em desenvolvimento:** a versão atual é uma demonstração front-end. A autenticação é simulada e não há integração com backend ou banco de dados.

## Funcionalidades

- **Acesso demonstrativo:** seleção de técnico e validação local de senha.
- **Cadastro de técnicos:** armazenamento no navegador, validação de matrícula duplicada e tratamento de falhas de leitura e gravação.
- **Fonte única de técnicos:** login, cadastro, troca de usuário e atribuição de OS utilizam o mesmo serviço.
- **Dashboard:** indicadores calculados a partir das ordens exibidas.
- **Consulta de OS:** busca por cliente, equipamento e técnico, além de filtros por status e responsável.
- **Criação de OS:** formulário com cliente, contato, equipamento, defeito, acessórios, prioridade, responsável e valor estimado.
- **Perfil do técnico:** cartão com identificação, cargo, matrícula, unidade e indicadores disponíveis.
- **Troca de técnico:** confirmação de senha demonstrativa antes de alternar o usuário.

Alguns fluxos ainda precisam de correção ou implementação; consulte [Limitações atuais](#limitações-atuais).

## Tecnologias

| Tecnologia | Aplicação |
| --- | --- |
| React | Componentes e gerenciamento de estado |
| JavaScript / JSX | Lógica e estrutura da interface |
| React Router | Navegação entre páginas |
| Bootstrap | Grade, estilos e componentes visuais |
| React Bootstrap | Modal do perfil |
| Vite | Servidor de desenvolvimento e build |
| ESLint | Análise estática do código |
| localStorage | Persistência local dos técnicos |

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

A existência desses comandos não indica que o build ou o lint estejam aprovados na versão atual.

## Acesso à demonstração

Quando não há dados de técnicos salvos no navegador, o sistema inicializa os perfis de exemplo:

- Caio Costa
- Mariana Silva
- Lucas Mendes

Selecione um desses perfis e utilize a senha de demonstração `123456`. Para um técnico cadastrado por você, utilize a senha definida no cadastro.

Os técnicos ficam armazenados no navegador e na origem em que a aplicação é executada. Esses dados não são compartilhados automaticamente com outros dispositivos ou navegadores.

**Não utilize senhas reais nesta demonstração:** a validação ocorre no front-end e as senhas dos técnicos são armazenadas localmente, sem um serviço de autenticação de produção.

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

- **“Minhas OS” precisa de correção:** o serviço ainda utiliza o técnico de ID 1 na filtragem, em vez de receber o técnico conectado.
- **Ordens novas não são persistidas:** ficam no estado React e podem desaparecer ao atualizar a página ou refazer a consulta ao alterar filtros.
- **Busca após criação precisa de ajuste:** uma nova OS pode não conter `tecnicoNome`, campo usado na busca.
- **“Ver” e “Editar” ainda não têm ações implementadas.**
- **Não há sessão segura nem proteção de dados no servidor:** o login e o token são simulados.
- **Os dados e indicadores de exemplo não representam uma operação real**, nem uma integração em tempo real.

## Próximos passos

- [x] Centralizar os técnicos em um serviço compartilhado.
- [x] Validar matrículas duplicadas no cadastro.
- [x] Reformular o modal de perfil como cartão.
- [ ] Corrigir o filtro “Minhas OS” para todos os técnicos.
- [ ] Persistir as ordens de serviço.
- [ ] Completar os dados de novas OS e tornar a busca tolerante a campos ausentes.
- [ ] Implementar visualização de detalhes e edição.
- [ ] Incluir todos os status disponíveis nos filtros.
- [ ] Melhorar a apresentação das ordens em telas pequenas.
- [ ] Ampliar a acessibilidade e o tratamento de erros.
- [ ] Integrar backend, autenticação e banco de dados.

## Autor

Desenvolvido por **Caio Cabral**.

[Perfil no GitHub](https://github.com/CaioDev-one)
