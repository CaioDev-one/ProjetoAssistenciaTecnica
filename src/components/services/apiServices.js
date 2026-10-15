import { getTecnicos } from './tecnicosService.js';
import { iniciarSessao } from './sessionService.js';
import { STATUS_OS } from './osConstants.js';

const CHAVE_ORDENS = 'techassist_ordens';
let contadorId = 0;

const ORDENS_DEMO = [
  { id: 1001, cliente: 'Ana Souza', contato: '(11) 98765-4321', equipamento: 'iPhone 13 - 128GB', defeito: 'Troca de Display', prioridade: 'Normal', status: 'Em Análise', data: '25/08/2026', valor: 0, tecnicoId: 1, tecnicoNome: 'Caio Costa' },
  { id: 1002, cliente: 'Carlos Lima', contato: '(11) 91234-5678', equipamento: 'Desktop Gamer - i7 / RTX 3060', defeito: 'Limpeza Preventiva & Pasta Térmica', prioridade: 'Urgente', status: 'Em Manutenção', data: '24/08/2026', valor: 250, tecnicoId: 2, tecnicoNome: 'Mariana Silva' },
  { id: 1003, cliente: 'Beatriz Ramos', contato: '(21) 99887-1122', equipamento: 'PlayStation 5', defeito: 'Troca de Fonte e Limpeza Interna', prioridade: 'Normal', status: 'Pronto para Retirada', data: '22/08/2026', valor: 280, tecnicoId: 3, tecnicoNome: 'Lucas Mendes' },
];

const erroArmazenamento = (acao) => new Error(
  `Não foi possível ${acao} as ordens no armazenamento local. Verifique as permissões e o espaço disponível no navegador.`
);

const parseValorLegado = (valor) => {
  if (typeof valor === 'number') return Number.isFinite(valor) ? valor : 0;
  const texto = String(valor ?? '').trim().replace(/R\$\s?/i, '');
  const normalizado = texto.includes(',')
    ? texto.replace(/\./g, '').replace(',', '.')
    : texto;
  const numero = Number(normalizado);
  return Number.isFinite(numero) ? numero : 0;
};

