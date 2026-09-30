import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const criarAvatar = (nome) => {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
};

export default function CadastroTecnicoPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    cargo: 'Técnico Especialista Hardware',
    matricula: '',
    unidade: '',
    senha: ''
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErro('');
    setSucesso('');

    if (!form.nome || !form.matricula || !form.unidade || !form.senha) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    if (form.senha.length < 4) {
      setErro('A senha deve ter pelo menos 4 caracteres.');
      return;
    }

    const salvos = JSON.parse(localStorage.getItem('techassist_tecnicos') || '[]');
    const novoTecnico = {
      id: Date.now(),
      nome: form.nome,
      cargo: form.cargo,
      matricula: form.matricula,
      unidade: form.unidade,
      osConcluidas: 0,
      avaliacao: 'Nova ★',
      avatar: criarAvatar(form.nome),
      senha: form.senha
    };

    localStorage.setItem('techassist_tecnicos', JSON.stringify([...salvos, novoTecnico]));
    setSucesso('Técnico cadastrado com sucesso!');

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 40%, #f8fafc 100%)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        background: '#fff',
        borderRadius: '28px',
        boxShadow: '0 30px 80px rgba(15, 23, 42, 0.12)',
        padding: 'clamp(20px, 4vw, 32px)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ color: '#2563eb', fontSize: '0.72rem', letterSpacing: '0.16em', fontWeight: 800, textTransform: 'uppercase' }}>
              TechAssist OS
            </div>
            <h2 style={{
              margin: '8px 0 0',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              letterSpacing: '-0.06em',
              color: '#0f172a',
              lineHeight: 1.1,
              wordBreak: 'break-word'
            }}>Cadastrar técnico</h2>
          </div>

          <div style={{
            width: '46px',
            height: '46px',
            minWidth: '46px',
            minHeight: '46px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            flexShrink: 0,
            boxShadow: '0 10px 20px rgba(37, 99, 235, 0.24)'
          }}>FIX</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'grid', gap: '8px' }}>
            <label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155' }}>Nome completo</label>
            <input name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: João da Silva" style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            <label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155' }}>Cargo</label>
            <input name="cargo" value={form.cargo} onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            <label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155' }}>Matrícula</label>
            <input name="matricula" value={form.matricula} onChange={handleChange} placeholder="Ex: TECH-2026-10" style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            <label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155' }}>Unidade</label>
            <input name="unidade" value={form.unidade} onChange={handleChange} placeholder="Ex: São Paulo - Centro" style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            <label style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155' }}>Senha de acesso</label>
            <input type="password" name="senha" value={form.senha} onChange={handleChange} placeholder="Digite uma senha" style={inputStyle} />
          </div>

          {erro && <div style={{ color: '#dc2626', fontWeight: 600, fontSize: '0.8rem' }}>{erro}</div>}
          {sucesso && <div style={{ color: '#15803d', fontWeight: 600, fontSize: '0.8rem' }}>{sucesso}</div>}

          <button type="submit" style={{
            width: '100%',
            padding: '14px 18px',
            border: 'none',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 18px 30px rgba(37, 99, 235, 0.26)'
          }}>
            Salvar técnico
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            style={{
              width: '100%',
              padding: '12px 18px',
              border: '1px solid rgba(148, 163, 184, 0.5)',
              borderRadius: '14px',
              background: '#fff',
              color: '#334155',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Voltar para login
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid rgba(148, 163, 184, 0.5)',
  background: '#fff',
  fontSize: '0.96rem',
  outline: 'none',
  boxSizing: 'border-box'
};
