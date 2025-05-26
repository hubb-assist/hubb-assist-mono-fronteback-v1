import { Users, Calendar, Package, FileText, Clock, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CollaboratorSidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onClose: () => void
  level?: number
}

const CollaboratorSidebar = ({ collapsed, mobileOpen, onClose, level = 1 }: CollaboratorSidebarProps) => {
  const baseItems = [
    { icon: Calendar, label: 'Agenda', href: `/collab-level${level}`, color: 'text-green-400' },
    { icon: Users, label: 'Pacientes', href: `/collab-level${level}/patients`, color: 'text-blue-400' },
  ]

  const level2Items = [
    { icon: Package, label: 'Estoque', href: `/collab-level${level}/stock`, color: 'text-orange-400' },
    { icon: FileText, label: 'Relatórios', href: `/collab-level${level}/reports`, color: 'text-purple-400' },
  ]

  const level3Items = [
    { icon: FileText, label: 'Orçamentos', href: `/collab-level${level}/budgets`, color: 'text-red-400' },
    { icon: Clock, label: 'Financeiro', href: `/collab-level${level}/finance`, color: 'text-yellow-400' },
  ]

  let menuItems = [...baseItems]
  if (level >= 2) menuItems = [...menuItems, ...level2Items]
  if (level >= 3) menuItems = [...menuItems, ...level3Items]
  
  menuItems.push({ icon: Settings, label: 'Configurações', href: `/collab-level${level}/settings`, color: 'text-gray-400' })

  const levelTitles = {
    1: 'Recepção',
    2: 'Coordenação', 
    3: 'Supervisão'
  }

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
        fixed top-0 left-0 h-full bg-gradient-to-b from-green-900 to-green-800 text-white z-50
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${collapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">H</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg">HUBB {levelTitles[level as keyof typeof levelTitles]}</h1>
                <p className="text-green-200 text-xs">Nível {level}</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center gap-3 px-4 py-3 hover:bg-green-700 transition-colors"
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

export default CollaboratorSidebar