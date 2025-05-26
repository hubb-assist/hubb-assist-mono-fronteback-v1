import { useState, useEffect } from 'react'
import AppShell from './components/layout/AppShell'

interface APIStatus {
  status: string;
  environment: string;
  database: string;
}

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [apiStatus, setApiStatus] = useState<APIStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAPIStatus();
  }, []);

  const fetchAPIStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      setApiStatus(data);
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', 'admin@clinica.com');
      formData.append('password', '123456');

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      alert(response.ok ? 
        `Login realizado! Token: ${data.access_token.substring(0, 20)}...` : 
        `Erro: ${data.detail}`
      );
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login');
    }
    setLoading(false);
  };

  return (
    <AppShell userType="ADMIN">
      {/* Dashboard Content */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">📚</div>
            <h3 className="card-title">Documentação da API</h3>
          </div>
          <p className="card-description">
            Explore todos os endpoints disponíveis na documentação interativa do Swagger.
          </p>
          <div className="card-actions">
            <a 
              href={`${API_BASE_URL}/docs`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              Abrir Swagger UI
            </a>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">📖</div>
            <h3 className="card-title">Documentação ReDoc</h3>
          </div>
          <p className="card-description">
            Versão alternativa da documentação com interface diferente.
          </p>
          <div className="card-actions">
            <a 
              href={`${API_BASE_URL}/redoc`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              Abrir ReDoc
            </a>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">🔐</div>
            <h3 className="card-title">Teste de Autenticação</h3>
          </div>
          <p className="card-description">
            Teste o sistema de autenticação JWT com credenciais de demonstração.
          </p>
          <div className="card-actions">
            <button 
              onClick={testLogin} 
              className="btn-secondary"
              disabled={loading}
            >
              {loading ? 'Testando...' : 'Testar Login'}
            </button>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--hubb-text-secondary)' }}>
            <strong>Credenciais de teste:</strong><br />
            Email: admin@clinica.com<br />
            Senha: 123456
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">📊</div>
            <h3 className="card-title">Status da API</h3>
          </div>
          <p className="card-description">
            Informações sobre o status atual da API e conexões.
          </p>
          {apiStatus ? (
            <div className="api-status">
              <div className="status-item">
                <span>Status:</span>
                <span className={`status-badge ${apiStatus.status === 'healthy' ? 'status-online' : 'status-offline'}`}>
                  {apiStatus.status === 'healthy' ? '🟢 Online' : '🔴 Offline'}
                </span>
              </div>
              <div className="status-item">
                <span>Ambiente:</span>
                <span>{apiStatus.environment}</span>
              </div>
              <div className="status-item">
                <span>Database:</span>
                <span>{apiStatus.database}</span>
              </div>
            </div>
          ) : (
            <div className="loading">Carregando...</div>
          )}
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">🧠</div>
            <h3 className="card-title">Módulos HUBB</h3>
          </div>
          <p className="card-description">
            Acesse os diferentes módulos da plataforma HUBB Assist.
          </p>
          <div className="card-actions">
            <button className="btn-primary">HUBB Core</button>
            <button className="btn-primary">HUBB HOF</button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">⚙️</div>
            <h3 className="card-title">Configurações</h3>
          </div>
          <p className="card-description">
            Gerencie configurações do sistema, usuários e tenants.
          </p>
          <div className="card-actions">
            <button className="btn-primary">Configurar</button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default App