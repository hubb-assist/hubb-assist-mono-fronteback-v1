"""
Tenant Schemas
Schemas Pydantic para tenants (clínicas)
"""

from datetime import datetime
from typing import Optional, List, Dict, Any
from decimal import Decimal
from pydantic import BaseModel, EmailStr, Field, field_validator

from app.domain.models.tenant import TenantStatus, TenantPlan, TenantSegment


class TenantBase(BaseModel):
    """Schema base para tenant"""
    company_name: str = Field(..., min_length=2, max_length=255)
    fantasy_name: Optional[str] = Field(None, max_length=255)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    segment: TenantSegment = TenantSegment.ODONTOLOGIA


class OnboardingStep1(BaseModel):
    """Primeiro passo do onboarding"""
    company_name: str = Field(..., min_length=2, max_length=255)
    fantasy_name: Optional[str] = Field(None, max_length=255)
    cnpj: Optional[str] = Field(None, max_length=18)
    cpf: Optional[str] = Field(None, max_length=14)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    segment: TenantSegment = TenantSegment.ODONTOLOGIA
    
    @field_validator('cnpj')
    @classmethod
    def validate_cnpj(cls, v):
        """Validar CNPJ"""
        if not v:
            return v
        
        # Importar aqui para evitar circular import
        from app.core.security import validate_cnpj
        
        if not validate_cnpj(v):
            raise ValueError('CNPJ inválido')
        
        return v
    
    @field_validator('cpf')
    @classmethod
    def validate_cpf(cls, v):
        """Validar CPF"""
        if not v:
            return v
        
        # Importar aqui para evitar circular import
        from app.core.security import validate_cpf
        
        if not validate_cpf(v):
            raise ValueError('CPF inválido')
        
        return v


class OnboardingStep2(BaseModel):
    """Segundo passo do onboarding"""
    session_id: str
    cep: str = Field(..., min_length=8, max_length=9)
    street: str = Field(..., min_length=2, max_length=255)
    number: str = Field(..., min_length=1, max_length=20)
    complement: Optional[str] = Field(None, max_length=255)
    neighborhood: str = Field(..., min_length=2, max_length=255)
    city: str = Field(..., min_length=2, max_length=255)
    state: str = Field(..., min_length=2, max_length=2)


class OnboardingStep3(BaseModel):
    """Terceiro passo do onboarding"""
    session_id: str
    owner_name: str = Field(..., min_length=2, max_length=255)
    owner_email: EmailStr
    owner_password: str = Field(..., min_length=6)
    owner_phone: Optional[str] = Field(None, max_length=20)
    plan: TenantPlan = TenantPlan.TRIAL
    
    @field_validator('owner_password')
    @classmethod
    def validate_password(cls, v):
        """Validar força da senha"""
        if len(v) < 6:
            raise ValueError('Senha deve ter pelo menos 6 caracteres')
        
        has_letter = any(c.isalpha() for c in v)
        has_number = any(c.isdigit() for c in v)
        
        if not (has_letter and has_number):
            raise ValueError('Senha deve conter pelo menos uma letra e um número')
        
        return v


class OnboardingComplete(BaseModel):
    """Resposta do onboarding completo"""
    tenant: dict
    owner: dict
    access_token: str
    refresh_token: str
    login_url: str
    message: str


class TenantCreate(TenantBase):
    """Schema para criação de tenant"""
    slug: Optional[str] = None
    cnpj: Optional[str] = Field(None, max_length=18)
    cpf: Optional[str] = Field(None, max_length=14)
    cep: str = Field(..., min_length=8, max_length=9)
    street: str = Field(..., min_length=2, max_length=255)
    number: str = Field(..., min_length=1, max_length=20)
    complement: Optional[str] = Field(None, max_length=255)
    neighborhood: str = Field(..., min_length=2, max_length=255)
    city: str = Field(..., min_length=2, max_length=255)
    state: str = Field(..., min_length=2, max_length=2)
    plan: TenantPlan = TenantPlan.TRIAL


class TenantUpdate(BaseModel):
    """Schema para atualização de tenant"""
    company_name: Optional[str] = Field(None, min_length=2, max_length=255)
    fantasy_name: Optional[str] = Field(None, max_length=255)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, min_length=10, max_length=20)
    segment: Optional[TenantSegment] = None
    plan: Optional[TenantPlan] = None
    status: Optional[TenantStatus] = None
    max_users: Optional[int] = Field(None, ge=1, le=1000)
    max_storage_gb: Optional[int] = Field(None, ge=1, le=1000)
    logo_url: Optional[str] = Field(None, max_length=500)


class TenantResponse(TenantBase):
    """Schema para resposta de tenant"""
    id: int
    slug: str
    cnpj: Optional[str]
    cpf: Optional[str]
    cep: str
    street: str
    number: str
    complement: Optional[str]
    neighborhood: str
    city: str
    state: str
    country: str
    plan: TenantPlan
    status: TenantStatus
    is_active: bool
    max_users: int
    max_storage_gb: int
    monthly_fee: Decimal
    onboarding_completed: bool
    created_at: datetime
    updated_at: datetime
    total_users: int
    logo_url: Optional[str]
    
    class Config:
        from_attributes = True


class TenantStats(BaseModel):
    """Schema para estatísticas de tenant"""
    tenant_id: int
    company_name: str
    slug: str
    plan: TenantPlan
    status: TenantStatus
    created_at: datetime
    
    # Estatísticas de usuários
    total_users: int
    active_users: int
    last_activity: Optional[datetime]
    
    # Estatísticas financeiras
    monthly_fee: Decimal
    subscription_start: Optional[datetime]
    subscription_end: Optional[datetime]
    days_remaining: Optional[int]
    
    # Estatísticas de uso
    total_patients: int
    total_appointments: int
    storage_used_gb: float
    
    # Módulos
    modules_enabled: Dict[str, bool]
    
    class Config:
        from_attributes = True


class TenantListResponse(BaseModel):
    """Schema para lista de tenants"""
    tenants: List[TenantResponse]
    total: int
    page: int
    per_page: int
    pages: int


class AddressValidation(BaseModel):
    """Schema para validação de endereço"""
    cep: str
    street: str
    neighborhood: str
    city: str
    state: str
    valid: bool
    
    
class CEPResponse(BaseModel):
    """Schema para resposta da API de CEP"""
    cep: str
    logradouro: str
    complemento: str
    bairro: str
    localidade: str
    uf: str
    erro: Optional[bool] = None
