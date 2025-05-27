import { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface AppShellProps {
  children: React.ReactNode
  userType?: 'ADMIN' | 'DONO_CLINICA' | 'COLABORADOR' | 'PACIENTE'
}

const AppShell = ({ children, userType = 'ADMIN' }: AppShellProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen)
    } else {
      setCollapsed(!collapsed)
    }
  }

  return (
    <div className="app-shell">
      <Sidebar 
        collapsed={collapsed} 
        mobileOpen={mobileOpen}
        userType={userType}
        onClose={() => setMobileOpen(false)}
      />
      
      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <Header 
          onToggleSidebar={toggleSidebar}
          collapsed={collapsed}
          isMobile={isMobile}
        />
        
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell