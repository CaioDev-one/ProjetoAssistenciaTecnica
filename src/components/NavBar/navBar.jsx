import { useNavigate } from 'react-router-dom';

export default function Navbar({ tecnicoLogado, tecnicos, showMenu, setShowMenu, setShowPerfil, onIniciarTrocaTecnico, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowMenu(false);
    if (onLogout) {
      onLogout();
      return;
    }
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 px-md-4 py-2 border-bottom border-secondary-subtle shadow-sm">
      <div className="container-fluid px-0">
        <span className="navbar-brand fw-bold d-flex align-items-center gap-2 m-0">
          <span className="bg-primary px-2 py-1 rounded fs-6 text-white shadow-sm">FIX</span>
          TechAssist OS
        </span>

        <div className="position-relative">
          <button 
            className="btn btn-outline-light border-secondary p-2 d-flex align-items-center gap-2 rounded-3"
            type="button"
            aria-label={`Menu do técnico ${tecnicoLogado.nome}`}
            aria-expanded={showMenu}
            aria-haspopup="menu"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-8" style={{ width: 28, height: 28 }}>
              {tecnicoLogado.avatar}
            </div>
            <span className="d-none d-md-inline fw-semibold fs-7">{tecnicoLogado.nome}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {showMenu && (
            <div className="dropdown-menu dropdown-menu-end show position-absolute shadow-lg border-secondary-subtle mt-2 p-2 rounded-3 bg-white" role="menu" style={{ right: 0, zIndex: 1050, minWidth: '240px' }}>
              <div className="px-3 py-2 border-bottom mb-1">
                <div className="fw-bold text-dark fs-7">{tecnicoLogado.nome}</div>
                <div className="text-muted fs-8">{tecnicoLogado.cargo}</div>
              </div>

              <button 
                type="button"
                role="menuitem"
                className="dropdown-item rounded-2 py-2 fw-semibold text-dark"
                onClick={() => { setShowPerfil(true); setShowMenu(false); }}
              >
                Ver Meu Perfil
              </button>

              <div className="dropdown-divider"></div>
              <div className="px-3 py-1 text-muted fw-bold fs-8 text-uppercase">Alternar Usuário:</div>
              
              {tecnicos.map(t => (
                <button
                  key={t.id}
                  type="button"
                  role="menuitemradio"
                  className={`dropdown-item rounded-2 d-flex align-items-center justify-content-between py-1 fs-7 ${t.id === tecnicoLogado.id ? 'fw-bold text-primary bg-light' : ''}`}
                  aria-checked={String(t.id) === String(tecnicoLogado.id)}
                  onClick={() => onIniciarTrocaTecnico(t)}
                >
                  <span>{t.nome}</span>
                  {String(t.id) === String(tecnicoLogado.id) && <span className="badge bg-primary fs-8">Ativo</span>}
                </button>
              ))}

              <button
                type="button"
                role="menuitem"
                className="dropdown-item rounded-2 py-2 fw-semibold text-danger mt-1"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}