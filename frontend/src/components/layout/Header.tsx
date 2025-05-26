import { Menu, Bell } from 'lucide-react'

interface HeaderProps {
  onToggleSidebar: () => void
  collapsed: boolean
  isMobile: boolean
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
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
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">Visão geral do sistema HUBB Assist</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <img 
            src="/assets/images/hubb_pet_icon.png" 
            alt="Avatar" 
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-gray-900">Dr. João Silva</div>
            <div className="text-xs text-gray-600">Administrador</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header