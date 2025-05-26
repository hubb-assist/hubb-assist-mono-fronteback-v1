import { Building, Users, Settings, BarChart, Eye, UserCheck, Brain, Mic } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  userType: 'ADMIN' | 'DONO_CLINICA' | 'COLABORADOR' | 'PACIENTE'
  onClose: () => void
}

const Sidebar = ({ collapsed, mobileOpen, userType, onClose }: SidebarProps) => {
  const menuItems = [
    { icon: BarChart, label: 'Dashboard', href: '#', active: true },
    { icon: Building, label: 'Tenants', href: '#' },
    { icon: Users, label: 'Usuários', href: '#' },
    { icon: Settings, label: 'Configurações', href: '#' },
  ]

  const hubbModules = [
    { icon: BarChart, label: 'HUBB Core', href: '#', color: 'bg-blue-500' },
    { icon: UserCheck, label: 'HUBB HOF', href: '#', color: 'bg-green-500' },
    { icon: Eye, label: 'HUBB Vision', href: '#', color: 'bg-purple-500' },
    { icon: Users, label: 'HUBB RH', href: '#', color: 'bg-orange-500' },
    { icon: Brain, label: 'HUBB IA', href: '#', color: 'bg-pink-500' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />
      )}
      
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-[#2D113F] text-white transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-white/10">
          {!collapsed && (
            <img 
              src="/assets/images/logo_hubb_assisit.png" 
              alt="HUBB Assist" 
              className="h-8 object-contain"
            />
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-[#C52339] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
          )}
        </div>

        <nav className="mt-8">
          {/* Main Menu */}
          <div className="px-4">
            {!collapsed && (
              <div className="text-xs uppercase text-white/60 font-semibold mb-3 tracking-wider">
                Menu Principal
              </div>
            )}
            
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 mb-1 rounded-md transition-colors",
                  item.active 
                    ? "bg-[#C52339] text-white" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </a>
            ))}
          </div>

          {/* HUBB Modules */}
          <div className="px-4 mt-8">
            {!collapsed && (
              <div className="text-xs uppercase text-white/60 font-semibold mb-3 tracking-wider">
                Módulos HUBB
              </div>
            )}
            
            {hubbModules.map((module) => (
              <a
                key={module.label}
                href={module.href}
                className="flex items-center px-3 py-2 mb-1 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <module.icon className="w-5 h-5" />
                {!collapsed && <span className="ml-3">{module.label}</span>}
              </a>
            ))}
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar