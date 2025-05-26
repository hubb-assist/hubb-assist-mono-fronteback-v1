import { BarChart3, DollarSign, Users, Calendar, Package, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ClinicOwnerSidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onClose: () => void
}

const ClinicOwnerSidebar = ({ collapsed, mobileOpen, onClose }: ClinicOwnerSidebarProps) => {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/clinic-owner', color: 'text-blue-400' },
    { icon: DollarSign, label: 'Financeiro', href: '/clinic-owner/finance', color: 'text-green-400' },
    { icon: Users, label: 'Equipe', href: '/clinic-owner/team', color: 'text-purple-400' },
    { icon: Calendar, label: 'Agenda', href: '/clinic-owner/schedule', color: 'text-orange-400' },
    { icon: Package, label: 'Módulos HUBB', href: '/clinic-owner/modules', color: 'text-red-400' },
    { icon: Settings, label: 'Configurações', href: '/clinic-owner/settings', color: 'text-gray-400' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-blue-900 to-blue-800 text-white z-50
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${collapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">H</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg">HUBB Clínica</h1>
                <p className="text-blue-200 text-xs">Gestão da Clínica</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition-colors"
              onClick={onClose}
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
              {!collapsed && (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default ClinicOwnerSidebar