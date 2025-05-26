import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import ClinicOwnerDashboard from './pages/ClinicOwnerDashboard'
import CollabLevel1Dashboard from './pages/CollabLevel1Dashboard'
import CollabLevel2Dashboard from './pages/CollabLevel2Dashboard'
import CollabLevel3Dashboard from './pages/CollabLevel3Dashboard'
import PatientDashboard from './pages/PatientDashboard'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Principal */}
        <Route path="/" element={
          <AppShell userType="ADMIN">
            <Dashboard />
          </AppShell>
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

        {/* Página de seleção de roles */}
        <Route path="/roles" element={
          <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-8">🏥 HUBB Assist - Dashboards por Role</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/admin" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-purple-600 mb-2">ADMIN</h3>
                  <p className="text-gray-600">Dashboard administrativo com visão global da plataforma</p>
                </Link>
                
                <Link to="/clinic-owner" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">PROPRIETÁRIO</h3>
                  <p className="text-gray-600">Gestão completa da clínica e financeiro</p>
                </Link>
                
                <Link to="/collab-level1" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-green-600 mb-2">COLABORADOR N1</h3>
                  <p className="text-gray-600">Recepcionista/Auxiliar - Agenda e pacientes</p>
                </Link>
                
                <Link to="/collab-level2" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-orange-600 mb-2">COLABORADOR N2</h3>
                  <p className="text-gray-600">Gestão de estoque e relatórios</p>
                </Link>
                
                <Link to="/collab-level3" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-red-600 mb-2">COLABORADOR N3</h3>
                  <p className="text-gray-600">Gestão financeira e orçamentos</p>
                </Link>
                
                <Link to="/patient" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-pink-600 mb-2">PACIENTE</h3>
                  <p className="text-gray-600">Portal do paciente com consultas e dados</p>
                </Link>
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Dashboard Principal
                </Link>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App