import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthTest() {
  const { user, login, logout, hasAnyRole } = useAuth();
  const [testToken, setTestToken] = useState('');

  // Token de teste simulado (JWT válido com roles)
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZXMiOlsiQURNSU4iLCJET05PX0RFX0NMSU5JQ0EiXSwiaWF0IjoxNTE2MjM5MDIyfQ.example';

  const handleTestLogin = () => {
    if (testToken.trim()) {
      login(testToken);
    } else {
      // Para teste, vamos simular um token
      const simulatedToken = btoa(JSON.stringify({
        header: { alg: "HS256", typ: "JWT" },
        payload: { 
          sub: "test-user-123", 
          roles: ["ADMIN", "DONO_DE_CLINICA"],
          iat: Date.now() / 1000 
        }
      }));
      login(`fake.${simulatedToken}.signature`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">
            🧪 Teste do AuthContext
          </h1>

          {/* Status do usuário */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Status do Usuário:</h2>
            {user ? (
              <div className="space-y-2">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
                <p className="text-green-600">✅ Usuário logado!</p>
              </div>
            ) : (
              <p className="text-red-600">❌ Nenhum usuário logado</p>
            )}
          </div>

          {/* Teste de roles */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Teste de Verificação de Roles:</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>hasAnyRole("ADMIN"): <span className={hasAnyRole("ADMIN") ? "text-green-600" : "text-red-600"}>{hasAnyRole("ADMIN") ? "✅ Sim" : "❌ Não"}</span></p>
                <p>hasAnyRole("DONO_DE_CLINICA"): <span className={hasAnyRole("DONO_DE_CLINICA") ? "text-green-600" : "text-red-600"}>{hasAnyRole("DONO_DE_CLINICA") ? "✅ Sim" : "❌ Não"}</span></p>
                <p>hasAnyRole("PACIENTE"): <span className={hasAnyRole("PACIENTE") ? "text-green-600" : "text-red-600"}>{hasAnyRole("PACIENTE") ? "✅ Sim" : "❌ Não"}</span></p>
              </div>
              <div>
                <p>hasAnyRole("ADMIN", "PACIENTE"): <span className={hasAnyRole("ADMIN", "PACIENTE") ? "text-green-600" : "text-red-600"}>{hasAnyRole("ADMIN", "PACIENTE") ? "✅ Sim" : "❌ Não"}</span></p>
                <p>hasAnyRole("COLAB_N1", "COLAB_N2"): <span className={hasAnyRole("COLAB_N1", "COLAB_N2") ? "text-green-600" : "text-red-600"}>{hasAnyRole("COLAB_N1", "COLAB_N2") ? "✅ Sim" : "❌ Não"}</span></p>
              </div>
            </div>
          </div>

          {/* Controles de login/logout */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Controles:</h2>
            
            {!user ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Token JWT (deixe vazio para usar um token de teste):
                  </label>
                  <input
                    type="text"
                    value={testToken}
                    onChange={(e) => setTestToken(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Cole um token JWT aqui ou deixe vazio..."
                  />
                </div>
                <button
                  onClick={handleTestLogin}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  🔑 Fazer Login de Teste
                </button>
              </div>
            ) : (
              <button
                onClick={logout}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                🚪 Fazer Logout
              </button>
            )}
          </div>

          {/* LocalStorage info */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h2 className="text-xl font-bold mb-3">LocalStorage:</h2>
            <p><strong>access_token:</strong> {localStorage.getItem('access_token') ? '✅ Presente' : '❌ Ausente'}</p>
            {localStorage.getItem('access_token') && (
              <p className="text-xs text-gray-600 mt-2 break-all">
                {localStorage.getItem('access_token')?.substring(0, 100)}...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}