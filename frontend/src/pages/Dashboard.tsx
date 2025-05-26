import DashboardStats from '../components/dashboard/DashboardStats'
import DashboardCharts from '../components/dashboard/DashboardCharts'

const Dashboard = () => {
  return (
    <div className="space-y-6">
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