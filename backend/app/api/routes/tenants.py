"""
Tenant Management Routes
Rotas para gerenciamento de tenants (clínicas)
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.domain.schemas.tenant import (
    TenantCreate,
    TenantResponse,
    TenantUpdate,
    TenantStats,
    OnboardingStep1,
    OnboardingStep2,
    OnboardingStep3,
    OnboardingComplete
)
from app.domain.schemas.user import UserResponse
from app.infrastructure.repositories.tenant_repository import TenantRepository
from app.infrastructure.repositories.user_repository import UserRepository
from app.application.services.tenant_service import TenantService
from app.api.dependencies import get_current_user, require_super_admin


router = APIRouter()


@router.post("/onboarding/step1", response_model=dict)
async def onboarding_step1(
    step1_data: OnboardingStep1,
    db: AsyncSession = Depends(get_db)
):
    """
    Primeiro passo do onboarding: validação de dados básicos
    """
    tenant_repo = TenantRepository(db)
    user_repo = UserRepository(db)
    tenant_service = TenantService(tenant_repo, user_repo)
    
    try:
        result = await tenant_service.validate_onboarding_step1(step1_data)
        return {
            "valid": True,
            "message": "Dados validados com sucesso",
            "next_step": "step2",
            "session_id": result["session_id"]
        }
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/onboarding/step2", response_model=dict)
async def onboarding_step2(
    step2_data: OnboardingStep2,
    db: AsyncSession = Depends(get_db)
):
    """
    Segundo passo do onboarding: dados de endereço e validação CEP
    """
    tenant_repo = TenantRepository(db)
    user_repo = UserRepository(db)
    tenant_service = TenantService(tenant_repo, user_repo)
    
    try:
        result = await tenant_service.validate_onboarding_step2(step2_data)
        return {
            "valid": True,
            "message": "Endereço validado com sucesso",
            "next_step": "step3",
            "address_data": result["address_data"]
        }
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/onboarding/step3", response_model=OnboardingComplete)
async def onboarding_step3(
    step3_data: OnboardingStep3,
    db: AsyncSession = Depends(get_db)
):
    """
    Terceiro passo do onboarding: finalização e criação do tenant
    """
    tenant_repo = TenantRepository(db)
    user_repo = UserRepository(db)
    tenant_service = TenantService(tenant_repo, user_repo)
    
    try:
        result = await tenant_service.complete_onboarding(step3_data)
        return result
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/", response_model=List[TenantResponse])
async def list_tenants(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    search: Optional[str] = Query(None),
    current_user: UserResponse = Depends(require_super_admin),
    db: AsyncSession = Depends(get_db)
):
    """
    Listar todos os tenants (apenas SUPER_ADMIN)
    """
    tenant_repo = TenantRepository(db)
    user_repo = UserRepository(db)
    tenant_service = TenantService(tenant_repo, user_repo)
    
    tenants = await tenant_service.list_tenants(
        skip=skip,
        limit=limit,
        search=search
    )
    
    return tenants


@router.get("/{tenant_id}", response_model=TenantResponse)
async def get_tenant(
    tenant_id: int,
    current_user: UserResponse = Depends(require_super_admin),
    db: AsyncSession = Depends(get_db)
):
    """
    Obter detalhes de um tenant específico (apenas SUPER_ADMIN)
    """
    tenant_repo = TenantRepository(db)
    user_repo = UserRepository(db)
    tenant_service = TenantService(tenant_repo, user_repo)
    
    tenant = await tenant_service.get_tenant_by_id(tenant_id)
    
    if not tenant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tenant não encontrado"
        )
    
    return tenant


@router.get("/{tenant_id}/stats", response_model=TenantStats)
async def get_tenant_stats(
    tenant_id: int,
    current_user: UserResponse = Depends(require_super_admin),
    db: AsyncSession = Depends(get_db)
):
    """
    Obter estatísticas detalhadas de um tenant
    """
    tenant_repo = TenantRepository(db)
    user_repo = UserRepository(db)
    tenant_service = TenantService(tenant_repo, user_repo)
    
    stats = await tenant_service.get_tenant_stats(tenant_id)
    
    if not stats:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tenant não encontrado"
        )
    
    return stats


@router.put("/{tenant_id}", response_model=TenantResponse)
async def update_tenant(
    tenant_id: int,
    tenant_update: TenantUpdate,
    current_user: UserResponse = Depends(require_super_admin),
    db: AsyncSession = Depends(get_db)
):
    """
    Atualizar dados de um tenant (apenas SUPER_ADMIN)
    """
    tenant_repo = TenantRepository(db)
    user_repo = UserRepository(db)
    tenant_service = TenantService(tenant_repo, user_repo)
    
    try:
        tenant = await tenant_service.update_tenant(tenant_id, tenant_update)
        return tenant
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.delete("/{tenant_id}")
async def delete_tenant(
    tenant_id: int,
    current_user: UserResponse = Depends(require_super_admin),
    db: AsyncSession = Depends(get_db)
):
    """
    Desativar um tenant (soft delete)
    """
    tenant_repo = TenantRepository(db)
    user_repo = UserRepository(db)
    tenant_service = TenantService(tenant_repo, user_repo)
    
    try:
        await tenant_service.deactivate_tenant(tenant_id)
        return {"message": "Tenant desativado com sucesso"}
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/{tenant_id}/activate")
async def activate_tenant(
    tenant_id: int,
    current_user: UserResponse = Depends(require_super_admin),
    db: AsyncSession = Depends(get_db)
):
    """
    Reativar um tenant
    """
    tenant_repo = TenantRepository(db)
    user_repo = UserRepository(db)
    tenant_service = TenantService(tenant_repo, user_repo)
    
    try:
        await tenant_service.activate_tenant(tenant_id)
        return {"message": "Tenant ativado com sucesso"}
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
