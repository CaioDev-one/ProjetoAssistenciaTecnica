      import { useId } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function ProfileModal({ tecnico, onClose }) {
  const titleId = useId();

  if (!tecnico) return null;

  const nome = tecnico.nome?.trim() || 'Técnico';
  const iniciais = nome
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();

  const estatisticas = [
    { rotulo: 'OS concluídas', valor: tecnico.osConcluidas ?? '—' },
    { rotulo: 'Avaliação', valor: tecnico.avaliacao || '—' },
    {
      rotulo: 'Eficiência',
      valor: tecnico.eficiencia == null || tecnico.eficiencia === ''
        ? '—'
        : typeof tecnico.eficiencia === 'number'
          ? `${tecnico.eficiencia}%`
          : tecnico.eficiencia,
    },
  ];

  return (
    <Modal
      show
      onHide={onClose}
      centered
      scrollable
      aria-labelledby={titleId}
      contentClassName="border-0 rounded-4 shadow-lg overflow-hidden bg-white"
    >
      <Modal.Body className="p-0">
        <div
          className="position-relative px-4 pt-3 text-white"
          style={{
            height: 120,
            background: 'linear-gradient(120deg, #0f172a 0%, #1e40af 65%, #2563eb 100%)',
          }}
        >
          <div className="d-flex align-items-center gap-2 pe-5">
            <span
              className="badge rounded-3 px-2 py-2 border border-white border-opacity-25"
              style={{ background: 'rgba(255,255,255,.12)', letterSpacing: '.06em' }}
            >
              FIX
            </span>
            <span className="small fw-semibold">TechAssist OS</span>
          </div>

          <button
            type="button"
            className="btn btn-link position-absolute top-0 end-0 m-2 p-0 text-white rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 44, height: 44 }}
            onClick={onClose}
            aria-label="Fechar perfil do técnico"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="px-4 pb-3">
          <div
            className="position-relative d-flex align-items-center justify-content-center rounded-4 bg-white shadow-sm"
            style={{ width: 84, height: 84, marginTop: -42, padding: 4 }}
            aria-hidden="true"
          >
            <div
              className="w-100 h-100 rounded-4 d-flex align-items-center justify-content-center fw-bold"
              style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '1.65rem' }}
            >
              {tecnico.avatar || iniciais}
            </div>
          </div>

          <div className="mt-2">
            <div className="small fw-semibold text-primary mb-1">
              Perfil profissional
            </div>
            <h2
              id={titleId}
              className="fw-bold mb-1 text-break"
              style={{ color: '#0f172a', fontSize: '1.55rem', lineHeight: 1.2, letterSpacing: '-.03em' }}
            >
              {nome}
            </h2>
            <p className="mb-0 text-secondary text-break" style={{ fontSize: '.95rem' }}>
              {tecnico.cargo || 'Cargo não informado'}
            </p>
          </div>

          <div className="row g-0 rounded-4 border bg-light mt-3 py-2">
            {estatisticas.map(({ rotulo, valor }, index) => (
              <div key={rotulo} className={`col-4 text-center px-1 ${index > 0 ? 'border-start' : ''}`}>
                <div className="fw-bold text-dark text-break fs-5">{valor}</div>
                <div className="text-secondary mt-1" style={{ fontSize: '.75rem' }}>
                  {rotulo}
                </div>
              </div>
            ))}
          </div>

          <h3 className="small fw-bold text-dark mt-3 mb-2">Informações do técnico</h3>

          <dl className="mb-0">
            {[
              ['Matrícula', tecnico.matricula],
              ['Unidade', tecnico.unidade],
            ].map(([rotulo, valor], index) => (
              <div key={rotulo} className={`row g-2 py-2 ${index === 0 ? 'border-bottom' : ''}`}>
                <dt className="col-12 col-sm-4 small text-secondary fw-normal">{rotulo}</dt>
                <dd className="col-12 col-sm-8 small fw-semibold text-dark text-sm-end text-break mb-0">
                  {valor || 'Não informado'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-block border-top bg-light p-2 px-4">
        <button
          type="button"
          className="btn btn-primary w-100 rounded-3 fw-semibold py-2"
          style={{ minHeight: 44 }}
          onClick={onClose}
        >
          Concluir
        </button>
      </Modal.Footer>
    </Modal>
  );
}
