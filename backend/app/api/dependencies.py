"""
FastAPI Dependencies
Dependências para autenticação, autorização e injeção de dependências
"""

from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError, jwt

from app.core.config import settings
from app.core.database import get_db
from app.domain.schemas.user import UserResponse
from app.domain.schemas.tenant import TenantResponse
from app.infrastructure.repositories.user_repository import UserRepository
from app.infrastructure.repositories.tenant_repository import TenantRepository


# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login",
    scheme_name="JWT"
)


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: AsyncSession = Depends(get_db)
) -> UserResponse:
    """
    Obter usuário atual baseado no JWT token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decodificar JWT token
        payload = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM]
        )
        
        user_id: int = payload.get("sub")
        tenant_id: int = payload.get("tenant_id")
        
        if user_id is None or tenant_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    # Buscar usuário no banco
    user_repo = UserRepository(db)
    user = await user_repo.get_user_by_id_and_tenant(user_id, tenant_id)
    
    if user is None:
        raise credentials_exception
    
    # Verificar se usuário está ativo
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuário inativo"
        )
    
    return user


async def get_current_tenant(
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> TenantResponse:
    """
    Obter tenant atual baseado no usuário autenticado
    """
    tenant_repo = TenantRepository(db)
    tenant = await tenant_repo.get_by_id(current_user.tenant_id)
    
    if not tenant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tenant não encontrado"
        )
    
    # Verificar se tenant está ativo
    if not tenant.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Tenant inativo"
        )
    
    return tenant


def require_role(required_roles: list[str]):
    """
    Decorator para exigir roles específicas
    """
    def role_checker(current_user: UserResponse = Depends(get_current_user)):
        if current_user.role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Permissões insuficientes"
            )
        return current_user
    
    return role_checker


# Dependências para roles específicas
require_super_admin = require_role(["SUPER_ADMIN"])
require_admin_access = require_role([
    "SUPER_ADMIN", 
    "ADMIN_MASTER", 
    "DONO_CLINICA"
])
require_dentist_access = require_role([
    "SUPER_ADMIN", 
    "ADMIN_MASTER", 
    "DONO_CLINICA", 
    "DENTISTA"
])


async def get_current_active_user(
    current_user: UserResponse = Depends(get_current_user)
) -> UserResponse:
    """
    Obter usuário atual ativo
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Usuário inativo"
        )
    
    return current_user


async def get_current_active_superuser(
    current_user: UserResponse = Depends(get_current_user)
) -> UserResponse:
    """
    Obter super usuário atual ativo
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Usuário inativo"
        )
    
    if current_user.role != "SUPER_ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Privilégios insuficientes"
        )
    
    return current_user
