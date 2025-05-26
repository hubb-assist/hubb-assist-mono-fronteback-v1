import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Users, Building2, Activity, TrendingUp, AlertTriangle } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600">Visão geral da plataforma HUBB Assist SaaS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tenants Ativos</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,847</div>
            <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 89.420</div>
            <p className="text-xs text-muted-foreground">+23% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime Sistema</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tenants Recentes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tenants Recentes</CardTitle>
            <CardDescription>Clínicas cadastradas nos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Clínica Sorrir Mais", users: 12, status: "Ativo", date: "Hoje" },
                { name: "Odonto Center", users: 8, status: "Ativo", date: "Ontem" },
                { name: "Dental Excellence", users: 15, status: "Pendente", date: "2 dias" },
                { name: "Sorriso Perfeito", users: 6, status: "Ativo", date: "3 dias" },
              ].map((tenant, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{tenant.name}</h4>
                    <p className="text-sm text-gray-600">{tenant.users} usuários</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tenant.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tenant.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{tenant.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas Sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Alertas do Sistema</CardTitle>
            <CardDescription>Monitoramento e notificações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Uso de CPU Alto</p>
                  <p className="text-xs text-gray-600">Servidor 2: 85%</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Backup Concluído</p>
                  <p className="text-xs text-gray-600">Há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Performance OK</p>
                  <p className="text-xs text-gray-600">Todos os serviços</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Módulos HUBB - Uso Global */}
      <Card>
        <CardHeader>
          <CardTitle>Uso dos Módulos HUBB</CardTitle>
          <CardDescription>Estatísticas de utilização por módulo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { module: "HUBB Core", usage: "92%", tenants: 117 },
              { module: "HUBB HOF", usage: "67%", tenants: 85 },
              { module: "HUBB Vision", usage: "45%", tenants: 57 },
              { module: "HUBB RH", usage: "78%", tenants: 99 },
              { module: "HUBB IA", usage: "34%", tenants: 43 },
            ].map((item, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <h4 className="font-medium">{item.module}</h4>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Adoção</span>
                    <span>{item.usage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: item.usage }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{item.tenants} clínicas</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}