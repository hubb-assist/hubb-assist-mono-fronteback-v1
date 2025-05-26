"""
User Schemas
Schemas Pydantic para usuários
"""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field, validator

from app.domain.models.user import UserRole


class UserBase(BaseModel):
    """Schema base para usuário"""
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=255)
    phone: Optional[str] = Field(None, max_length=20)
    role: UserRole = UserRole.ASSISTENTE
    is_active: bool = True


class UserCreate(UserBase):
    """Schema para criação de usuário"""
    password: str = Field(..., min_length=6)
    tenant_id: Optional[int] = None
    cpf: Optional[str] = Field(None, max_length=14)
    professional_id: Optional[str] = Field(None, max_length=50)
    
    @validator('password')
    def validate_password(cls, v):
        """Validar força da senha"""
        if len(v) < 6:
            raise ValueError('Senha deve ter pelo menos 6 caracteres')
        
        has_letter = any(c.isalpha() for c in v)
        has_number = any(c.isdigit() for c in v)
        
        if not (has_letter and has_number):
            raise ValueError('Senha deve conter pelo menos uma letra e um número')
        
        return v


class UserUpdate(BaseModel):
    """Schema para atualização de usuário"""
    full_name: Optional[str] = Field(None, min_length=2, max_length=255)
    phone: Optional[str] = Field(None, max_length=20)
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None
    cpf: Optional[str] = Field(None, max_length=14)
    professional_id: Optional[str] = Field(None, max_length=50)
    avatar_url: Optional[str] = Field(None, max_length=500)


class UserPasswordUpdate(BaseModel):
    """Schema para atualização de senha"""
    new_password: str = Field(..., min_length=6)
    
    @validator('new_password')
    def validate_password(cls, v):
        """Validar força da senha"""
        if len(v) < 6:
            raise ValueError('Senha deve ter pelo menos 6 caracteres')
        
        has_letter = any(c.isalpha() for c in v)
        has_number = any(c.isdigit() for c in v)
        
        if not (has_letter and has_number):
            raise ValueError('Senha deve conter pelo menos uma letra e um número')
        
        return v


class UserResponse(UserBase):
    """Schema para resposta de usuário"""
    id: int
    tenant_id: int
    is_verified: bool
    created_at: datetime
    updated_at: datetime
    last_login: Optional[datetime]
    avatar_url: Optional[str]
    
    class Config:
        from_attributes = True


class UserProfile(UserResponse):
    """Schema para perfil completo do usuário"""
    cpf: Optional[str]
    birth_date: Optional[datetime]
    professional_id: Optional[str]
    specialties: Optional[dict]
    preferences: Optional[dict]


class UserListResponse(BaseModel):
    """Schema para lista de usuários"""
    users: List[UserResponse]
    total: int
    page: int
    per_page: int
    pages: int


class UserStats(BaseModel):
    """Schema para estatísticas de usuário"""
    total_users: int
    active_users: int
    inactive_users: int
    users_by_role: dict
    recent_logins: int
    
    
class UserActivity(BaseModel):
    """Schema para atividade do usuário"""
    user_id: int
    action: str
    timestamp: datetime
    details: Optional[dict]
    
    class Config:
        from_attributes = True
