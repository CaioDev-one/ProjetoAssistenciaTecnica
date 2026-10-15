import { formatarValorBRL } from '../services/osConstants.js';

export default function OSTable({ ordens, loading, erro, onView, onEdit }) {
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
      <div className="table-responsive d-none d-lg-block">
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
                  Carregando ordens de serviço...
                </td>
              </tr>
            ) : erro ? (
              <tr><td colSpan="8" className="text-center py-5 text-muted">Não foi possível exibir as ordens.</td></tr>
            ) : ordens.length > 0 ? (
              ordens.map((os) => {
                const isUrgente = os.prioridade === 'Urgente';
                const nomeCliente = String(os.cliente ?? 'Cliente não informado');
                return (
                  <tr key={os.id}>
                    <td className="ps-4 fw-bold text-primary">#{os.id}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold fs-7 ${isUrgente ? 'bg-danger-subtle text-danger' : 'bg-secondary-subtle text-dark'}`} style={{ width: 32, height: 32 }}>
                          {nomeCliente.charAt(0)}
                        </div>
                        <div>
                          <div className={`fw-bold ${isUrgente ? 'text-danger' : 'text-dark'}`}>{nomeCliente}</div>
                          <div className="text-muted fs-7">{os.contato || 'Telefone não informado'}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{os.equipamento || 'Equipamento não informado'}</div>
                      <div className="text-muted fs-7">{os.defeito || 'Defeito não informado'}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border border-secondary-subtle fw-semibold px-2 py-1">
                        {os.tecnicoNome || 'Não atribuído'}
                      </span>
                    </td>
                    <td className="text-muted fs-7">{os.data}</td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 fw-semibold ${getBadgeStyle(os.status)}`}>
                        {os.status}
                      </span>
                    </td>
                    <td className="fw-bold text-dark">{formatarValorBRL(os.valor)}</td>
                    <td className="text-end pe-4">
                      <button type="button" className="btn btn-sm btn-light border me-1 text-secondary fw-semibold" aria-label={`Ver ordem ${os.id}`} onClick={() => onView(os)}>Ver</button>
                      <button type="button" className="btn btn-sm btn-outline-primary fw-semibold" aria-label={`Editar ordem ${os.id}`} onClick={() => onEdit(os)}>Editar</button>
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
      <div className="d-lg-none">
        {loading ? (
          <div className="p-4 text-center text-muted" role="status">Carregando ordens de serviço...</div>
        ) : erro ? (
          <div className="p-4 text-center text-muted">Não foi possível exibir as ordens.</div>
        ) : ordens.length ? ordens.map((os) => (
          <article className="border-bottom p-3" key={os.id}>
            <div className="d-flex justify-content-between align-items-start gap-2">
              <div>
                <div className="fw-bold text-primary">OS #{os.id}</div>
                <div className="fw-semibold text-break">{os.cliente || 'Cliente não informado'}</div>
              </div>
              <span className={`badge rounded-pill ${getBadgeStyle(os.status)}`}>{os.status || 'Status não informado'}</span>
            </div>
            <div className="small mt-2 text-break">{os.equipamento || 'Equipamento não informado'}</div>
            <div className="small text-secondary text-break">{os.defeito || 'Defeito não informado'}</div>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2 small">
              <span>{os.tecnicoNome || 'Não atribuído'} · {formatarValorBRL(os.valor)}</span>
              <span className="text-secondary">{os.data}</span>
            </div>
            <div className="d-flex gap-2 mt-3">
              <button type="button" className="btn btn-sm btn-light border" aria-label={`Ver ordem ${os.id}`} onClick={() => onView(os)}>Ver</button>
              <button type="button" className="btn btn-sm btn-outline-primary" aria-label={`Editar ordem ${os.id}`} onClick={() => onEdit(os)}>Editar</button>
            </div>
          </article>
        )) : (
          <p className="mb-0 p-4 text-center text-muted">Nenhuma ordem de serviço encontrada.</p>
        )}
      </div>
    </div>
  );
}