import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function DebugRouter() {
  const location = useLocation()
  
  useEffect(() => {
    console.log('🔍 Rota atual:', location.pathname)
  }, [location])
  
  return null
}
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import ClinicOwnerDashboard from './pages/ClinicOwnerDashboard'
import CollabLevel1Dashboard from './pages/CollabLevel1Dashboard'
import CollabLevel2Dashboard from './pages/CollabLevel2Dashboard'
import CollabLevel3Dashboard from './pages/CollabLevel3Dashboard'
import PatientDashboard from './pages/PatientDashboard'
import AuthTest from './pages/AuthTest'
import './index.css'

function App() {
  return (
    <Router>
      <DebugRouter />
      <Routes>
        {/* Dashboard Principal - AGORA É A PÁGINA ROLES */}
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-8">🏥 HUBB Assist - Dashboards por Role</h1>
              
              <div className="bg-white rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Diferenças por Role:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-purple-600">SIDEBAR CORES:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• <span className="text-purple-600">ADMIN</span> - Roxo (gestão global)</li>
                      <li>• <span className="text-blue-600">PROPRIETÁRIO</span> - Azul (gestão clínica)</li>
                      <li>• <span className="text-green-600">COLABORADOR</span> - Verde (operacional)</li>
                      <li>• <span className="text-pink-600">PACIENTE</span> - Rosa (área pessoal)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-600">FUNCIONALIDADES:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Admin:</strong> Tenants, usuários, sistema</li>
                      <li>• <strong>Proprietário:</strong> Financeiro, equipe, módulos</li>
                      <li>• <strong>Colaborador:</strong> Agenda, pacientes, estoque</li>
                      <li>• <strong>Paciente:</strong> Consultas, dados, orçamentos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/admin" className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-purple-600 mb-2">ADMIN</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: ROXO</p>
                  <p className="text-gray-600">Visão global de tenants, usuários e sistema</p>
                  <div className="mt-3 text-sm text-purple-700">
                    <p>• Controle de todas as clínicas</p>
                    <p>• Métricas de receita SaaS</p>
                    <p>• Alertas de sistema</p>
                  </div>
                </Link>
                
                <Link to="/clinic-owner" className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">PROPRIETÁRIO</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: AZUL</p>
                  <p className="text-gray-600">Gestão completa da clínica</p>
                  <div className="mt-3 text-sm text-blue-700">
                    <p>• Faturamento e lucros</p>
                    <p>• Gestão da equipe</p>
                    <p>• Módulos HUBB ativos</p>
                  </div>
                </Link>
                
                <Link to="/collab-level1" className="p-6 bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-green-600 mb-2">COLABORADOR N1</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: VERDE (Recepção)</p>
                  <p className="text-gray-600">Recepcionista/Auxiliar</p>
                  <div className="mt-3 text-sm text-green-700">
                    <p>• Agenda do dia</p>
                    <p>• Cadastro de pacientes</p>
                    <p>• Sala de espera</p>
                  </div>
                </Link>
                
                <Link to="/collab-level2" className="p-6 bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-orange-600 mb-2">COLABORADOR N2</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: VERDE (Coordenação)</p>
                  <p className="text-gray-600">Gestão de estoque</p>
                  <div className="mt-3 text-sm text-orange-700">
                    <p>• Estoque crítico</p>
                    <p>• Relatórios operacionais</p>
                    <p>• Controle de insumos</p>
                  </div>
                </Link>
                
                <Link to="/collab-level3" className="p-6 bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-red-600 mb-2">COLABORADOR N3</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: VERDE (Supervisão)</p>
                  <p className="text-gray-600">Gestão financeira avançada</p>
                  <div className="mt-3 text-sm text-red-700">
                    <p>• Orçamentos e aprovações</p>
                    <p>• Análise financeira</p>
                    <p>• Controle de margem</p>
                  </div>
                </Link>
                
                <Link to="/patient" className="p-6 bg-gradient-to-br from-pink-100 to-pink-50 border-2 border-pink-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-pink-600 mb-2">PACIENTE</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: ROSA</p>
                  <p className="text-gray-600">Portal do paciente</p>
                  <div className="mt-3 text-sm text-pink-700">
                    <p>• Minhas consultas</p>
                    <p>• Dados pessoais</p>
                    <p>• Orçamentos pendentes</p>
                  </div>
                </Link>
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/dashboard-original" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Dashboard Original (se precisar)
                </Link>
              </div>
            </div>
          </div>
        } />
        
        {/* Dashboards por Role */}
        <Route path="/admin" element={
          <AppShell userType="ADMIN">
            <AdminDashboard />
          </AppShell>
        } />
        
        <Route path="/clinic-owner" element={
          <AppShell userType="DONO_CLINICA">
            <ClinicOwnerDashboard />
          </AppShell>
        } />
        
        <Route path="/collab-level1" element={
          <AppShell userType="COLABORADOR">
            <CollabLevel1Dashboard />
          </AppShell>
        } />
        
        <Route path="/collab-level2" element={
          <AppShell userType="COLABORADOR">
            <CollabLevel2Dashboard />
          </AppShell>
        } />
        
        <Route path="/collab-level3" element={
          <AppShell userType="COLABORADOR">
            <CollabLevel3Dashboard />
          </AppShell>
        } />
        
        <Route path="/patient" element={
          <AppShell userType="PACIENTE">
            <PatientDashboard />
          </AppShell>
        } />

        {/* Página de seleção de roles - agora duplicada */}
        <Route path="/roles" element={
          <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-8">🏥 HUBB Assist - Dashboards por Role</h1>
              
              <div className="bg-white rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Diferenças por Role:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-purple-600">SIDEBAR CORES:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• <span className="text-purple-600">ADMIN</span> - Roxo (gestão global)</li>
                      <li>• <span className="text-blue-600">PROPRIETÁRIO</span> - Azul (gestão clínica)</li>
                      <li>• <span className="text-green-600">COLABORADOR</span> - Verde (operacional)</li>
                      <li>• <span className="text-pink-600">PACIENTE</span> - Rosa (área pessoal)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-600">FUNCIONALIDADES:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Admin:</strong> Tenants, usuários, sistema</li>
                      <li>• <strong>Proprietário:</strong> Financeiro, equipe, módulos</li>
                      <li>• <strong>Colaborador:</strong> Agenda, pacientes, estoque</li>
                      <li>• <strong>Paciente:</strong> Consultas, dados, orçamentos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/admin" className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-purple-600 mb-2">ADMIN</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: ROXO</p>
                  <p className="text-gray-600">Visão global de tenants, usuários e sistema</p>
                  <div className="mt-3 text-sm text-purple-700">
                    <p>• Controle de todas as clínicas</p>
                    <p>• Métricas de receita SaaS</p>
                    <p>• Alertas de sistema</p>
                  </div>
                </Link>
                
                <Link to="/clinic-owner" className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">PROPRIETÁRIO</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: AZUL</p>
                  <p className="text-gray-600">Gestão completa da clínica</p>
                  <div className="mt-3 text-sm text-blue-700">
                    <p>• Faturamento e lucros</p>
                    <p>• Gestão da equipe</p>
                    <p>• Módulos HUBB ativos</p>
                  </div>
                </Link>
                
                <Link to="/collab-level1" className="p-6 bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-green-600 mb-2">COLABORADOR N1</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: VERDE (Recepção)</p>
                  <p className="text-gray-600">Recepcionista/Auxiliar</p>
                  <div className="mt-3 text-sm text-green-700">
                    <p>• Agenda do dia</p>
                    <p>• Cadastro de pacientes</p>
                    <p>• Sala de espera</p>
                  </div>
                </Link>
                
                <Link to="/collab-level2" className="p-6 bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-orange-600 mb-2">COLABORADOR N2</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: VERDE (Coordenação)</p>
                  <p className="text-gray-600">Gestão de estoque</p>
                  <div className="mt-3 text-sm text-orange-700">
                    <p>• Estoque crítico</p>
                    <p>• Relatórios operacionais</p>
                    <p>• Controle de insumos</p>
                  </div>
                </Link>
                
                <Link to="/collab-level3" className="p-6 bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-red-600 mb-2">COLABORADOR N3</h3>
                  <p className="text-xl font-bold text-red-600 mb-2">Sidebar: VERDE (Supervisão)</p>
                  <p className="text-gray-600">Gestão financeira avançada</p>
                  <div className="mt-3 text-sm text-red-700">
                    <p>• Orçamentos e aprovações</p>
                    <p>• Análise financeira</p>
                    <p>• Controle de margem</p>
                  </div>
                </Link>
                
                <Link to="/patient" className="p-6 bg-gradient-to-br from-pink-100 to-pink-50 border-2 border-pink-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-pink-600 mb-2">PACIENTE</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: ROSA</p>
                  <p className="text-gray-600">Portal do paciente</p>
                  <div className="mt-3 text-sm text-pink-700">
                    <p>• Minhas consultas</p>
                    <p>• Dados pessoais</p>
                    <p>• Orçamentos pendentes</p>
                  </div>
                </Link>
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/dashboard-original" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Dashboard Original (se precisar)
                </Link>
              </div>
            </div>
          </div>
        } />

        {/* Dashboard original movido */}
        <Route path="/dashboard-original" element={
          <AppShell userType="ADMIN">
            <Dashboard />
          </AppShell>
        } />
        
        {/* Página de teste do AuthContext */}
        <Route path="/auth-test" element={<AuthTest />} />
        
        {/* Rota 404 - DEVE SER A ÚLTIMA */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App