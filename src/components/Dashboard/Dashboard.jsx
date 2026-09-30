import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiServices.js';
import AuthModal from '../AuthModal/AuthModal.jsx';
import FilterBar from '../FilterBar/filterBars.jsx';
import KpiCards from '../KpiCards/kpiCards.jsx';
import Navbar from '../NavBar/navBar.jsx';
import NovaOSModal from '../NovaOSModal/novaOSmodal.jsx';
import OSTable from '../OSTable/OStable.jsx';
import ProfileModal from '../ProfileModal/profileModal.jsx';

const tecnicos = [
  { id: 1, nome: 'Caio Costa', cargo: 'Técnico Especialista Hardware', avatar: 'CC' },
  { id: 2, nome: 'Mariana Silva', cargo: 'Técnica Especialista Hardware', avatar: 'MS' },
  { id: 3, nome: 'Lucas Mendes', cargo: 'Técnico Especialista Hardware', avatar: 'LM' },
];

const novaOSInicial = {
  cliente: '',
  contato: '',
  tipoEquipamento: 'Desktop',
  equipamento: '',
  defeito: '',
  acessorios: [],
  tecnicoId: 1,
  prioridade: 'Normal',
  valor: '',
};

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const tecnicoInicial = location.state?.tecnico || tecnicos[0];
  const [tecnicoLogado, setTecnicoLogado] = useState(tecnicoInicial);
  const [ordens, setOrdens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [filtroApenasMinhas, setFiltroApenasMinhas] = useState(false);
  const [statusFiltro, setStatusFiltro] = useState('Todos');
  const [showMenu, setShowMenu] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);
  const [tecnicoAlvo, setTecnicoAlvo] = useState(null);
  const [senhaInput, setSenhaInput] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [showModalOS, setShowModalOS] = useState(false);
  const [novaOS, setNovaOS] = useState(novaOSInicial);
  const [loadingOS, setLoadingOS] = useState(false);

  useEffect(() => {
    setTecnicoLogado(tecnicoInicial);
  }, [tecnicoInicial]);

  useEffect(() => {
    let ativo = true;
    apiService.getOrdens('******', filtroApenasMinhas, statusFiltro).then((dados) => {
      if (ativo) {
        setOrdens(dados);
        setLoading(false);
      }
    });
    return () => {
      ativo = false;
    };
  }, [filtroApenasMinhas, statusFiltro]);

  const ordensFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return ordens.filter((ordem) => {
      if (filtroApenasMinhas && ordem.tecnicoId !== tecnicoLogado.id) return false;
      if (statusFiltro !== 'Todos' && ordem.status !== statusFiltro) return false;
      if (!termo) return true;
      return [ordem.cliente, ordem.equipamento, ordem.tecnicoNome]
        .some((valor) => valor.toLowerCase().includes(termo));
    });
  }, [busca, filtroApenasMinhas, ordens, statusFiltro, tecnicoLogado.id]);

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
      setTecnicoAlvo(null);
    } catch (erro) {
      setErroSenha(erro.message);
    } finally {
      setLoadingAuth(false);
    }
  };

  const salvarOS = async (evento) => {
    evento.preventDefault();
    setLoadingOS(true);
    try {
      const novaOrdem = await apiService.criarOS('******', novaOS);
      setOrdens((atuais) => [novaOrdem, ...atuais]);
      setNovaOS({ ...novaOSInicial, tecnicoId: tecnicoLogado.id });
      setShowModalOS(false);
    } finally {
      setLoadingOS(false);
    }
  };

  const handleLogout = () => {
    setShowMenu(false);
    navigate('/login');
  };

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
        <KpiCards ordens={ordensFiltradas} filtroApenasMinhas={filtroApenasMinhas} />
        <FilterBar
          busca={busca}
          setBusca={setBusca}
          filtroApenasMinhas={filtroApenasMinhas}
          setFiltroApenasMinhas={setFiltroApenasMinhas}
          statusFiltro={statusFiltro}
          setStatusFiltro={setStatusFiltro}
          onOpenModalOS={() => setShowModalOS(true)}
        />
        <OSTable ordens={ordensFiltradas} loading={loading} />
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
      {showModalOS && (
        <NovaOSModal
          novaOS={novaOS}
          setNovaOS={setNovaOS}
          tecnicos={tecnicos}
          loading={loadingOS}
          onClose={() => setShowModalOS(false)}
          onSave={salvarOS}
        />
      )}
    </div>
  );
}