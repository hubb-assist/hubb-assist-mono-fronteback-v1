import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Package, TrendingUp, AlertTriangle, Users, Calendar, BarChart3 } from 'lucide-react'

export default function CollabLevel2Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard - Colaborador Nível 2</h1>
        <p className="text-gray-600">Gestão de estoque e relatórios operacionais</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Itens precisam reposição</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumo Mensal</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 3.240</div>
            <p className="text-xs text-muted-foreground">-8% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atendimentos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eficiência</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Meta: 90%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estoque Critical */}
        <Card>
          <CardHeader>
            <CardTitle>Estoque Crítico</CardTitle>
            <CardDescription>Itens que precisam de reposição</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { item: "Anestésico Lidocaína", current: 12, min: 20, status: "crítico" },
                { item: "Luvas Descartáveis", current: 45, min: 50, status: "baixo" },
                { item: "Amalgama", current: 3, min: 10, status: "crítico" },
                { item: "Algodão", current: 28, min: 30, status: "baixo" },
              ].map((stock, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{stock.item}</h4>
                    <p className="text-sm text-gray-600">{stock.current} unidades</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    stock.status === 'crítico' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {stock.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Relatório Semanal */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Relatório de Atendimentos</CardTitle>
            <CardDescription>Performance da semana atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">147</div>
                  <p className="text-sm text-gray-600">Total Atendimentos</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">89%</div>
                  <p className="text-sm text-gray-600">Taxa Comparecimento</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">27min</div>
                  <p className="text-sm text-gray-600">Tempo Médio</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Limpezas</span>
                  <span>45 (31%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '31%' }}></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Obturações</span>
                  <span>38 (26%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '26%' }}></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Consultas</span>
                  <span>64 (43%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '43%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controle de Insumos */}
      <Card>
        <CardHeader>
          <CardTitle>Controle de Insumos</CardTitle>
          <CardDescription>Movimentação e consumo por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { category: "Anestésicos", consumed: "18 un", cost: "R$ 420", trend: "+5%" },
              { category: "Materiais Desc.", consumed: "340 un", cost: "R$ 180", trend: "-12%" },
              { category: "Instrumentos", consumed: "12 un", cost: "R$ 890", trend: "+3%" },
              { category: "Medicamentos", consumed: "25 un", cost: "R$ 340", trend: "-8%" },
            ].map((category, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <h4 className="font-medium">{category.category}</h4>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">Consumo: {category.consumed}</p>
                  <p className="text-sm text-gray-600">Custo: {category.cost}</p>
                  <p className={`text-sm ${
                    category.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {category.trend} vs mês anterior
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}