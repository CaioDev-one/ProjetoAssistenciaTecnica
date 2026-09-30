const CHAVE_TECNICOS = 'techassist_tecnicos';

const TECNICOS_DEMO = [
  {
    id: 1,
    nome: 'Caio Costa',
    cargo: 'Técnico Especialista Hardware',
    matricula: 'TECH-2026-01',
    unidade: 'São Paulo - Centro',
    osConcluidas: 148,
    avaliacao: '4.9 ★',
    avatar: 'CC',
    senha: '123456'
  },
  {
    id: 2,
    nome: 'Mariana Silva',
    cargo: 'Técnica Especialista Hardware',
    matricula: 'TECH-2026-02',
    unidade: 'São Paulo - Vila Olímpia',
    osConcluidas: 126,
    avaliacao: '4.8 ★',
    avatar: 'MS',
    senha: '123456'
  },
  {
    id: 3,
    nome: 'Lucas Mendes',
    cargo: 'Técnico Especialista Hardware',
    matricula: 'TECH-2026-03',
    unidade: 'Rio de Janeiro - Centro',
    osConcluidas: 171,
    avaliacao: '4.9 ★',
    avatar: 'LM',
    senha: '123456'
  }
];

const erroArmazenamento = (acao) => new Error(
  `Não foi possível ${acao} os técnicos no armazenamento local. Verifique as permissões e o espaço disponível no navegador.`
);

const validarLista = (tecnicos) => {
  if (!Array.isArray(tecnicos) || tecnicos.some((tecnico) => (
    !tecnico || typeof tecnico !== 'object' || tecnico.id == null ||
    typeof tecnico.nome !== 'string' || typeof tecnico.matricula !== 'string'
  ))) {
    throw new Error('Os técnicos salvos estão inválidos. Os dados foram preservados; corrija o armazenamento antes de continuar.');
  }

  return tecnicos;
};

export const getTecnicos = () => {
  let dadosSalvos;
  try {
    dadosSalvos = window.localStorage.getItem(CHAVE_TECNICOS);
  } catch {
    throw erroArmazenamento('ler');
  }

  if (dadosSalvos === null) {
    const tecnicosIniciais = TECNICOS_DEMO.map((tecnico) => ({ ...tecnico }));
    try {
      window.localStorage.setItem(CHAVE_TECNICOS, JSON.stringify(tecnicosIniciais));
    } catch {
      throw erroArmazenamento('inicializar');
    }
    return tecnicosIniciais;
  }

  let tecnicos;
  try {
    tecnicos = JSON.parse(dadosSalvos);
  } catch {
    throw new Error('Os técnicos salvos não puderam ser interpretados. Os dados foram preservados; corrija o armazenamento antes de continuar.');
  }

  return validarLista(tecnicos);
};

export const cadastrarTecnico = (novoTecnico) => {
  const tecnicos = getTecnicos();
  const matricula = String(novoTecnico.matricula ?? '').trim();
  const matriculaNormalizada = matricula.toLocaleLowerCase('pt-BR');

  if (!matricula) {
    throw new Error('Informe a matrícula do técnico.');
  }

  const duplicada = tecnicos.some((tecnico) => (
    tecnico.matricula.trim().toLocaleLowerCase('pt-BR') === matriculaNormalizada
  ));
  if (duplicada) {
    throw new Error('Já existe um técnico cadastrado com essa matrícula.');
  }

  const tecnico = { ...novoTecnico, matricula };
  const atualizados = [...tecnicos, tecnico];
  try {
    window.localStorage.setItem(CHAVE_TECNICOS, JSON.stringify(atualizados));
  } catch {
    throw erroArmazenamento('gravar');
  }

  return tecnico;
};