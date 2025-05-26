import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { DollarSign, Users, Calendar, TrendingUp } from 'lucide-react'

export default function ClinicOwnerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard do Proprietário</h1>
        <p className="text-gray-600">Gestão completa da Clínica Sorrir Mais</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 47.350</div>
            <p className="text-xs text-muted-foreground">+15% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+18 novos este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">2 cancelamentos hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Ocupação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Meta: 85%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resumo Financeiro */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
            <CardDescription>Visão geral das finanças da clínica</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Receitas</h4>
                  <p className="text-2xl font-bold text-green-700">R$ 47.350</p>
                  <p className="text-sm text-green-600">Este mês</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-800">Despesas</h4>
                  <p className="text-2xl font-bold text-red-700">R$ 28.920</p>
                  <p className="text-sm text-red-600">Este mês</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800">Lucro Líquido</h4>
                <p className="text-3xl font-bold text-blue-700">R$ 18.430</p>
                <p className="text-sm text-blue-600">Margem: 39%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipe */}
        <Card>
          <CardHeader>
            <CardTitle>Equipe</CardTitle>
            <CardDescription>Status da equipe hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Dr. João Silva", role: "Dentista", status: "Trabalhando", patients: 8 },
                { name: "Dra. Ana Costa", role: "Ortodontista", status: "Trabalhando", patients: 6 },
                { name: "Maria Santos", role: "Recepcionista", status: "Trabalhando", patients: 0 },
                { name: "Carlos Lima", role: "Auxiliar", status: "Folga", patients: 0 },
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.status === 'Trabalhando' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status}
                    </span>
                    {member.patients > 0 && (
                      <p className="text-sm text-gray-500 mt-1">{member.patients} pacientes</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Módulos HUBB Ativos */}
      <Card>
        <CardHeader>
          <CardTitle>Módulos HUBB Ativos</CardTitle>
          <CardDescription>Status e configurações dos módulos contratados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { module: "HUBB Core", status: "Ativo", usage: "Alto", color: "green" },
              { module: "HUBB HOF", status: "Ativo", usage: "Médio", color: "green" },
              { module: "HUBB Vision", status: "Inativo", usage: "-", color: "gray" },
              { module: "HUBB RH", status: "Ativo", usage: "Alto", color: "green" },
              { module: "HUBB IA", status: "Trial", usage: "Baixo", color: "yellow" },
            ].map((item, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{item.module}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.color === 'green' ? 'bg-green-100 text-green-800' :
                    item.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Uso: {item.usage}</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                  Configurar
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}