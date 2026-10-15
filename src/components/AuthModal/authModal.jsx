import { useId } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function AuthModal({ tecnicoAlvo, senhaInput, setSenhaInput, erroSenha, setErroSenha, loading, onClose, onConfirm }) {
  const titleId = useId();
  const senhaId = useId();

  if (!tecnicoAlvo) return null;

  return (
    <Modal
      show
      onHide={onClose}
      centered
      aria-labelledby={titleId}
      restoreFocus
      keyboard={!loading}
      backdrop={loading ? 'static' : true}
      contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
    >
      <Modal.Header className="bg-dark text-white border-0">
        <Modal.Title id={titleId} className="fs-6">Confirmar troca de técnico</Modal.Title>
        <button type="button" className="btn-close btn-close-white" aria-label="Fechar confirmação" disabled={loading} onClick={onClose} />
      </Modal.Header>
      <form onSubmit={onConfirm}>
        <Modal.Body className="p-4 text-center bg-light">
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4 mx-auto mb-2 shadow-sm" style={{ width: 56, height: 56 }} aria-hidden="true">
            {tecnicoAlvo.avatar}
          </div>
          <h2 className="h6 fw-bold mb-1 text-dark">{tecnicoAlvo.nome}</h2>
          <p className="text-muted small mb-3">{tecnicoAlvo.cargo}</p>

          <div className="mb-3 text-start">
            <label htmlFor={senhaId} className="form-label fw-semibold small text-secondary">Senha local de demonstração</label>
            <input
              id={senhaId}
              type="password"
              className={`form-control ${erroSenha ? 'is-invalid' : ''}`}
              autoFocus
              disabled={loading}
              aria-describedby={erroSenha ? `${senhaId}-erro` : undefined}
              value={senhaInput}
              onChange={(evento) => {
                setSenhaInput(evento.target.value);
                setErroSenha('');
              }}
            />
            {erroSenha && <div id={`${senhaId}-erro`} className="invalid-feedback d-block mt-1" role="alert">{erroSenha}</div>}
          </div>

          <p className="text-muted small bg-white p-2 rounded border mb-0">
            A validação é local e serve apenas para demonstração; não protege dados em produção.
          </p>
        </Modal.Body>
        <Modal.Footer className="bg-white p-3 border-top justify-content-between">
          <button type="button" className="btn btn-outline-secondary btn-sm fw-semibold" disabled={loading} onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary btn-sm fw-bold px-3" disabled={loading}>
            {loading ? 'Validando...' : 'Trocar técnico'}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}