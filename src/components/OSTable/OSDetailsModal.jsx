import { useId, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { formatarValorBRL, STATUS_OS } from '../services/osConstants.js';

export default function OSDetailsModal({ os, editando, tecnicos, loading, erro, onClose, onEdit, onSave }) {
  const titleId = useId();
  const handleClose = () => {
    if (!loading) onClose();
  };
  const [form, setForm] = useState(() => ({
    ...os,
    valor: String(os.valor ?? 0),
    tecnicoId: String(os.tecnicoId ?? ''),
  }));
  const alterarCampo = (evento) => setForm((atual) => ({
    ...atual,
    [evento.target.name]: evento.target.value,
  }));

  const detalhe = (rotulo, valor) => (
    <div className="col-12 col-md-6" key={rotulo}>
      <dt className="small text-secondary fw-normal">{rotulo}</dt>
      <dd className="mb-0 fw-semibold text-break">{valor || 'Não informado'}</dd>
    </div>
  );

  return (
    <Modal
      show
      onHide={handleClose}
      centered
      scrollable
      size="lg"
      aria-labelledby={titleId}
      restoreFocus
      keyboard={!loading}
      backdrop={loading ? 'static' : true}
      contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
    >
      <Modal.Header className="bg-dark text-white">
        <Modal.Title id={titleId} className="fs-6">
          {editando ? 'Editar ordem de serviço' : `Detalhes da OS #${os.id}`}
        </Modal.Title>
        <button type="button" className="btn-close btn-close-white" aria-label="Fechar detalhes" disabled={loading} onClick={handleClose} />
      </Modal.Header>
      <form className="d-flex flex-column flex-grow-1 overflow-hidden" style={{ minHeight: 0 }} onSubmit={(evento) => onSave(evento, form)}>
        <Modal.Body className="p-4 flex-grow-1 overflow-auto" style={{ minHeight: 0 }}>
          {erro && <div className="alert alert-danger" role="alert">{erro}</div>}
          {editando ? (
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="os-cliente" className="form-label">Cliente *</label>
                <input id="os-cliente" name="cliente" className="form-control" required value={form.cliente} onChange={alterarCampo} />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="os-contato" className="form-label">Telefone *</label>
                <input id="os-contato" name="contato" type="tel" className="form-control" required value={form.contato} onChange={alterarCampo} />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="os-equipamento" className="form-label">Equipamento *</label>
                <input id="os-equipamento" name="equipamento" className="form-control" required value={form.equipamento} onChange={alterarCampo} />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="os-tecnico" className="form-label">Técnico responsável *</label>
                <select id="os-tecnico" name="tecnicoId" className="form-select" required value={form.tecnicoId} onChange={alterarCampo}>
                  <option value="">Selecione</option>
                  {tecnicos.map((tecnico) => <option key={tecnico.id} value={tecnico.id}>{tecnico.nome}</option>)}
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="os-defeito" className="form-label">Defeito / serviço *</label>
                <textarea id="os-defeito" name="defeito" className="form-control" rows="3" required value={form.defeito} onChange={alterarCampo} />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="os-status" className="form-label">Status *</label>
                <select id="os-status" name="status" className="form-select" required value={form.status} onChange={alterarCampo}>
                  <option value="">Selecione</option>
                  {STATUS_OS.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="os-prioridade" className="form-label">Prioridade</label>
                <select id="os-prioridade" name="prioridade" className="form-select" value={form.prioridade} onChange={alterarCampo}>
                  <option value="Normal">Normal</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="os-valor" className="form-label">Valor estimado (R$)</label>
                <input id="os-valor" name="valor" type="number" min="0" step="0.01" className="form-control" value={form.valor} onChange={alterarCampo} />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="os-num-serie" className="form-label">Nº de série / IMEI</label>
                <input id="os-num-serie" name="numSerie" className="form-control" value={form.numSerie ?? ''} onChange={alterarCampo} />
              </div>
              <div className="col-12">
                <label htmlFor="os-condicao" className="form-label">Condição física</label>
                <input id="os-condicao" name="condicaoFisica" className="form-control" value={form.condicaoFisica ?? ''} onChange={alterarCampo} />
              </div>
            </div>
          ) : (
            <dl className="row g-3 mb-0">
              {detalhe('Cliente', os.cliente)}
              {detalhe('Telefone', os.contato)}
              {detalhe('Equipamento', os.equipamento)}
              {detalhe('Técnico responsável', os.tecnicoNome)}
              {detalhe('Status', os.status)}
              {detalhe('Prioridade', os.prioridade)}
              {detalhe('Data', os.data)}
              {detalhe('Valor estimado', formatarValorBRL(os.valor))}
              {detalhe('Defeito / serviço', os.defeito)}
              {detalhe('Acessórios', os.acessorios?.join(', '))}
              {detalhe('Nº de série / IMEI', os.numSerie)}
              {detalhe('Condição física', os.condicaoFisica)}
            </dl>
          )}
        </Modal.Body>
        <Modal.Footer className="flex-shrink-0">
          <button type="button" className="btn btn-outline-secondary" disabled={loading} onClick={handleClose}>Fechar</button>
          {editando ? (
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar alterações'}
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={onEdit}>Editar</button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
}