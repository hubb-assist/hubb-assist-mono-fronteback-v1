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
  // 🎯 DEBUG - ADICIONE ESSAS LINHAS:
  const location = useLocation()
  
  console.log('🎯 AppShell renderizando:', {
    userType,
    pathname: location.pathname,
    timestamp: new Date().toLocaleTimeString()
  })
  
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

  const renderSidebar = () => {
    const commonProps = {
      collapsed,
      mobileOpen,
      onClose: () => setMobileOpen(false)
    }

    // 🎯 DEBUG - ADICIONE ESTE LOG:
    console.log('🔧 Renderizando sidebar para userType:', userType)

    switch (userType) {
      case 'ADMIN':
        console.log('📋 Renderizando AdminSidebar')
        return <AdminSidebar {...commonProps} />
      case 'DONO_CLINICA':
        console.log('🏥 Renderizando ClinicOwnerSidebar')
        return <ClinicOwnerSidebar {...commonProps} />
      case 'COLABORADOR':
        // Determinar nível baseado na rota
        const level = location.pathname.includes('level1') ? 1 :
                     location.pathname.includes('level2') ? 2 :
                     location.pathname.includes('level3') ? 3 : 1
        console.log('👥 Renderizando CollaboratorSidebar, level:', level)
        return <CollaboratorSidebar {...commonProps} level={level} />
      case 'PACIENTE':
        console.log('🏥 Renderizando PatientSidebar')
        return <PatientSidebar {...commonProps} />
      default:
        console.log('⚠️ UserType não reconhecido, usando AdminSidebar como padrão')
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