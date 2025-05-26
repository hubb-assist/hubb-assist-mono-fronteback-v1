"""
User Management Routes
Rotas para gerenciamento de usuários
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.domain.schemas.user import (
    UserCreate,
    UserResponse,
    UserUpdate,
    UserPasswordUpdate
)
from app.infrastructure.repositories.user_repository import UserRepository
from app.infrastructure.repositories.tenant_repository import TenantRepository
from app.application.services.auth_service import AuthService
from app.api.dependencies import (
    get_current_user, 
    get_current_tenant,
    require_admin_access
)


router = APIRouter()


@router.get("/", response_model=List[UserResponse])
async def list_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    search: Optional[str] = Query(None),
    current_user: UserResponse = Depends(require_admin_access),
    current_tenant = Depends(get_current_tenant),
    db: AsyncSession = Depends(get_db)
):
    """
    Listar usuários do tenant atual
    """
    user_repo = UserRepository(db)
    
    users = await user_repo.get_users_by_tenant(
        tenant_id=current_tenant.id,
        skip=skip,
        limit=limit,
        search=search
    )
    
    return users


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    current_user: UserResponse = Depends(require_admin_access),
    current_tenant = Depends(get_current_tenant),
    db: AsyncSession = Depends(get_db)
):
    """
    Obter detalhes de um usuário específico
    """
    user_repo = UserRepository(db)
    
    user = await user_repo.get_user_by_id_and_tenant(
        user_id=user_id,
        tenant_id=current_tenant.id
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    return user


@router.post("/", response_model=UserResponse)
async def create_user(
    user_data: UserCreate,
    current_user: UserResponse = Depends(require_admin_access),
    current_tenant = Depends(get_current_tenant),
    db: AsyncSession = Depends(get_db)
):
    """
    Criar novo usuário no tenant atual
    """
    user_repo = UserRepository(db)
    tenant_repo = TenantRepository(db)
    auth_service = AuthService(user_repo, tenant_repo)
    
    # Adicionar tenant_id ao user_data
    user_data.tenant_id = current_tenant.id
    
    try:
        user = await auth_service.create_user(user_data)
        return user
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    current_user: UserResponse = Depends(require_admin_access),
    current_tenant = Depends(get_current_tenant),
    db: AsyncSession = Depends(get_db)
):
    """
    Atualizar dados de um usuário
    """
    user_repo = UserRepository(db)
    
    # Verificar se usuário existe no tenant
    user = await user_repo.get_user_by_id_and_tenant(
        user_id=user_id,
        tenant_id=current_tenant.id
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    try:
        updated_user = await user_repo.update_user(user_id, user_update)
        return updated_user
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.put("/{user_id}/password")
async def update_user_password(
    user_id: int,
    password_data: UserPasswordUpdate,
    current_user: UserResponse = Depends(require_admin_access),
    current_tenant = Depends(get_current_tenant),
    db: AsyncSession = Depends(get_db)
):
    """
    Alterar senha de um usuário
    """
    user_repo = UserRepository(db)
    
    # Verificar se usuário existe no tenant
    user = await user_repo.get_user_by_id_and_tenant(
        user_id=user_id,
        tenant_id=current_tenant.id
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    try:
        await user_repo.update_password(user_id, password_data.new_password)
        return {"message": "Senha alterada com sucesso"}
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.delete("/{user_id}")
async def deactivate_user(
    user_id: int,
    current_user: UserResponse = Depends(require_admin_access),
    current_tenant = Depends(get_current_tenant),
    db: AsyncSession = Depends(get_db)
):
    """
    Desativar um usuário (soft delete)
    """
    user_repo = UserRepository(db)
    
    # Verificar se usuário existe no tenant
    user = await user_repo.get_user_by_id_and_tenant(
        user_id=user_id,
        tenant_id=current_tenant.id
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    # Não permitir auto-desativação
    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não é possível desativar sua própria conta"
        )
    
    try:
        await user_repo.deactivate_user(user_id)
        return {"message": "Usuário desativado com sucesso"}
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/{user_id}/activate")
async def activate_user(
    user_id: int,
    current_user: UserResponse = Depends(require_admin_access),
    current_tenant = Depends(get_current_tenant),
    db: AsyncSession = Depends(get_db)
):
    """
    Reativar um usuário
    """
    user_repo = UserRepository(db)
    
    # Verificar se usuário existe no tenant
    user = await user_repo.get_user_by_id_and_tenant(
        user_id=user_id,
        tenant_id=current_tenant.id
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    try:
        await user_repo.activate_user(user_id)
        return {"message": "Usuário ativado com sucesso"}
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
