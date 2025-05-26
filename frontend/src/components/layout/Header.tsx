import { Menu, Bell } from 'lucide-react'

interface HeaderProps {
  onToggleSidebar: () => void
  collapsed: boolean
  isMobile: boolean
  userType?: 'ADMIN' | 'DONO_CLINICA' | 'COLABORADOR' | 'PACIENTE'
}

const Header = ({ onToggleSidebar, userType = 'ADMIN' }: HeaderProps) => {
  const getUserInfo = () => {
    switch (userType) {
      case 'ADMIN':
        return {
          name: 'Sistema Admin',
          role: 'Administrador',
          title: 'Painel Administrativo',
          subtitle: 'Gestão global da plataforma HUBB Assist'
        }
      case 'DONO_CLINICA':
        return {
          name: 'Dr. Roberto Silva',
          role: 'Proprietário',
          title: 'Gestão da Clínica',
          subtitle: 'Clínica Sorrir Mais'
        }
      case 'COLABORADOR':
        return {
          name: 'Ana Costa',
          role: 'Colaboradora',
          title: 'Área de Trabalho',
          subtitle: 'Sistema operacional'
        }
      case 'PACIENTE':
        return {
          name: 'Maria Silva',
          role: 'Paciente',
          title: 'Meu Portal',
          subtitle: 'Área do paciente'
        }
      default:
        return {
          name: 'Usuário',
          role: 'Sistema',
          title: 'Dashboard',
          subtitle: 'HUBB Assist'
        }
    }
  }

  const userInfo = getUserInfo()

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{userInfo.title}</h1>
          <p className="text-sm text-gray-600">{userInfo.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{userInfo.name.charAt(0)}</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-gray-900">{userInfo.name}</div>
            <div className="text-xs text-gray-600">{userInfo.role}</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header