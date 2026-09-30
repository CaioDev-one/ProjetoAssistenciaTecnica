import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../components/services/apiServices.js';
import { getTecnicos } from '../components/services/tecnicosService.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [dadosTecnicos] = useState(() => {
    try {
      const tecnicos = getTecnicos();
      return {
        tecnicos,
        erro: tecnicos.length === 0
          ? 'Nenhum técnico cadastrado. Cadastre um técnico para continuar.'
          : ''
      };
    } catch (error) {
      return { tecnicos: [], erro: error.message || 'Não foi possível carregar os técnicos salvos.' };
    }
  });
  const tecnicos = dadosTecnicos.tecnicos;
  const [tecnicoSelecionado, setTecnicoSelecionado] = useState(tecnicos[0] ?? null);
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(dadosTecnicos.erro);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErro('');
    if (!tecnicoSelecionado) {
      setErro('Nenhum técnico disponível para entrar. Verifique os dados salvos.');
      return;
    }
    setLoading(true);

    try {
      const resposta = await apiService.login(tecnicoSelecionado.id, senha);
      navigate('/dashboard', { state: { tecnico: resposta.user } });
    } catch (error) {
      setErro(error.message || 'Não foi possível entrar no sistema.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-4"
      style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 35%, #f8fafc 100%)'
      }}
    >
      <div className="container-fluid w-100" style={{ maxWidth: '980px' }}>
        <div className="row g-0 shadow-lg rounded-4 overflow-hidden border border-light-subtle bg-white" style={{ boxShadow: '0 24px 70px rgba(15, 23, 42, 0.12)' }}>
          <div
            className="col-12 col-lg-7 order-1 order-sm-1 order-lg-1 d-flex flex-column justify-content-center text-white p-4 p-lg-5"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #111827 36%, #1d4ed8 100%)'
            }}
          >
            <div className="d-flex align-items-center gap-3 mb-3 mb-lg-4">
              <div
                className="d-inline-flex align-items-center justify-content-center fw-bold text-white rounded-3"
                style={{
                  width: '42px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 12px 24px rgba(59, 130, 246, 0.35)'
                }}
              >
                FIX
              </div>
              <div className="fw-bold fs-5">TechAssist OS</div>
            </div>

            <div className="mx-auto w-100" style={{ maxWidth: '430px' }}>
              <div className="text-uppercase fw-bold text-info small mb-2 mb-lg-3" style={{ letterSpacing: '0.16em' }}>
                Gestão de assistências
              </div>
              <h1 className="fw-bold lh-1 mb-2 mb-lg-3" style={{ letterSpacing: '-0.07em', fontSize: 'clamp(2.1rem, 4vw, 3.4rem)' }}>
                Controle técnico em uma só plataforma.
              </h1>
              <p className="text-light mb-3 mb-lg-4 fs-6">
                Acompanhe ordens de serviço, priorize atendimentos e mantenha toda a operação do técnico organizada e eficiente.
              </p>

              <div className="d-grid gap-2 gap-lg-3">
                {[
                  'Dashboard em tempo real',
                  'Filtros por status e técnico',
                  'Cadastro rápido de OS',
                ].map((item) => (
                  <div key={item} className="d-flex align-items-center gap-3 text-light">
                    <span
                      className="rounded-circle d-inline-block"
                      style={{
                        width: '10px',
                        height: '10px',
                        background: '#60a5fa',
                        boxShadow: '0 0 0 5px rgba(96,165,250,.18)'
                      }}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5 order-2 order-sm-2 order-lg-2 bg-light d-flex align-items-center justify-content-center p-3 p-lg-4">
            <div className="w-100" style={{ maxWidth: '380px' }}>
              <div className="mb-3 mb-lg-4">
                <div className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: '0.16em' }}>
                  Acesso do técnico
                </div>
                <h2 className="mt-2 mb-2 fw-bold" style={{ letterSpacing: '-0.06em', fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
                  Entrar
                </h2>
                <p className="text-secondary mb-0 small">Selecione o perfil e informe sua senha.</p>
              </div>

              <form onSubmit={handleLogin} className="d-grid gap-3">
                <div className="d-grid gap-2">
                  <label className="form-label fw-semibold small text-dark mb-0">Técnico responsável</label>
                  <div className="d-grid gap-2">
                    {tecnicos.map((item) => {
                      const ativo = tecnicoSelecionado?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTecnicoSelecionado(item)}
                          className={`btn d-flex align-items-center justify-content-between w-100 text-start ${ativo ? 'border-primary' : 'border'}`}
                          style={{
                            background: ativo ? 'rgba(37, 99, 235, 0.06)' : '#fff',
                            borderColor: ativo ? 'rgba(37, 99, 235, 0.4)' : 'rgba(148, 163, 184, 0.4)',
                            borderRadius: '14px',
                            padding: '12px 14px'
                          }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="d-inline-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
                              style={{
                                width: '34px',
                                height: '34px',
                                background: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
                                fontSize: '0.76rem'
                              }}
                            >
                              {item.avatar}
                            </div>
                            <div className="text-start">
                              <div className="fw-bold text-dark">{item.nome}</div>
                              <div className="small text-secondary">{item.cargo}</div>
                            </div>
                          </div>
                          <span
                            className={`rounded-circle d-inline-block ${ativo ? 'bg-primary' : 'bg-secondary-subtle'}`}
                            style={{ width: '10px', height: '10px' }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <label htmlFor="senha" className="form-label fw-semibold small text-dark mb-0">Senha</label>
                  <input
                    id="senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className={`form-control ${erro ? 'is-invalid' : ''}`}
                    placeholder="Digite sua senha"
                    style={{ borderRadius: '14px', padding: '12px 14px' }}
                  />
                  {erro && <div className="invalid-feedback d-block">{erro}</div>}
                </div>

                <button type="submit" className="btn btn-primary btn-lg fw-bold w-100" disabled={loading || !tecnicoSelecionado} style={{ borderRadius: '14px' }}>
                  {loading ? 'Acessando...' : 'Entrar no sistema'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/cadastro-tecnico')}
                  className="btn btn-outline-primary btn-lg fw-bold w-100"
                  style={{ borderRadius: '14px' }}
                >
                  Cadastrar técnico
                </button>

                <div className="text-center small text-secondary">
                  Dica de teste: <strong className="text-dark">123456</strong>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