const formatarTelefone = (telefone) => {
  const digitos = String(telefone ?? '').replace(/\D/g, '');
  if (digitos.length !== 10 && digitos.length !== 11) {
    throw new Error('Informe um telefone com DDD e 10 ou 11 dígitos.');
  }
  const tamanhoPrefixo = digitos.length === 11 ? 5 : 4;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, tamanhoPrefixo + 2)}-${digitos.slice(tamanhoPrefixo + 2)}`;
};

const nomeTecnico = (tecnicos, tecnicoId) => (
  tecnicos.find((tecnico) => String(tecnico.id) === String(tecnicoId))?.nome || ''
);

const normalizarOrdem = (ordem, tecnicos) => ({
  ...ordem,
  cliente: String(ordem.cliente ?? ''),
  contato: String(ordem.contato ?? ''),
  equipamento: String(ordem.equipamento ?? ''),
  defeito: String(ordem.defeito ?? ''),
  acessorios: Array.isArray(ordem.acessorios) ? ordem.acessorios : [],
  numSerie: String(ordem.numSerie ?? ''),
  condicaoFisica: String(ordem.condicaoFisica ?? ''),
  tecnicoNome: nomeTecnico(tecnicos, ordem.tecnicoId) || String(ordem.tecnicoNome ?? ''),
  valor: parseValorLegado(ordem.valor),
});

const validarDadosOS = (dadosOS, tecnicos) => {
  for (const campo of ['cliente', 'equipamento', 'defeito']) {
    if (!String(dadosOS[campo] ?? '').trim()) {
      throw new Error('Preencha todos os campos obrigatórios.');
    }
  }

  const tecnico = tecnicos.find((item) => String(item.id) === String(dadosOS.tecnicoId));
  if (!tecnico) throw new Error('Selecione um técnico responsável válido.');

  const valorTexto = String(dadosOS.valor ?? '').trim();
  const valor = valorTexto === '' ? 0 : Number(valorTexto.replace(',', '.'));
  if (!Number.isFinite(valor) || valor < 0) {
    throw new Error('O valor estimado deve ser um número igual ou maior que zero.');
  }

  return {
    ...dadosOS,
    cliente: String(dadosOS.cliente).trim(),
    contato: formatarTelefone(dadosOS.contato),
    tipoEquipamento: String(dadosOS.tipoEquipamento ?? '').trim(),
    equipamento: String(dadosOS.equipamento).trim(),
    defeito: String(dadosOS.defeito).trim(),
    acessorios: Array.isArray(dadosOS.acessorios)
      ? dadosOS.acessorios.map((item) => String(item).trim()).filter(Boolean)
      : [],
    numSerie: String(dadosOS.numSerie ?? '').trim(),
    condicaoFisica: String(dadosOS.condicaoFisica ?? '').trim(),
    tecnicoId: tecnico.id,
    tecnicoNome: tecnico.nome,
    prioridade: String(dadosOS.prioridade ?? 'Normal').trim(),
    valor,
  };
};

const gerarId = (ordens) => {
  let id;
  do {
    id = globalThis.crypto?.randomUUID?.() || `OS-${Date.now()}-${contadorId++}`;
  } while (ordens.some((ordem) => String(ordem.id) === String(id)));
  return id;
};

const gravarOrdens = (ordens) => {
  try {
    window.localStorage.setItem(CHAVE_ORDENS, JSON.stringify(ordens));
  } catch {
    throw erroArmazenamento('gravar');
  }
};

export const apiService = {
  async login(tecnicoId, senha) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const tecnicos = getTecnicos();
    const tecnico = tecnicos.find((item) => Number(item.id) === Number(tecnicoId));

    if (!tecnico) {
      throw new Error('Técnico não encontrado.');
    }

    const senhaValida = typeof tecnico.senha === 'string' && tecnico.senha.length > 0 && tecnico.senha === String(senha);

    if (!senhaValida) {
      throw new Error('Credenciais inválidas. Verifique a senha.');
    }

    const usuario = { ...tecnico };
    delete usuario.senha;
    iniciarSessao(tecnico);
    return {
      user: usuario
    };
  },

  async getOrdens() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let dadosSalvos;
    try {
      dadosSalvos = window.localStorage.getItem(CHAVE_ORDENS);
    } catch {
      throw erroArmazenamento('ler');
    }

    const tecnicos = getTecnicos();
    if (dadosSalvos === null) {
      gravarOrdens(ORDENS_DEMO);
      return ORDENS_DEMO.map((ordem) => normalizarOrdem(ordem, tecnicos));
    }

    let ordens;
    try {
      ordens = JSON.parse(dadosSalvos);
    } catch {
      throw new Error('As ordens salvas não puderam ser interpretadas. Os dados foram preservados; corrija o armazenamento antes de continuar.');
    }
    if (!Array.isArray(ordens) || ordens.some((ordem) => !ordem || typeof ordem !== 'object' || ordem.id == null)) {
      throw new Error('As ordens salvas estão inválidas. Os dados foram preservados; corrija o armazenamento antes de continuar.');
    }
    return ordens.map((ordem) => normalizarOrdem(ordem, tecnicos));
  },

  async criarOS(dadosOS) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const ordens = await this.getOrdens();
    const tecnicos = getTecnicos();
    const dadosNormalizados = validarDadosOS(dadosOS, tecnicos);
    const novaOrdem = {
      id: gerarId(ordens),
      ...dadosNormalizados,
      status: 'Em Análise',
      data: new Date().toLocaleDateString('pt-BR'),
    };
    gravarOrdens([novaOrdem, ...ordens]);
    return novaOrdem;
  },

  async atualizarOS(id, alteracoes) {
    const ordens = await this.getOrdens();
    const tecnicos = getTecnicos();
    const indice = ordens.findIndex((ordem) => String(ordem.id) === String(id));
    if (indice < 0) throw new Error('A ordem de serviço não foi encontrada.');

    if (!STATUS_OS.includes(alteracoes.status)) {
      throw new Error('Selecione um status válido.');
    }
    const dadosNormalizados = validarDadosOS({ ...ordens[indice], ...alteracoes }, tecnicos);
    const atualizada = { ...ordens[indice], ...dadosNormalizados, status: alteracoes.status };
    const ordensAtualizadas = [...ordens];
    ordensAtualizadas[indice] = atualizada;
    gravarOrdens(ordensAtualizadas);
    return atualizada;
  },
};