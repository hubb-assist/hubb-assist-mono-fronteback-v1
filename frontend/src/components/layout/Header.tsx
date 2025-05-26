import { useState } from 'react'

interface HeaderProps {
  onToggleSidebar: () => void
  collapsed: boolean
  isMobile: boolean
}

const Header = ({ onToggleSidebar, collapsed, isMobile }: HeaderProps) => {
  const [currentUser] = useState({
    name: 'Dr. João Silva',
    role: 'Administrador',
    avatar: '/assets/images/hubb_pet_icon.png'
  })

  return (
    <header className="header">
      <div className="header-left">
        <button 
          onClick={onToggleSidebar}
          className="toggle-btn"
          aria-label={isMobile ? 'Abrir menu' : collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <div className="header-title">
          <h1>Dashboard</h1>
          <p>Visão geral do sistema HUBB Assist</p>
        </div>
      </div>

      <div className="header-actions">
        <div className="user-info">
          <img 
            src={currentUser.avatar} 
            alt="Avatar" 
            className="user-avatar"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <div className="user-details">
            <span className="user-name">{currentUser.name}</span>
            <span className="user-role">{currentUser.role}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header