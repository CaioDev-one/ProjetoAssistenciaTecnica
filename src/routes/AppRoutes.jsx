import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import CadastroTecnicoPage from '../pages/CadastroTecnicoPage.jsx';
import { obterTecnicoAtivo } from '../components/services/sessionService.js';

function RotaDashboardProtegida() {
  let tecnico;
  try {
    tecnico = obterTecnicoAtivo();
  } catch {
    tecnico = null;
  }
  return tecnico
    ? <Dashboard tecnicoDaSessao={tecnico} />
    : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro-tecnico" element={<CadastroTecnicoPage />} />
        <Route path="/dashboard" element={<RotaDashboardProtegida />} />
      </Routes>
    </BrowserRouter>
  );
}