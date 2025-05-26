import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Calendar, User, FileText, Clock, Phone, MapPin } from 'lucide-react'

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Meu Portal do Paciente</h1>
        <p className="text-gray-600">Bem-vindo(a), Maria Silva</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Consulta</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15/03</div>
            <p className="text-xs text-muted-foreground">14:30 - Limpeza</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Atendimento</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28/02</div>
            <p className="text-xs text-muted-foreground">Consulta de rotina</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendências</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Orçamento para aprovação</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximas Consultas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Minhas Consultas</CardTitle>
            <CardDescription>Próximos agendamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { 
                  date: "15/03/2024", 
                  time: "14:30", 
                  type: "Limpeza", 
                  doctor: "Dr. João Silva", 
                  status: "Confirmado",
                  location: "Consultório 1"
                },
                { 
                  date: "28/03/2024", 
                  time: "16:00", 
                  type: "Revisão", 
                  doctor: "Dr. João Silva", 
                  status: "Agendado",
                  location: "Consultório 1"
                },
                { 
                  date: "10/04/2024", 
                  time: "09:30", 
                  type: "Obturação", 
                  doctor: "Dra. Ana Costa", 
                  status: "Agendado",
                  location: "Consultório 2"
                },
              ].map((appointment, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bold">{appointment.date}</div>
                      <div className="text-sm text-gray-600">{appointment.time}</div>
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.type}</h4>
                      <p className="text-sm text-gray-600">{appointment.doctor}</p>
                      <p className="text-sm text-gray-500">{appointment.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === 'Confirmado' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status}
                    </span>
                    <div className="mt-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Remarcar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <button className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Solicitar Nova Consulta
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Dados Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>Meus Dados</CardTitle>
            <CardDescription>Informações pessoais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Maria Silva</p>
                  <p className="text-sm text-gray-600">CPF: 123.456.789-01</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">(11) 99999-8888</p>
                  <p className="text-sm text-gray-600">Celular</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Rua das Flores, 123</p>
                  <p className="text-sm text-gray-600">São Paulo - SP</p>
                </div>
              </div>
              
              <button className="w-full mt-4 p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Atualizar Dados
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orçamentos e Histórico */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orçamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Orçamentos</CardTitle>
            <CardDescription>Propostas de tratamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Tratamento Ortodôntico</h4>
                    <p className="text-sm text-gray-600">Dra. Ana Costa</p>
                    <p className="text-lg font-bold text-yellow-700 mt-1">R$ 3.200,00</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Pendente
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">
                    Aprovar
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm">
                    Ver Detalhes
                  </button>
                </div>
              </div>
              
              <div className="p-4 border-l-4 border-green-400 bg-green-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Limpeza + Obturação</h4>
                    <p className="text-sm text-gray-600">Dr. João Silva</p>
                    <p className="text-lg font-bold text-green-700 mt-1">R$ 450,00</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Aprovado
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Agendado para 10/04/2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico Médico */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico Médico</CardTitle>
            <CardDescription>Últimos atendimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: "28/02/2024", procedure: "Consulta de rotina", doctor: "Dr. João Silva", notes: "Limpeza realizada, saúde bucal boa" },
                { date: "15/01/2024", procedure: "Obturação", doctor: "Dra. Ana Costa", notes: "Obturação no dente 16 concluída" },
                { date: "20/12/2023", procedure: "Limpeza", doctor: "Dr. João Silva", notes: "Profilaxia + aplicação de flúor" },
              ].map((record, i) => (
                <div key={i} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{record.procedure}</h4>
                    <span className="text-sm text-gray-500">{record.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{record.doctor}</p>
                  <p className="text-sm text-gray-700 mt-1">{record.notes}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações da Clínica */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Clínica</CardTitle>
          <CardDescription>Clínica Sorrir Mais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Endereço</p>
                <p className="text-sm text-gray-600">Rua Principal, 456</p>
                <p className="text-sm text-gray-600">Centro - São Paulo</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Contato</p>
                <p className="text-sm text-gray-600">(11) 3333-4444</p>
                <p className="text-sm text-gray-600">WhatsApp: (11) 99999-7777</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Horário</p>
                <p className="text-sm text-gray-600">Segunda a Sexta: 8h às 18h</p>
                <p className="text-sm text-gray-600">Sábado: 8h às 12h</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}