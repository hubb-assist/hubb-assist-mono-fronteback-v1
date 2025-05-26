import { useState, useEffect } from 'react'

interface APIStatus {
  status: string;
  environment: string;
  database: string;
}

interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  tenant_id: number;
  created_at: string;
}

interface Tenant {
  id: number;
  company_name: string;
  slug: string;
  cnpj: string;
  is_active: boolean;
  created_at: string;
}

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [apiStatus, setApiStatus] = useState<APIStatus | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
    setLoading(false);
  };

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/tenants`);
      const data = await response.json();
      setTenants(data);
    } catch (error) {
      console.error('Erro ao buscar clínicas:', error);
    }
    setLoading(false);
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
    <div className="container">
      <div className="header">
        <h1>🏥 HUBB Assist SaaS</h1>
        <p>Sistema Multi-Tenant para Clínicas de Saúde</p>
        {apiStatus && (
          <div style={{ marginTop: '15px' }}>
            <span>Status da API:</span>
            <span className={`status-badge ${apiStatus.status === 'healthy' ? 'status-online' : 'status-offline'}`}>
              {apiStatus.status === 'healthy' ? '🟢 Online' : '🔴 Offline'}
            </span>
          </div>
        )}
      </div>

      <div className="cards-grid">
        <div className="card">
          <h3>📚 Documentação da API</h3>
          <p>Explore todos os endpoints disponíveis na documentação interativa do Swagger.</p>
          <a 
            href={`${API_BASE_URL}/docs`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn"
          >
            Abrir Swagger UI
          </a>
        </div>

        <div className="card">
          <h3>📖 Documentação ReDoc</h3>
          <p>Versão alternativa da documentação com interface diferente.</p>
          <a 
            href={`${API_BASE_URL}/redoc`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn"
          >
            Abrir ReDoc
          </a>
        </div>

        <div className="card">
          <h3>🔐 Teste de Login</h3>
          <p>Teste o sistema de autenticação com credenciais de demonstração.</p>
          <button 
            onClick={testLogin} 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Testando...' : 'Testar Login'}
          </button>
          <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
            Usuário: admin@clinica.com<br />
            Senha: 123456
          </div>
        </div>
      </div>

      <div className="cards-grid">
        <div className="card">
          <h3>👥 Usuários</h3>
          <p>Visualizar lista de usuários cadastrados no sistema.</p>
          <button 
            onClick={fetchUsers} 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Carregar Usuários'}
          </button>
          {users.length > 0 && (
            <div className="api-response">
              {users.map(user => (
                <div key={user.id} style={{ marginBottom: '10px', padding: '10px', background: 'white', borderRadius: '4px' }}>
                  <strong>{user.full_name}</strong><br />
                  📧 {user.email}<br />
                  🆔 ID: {user.id} | Tenant: {user.tenant_id}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h3>🏢 Clínicas</h3>
          <p>Visualizar lista de clínicas registradas na plataforma.</p>
          <button 
            onClick={fetchTenants} 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Carregar Clínicas'}
          </button>
          {tenants.length > 0 && (
            <div className="api-response">
              {tenants.map(tenant => (
                <div key={tenant.id} style={{ marginBottom: '10px', padding: '10px', background: 'white', borderRadius: '4px' }}>
                  <strong>{tenant.company_name}</strong><br />
                  🔗 Slug: {tenant.slug}<br />
                  📄 CNPJ: {tenant.cnpj}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="api-test">
        <h3>📊 Informações da API</h3>
        {apiStatus ? (
          <div className="api-response">
            <strong>Status:</strong> {apiStatus.status}<br />
            <strong>Ambiente:</strong> {apiStatus.environment}<br />
            <strong>Database:</strong> {apiStatus.database}<br />
            <strong>Base URL:</strong> {API_BASE_URL}
          </div>
        ) : (
          <div className="loading">Carregando informações da API...</div>
        )}
      </div>
    </div>
  )
}

export default App