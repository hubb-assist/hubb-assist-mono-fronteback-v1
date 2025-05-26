import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const DashboardCharts = () => {
  const monthlyData = [
    { month: 'Jan', visitantes: 4000, receita: 2400 },
    { month: 'Fev', visitantes: 3000, receita: 1398 },
    { month: 'Mar', visitantes: 2000, receita: 9800 },
    { month: 'Abr', visitantes: 2780, receita: 3908 },
    { month: 'Mai', visitantes: 1890, receita: 4800 },
    { month: 'Jun', visitantes: 2390, receita: 3800 },
  ]

  const revenueData = [
    { name: 'Jan', receita: 45000, custos: 32000 },
    { name: 'Fev', receita: 52000, custos: 35000 },
    { name: 'Mar', receita: 48000, custos: 33000 },
    { name: 'Abr', receita: 61000, custos: 38000 },
    { name: 'Mai', receita: 55000, custos: 36000 },
    { name: 'Jun', receita: 67000, custos: 42000 },
  ]

  const moduleUsage = [
    { name: 'HUBB Core', value: 35, color: '#2D113F' },
    { name: 'HUBB HOF', value: 25, color: '#C52339' },
    { name: 'HUBB Vision', value: 20, color: '#3B82F6' },
    { name: 'HUBB RH', value: 12, color: '#10B981' },
    { name: 'HUBB IA', value: 8, color: '#F59E0B' },
  ]

  const deviceData = [
    { name: 'Jan', mobile: 65, desktop: 35 },
    { name: 'Fev', mobile: 70, desktop: 30 },
    { name: 'Mar', mobile: 68, desktop: 32 },
    { name: 'Abr', mobile: 72, desktop: 28 },
    { name: 'Mai', mobile: 75, desktop: 25 },
    { name: 'Jun', mobile: 73, desktop: 27 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Visitantes Mensais */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visitantes Mensais</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorVisitantes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C52339" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#C52339" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="visitantes" 
              stroke="#C52339" 
              fillOpacity={1} 
              fill="url(#colorVisitantes)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Receita vs Custos */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Receita vs Custos</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, '']} />
            <Legend />
            <Bar dataKey="receita" fill="#2D113F" name="Receita" radius={[4, 4, 0, 0]} />
            <Bar dataKey="custos" fill="#C52339" name="Custos" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Uso dos Módulos */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Uso dos Módulos HUBB</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={moduleUsage}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {moduleUsage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Uso']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Mobile vs Desktop */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acesso Mobile vs Desktop</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={deviceData}>
            <defs>
              <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D113F" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#2D113F" stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C52339" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#C52339" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip formatter={(value) => [`${value}%`, '']} />
            <Legend />
            <Area
              type="monotone"
              dataKey="mobile"
              stackId="1"
              stroke="#2D113F"
              fill="url(#colorMobile)"
              name="Mobile"
            />
            <Area
              type="monotone"
              dataKey="desktop"
              stackId="1"
              stroke="#C52339"
              fill="url(#colorDesktop)"
              name="Desktop"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DashboardCharts