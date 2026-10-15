export const STATUS_OS = Object.freeze([
  'Em Análise',
  'Em Manutenção',
  'Pronto para Retirada',
  'Finalizado',
]);

export const STATUS_TODOS = 'Todos';

export const formatarValorBRL = (valor) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(Number(valor) || 0);