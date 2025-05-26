"""
Authentication Schemas
Schemas Pydantic para autenticação
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class UserLogin(BaseModel):
    """Schema para login de usuário"""
    email: EmailStr
    password: str = Field(..., min_length=6)
    tenant_slug: str = Field(..., min_length=2, max_length=100)


class UserRegister(BaseModel):
    """Schema para registro de usuário"""
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str = Field(..., min_length=2, max_length=255)
    phone: Optional[str] = Field(None, max_length=20)
    tenant_slug: str = Field(..., min_length=2, max_length=100)
    
    @validator('password')
    def validate_password(cls, v):
        """Validar força da senha"""
        if len(v) < 6:
            raise ValueError('Senha deve ter pelo menos 6 caracteres')
        
        # Verificar se tem pelo menos uma letra e um número
        has_letter = any(c.isalpha() for c in v)
        has_number = any(c.isdigit() for c in v)
        
        if not (has_letter and has_number):
            raise ValueError('Senha deve conter pelo menos uma letra e um número')
        
        return v


class Token(BaseModel):
    """Schema para resposta de token JWT"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int  # segundos
    user: dict
    tenant: dict


class RefreshToken(BaseModel):
    """Schema para refresh token"""
    refresh_token: str


class TokenData(BaseModel):
    """Schema para dados do token"""
    user_id: Optional[int] = None
    tenant_id: Optional[int] = None
    email: Optional[str] = None


class PasswordReset(BaseModel):
    """Schema para reset de senha"""
    token: str
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


class PasswordResetRequest(BaseModel):
    """Schema para solicitação de reset de senha"""
    email: EmailStr
    tenant_slug: str = Field(..., min_length=2, max_length=100)


class ChangePassword(BaseModel):
    """Schema para alteração de senha"""
    current_password: str
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


class LoginResponse(BaseModel):
    """Schema para resposta de login"""
    message: str
    user: dict
    tenant: dict
    access_token: str
    refresh_token: str
    expires_in: int


class LogoutResponse(BaseModel):
    """Schema para resposta de logout"""
    message: str = "Logout realizado com sucesso"
