import DashboardStats from '../components/dashboard/DashboardStats'
import DashboardCharts from '../components/dashboard/DashboardCharts'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <DashboardCharts />
    </div>
  )
}

export default Dashboard