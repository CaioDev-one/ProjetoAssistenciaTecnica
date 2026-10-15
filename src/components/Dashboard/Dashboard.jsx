import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiServices.js';
import AuthModal from '../AuthModal/AuthModal.jsx';
import FilterBar from '../FilterBar/filterBars.jsx';
import KpiCards from '../KpiCards/kpiCards.jsx';
import Navbar from '../NavBar/navBar.jsx';
import NovaOSModal from '../NovaOSModal/novaOSmodal.jsx';
import OSTable from '../OSTable/OStable.jsx';
import OSDetailsModal from '../OSTable/OSDetailsModal.jsx';
import ProfileModal from '../ProfileModal/profileModal.jsx';
import { getTecnicos } from '../services/tecnicosService.js';
import { encerrarSessao } from '../services/sessionService.js';
import { STATUS_TODOS } from '../services/osConstants.js';

const novaOSInicial = {
  cliente: '',
  contato: '',
  tipoEquipamento: 'Desktop',
  equipamento: '',
  defeito: '',
  acessorios: [],
  numSerie: '',
  condicaoFisica: '',
  tecnicoId: '',
  prioridade: 'Normal',
  valor: '',
};

export default function Dashboard({ tecnicoDaSessao }) {
  const navigate = useNavigate();
  const [dadosTecnicos] = useState(() => {
    try {
      const lista = getTecnicos();
      return {
        tecnicos: lista,
        tecnico: lista.find((item) => String(item.id) === String(tecnicoDaSessao?.id)) || null,
        erro: lista.length === 0
          ? 'Nenhum técnico está salvo. Volte ao cadastro para adicionar um técnico.'
          : !tecnicoDaSessao || !lista.some((item) => String(item.id) === String(tecnicoDaSessao.id))
            ? 'A sessão demonstrativa não corresponde a um técnico válido.'
          : ''
      };
    } catch (error) {
      return {
        tecnicos: [],
        tecnico: null,
        erro: error.message || 'Não foi possível carregar os técnicos salvos.'
      };
    }
  });
  const tecnicos = dadosTecnicos.tecnicos;
  const [tecnicoLogado, setTecnicoLogado] = useState(dadosTecnicos.tecnico);
  const [erroTecnicos] = useState(dadosTecnicos.erro);
  const [ordens, setOrdens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erroOrdens, setErroOrdens] = useState('');
  const [tentativaCarregamento, setTentativaCarregamento] = useState(0);
  const [busca, setBusca] = useState('');
  const [filtroApenasMinhas, setFiltroApenasMinhas] = useState(false);
  const [statusFiltro, setStatusFiltro] = useState(STATUS_TODOS);
  const [showMenu, setShowMenu] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);
  const [tecnicoAlvo, setTecnicoAlvo] = useState(null);
  const [senhaInput, setSenhaInput] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [showModalOS, setShowModalOS] = useState(false);
  const [novaOS, setNovaOS] = useState(() => ({
    ...novaOSInicial,
    tecnicoId: dadosTecnicos.tecnico?.id ?? ''
  }));
  const [loadingOS, setLoadingOS] = useState(false);
  const [erroSalvarOS, setErroSalvarOS] = useState('');
  const [osSelecionada, setOsSelecionada] = useState(null);
  const [editandoOS, setEditandoOS] = useState(false);
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);
  const [erroEdicao, setErroEdicao] = useState('');

  useEffect(() => {
    let ativo = true;
    apiService.getOrdens()
      .then((dados) => {
        if (ativo) setOrdens(dados);
      })
      .catch((erro) => {
        if (ativo) setErroOrdens(erro.message || 'Não foi possível carregar as ordens de serviço.');
      })
      .finally(() => {
        if (ativo) setLoading(false);
      });
    return () => {
      ativo = false;
    };
  }, [tentativaCarregamento]);

  const ordensFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return ordens.filter((ordem) => {
      if (filtroApenasMinhas && String(ordem.tecnicoId) !== String(tecnicoLogado?.id)) return false;
      if (statusFiltro !== 'Todos' && ordem.status !== statusFiltro) return false;
      if (!termo) return true;
      return [ordem.id, ordem.cliente, ordem.equipamento, ordem.tecnicoNome, ordem.defeito, ordem.contato]
        .some((valor) => String(valor ?? '').toLowerCase().includes(termo));
    });
  }, [busca, filtroApenasMinhas, ordens, statusFiltro, tecnicoLogado?.id]);

  const iniciarTrocaTecnico = (tecnico) => {
    setTecnicoAlvo(tecnico);
    setSenhaInput('');
    setErroSenha('');
    setShowMenu(false);
  };

  const confirmarTrocaTecnico = async (evento) => {
    evento.preventDefault();
    setLoadingAuth(true);
    setErroSenha('');
    try {
      const resposta = await apiService.login(tecnicoAlvo.id, senhaInput);
      setTecnicoLogado(resposta.user);
      setNovaOS((atual) => ({ ...atual, tecnicoId: resposta.user.id }));
      setTecnicoAlvo(null);
    } catch (erro) {
      setErroSenha(erro.message);
    } finally {
      setLoadingAuth(false);
    }
  };

  const salvarOS = async (evento) => {
    evento.preventDefault();
    setErroSalvarOS('');
    setLoadingOS(true);
    try {
      const novaOrdem = await apiService.criarOS(novaOS);
      setOrdens((atuais) => [novaOrdem, ...atuais]);
      setNovaOS({ ...novaOSInicial, tecnicoId: tecnicoLogado?.id ?? '' });
      setShowModalOS(false);
    } catch (erro) {
      setErroSalvarOS(erro.message || 'Não foi possível salvar a ordem de serviço.');
    } finally {
      setLoadingOS(false);
    }
  };

  const salvarEdicaoOS = async (evento, alteracoes) => {
    evento.preventDefault();
    setErroEdicao('');
    setSalvandoEdicao(true);
    try {
      const atualizada = await apiService.atualizarOS(osSelecionada.id, alteracoes);
      setOrdens((atuais) => atuais.map((ordem) => (
        String(ordem.id) === String(atualizada.id) ? atualizada : ordem
      )));
      setOsSelecionada(atualizada);
      setEditandoOS(false);
    } catch (erro) {
      setErroEdicao(erro.message || 'Não foi possível atualizar a ordem de serviço.');
    } finally {
      setSalvandoEdicao(false);
    }
  };

  const handleLogout = () => {
    setShowMenu(false);
    try {
      encerrarSessao();
      navigate('/login', { replace: true });
    } catch (erro) {
      setErroOrdens(erro.message || 'Não foi possível encerrar a sessão.');
    }
  };

  if (!tecnicoLogado) {
    return (
      <main className="min-vh-100 d-flex flex-column align-items-center justify-content-center gap-3 p-4">
        <div role="alert" className={`alert ${erroTecnicos ? 'alert-danger' : 'alert-info'} mb-0`}>
          {erroTecnicos || 'Carregando técnicos...'}
        </div>
        {erroTecnicos && <button type="button" className="btn btn-primary" onClick={() => navigate('/login')}>Voltar ao login</button>}
      </main>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar
        tecnicoLogado={tecnicoLogado}
        tecnicos={tecnicos}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        setShowPerfil={setShowPerfil}
        onIniciarTrocaTecnico={iniciarTrocaTecnico}
        onLogout={handleLogout}
      />
      <main className="container-fluid px-3 px-md-4 py-4">
        {erroTecnicos && <div role="alert" className="alert alert-danger">{erroTecnicos} A criação de OS está indisponível enquanto isso.</div>}
        <KpiCards ordens={ordensFiltradas} filtroApenasMinhas={filtroApenasMinhas} />
        <FilterBar
          busca={busca}
          setBusca={setBusca}
          filtroApenasMinhas={filtroApenasMinhas}
          setFiltroApenasMinhas={setFiltroApenasMinhas}
          statusFiltro={statusFiltro}
          setStatusFiltro={setStatusFiltro}
          disabledNovaOS={Boolean(erroTecnicos)}
          onOpenModalOS={() => setShowModalOS(true)}
        />
        {erroOrdens && !loading && (
          <div className="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-2" role="alert">
            <span>{erroOrdens}</span>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => {
              setErroOrdens('');
              setLoading(true);
              setTentativaCarregamento((tentativa) => tentativa + 1);
            }}>Tentar novamente</button>
          </div>
        )}
        <OSTable
          ordens={ordensFiltradas}
          loading={loading}
          erro={erroOrdens}
          onView={(ordem) => {
            setOsSelecionada(ordem);
            setEditandoOS(false);
            setErroEdicao('');
          }}
          onEdit={(ordem) => {
            setOsSelecionada(ordem);
            setEditandoOS(true);
            setErroEdicao('');
          }}
        />
      </main>
      <AuthModal
        tecnicoAlvo={tecnicoAlvo}
        senhaInput={senhaInput}
        setSenhaInput={setSenhaInput}
        erroSenha={erroSenha}
        setErroSenha={setErroSenha}
        loading={loadingAuth}
        onClose={() => setTecnicoAlvo(null)}
        onConfirm={confirmarTrocaTecnico}
      />
      {showPerfil && (
        <ProfileModal tecnico={tecnicoLogado} onClose={() => setShowPerfil(false)} />
      )}
      {showModalOS && !erroTecnicos && (
        <NovaOSModal
          novaOS={novaOS}
          setNovaOS={setNovaOS}
          tecnicos={tecnicos}
          loading={loadingOS}
          erro={erroSalvarOS}
          onClose={() => setShowModalOS(false)}
          onSave={salvarOS}
        />
      )}
      {osSelecionada && (
        <OSDetailsModal
          key={String(osSelecionada.id)}
          os={osSelecionada}
          editando={editandoOS}
          tecnicos={tecnicos}
          loading={salvandoEdicao}
          erro={erroEdicao}
          onClose={() => setOsSelecionada(null)}
          onEdit={() => setEditandoOS(true)}
          onSave={salvarEdicaoOS}
        />
      )}
    </div>
  );
}