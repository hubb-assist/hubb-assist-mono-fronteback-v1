import { Building, DollarSign, Users, Activity } from 'lucide-react'

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total de Tenants',
      value: '12',
      change: '+2.5%',
      icon: Building,
      bgColor: 'bg-[#2D113F]'
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 45.2k',
      change: '+12.3%',
      icon: DollarSign,
      bgColor: 'bg-[#C52339]'
    },
    {
      title: 'Usuários Ativos',
      value: '1,247',
      change: '+5.7%',
      icon: Users,
      bgColor: 'bg-green-600'
    },
    {
      title: 'Taxa de Uso',
      value: '89.2%',
      change: '+3.1%',
      icon: Activity,
      bgColor: 'bg-blue-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-sm text-green-600 mt-2">{stat.change}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats