import { getTecnicos } from './tecnicosService.js';

export const apiService = {
  async login(tecnicoId, senha) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const tecnicos = getTecnicos();
    const tecnico = tecnicos.find((item) => Number(item.id) === Number(tecnicoId));

    if (!tecnico) {
      throw new Error('Técnico não encontrado.');
    }

    const senhaValida = String(tecnico.senha ?? '123456') === String(senha);

    if (!senhaValida) {
      throw new Error('Credenciais inválidas. Verifique a senha.');
    }

    return {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      user: {
        id: tecnico.id,
        nome: tecnico.nome,
        cargo: tecnico.cargo,
        matricula: tecnico.matricula,
        unidade: tecnico.unidade,
        osConcluidas: tecnico.osConcluidas,
        avaliacao: tecnico.avaliacao,
        avatar: tecnico.avatar
      }
    };
  },

  async getOrdens(token, apenasMinhas = false, status = 'Todos') {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const ordens = [
      { id: 1001, cliente: 'Ana Souza', contato: '(11) 98765-4321', equipamento: 'iPhone 13 - 128GB', defeito: 'Troca de Display', prioridade: 'Normal', status: 'Em Análise', data: '25/08/2026', valor: 'R$ 0,00', tecnicoId: 1, tecnicoNome: 'Caio Costa' },
      { id: 1002, cliente: 'Carlos Lima', contato: '(11) 91234-5678', equipamento: 'Desktop Gamer - i7 / RTX 3060', defeito: 'Limpeza Preventiva & Pasta Térmica', prioridade: 'Urgente', status: 'Em Manutenção', data: '24/08/2026', valor: 'R$ 250,00', tecnicoId: 2, tecnicoNome: 'Mariana Silva' },
      { id: 1003, cliente: 'Beatriz Ramos', contato: '(21) 99887-1122', equipamento: 'PlayStation 5', defeito: 'Troca de Fonte e Limpeza Interna', prioridade: 'Normal', status: 'Pronto para Retirada', data: '22/08/2026', valor: 'R$ 280,00', tecnicoId: 3, tecnicoNome: 'Lucas Mendes' }
    ];
    return ordens.filter((ordem) =>
      (!apenasMinhas || ordem.tecnicoId === 1) &&
      (status === 'Todos' || ordem.status === status)
    );
  },

  async criarOS(token, dadosOS) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: Math.floor(1000 + Math.random() * 9000),
      ...dadosOS,
      status: 'Em Análise',
      data: new Date().toLocaleDateString('pt-BR'),
      valor: dadosOS.valor ? `R$ ${parseFloat(dadosOS.valor).toFixed(2)}` : 'R$ 0,00'
    };
  }
};