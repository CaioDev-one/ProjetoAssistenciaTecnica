import { getTecnicos } from './tecnicosService.js';

const CHAVE_SESSAO = 'techassist_sessao_demo';

const limparSessao = () => {
  try {
    window.localStorage.removeItem(CHAVE_SESSAO);
  } catch {
    throw new Error('Não foi possível encerrar a sessão demonstrativa neste navegador.');
  }
};

export const iniciarSessao = (tecnico) => {
  try {
    window.localStorage.setItem(CHAVE_SESSAO, JSON.stringify({ tecnicoId: tecnico.id }));
  } catch {
    throw new Error('Não foi possível iniciar a sessão demonstrativa neste navegador.');
  }
};

export const encerrarSessao = limparSessao;

export const obterTecnicoAtivo = () => {
  let dadosSessao;
  try {
    dadosSessao = window.localStorage.getItem(CHAVE_SESSAO);
  } catch {
    throw new Error('Não foi possível ler a sessão demonstrativa neste navegador.');
  }
  if (dadosSessao === null) return null;

  let sessao;
  try {
    sessao = JSON.parse(dadosSessao);
  } catch {
    limparSessao();
    return null;
  }

  if (sessao?.tecnicoId == null) {
    limparSessao();
    return null;
  }

  const tecnico = getTecnicos().find((item) => String(item.id) === String(sessao.tecnicoId));
  if (!tecnico) {
    limparSessao();
    return null;
  }

  const tecnicoPublico = { ...tecnico };
  delete tecnicoPublico.senha;
  return tecnicoPublico;
};