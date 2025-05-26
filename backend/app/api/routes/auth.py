"""
Authentication Routes
Rotas para autenticação JWT com multi-tenancy
"""

from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import create_access_token, verify_password, get_password_hash
from app.domain.schemas.auth import (
    Token, 
    UserLogin, 
    UserRegister, 
    RefreshToken,
    PasswordReset
)
from app.domain.schemas.user import UserResponse
from app.infrastructure.repositories.user_repository import UserRepository
from app.infrastructure.repositories.tenant_repository import TenantRepository
from app.application.services.auth_service import AuthService
from app.api.dependencies import get_current_user, get_current_tenant


router = APIRouter()


@router.post("/login", response_model=Token)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: AsyncSession = Depends(get_db)
):
    """
    Login de usuário com validação de tenant
    """
    user_repo = UserRepository(db)
    tenant_repo = TenantRepository(db)
    auth_service = AuthService(user_repo, tenant_repo)
    
    try:
        # Dividir username em email@tenant_slug
        if "@" not in form_data.username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Formato inválido. Use: email@tenant_slug"
            )
        
        email, tenant_slug = form_data.username.rsplit("@", 1)
        
        # Autenticar usuário
        token_data = await auth_service.authenticate_user(
            email=email,
            password=form_data.password,
            tenant_slug=tenant_slug
        )
        
        return token_data
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.post("/register", response_model=UserResponse)
async def register(
    user_data: UserRegister,
    db: AsyncSession = Depends(get_db)
):
    """
    Registro de novo usuário em tenant existente
    """
    user_repo = UserRepository(db)
    tenant_repo = TenantRepository(db)
    auth_service = AuthService(user_repo, tenant_repo)
    
    try:
        user = await auth_service.register_user(user_data)
        return user
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/refresh", response_model=Token)
async def refresh_token(
    refresh_data: RefreshToken,
    db: AsyncSession = Depends(get_db)
):
    """
    Renovar access token usando refresh token
    """
    user_repo = UserRepository(db)
    tenant_repo = TenantRepository(db)
    auth_service = AuthService(user_repo, tenant_repo)
    
    try:
        token_data = await auth_service.refresh_access_token(refresh_data.refresh_token)
        return token_data
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: UserResponse = Depends(get_current_user)
):
    """
    Obter informações do usuário atual
    """
    return current_user


@router.post("/logout")
async def logout(
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Logout do usuário (invalidar refresh token)
    """
    user_repo = UserRepository(db)
    
    # Invalidar refresh token do usuário
    await user_repo.invalidate_refresh_tokens(current_user.id)
    
    return {"message": "Logout realizado com sucesso"}


@router.post("/forgot-password")
async def forgot_password(
    email: str,
    tenant_slug: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Solicitar reset de senha
    """
    user_repo = UserRepository(db)
    tenant_repo = TenantRepository(db)
    auth_service = AuthService(user_repo, tenant_repo)
    
    try:
        await auth_service.request_password_reset(email, tenant_slug)
        return {"message": "Email de recuperação enviado"}
        
    except ValueError as e:
        # Por segurança, sempre retornar sucesso mesmo se usuário não existir
        return {"message": "Email de recuperação enviado"}


@router.post("/reset-password")
async def reset_password(
    reset_data: PasswordReset,
    db: AsyncSession = Depends(get_db)
):
    """
    Reset de senha com token
    """
    user_repo = UserRepository(db)
    tenant_repo = TenantRepository(db)
    auth_service = AuthService(user_repo, tenant_repo)
    
    try:
        await auth_service.reset_password(
            token=reset_data.token,
            new_password=reset_data.new_password
        )
        return {"message": "Senha alterada com sucesso"}
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
