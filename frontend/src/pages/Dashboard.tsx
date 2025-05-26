import DashboardStats from '../components/dashboard/DashboardStats'
import DashboardCharts from '../components/dashboard/DashboardCharts'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* FLAG AMARELA - DASHBOARD PRINCIPAL */}
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">!</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-yellow-800">🟡 ESTOU AQUI - DASHBOARD PRINCIPAL ORIGINAL</h3>
            <p className="text-yellow-700">
              Este é o dashboard original (não os específicos por role). Os novos dashboards estão em /admin, /clinic-owner, /patient, etc.
            </p>
          </div>
        </div>
      </div>

      {/* Link para visualizar dashboards por role */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Visualizar Dashboards por Role</h3>
            <p className="text-gray-600">
              Veja como cada tipo de usuário (Admin, Proprietário, Colaborador, Paciente) visualiza o sistema
            </p>
          </div>
          <a 
            href="/roles" 
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Ver Todos os Dashboards
          </a>
        </div>
      </div>

      <DashboardStats />
      <DashboardCharts />
    </div>
  )
}

export default Dashboard