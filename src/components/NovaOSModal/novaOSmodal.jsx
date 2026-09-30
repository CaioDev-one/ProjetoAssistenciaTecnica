export default function NovaOSModal({ novaOS, setNovaOS, tecnicos, loading, onClose, onSave }) {
  const acessoriosOpcoes = ['Carregador', 'Cabo USB', 'Capa de Proteção', 'Caixa Original', 'Cartão SIM/Memory', 'Fonte de Alimentação', 'Cabo de Força (PC)'];
  const servicosFrequentes = [
    'Limpeza Preventiva & Pasta Térmica',
    'Troca de Tela / Display',
    'Conector de Carga',
    'Troca de Bateria',
    'Desoxidação (Molhou)',
    'Formatação & Sistema'
  ];

  const toggleAcessorio = (item) => {
    if (novaOS.acessorios.includes(item)) {
      setNovaOS({ ...novaOS, acessorios: novaOS.acessorios.filter(a => a !== item) });
    } else {
      setNovaOS({ ...novaOS, acessorios: [...novaOS.acessorios, item] });
    }
  };

  return (
    <div className="modal show d-block bg-dark bg-opacity-50" onClick={() => !loading && onClose()}>
      <div className="modal-dialog modal-dialog-centered modal-lg my-3" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          
          <div className="bg-dark text-white p-3 px-4 d-flex justify-content-between align-items-center border-bottom border-primary border-3">
            <strong className="fs-6">Nova Ordem de Serviço</strong>
            <button type="button" className="btn-close btn-close-white" disabled={loading} onClick={onClose}></button>
          </div>

          <form onSubmit={onSave}>
            <div className="modal-body p-4 bg-light" style={{ maxHeight: '58vh', overflowY: 'auto' }}>
              
              {/* SEÇÃO 1: DADOS DO CLIENTE */}
              <div className="bg-white p-3 rounded-3 border mb-3 shadow-sm">
                <h6 className="fw-bold text-primary mb-3">1. Dados do Cliente</h6>
                <div className="row g-3">
                  <div className="col-12 col-md-7">
                    <label className="form-label fw-semibold fs-7 text-secondary">Nome Completo *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required 
                      placeholder="Ex: João da Silva"
                      value={novaOS.cliente}
                      onChange={(e) => setNovaOS({ ...novaOS, cliente: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-5">
                    <label className="form-label fw-semibold fs-7 text-secondary">WhatsApp / Telefone *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required
                      placeholder="(11) 99999-9999"
                      value={novaOS.contato}
                      onChange={(e) => setNovaOS({ ...novaOS, contato: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* SEÇÃO 2: DADOS DO EQUIPAMENTO */}
              <div className="bg-white p-3 rounded-3 border mb-3 shadow-sm">
                <h6 className="fw-bold text-primary mb-3">2. Equipamento & Condição</h6>
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold fs-7 text-secondary">Categoria</label>
                    <select 
                      className="form-select"
                      value={novaOS.tipoEquipamento}
                      onChange={(e) => setNovaOS({ ...novaOS, tipoEquipamento: e.target.value })}
                    >
                      <option value="Desktop">Desktop / PC Gamer</option>
                      <option value="Notebook">Notebook</option>
                      <option value="Console">Console / Game</option>
                      <option value="Smartphone">Smartphone</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-5">
                    <label className="form-label fw-semibold fs-7 text-secondary">Marca, Modelo ou Configuração *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required 
                      placeholder="Ex: PC Core i7 / Dell XPS 15 / PS5"
                      value={novaOS.equipamento}
                      onChange={(e) => setNovaOS({ ...novaOS, equipamento: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <label className="form-label fw-semibold fs-7 text-secondary">Nº de Série / IMEI</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Opcional"
                      value={novaOS.numSerie}
                      onChange={(e) => setNovaOS({ ...novaOS, numSerie: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold fs-7 text-secondary">Estado Físico / Avarias Pré-existentes</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Ex: Poeira acumulada, arranhões na tampa, gabinete sem tampa lateral..."
                      value={novaOS.condicaoFisica}
                      onChange={(e) => setNovaOS({ ...novaOS, condicaoFisica: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* SEÇÃO 3: DIAGNÓSTICO & ATALHOS DE SERVIÇOS */}
              <div className="bg-white p-3 rounded-3 border mb-3 shadow-sm">
                <h6 className="fw-bold text-primary mb-3">3. Diagnóstico e Acessórios</h6>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="form-label fw-semibold fs-7 text-secondary mb-0">Defeito Relatado / Serviço Solicitado *</label>
                      <small className="text-muted fs-8">Clique abaixo para preenchimento rápido:</small>
                    </div>

                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {servicosFrequentes.map((serv) => (
                        <button
                          key={serv}
                          type="button"
                          className="btn btn-sm btn-outline-primary fs-8 py-0 px-2 rounded-pill fw-semibold"
                          onClick={() => {
                            const atual = novaOS.defeito;
                            setNovaOS({ 
                              ...novaOS, 
                              defeito: atual ? `${atual} | ${serv}` : serv 
                            });
                          }}
                        >
                          + {serv}
                        </button>
                      ))}
                    </div>

                    <textarea 
                      className="form-control" 
                      rows="2" 
                      required
                      placeholder="Descreva o problema ou selecione nos atalhos acima..."
                      value={novaOS.defeito}
                      onChange={(e) => setNovaOS({ ...novaOS, defeito: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold fs-7 text-secondary mb-2">Acessórios Deixados com o Aparelho:</label>
                    <div className="d-flex flex-wrap gap-2">
                      {acessoriosOpcoes.map((item) => {
                        const ativo = novaOS.acessorios.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            className={`btn btn-sm rounded-pill px-3 fw-semibold ${ativo ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => toggleAcessorio(item)}
                          >
                            {ativo ? '✓ ' : '+ '} {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* SEÇÃO 4: RESPONSÁVEL, PRIORIDADE E VALOR */}
              <div className="bg-white p-3 rounded-3 border shadow-sm">
                <h6 className="fw-bold text-primary mb-3">4. Atribuição e Estimativa</h6>
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold fs-7 text-secondary">Técnico Responsável</label>
                    <select 
                      className="form-select"
                      value={novaOS.tecnicoId}
                      onChange={(e) => setNovaOS({ ...novaOS, tecnicoId: Number(e.target.value) })}
                    >
                      {tecnicos.map(t => (
                        <option key={t.id} value={t.id}>{t.nome}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold fs-7 text-secondary">Prioridade</label>
                    <select 
                      className="form-select"
                      value={novaOS.prioridade}
                      onChange={(e) => setNovaOS({ ...novaOS, prioridade: e.target.value })}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Urgente">Urgente</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold fs-7 text-secondary">Valor Estimado (R$)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-control" 
                      placeholder="0.00"
                      value={novaOS.valor}
                      onChange={(e) => setNovaOS({ ...novaOS, valor: e.target.value })}
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="modal-footer bg-white p-3 border-top justify-content-between">
              <button type="button" className="btn btn-outline-secondary btn-sm fw-semibold" disabled={loading} onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary btn-sm fw-bold px-4" disabled={loading}>
                {loading ? 'Salvando...' : 'Criar Ordem de Serviço'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}