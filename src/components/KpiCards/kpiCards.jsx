export default function KpiCards({ ordens, filtroApenasMinhas }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card border-0 shadow-sm p-3 border-start border-4 border-primary">
          <span className="text-uppercase text-muted fw-bold fs-7">Total de OS ({filtroApenasMinhas ? 'Minhas' : 'Geral'})</span>
          <h3 className="fw-bold mb-0 text-dark">{ordens.length}</h3>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card border-0 shadow-sm p-3 border-start border-4 border-warning">
          <span className="text-uppercase text-muted fw-bold fs-7">Em Análise</span>
          <h3 className="fw-bold mb-0 text-warning-emphasis">
            {ordens.filter(o => o.status === 'Em Análise').length}
          </h3>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card border-0 shadow-sm p-3 border-start border-4 border-info">
          <span className="text-uppercase text-muted fw-bold fs-7">Em Manutenção</span>
          <h3 className="fw-bold mb-0 text-info-emphasis">
            {ordens.filter(o => o.status === 'Em Manutenção').length}
          </h3>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card border-0 shadow-sm p-3 border-start border-4 border-success">
          <span className="text-uppercase text-muted fw-bold fs-7">Concluídas</span>
          <h3 className="fw-bold mb-0 text-success-emphasis">
            {ordens.filter(o => o.status === 'Finalizado').length}
          </h3>
        </div>
      </div>
    </div>
  );
}