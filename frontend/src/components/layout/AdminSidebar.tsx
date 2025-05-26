import { Building2, Users, BarChart3, Settings, Shield, Database } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AdminSidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onClose: () => void
}

const AdminSidebar = ({ collapsed, mobileOpen, onClose }: AdminSidebarProps) => {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin', color: 'text-purple-400' },
    { icon: Building2, label: 'Tenants', href: '/admin/tenants', color: 'text-blue-400' },
    { icon: Users, label: 'Usuários', href: '/admin/users', color: 'text-green-400' },
    { icon: Database, label: 'Sistema', href: '/admin/system', color: 'text-orange-400' },
    { icon: Shield, label: 'Segurança', href: '/admin/security', color: 'text-red-400' },
    { icon: Settings, label: 'Configurações', href: '/admin/settings', color: 'text-gray-400' },
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
        fixed top-0 left-0 h-full bg-gradient-to-b from-purple-900 to-purple-800 text-white z-50
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${collapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">H</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg">HUBB Admin</h1>
                <p className="text-purple-200 text-xs">Painel Administrativo</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center gap-3 px-4 py-3 hover:bg-purple-700 transition-colors"
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

export default AdminSidebar