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
import ClinicOwnerDashboard from './pages/ClinicOwnerDashboard'
import CollabLevel1Dashboard from './pages/CollabLevel1Dashboard'
import CollabLevel2Dashboard from './pages/CollabLevel2Dashboard'
import CollabLevel3Dashboard from './pages/CollabLevel3Dashboard'
import PatientDashboard from './pages/PatientDashboard'
import SimpleAdmin from './pages/SimpleAdmin'
import Simple404 from './pages/Simple404'
import './index.css'

function App() {
  // 🚨 TESTE EXTREMO - VAMOS VER SE ISSO EXECUTA
  console.log('🔥 APP.TSX EXECUTANDO!', window.location.pathname)
  alert(`🔥 App carregou! URL atual: ${window.location.pathname}`)
  
  return (
    <Router>
      <DebugRouter />
      <Routes>
        {/* Home / Roles */}
        <Route index element={
          <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-8">🏥 HUBB Assist - Dashboards por Role</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/admin" className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-purple-600 mb-2">ADMIN</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: ROXO</p>
                  <p className="text-gray-600">Visão global de tenants, usuários e sistema</p>
                </Link>
                
                <Link to="/clinic-owner" className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">PROPRIETÁRIO</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: AZUL</p>
                  <p className="text-gray-600">Gestão completa da clínica</p>
                </Link>
                
                <Link to="/collab-level1" className="p-6 bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-green-600 mb-2">COLABORADOR N1</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: VERDE</p>
                  <p className="text-gray-600">Recepcionista/Auxiliar</p>
                </Link>
                
                <Link to="/patient" className="p-6 bg-gradient-to-br from-pink-100 to-pink-50 border-2 border-pink-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-pink-600 mb-2">PACIENTE</h3>
                  <p className="text-gray-700 font-medium mb-2">Sidebar: ROSA</p>
                  <p className="text-gray-600">Portal do paciente</p>
                </Link>
              </div>
            </div>
          </div>
        } />

        {/* Dashboards */}
        <Route path="/admin" element={<SimpleAdmin />} />
        <Route path="/clinic-owner" element={<AppShell userType="DONO_CLINICA"><ClinicOwnerDashboard /></AppShell>} />
        <Route path="/collab-level1" element={<AppShell userType="COLABORADOR"><CollabLevel1Dashboard /></AppShell>} />
        <Route path="/collab-level2" element={<AppShell userType="COLABORADOR"><CollabLevel2Dashboard /></AppShell>} />
        <Route path="/collab-level3" element={<AppShell userType="COLABORADOR"><CollabLevel3Dashboard /></AppShell>} />
        <Route path="/patient" element={<AppShell userType="PACIENTE"><PatientDashboard /></AppShell>} />

        {/* 404 – sempre por último */}
        <Route path="*" element={<Simple404 />} />
      </Routes>
    </Router>
  )
}

export default App