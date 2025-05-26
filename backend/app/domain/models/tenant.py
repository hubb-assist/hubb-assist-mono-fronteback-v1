"""
Tenant Domain Model
Modelo de tenant (clínica) para multi-tenancy
"""

from datetime import datetime
from typing import Optional
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Enum, Numeric
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base


class TenantStatus(str, enum.Enum):
    """
    Status do tenant
    """
    PENDING = "PENDING"        # Aguardando ativação
    ACTIVE = "ACTIVE"          # Ativo
    SUSPENDED = "SUSPENDED"    # Suspenso
    CANCELLED = "CANCELLED"    # Cancelado


class TenantPlan(str, enum.Enum):
    """
    Planos disponíveis
    """
    TRIAL = "TRIAL"           # Período de teste
    BASIC = "BASIC"           # Plano básico
    PROFESSIONAL = "PROFESSIONAL"  # Plano profissional
    ENTERPRISE = "ENTERPRISE" # Plano empresarial


class TenantSegment(str, enum.Enum):
    """
    Segmentos de clínicas
    """
    ODONTOLOGIA = "ODONTOLOGIA"
    ESTETICA = "ESTETICA"
    FISIOTERAPIA = "FISIOTERAPIA"
    DERMATOLOGIA = "DERMATOLOGIA"
    ORTOPEDIA = "ORTOPEDIA"
    CARDIOLOGIA = "CARDIOLOGIA"
    OUTROS = "OUTROS"


class Tenant(Base):
    """
    Modelo de tenant (clínica) para isolamento multi-tenant
    """
    __tablename__ = "tenants"
    
    # Identificação
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    company_name = Column(String(255), nullable=False)
    fantasy_name = Column(String(255), nullable=True)
    
    # Documentos
    cnpj = Column(String(18), nullable=True, index=True)
    cpf = Column(String(14), nullable=True, index=True)  # Para MEI
    ie = Column(String(20), nullable=True)  # Inscrição Estadual
    im = Column(String(20), nullable=True)  # Inscrição Municipal
    
    # Endereço
    cep = Column(String(9), nullable=False)
    street = Column(String(255), nullable=False)
    number = Column(String(20), nullable=False)
    complement = Column(String(255), nullable=True)
    neighborhood = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    state = Column(String(2), nullable=False)
    country = Column(String(2), default="BR", nullable=False)
    
    # Contato
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(20), nullable=False)
    website = Column(String(255), nullable=True)
    
    # Classificação
    segment = Column(Enum(TenantSegment), nullable=False, default=TenantSegment.ODONTOLOGIA)
    specialties = Column(Text, nullable=True)  # JSON com especialidades
    
    # Plano e Status
    plan = Column(Enum(TenantPlan), nullable=False, default=TenantPlan.TRIAL)
    status = Column(Enum(TenantStatus), nullable=False, default=TenantStatus.PENDING)
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Limites
    max_users = Column(Integer, default=10, nullable=False)
    max_storage_gb = Column(Integer, default=5, nullable=False)
    
    # Financeiro
    monthly_fee = Column(Numeric(10, 2), default=0.00, nullable=False)
    trial_end_date = Column(DateTime, nullable=True)
    subscription_start = Column(DateTime, nullable=True)
    subscription_end = Column(DateTime, nullable=True)
    
    # Onboarding
    onboarding_completed = Column(Boolean, default=False, nullable=False)
    onboarding_step = Column(Integer, default=1, nullable=False)
    onboarding_data = Column(Text, nullable=True)  # JSON com dados do onboarding
    
    # Módulos habilitados
    modules_enabled = Column(Text, nullable=True)  # JSON com módulos habilitados
    
    # Configurações
    settings = Column(Text, nullable=True)  # JSON com configurações específicas
    theme = Column(String(50), default="default", nullable=False)
    logo_url = Column(String(500), nullable=True)
    
    # Metadados
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    activated_at = Column(DateTime, nullable=True)
    suspended_at = Column(DateTime, nullable=True)
    
    # Analytics
    last_activity = Column(DateTime, nullable=True)
    total_users = Column(Integer, default=0, nullable=False)
    total_patients = Column(Integer, default=0, nullable=False)
    total_appointments = Column(Integer, default=0, nullable=False)
    
    # Relacionamentos
    users = relationship("User", back_populates="tenant")
    
    def __repr__(self):
        return f"<Tenant(id={self.id}, slug='{self.slug}', company='{self.company_name}')>"
    
    @property
    def display_name(self) -> str:
        """Nome de exibição do tenant"""
        return self.fantasy_name or self.company_name
    
    @property
    def is_trial(self) -> bool:
        """Verificar se está em período de teste"""
        return self.plan == TenantPlan.TRIAL
    
    @property
    def is_suspended(self) -> bool:
        """Verificar se está suspenso"""
        return self.status == TenantStatus.SUSPENDED
    
    @property
    def can_add_users(self) -> bool:
        """Verificar se pode adicionar mais usuários"""
        return self.total_users < self.max_users
    
    @property
    def subscription_days_remaining(self) -> Optional[int]:
        """Dias restantes da assinatura"""
        if not self.subscription_end:
            return None
        
        delta = self.subscription_end - datetime.utcnow()
        return max(0, delta.days)
    
    @property
    def trial_days_remaining(self) -> Optional[int]:
        """Dias restantes do trial"""
        if not self.trial_end_date:
            return None
        
        delta = self.trial_end_date - datetime.utcnow()
        return max(0, delta.days)
