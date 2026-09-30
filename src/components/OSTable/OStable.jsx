export default function OSTable({ ordens, loading }) {
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Em Análise': return 'bg-warning-subtle text-warning-emphasis border border-warning-subtle';
      case 'Em Manutenção': return 'bg-primary-subtle text-primary-emphasis border border-primary-subtle';
      case 'Pronto para Retirada': return 'bg-info-subtle text-info-emphasis border border-info-subtle';
      case 'Finalizado': return 'bg-success-subtle text-success-emphasis border border-success-subtle';
      default: return 'bg-secondary-subtle text-secondary-emphasis';
    }
  };

  return (
    <div className="card border-0 shadow-sm overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 text-nowrap">
          <thead className="bg-light border-bottom">
            <tr>
              <th className="ps-4 py-3 text-uppercase text-muted fs-7 fw-bold">OS</th>
              <th className="py-3 text-uppercase text-muted fs-7 fw-bold">Cliente</th>
              <th className="py-3 text-uppercase text-muted fs-7 fw-bold">Equipamento / Defeito</th>
              <th className="py-3 text-uppercase text-muted fs-7 fw-bold">Técnico Responsável</th>
              <th className="py-3 text-uppercase text-muted fs-7 fw-bold">Data</th>
              <th className="py-3 text-uppercase text-muted fs-7 fw-bold">Status</th>
              <th className="py-3 text-uppercase text-muted fs-7 fw-bold">Valor</th>
              <th className="text-end pe-4 py-3 text-uppercase text-muted fs-7 fw-bold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-5 text-muted">
                  <div className="spinner-border spinner-border-sm me-2 text-primary" role="status"></div>
                  Carregando dados com segurança...
                </td>
              </tr>
            ) : ordens.length > 0 ? (
              ordens.map((os) => {
                const isUrgente = os.prioridade === 'Urgente';
                return (
                  <tr key={os.id}>
                    <td className="ps-4 fw-bold text-primary">#{os.id}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold fs-7 ${isUrgente ? 'bg-danger-subtle text-danger' : 'bg-secondary-subtle text-dark'}`} style={{ width: 32, height: 32 }}>
                          {os.cliente.charAt(0)}
                        </div>
                        <div>
                          <div className={`fw-bold ${isUrgente ? 'text-danger' : 'text-dark'}`}>{os.cliente}</div>
                          <div className="text-muted fs-7">{os.contato}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{os.equipamento}</div>
                      <div className="text-muted fs-7">{os.defeito}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border border-secondary-subtle fw-semibold px-2 py-1">
                        {os.tecnicoNome}
                      </span>
                    </td>
                    <td className="text-muted fs-7">{os.data}</td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 fw-semibold ${getBadgeStyle(os.status)}`}>
                        {os.status}
                      </span>
                    </td>
                    <td className="fw-bold text-dark">{os.valor}</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-sm btn-light border me-1 text-secondary fw-semibold">Ver</button>
                      <button className="btn btn-sm btn-outline-primary fw-semibold">Editar</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-5 text-muted">
                  <p className="mb-0 fs-6">Nenhuma ordem de serviço encontrada.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}