export default function AuthModal({ tecnicoAlvo, senhaInput, setSenhaInput, erroSenha, setErroSenha, loading, onClose, onConfirm }) {
  if (!tecnicoAlvo) return null;

  return (
    <div className="modal show d-block bg-dark bg-opacity-50" onClick={() => !loading && onClose()}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '380px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="bg-dark text-white p-3 px-4 d-flex justify-content-between align-items-center">
            <strong className="fs-6">Autenticação Segura</strong>
            <button type="button" className="btn-close btn-close-white" disabled={loading} onClick={onClose}></button>
          </div>

          <form onSubmit={onConfirm}>
            <div className="modal-body p-4 text-center bg-light">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4 mx-auto mb-2 shadow-sm" style={{ width: 56, height: 56 }}>
                {tecnicoAlvo.avatar}
              </div>
              <h6 className="fw-bold mb-1 text-dark">{tecnicoAlvo.nome}</h6>
              <p className="text-muted fs-7 mb-3">{tecnicoAlvo.cargo}</p>

              <div className="mb-3 text-start">
                <label className="form-label fw-semibold fs-7 text-secondary">Digite a sua senha de acesso:</label>
                <input 
                  type="password" 
                  className={`form-control ${erroSenha ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  autoFocus
                  disabled={loading}
                  value={senhaInput}
                  onChange={(e) => {
                    setSenhaInput(e.target.value);
                    setErroSenha('');
                  }}
                />
                {erroSenha && <div className="invalid-feedback d-block mt-1">{erroSenha}</div>}
              </div>

              <div className="text-muted fs-8 bg-white p-2 rounded border">
                <small>🔒 Senha enviada com criptografia TLS para a API (Teste: <strong>123456</strong>)</small>
              </div>
            </div>

            <div className="modal-footer bg-white p-3 border-top justify-content-between">
              <button type="button" className="btn btn-outline-secondary btn-sm fw-semibold" disabled={loading} onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary btn-sm fw-bold px-3" disabled={loading}>
                {loading ? 'Validando...' : 'Acessar Bancada'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}