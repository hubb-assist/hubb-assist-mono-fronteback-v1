import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { DollarSign, TrendingUp, Calculator, PieChart } from 'lucide-react'

export default function CollabLevel3Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard - Colaborador Nível 3</h1>
        <p className="text-gray-600">Gestão financeira e orçamentos avançados</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamentos Pendentes</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">R$ 28.400 em aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Semanal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 11.230</div>
            <p className="text-xs text-muted-foreground">+18% vs semana anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">Orçamentos → Tratamentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 485</div>
            <p className="text-xs text-muted-foreground">+12% este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orçamentos Recentes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Orçamentos Recentes</CardTitle>
            <CardDescription>Últimas propostas geradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { patient: "Ana Silva", value: "R$ 2.400", procedures: "Limpeza + Obturação", status: "Aprovado", date: "Hoje" },
                { patient: "Carlos Santos", value: "R$ 890", procedures: "Consulta + Raio-X", status: "Pendente", date: "Ontem" },
                { patient: "Maria Costa", value: "R$ 3.200", procedures: "Tratamento Canal", status: "Em análise", date: "2 dias" },
                { patient: "José Lima", value: "R$ 1.450", procedures: "Prótese Parcial", status: "Aprovado", date: "3 dias" },
              ].map((budget, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{budget.patient}</h4>
                    <p className="text-sm text-gray-600">{budget.procedures}</p>
                    <p className="text-sm text-gray-500">{budget.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{budget.value}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      budget.status === 'Aprovado' ? 'bg-green-100 text-green-800' :
                      budget.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {budget.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Análise Financeira */}
        <Card>
          <CardHeader>
            <CardTitle>Análise Financeira</CardTitle>
            <CardDescription>Métricas de performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800">Margem de Lucro</h4>
                <p className="text-2xl font-bold text-green-700">42%</p>
                <p className="text-sm text-green-600">Meta: 35%</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800">Inadimplência</h4>
                <p className="text-2xl font-bold text-blue-700">3.2%</p>
                <p className="text-sm text-blue-600">Dentro do esperado</p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800">Faturamento Previsto</h4>
                <p className="text-2xl font-bold text-purple-700">R$ 52.300</p>
                <p className="text-sm text-purple-600">Próximos 30 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios Financeiros */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Financeiros Detalhados</CardTitle>
          <CardDescription>Análise por categoria de tratamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { category: "Ortodontia", revenue: "R$ 18.400", margin: "48%", patients: 12 },
              { category: "Implantes", revenue: "R$ 15.200", margin: "55%", patients: 8 },
              { category: "Estética", revenue: "R$ 9.800", margin: "38%", patients: 15 },
              { category: "Geral", revenue: "R$ 13.600", margin: "32%", patients: 24 },
            ].map((category, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <h4 className="font-medium">{category.category}</h4>
                <div className="mt-2 space-y-1">
                  <p className="text-lg font-bold text-blue-600">{category.revenue}</p>
                  <p className="text-sm text-gray-600">Margem: {category.margin}</p>
                  <p className="text-sm text-gray-600">{category.patients} pacientes</p>
                </div>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                  Ver detalhes →
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Controle de Orçamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Controle de Orçamentos</CardTitle>
          <CardDescription>Status e prazos de aprovação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border-l-4 border-yellow-400 bg-yellow-50">
              <div>
                <h4 className="font-medium">Orçamentos vencendo em 2 dias</h4>
                <p className="text-sm text-gray-600">3 propostas precisam de follow-up</p>
              </div>
              <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm">
                Revisar
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 border-l-4 border-green-400 bg-green-50">
              <div>
                <h4 className="font-medium">Meta mensal atingida</h4>
                <p className="text-sm text-gray-600">105% da meta de orçamentos aprovados</p>
              </div>
              <span className="px-3 py-1 bg-green-600 text-white rounded text-sm">
                ✓ Concluído
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 border-l-4 border-blue-400 bg-blue-50">
              <div>
                <h4 className="font-medium">Novos orçamentos solicitados</h4>
                <p className="text-sm text-gray-600">5 pacientes aguardam propostas</p>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                Criar
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}