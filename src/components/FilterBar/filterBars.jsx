import { STATUS_OS, STATUS_TODOS } from '../services/osConstants.js';

export default function FilterBar({ 
  busca, 
  setBusca, 
  filtroApenasMinhas, 
  setFiltroApenasMinhas, 
  statusFiltro, 
  setStatusFiltro, 
  disabledNovaOS = false,
  onOpenModalOS 
}) {
  const statusOptions = [STATUS_TODOS, ...STATUS_OS];

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
      <div className="card-body p-3 p-lg-4">
        <div className="row g-3 align-items-center">
          
          {/* 1. BUSCA */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted rounded-start-3 ps-3" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <label htmlFor="dashboard-busca" className="visually-hidden">Buscar ordens por número, cliente, equipamento ou técnico</label>
              <input
                id="dashboard-busca"
                type="text"
                className="form-control bg-light border-start-0 ps-0 shadow-none rounded-end-3 fs-7"
                placeholder="Buscar cliente, equipamento..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>

          {/* 2. ESCOPO */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="d-flex bg-light p-1 rounded-3 border" role="group" aria-label="Escopo das ordens">
              <button
                type="button"
                className={`btn btn-sm w-50 rounded-2 fw-semibold border-0 fs-7 transition-all ${
                  !filtroApenasMinhas 
                    ? 'bg-white text-dark shadow-sm' 
                    : 'text-secondary bg-transparent'
                }`}
                aria-pressed={!filtroApenasMinhas}
                onClick={() => setFiltroApenasMinhas(false)}
              >
                Todas as OS
              </button>
              <button
                type="button"
                className={`btn btn-sm w-50 rounded-2 fw-semibold border-0 fs-7 transition-all ${
                  filtroApenasMinhas 
                    ? 'bg-white text-dark shadow-sm' 
                    : 'text-secondary bg-transparent'
                }`}
                aria-pressed={filtroApenasMinhas}
                onClick={() => setFiltroApenasMinhas(true)}
              >
                Minhas OS
              </button>
            </div>
          </div>

          {/* 3. STATUS (Centralizados com justify-content-md-center) */}
          <div className="col-12 col-md">
            <label htmlFor="dashboard-status-mobile" className="visually-hidden">Filtrar ordens por status</label>
            <select
              id="dashboard-status-mobile"
              className="form-select d-md-none"
              value={statusFiltro}
              onChange={(evento) => setStatusFiltro(evento.target.value)}
            >
              {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <div className="d-none d-md-flex align-items-center justify-content-center flex-wrap gap-2 py-1" role="group" aria-label="Filtrar ordens por status">
              {statusOptions.map((status) => {
                const active = statusFiltro === status;
                return (
                  <button
                    key={status}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 text-nowrap fw-semibold fs-7 flex-shrink-0 transition-all ${
                      active
                        ? 'btn-primary shadow-sm'
                        : 'btn-light text-secondary border-0'
                    }`}
                    aria-pressed={active}
                    onClick={() => setStatusFiltro(status)}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. BOTÃO NOVA OS */}
          <div className="col-12 col-md-auto ms-md-auto">
            <button 
              type="button"
              className="btn btn-primary fw-bold w-100 rounded-3 py-2 px-3 d-flex align-items-center justify-content-center gap-2 shadow-sm text-nowrap"
              disabled={disabledNovaOS}
              title={disabledNovaOS ? 'Técnicos indisponíveis por erro no armazenamento local.' : undefined}
              onClick={onOpenModalOS}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Nova OS</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}