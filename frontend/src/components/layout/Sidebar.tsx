interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  userType: 'ADMIN' | 'DONO_CLINICA' | 'COLABORADOR' | 'PACIENTE'
  onClose: () => void
}

const Sidebar = ({ collapsed, mobileOpen, userType, onClose }: SidebarProps) => {
  const getMenuItems = () => {
    switch (userType) {
      case 'ADMIN':
        return [
          { icon: '📊', text: 'Dashboard', href: '/', active: true },
          { icon: '🏢', text: 'Tenants', href: '/tenants' },
          { icon: '👥', text: 'Usuários', href: '/users' },
          { icon: '⚙️', text: 'Configurações', href: '/settings' },
          { icon: '📈', text: 'Analytics', href: '/analytics' }
        ]
      case 'DONO_CLINICA':
        return [
          { icon: '📊', text: 'Dashboard', href: '/', active: true },
          { icon: '👨‍⚕️', text: 'Colaboradores', href: '/colaboradores' },
          { icon: '🦷', text: 'Pacientes', href: '/pacientes' },
          { icon: '💰', text: 'Financeiro', href: '/financeiro' },
          { icon: '📋', text: 'Relatórios', href: '/relatorios' }
        ]
      case 'COLABORADOR':
        return [
          { icon: '📅', text: 'Agenda', href: '/', active: true },
          { icon: '🦷', text: 'Pacientes', href: '/pacientes' },
          { icon: '📋', text: 'Prontuários', href: '/prontuarios' },
          { icon: '🔧', text: 'Procedimentos', href: '/procedimentos' }
        ]
      case 'PACIENTE':
        return [
          { icon: '📅', text: 'Agendamentos', href: '/', active: true },
          { icon: '📋', text: 'Histórico', href: '/historico' },
          { icon: '🧾', text: 'Exames', href: '/exames' },
          { icon: '💳', text: 'Pagamentos', href: '/pagamentos' }
        ]
      default:
        return []
    }
  }

  const getHubbModules = () => {
    if (userType === 'PACIENTE') return []
    
    return [
      { icon: '🧠', text: 'HUBB Core', href: '/modules/core' },
      { icon: '👤', text: 'HUBB HOF', href: '/modules/hof' },
      { icon: '👁️', text: 'HUBB Vision', href: '/modules/vision' },
      { icon: '👥', text: 'HUBB RH', href: '/modules/rh' },
      { icon: '🤖', text: 'HUBB IA', href: '/modules/ia' }
    ]
  }

  const menuItems = getMenuItems()
  const hubbModules = getHubbModules()

  return (
    <>
      {/* Overlay para mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <img 
            src="/assets/images/logo_hubb_assisit.png" 
            alt="HUBB Assist" 
            className="logo-image"
          />
          {!collapsed && <h2>HUBB Assist</h2>}
        </div>

        {/* Navegação Principal */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`nav-item ${item.active ? 'active' : ''}`}
              >
                <span className="nav-item-icon">{item.icon}</span>
                {!collapsed && <span className="nav-item-text">{item.text}</span>}
              </a>
            ))}
          </div>

          {/* Módulos HUBB */}
          {hubbModules.length > 0 && (
            <div className="nav-section">
              {!collapsed && (
                <div className="nav-section-title">
                  Módulos HUBB
                </div>
              )}
              {hubbModules.map((module, index) => (
                <a
                  key={index}
                  href={module.href}
                  className="nav-item"
                >
                  <span className="nav-item-icon">{module.icon}</span>
                  {!collapsed && <span className="nav-item-text">{module.text}</span>}
                </a>
              ))}
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar