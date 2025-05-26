"""
User Domain Model
Modelo de usuário com suporte multi-tenant
"""

from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base


class UserRole(str, enum.Enum):
    """
    Roles de usuário no sistema HUBB Assist
    """
    SUPER_ADMIN = "SUPER_ADMIN"        # Administrador global do sistema
    ADMIN_MASTER = "ADMIN_MASTER"      # Administrador master do tenant
    DONO_CLINICA = "DONO_CLINICA"      # Dono da clínica
    DENTISTA = "DENTISTA"              # Dentista
    ASSISTENTE = "ASSISTENTE"          # Assistente
    RECEPCIONISTA = "RECEPCIONISTA"    # Recepcionista
    FINANCEIRO = "FINANCEIRO"          # Responsável financeiro
    RH = "RH"                          # Recursos humanos
    PACIENTE = "PACIENTE"              # Paciente (futuro)


class User(Base):
    """
    Modelo de usuário com isolamento multi-tenant
    """
    __tablename__ = "users"
    
    # Identificação
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False, index=True)
    full_name = Column(String(255), nullable=False)
    
    # Autenticação
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    
    # Multi-tenant
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False, index=True)
    
    # Autorização
    role = Column(Enum(UserRole), nullable=False, default=UserRole.ASSISTENTE)
    permissions = Column(Text, nullable=True)  # JSON com permissões específicas
    
    # Dados pessoais
    phone = Column(String(20), nullable=True)
    cpf = Column(String(14), nullable=True, index=True)
    birth_date = Column(DateTime, nullable=True)
    
    # Dados profissionais
    professional_id = Column(String(50), nullable=True)  # CRO, etc
    specialties = Column(Text, nullable=True)  # JSON com especialidades
    
    # Tokens
    refresh_token = Column(String(500), nullable=True)
    password_reset_token = Column(String(500), nullable=True)
    verification_token = Column(String(500), nullable=True)
    
    # Metadados
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    last_login = Column(DateTime, nullable=True)
    
    # Configurações
    preferences = Column(Text, nullable=True)  # JSON com preferências do usuário
    avatar_url = Column(String(500), nullable=True)
    
    # Relacionamentos
    tenant = relationship("Tenant", back_populates="users")
    
    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', tenant_id={self.tenant_id})>"
    
    @property
    def is_admin(self) -> bool:
        """Verificar se usuário tem privilégios administrativos"""
        admin_roles = [
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN_MASTER,
            UserRole.DONO_CLINICA
        ]
        return self.role in admin_roles
    
    @property
    def is_super_admin(self) -> bool:
        """Verificar se usuário é super admin"""
        return self.role == UserRole.SUPER_ADMIN
    
    @property
    def can_manage_users(self) -> bool:
        """Verificar se pode gerenciar usuários"""
        return self.role in [
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN_MASTER,
            UserRole.DONO_CLINICA
        ]
    
    @property
    def can_access_financial(self) -> bool:
        """Verificar se pode acessar dados financeiros"""
        return self.role in [
            UserRole.SUPER_ADMIN,
            UserRole.ADMIN_MASTER,
            UserRole.DONO_CLINICA,
            UserRole.FINANCEIRO
        ]
