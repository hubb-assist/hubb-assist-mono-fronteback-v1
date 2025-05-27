import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import AdminSidebar from './AdminSidebar'
import ClinicOwnerSidebar from './ClinicOwnerSidebar'
import CollaboratorSidebar from './CollaboratorSidebar'
import PatientSidebar from './PatientSidebar'

interface AppShellProps {
  children: React.ReactNode
  userType?: 'ADMIN' | 'DONO_CLINICA' | 'COLABORADOR' | 'PACIENTE' | 'COLAB_N1' | 'COLAB_N2' | 'COLAB_N3'
}

const AppShell = ({ children, userType = 'ADMIN' }: AppShellProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

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

  const renderSidebar = () => {
    const commonProps = {
      collapsed,
      mobileOpen,
      onClose: () => setMobileOpen(false)
    }

    switch (userType) {
      case 'ADMIN':
        return <AdminSidebar {...commonProps} />
      case 'DONO_CLINICA':
        return <ClinicOwnerSidebar {...commonProps} />
      case 'COLABORADOR':
        // Determinar nível baseado na rota
        const level = location.pathname.includes('level1') ? 1 :
                     location.pathname.includes('level2') ? 2 :
                     location.pathname.includes('level3') ? 3 : 1
        return <CollaboratorSidebar {...commonProps} level={level} />
      case 'PACIENTE':
        return <PatientSidebar {...commonProps} />
      default:
        return <AdminSidebar {...commonProps} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {renderSidebar()}
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        collapsed ? 'ml-16' : 'ml-64'
      } ${isMobile ? 'ml-0' : ''}`}>
        <Header 
          onToggleSidebar={toggleSidebar}
          collapsed={collapsed}
          isMobile={isMobile}
          userType={userType}
        />
        
        <main className="flex-1 overflow-auto p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell