import { Calendar, User, FileText, Phone, CreditCard, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PatientSidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onClose: () => void
}

const PatientSidebar = ({ collapsed, mobileOpen, onClose }: PatientSidebarProps) => {
  const menuItems = [
    { icon: Calendar, label: 'Minhas Consultas', href: '/patient', color: 'text-pink-400' },
    { icon: User, label: 'Meus Dados', href: '/patient/profile', color: 'text-blue-400' },
    { icon: FileText, label: 'Orçamentos', href: '/patient/budgets', color: 'text-green-400' },
    { icon: FileText, label: 'Histórico', href: '/patient/history', color: 'text-purple-400' },
    { icon: CreditCard, label: 'Pagamentos', href: '/patient/payments', color: 'text-orange-400' },
    { icon: Phone, label: 'Contato', href: '/patient/contact', color: 'text-red-400' },
    { icon: Settings, label: 'Configurações', href: '/patient/settings', color: 'text-gray-400' },
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
        fixed top-0 left-0 h-full bg-gradient-to-b from-pink-900 to-pink-800 text-white z-50
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${collapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-pink-600 font-bold text-sm">H</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg">HUBB Paciente</h1>
                <p className="text-pink-200 text-xs">Meu Portal</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center gap-3 px-4 py-3 hover:bg-pink-700 transition-colors"
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

export default PatientSidebar