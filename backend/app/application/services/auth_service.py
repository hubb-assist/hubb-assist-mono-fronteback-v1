"""
Authentication Service
Serviço de autenticação com suporte multi-tenant
"""

from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import httpx
import json

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    verify_token,
    get_password_hash,
    create_password_reset_token,
    verify_password_reset_token
)
from app.domain.schemas.auth import Token
from app.domain.schemas.user import UserCreate, UserResponse, UserRegister
from app.domain.models.user import User, UserRole
from app.infrastructure.repositories.user_repository import UserRepository
from app.infrastructure.repositories.tenant_repository import TenantRepository


class AuthService:
    """
    Serviço de autenticação
    """
    
    def __init__(self, user_repo: UserRepository, tenant_repo: TenantRepository):
        self.user_repo = user_repo
        self.tenant_repo = tenant_repo
    
    async def authenticate_user(self, email: str, password: str, tenant_slug: str) -> Token:
        """
        Autenticar usuário com multi-tenancy
        """
        # Buscar tenant
        tenant = await self.tenant_repo.get_by_slug(tenant_slug)
        if not tenant:
            raise ValueError("Tenant não encontrado")
        
        if not tenant.is_active:
            raise ValueError("Tenant inativo")
        
        # Autenticar usuário
        user = await self.user_repo.authenticate(email, password, tenant.id)
        if not user:
            raise ValueError("Email ou senha inválidos")
        
        # Gerar tokens
        access_token = create_access_token(
            data={"sub": str(user.id), "tenant_id": tenant.id, "role": user.role.value}
        )
        
        refresh_token = create_refresh_token(
            data={"sub": str(user.id), "tenant_id": tenant.id}
        )
        
        # Salvar refresh token
        await self.user_repo.update_refresh_token(user.id, refresh_token)
        
        # Atualizar última atividade do tenant
        await self.tenant_repo.update_last_activity(tenant.id)
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user={
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role.value,
                "is_active": user.is_active
            },
            tenant={
                "id": tenant.id,
                "slug": tenant.slug,
                "company_name": tenant.company_name,
                "plan": tenant.plan.value
            }
        )
    
    async def refresh_access_token(self, refresh_token: str) -> Token:
        """
        Renovar access token usando refresh token
        """
        # Verificar refresh token
        payload = verify_token(refresh_token, "refresh")
        if not payload:
            raise ValueError("Refresh token inválido")
        
        user_id = int(payload.get("sub"))
        tenant_id = payload.get("tenant_id")
        
        # Buscar usuário
        user = await self.user_repo.get_by_id_and_tenant(user_id, tenant_id)
        if not user:
            raise ValueError("Usuário não encontrado")
        
        # Verificar se o refresh token está válido no banco
        if user.refresh_token != refresh_token:
            raise ValueError("Refresh token inválido")
        
        # Buscar tenant
        tenant = await self.tenant_repo.get_by_id(tenant_id)
        if not tenant:
            raise ValueError("Tenant não encontrado")
        
        # Gerar novos tokens
        new_access_token = create_access_token(
            data={"sub": str(user.id), "tenant_id": tenant.id, "role": user.role.value}
        )
        
        new_refresh_token = create_refresh_token(
            data={"sub": str(user.id), "tenant_id": tenant.id}
        )
        
        # Atualizar refresh token
        await self.user_repo.update_refresh_token(user.id, new_refresh_token)
        
        return Token(
            access_token=new_access_token,
            refresh_token=new_refresh_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user={
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role.value,
                "is_active": user.is_active
            },
            tenant={
                "id": tenant.id,
                "slug": tenant.slug,
                "company_name": tenant.company_name,
                "plan": tenant.plan.value
            }
        )
    
    async def register_user(self, user_data: UserRegister) -> UserResponse:
        """
        Registrar novo usuário em tenant existente
        """
        # Buscar tenant
        tenant = await self.tenant_repo.get_by_slug(user_data.tenant_slug)
        if not tenant:
            raise ValueError("Tenant não encontrado")
        
        if not tenant.is_active:
            raise ValueError("Tenant inativo")
        
        # Verificar se email já existe no tenant
        existing_user = await self.user_repo.get_by_email_and_tenant(
            user_data.email, tenant.id
        )
        if existing_user:
            raise ValueError("Email já cadastrado neste tenant")
        
        # Verificar limite de usuários
        user_count = await self.user_repo.count_by_tenant(tenant.id)
        if user_count >= tenant.max_users:
            raise ValueError("Limite de usuários excedido")
        
        # Criar usuário
        user_create = UserCreate(
            email=user_data.email,
            password=user_data.password,
            full_name=user_data.full_name,
            phone=user_data.phone,
            tenant_id=tenant.id,
            role=UserRole.ASSISTENTE  # Role padrão
        )
        
        user = await self.user_repo.create(user_create)
        
        # Atualizar contagem de usuários no tenant
        await self.tenant_repo.update_user_count(tenant.id)
        
        return UserResponse.from_orm(user)
    
    async def create_user(self, user_data: UserCreate) -> UserResponse:
        """
        Criar usuário (usado por admins)
        """
        # Verificar se email já existe no tenant
        existing_user = await self.user_repo.get_by_email_and_tenant(
            user_data.email, user_data.tenant_id
        )
        if existing_user:
            raise ValueError("Email já cadastrado neste tenant")
        
        # Buscar tenant
        tenant = await self.tenant_repo.get_by_id(user_data.tenant_id)
        if not tenant:
            raise ValueError("Tenant não encontrado")
        
        # Verificar limite de usuários
        user_count = await self.user_repo.count_by_tenant(tenant.id)
        if user_count >= tenant.max_users:
            raise ValueError("Limite de usuários excedido")
        
        # Criar usuário
        user = await self.user_repo.create(user_data)
        
        # Atualizar contagem de usuários no tenant
        await self.tenant_repo.update_user_count(tenant.id)
        
        return UserResponse.from_orm(user)
    
    async def request_password_reset(self, email: str, tenant_slug: str) -> bool:
        """
        Solicitar reset de senha
        """
        # Buscar tenant
        tenant = await self.tenant_repo.get_by_slug(tenant_slug)
        if not tenant:
            # Por segurança, não revelar se tenant existe
            return True
        
        # Buscar usuário
        user = await self.user_repo.get_by_email_and_tenant(email, tenant.id)
        if not user:
            # Por segurança, não revelar se usuário existe
            return True
        
        # Gerar token de reset
        reset_token = create_password_reset_token(email, tenant.id)
        
        # Salvar token no banco
        await self.user_repo.set_password_reset_token(user.id, reset_token)
        
        # TODO: Enviar email com token
        # await self._send_password_reset_email(user.email, reset_token)
        
        return True
    
    async def reset_password(self, token: str, new_password: str) -> bool:
        """
        Reset de senha com token
        """
        # Verificar token
        payload = verify_password_reset_token(token)
        if not payload:
            raise ValueError("Token inválido ou expirado")
        
        email = payload.get("sub")
        tenant_id = payload.get("tenant_id")
        
        # Buscar usuário pelo token
        user = await self.user_repo.get_by_password_reset_token(token)
        if not user or user.email != email or user.tenant_id != tenant_id:
            raise ValueError("Token inválido")
        
        # Atualizar senha
        await self.user_repo.update_password(user.id, new_password)
        
        return True
    
    async def change_password(
        self, 
        user_id: int, 
        current_password: str, 
        new_password: str
    ) -> bool:
        """
        Alterar senha do usuário
        """
        # Buscar usuário
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise ValueError("Usuário não encontrado")
        
        # Verificar senha atual
        from app.core.security import verify_password
        if not verify_password(current_password, user.hashed_password):
            raise ValueError("Senha atual incorreta")
        
        # Atualizar senha
        await self.user_repo.update_password(user_id, new_password)
        
        # Invalidar refresh tokens por segurança
        await self.user_repo.invalidate_refresh_tokens(user_id)
        
        return True
    
    async def _send_password_reset_email(self, email: str, token: str) -> bool:
        """
        Enviar email de reset de senha (placeholder)
        """
        # TODO: Implementar envio de email
        print(f"Reset token para {email}: {token}")
        return True
