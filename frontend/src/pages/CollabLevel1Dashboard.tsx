import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Users, Calendar, Clock, Plus, FileText, Activity } from 'lucide-react'

export default function CollabLevel1Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard - Colaborador Nível 1</h1>
        <p className="text-gray-600">Área de trabalho para recepcionista/auxiliar</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Hoje</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">5 chegaram</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Consulta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14:30</div>
            <p className="text-xs text-muted-foreground">Ana Silva - Limpeza</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Atendimento</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 consultórios ocupados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Na sala de espera</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Tarefas mais comuns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                <Plus className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">Novo Paciente</h4>
                  <p className="text-sm text-gray-600">Cadastrar paciente</p>
                </div>
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium">Agendar Consulta</h4>
                  <p className="text-sm text-gray-600">Nova marcação</p>
                </div>
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                <FileText className="h-5 w-5 text-purple-600" />
                <div>
                  <h4 className="font-medium">Ficha do Paciente</h4>
                  <p className="text-sm text-gray-600">Consultar dados</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Agenda do Dia */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Agenda de Hoje</CardTitle>
            <CardDescription>Próximos agendamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "14:30", patient: "Ana Silva", procedure: "Limpeza", doctor: "Dr. João", status: "Confirmado" },
                { time: "15:00", patient: "Carlos Santos", procedure: "Consulta", doctor: "Dra. Ana", status: "Aguardando" },
                { time: "15:30", patient: "Maria Costa", procedure: "Obturação", doctor: "Dr. João", status: "Confirmado" },
                { time: "16:00", patient: "José Lima", procedure: "Revisão", doctor: "Dra. Ana", status: "Reagendar" },
                { time: "16:30", patient: "Lucia Oliveira", procedure: "Clareamento", doctor: "Dr. João", status: "Confirmado" },
              ].map((appointment, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bold text-lg">{appointment.time}</div>
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.patient}</h4>
                      <p className="text-sm text-gray-600">{appointment.procedure} - {appointment.doctor}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    appointment.status === 'Confirmado' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'Aguardando' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pacientes em Atendimento */}
      <Card>
        <CardHeader>
          <CardTitle>Pacientes em Atendimento</CardTitle>
          <CardDescription>Status atual dos consultórios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { room: "Consultório 1", patient: "Pedro Alves", doctor: "Dr. João Silva", started: "14:00", procedure: "Limpeza" },
              { room: "Consultório 2", patient: "Carla Mendes", doctor: "Dra. Ana Costa", started: "13:45", procedure: "Obturação" },
              { room: "Consultório 3", patient: "Roberto Dias", doctor: "Dr. João Silva", started: "14:15", procedure: "Consulta" },
            ].map((session, i) => (
              <div key={i} className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-medium text-blue-800">{session.room}</h4>
                <p className="text-sm font-medium mt-1">{session.patient}</p>
                <p className="text-sm text-gray-600">{session.doctor}</p>
                <p className="text-sm text-gray-600">{session.procedure}</p>
                <p className="text-xs text-blue-600 mt-2">Iniciado às {session.started}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}