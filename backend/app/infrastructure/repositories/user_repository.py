"""
User Repository
Repositório para operações de usuário no banco de dados
"""

from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete, and_, or_, func
from sqlalchemy.orm import selectinload

from app.domain.models.user import User, UserRole
from app.domain.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password


class UserRepository:
    """
    Repositório para operações de usuário
    """
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create(self, user_data: UserCreate) -> User:
        """
        Criar novo usuário
        """
        # Hash da senha
        hashed_password = get_password_hash(user_data.password)
        
        # Criar usuário
        user = User(
            email=user_data.email,
            full_name=user_data.full_name,
            hashed_password=hashed_password,
            phone=user_data.phone,
            role=user_data.role,
            tenant_id=user_data.tenant_id,
            cpf=user_data.cpf,
            professional_id=user_data.professional_id,
            is_active=True
        )
        
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        
        return user
    
    async def get_by_id(self, user_id: int) -> Optional[User]:
        """
        Buscar usuário por ID
        """
        stmt = select(User).where(User.id == user_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_by_email(self, email: str) -> Optional[User]:
        """
        Buscar usuário por email (sem tenant)
        """
        stmt = select(User).where(User.email == email)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_by_email_and_tenant(self, email: str, tenant_id: int) -> Optional[User]:
        """
        Buscar usuário por email e tenant
        """
        stmt = select(User).where(
            and_(
                User.email == email,
                User.tenant_id == tenant_id
            )
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_by_id_and_tenant(self, user_id: int, tenant_id: int) -> Optional[User]:
        """
        Buscar usuário por ID e tenant
        """
        stmt = select(User).where(
            and_(
                User.id == user_id,
                User.tenant_id == tenant_id
            )
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_users_by_tenant(
        self, 
        tenant_id: int, 
        skip: int = 0, 
        limit: int = 100,
        search: Optional[str] = None
    ) -> List[User]:
        """
        Buscar usuários por tenant com paginação e busca
        """
        stmt = select(User).where(User.tenant_id == tenant_id)
        
        # Aplicar filtro de busca
        if search:
            search_filter = or_(
                User.full_name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%"),
                User.phone.ilike(f"%{search}%")
            )
            stmt = stmt.where(search_filter)
        
        # Aplicar paginação
        stmt = stmt.offset(skip).limit(limit).order_by(User.created_at.desc())
        
        result = await self.db.execute(stmt)
        return result.scalars().all()
    
    async def update_user(self, user_id: int, user_update: UserUpdate) -> Optional[User]:
        """
        Atualizar usuário
        """
        # Buscar usuário
        user = await self.get_by_id(user_id)
        if not user:
            return None
        
        # Atualizar campos fornecidos
        update_data = user_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(user, field, value)
        
        await self.db.commit()
        await self.db.refresh(user)
        
        return user
    
    async def update_password(self, user_id: int, new_password: str) -> bool:
        """
        Atualizar senha do usuário
        """
        hashed_password = get_password_hash(new_password)
        
        stmt = update(User).where(User.id == user_id).values(
            hashed_password=hashed_password,
            password_reset_token=None  # Limpar token de reset
        )
        
        result = await self.db.execute(stmt)
        await self.db.commit()
        
        return result.rowcount > 0
    
    async def authenticate(self, email: str, password: str, tenant_id: int) -> Optional[User]:
        """
        Autenticar usuário
        """
        user = await self.get_by_email_and_tenant(email, tenant_id)
        
        if not user:
            return None
        
        if not verify_password(password, user.hashed_password):
            return None
        
        if not user.is_active:
            return None
        
        # Atualizar último login
        from datetime import datetime
        user.last_login = datetime.utcnow()
        await self.db.commit()
        
        return user
    
    async def update_refresh_token(self, user_id: int, refresh_token: str) -> bool:
        """
        Atualizar refresh token do usuário
        """
        stmt = update(User).where(User.id == user_id).values(
            refresh_token=refresh_token
        )
        
        result = await self.db.execute(stmt)
        await self.db.commit()
        
        return result.rowcount > 0
    
    async def invalidate_refresh_tokens(self, user_id: int) -> bool:
        """
        Invalidar todos os refresh tokens do usuário
        """
        stmt = update(User).where(User.id == user_id).values(
            refresh_token=None
        )
        
        result = await self.db.execute(stmt)
        await self.db.commit()
        
        return result.rowcount > 0
    
    async def set_password_reset_token(self, user_id: int, token: str) -> bool:
        """
        Definir token de reset de senha
        """
        stmt = update(User).where(User.id == user_id).values(
            password_reset_token=token
        )
        
        result = await self.db.execute(stmt)
        await self.db.commit()
        
        return result.rowcount > 0
    
    async def get_by_password_reset_token(self, token: str) -> Optional[User]:
        """
        Buscar usuário por token de reset de senha
        """
        stmt = select(User).where(User.password_reset_token == token)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def deactivate_user(self, user_id: int) -> bool:
        """
        Desativar usuário (soft delete)
        """
        stmt = update(User).where(User.id == user_id).values(
            is_active=False,
            refresh_token=None  # Invalidar tokens
        )
        
        result = await self.db.execute(stmt)
        await self.db.commit()
        
        return result.rowcount > 0
    
    async def activate_user(self, user_id: int) -> bool:
        """
        Reativar usuário
        """
        stmt = update(User).where(User.id == user_id).values(
            is_active=True
        )
        
        result = await self.db.execute(stmt)
        await self.db.commit()
        
        return result.rowcount > 0
    
    async def count_by_tenant(self, tenant_id: int) -> int:
        """
        Contar usuários por tenant
        """
        stmt = select(func.count(User.id)).where(User.tenant_id == tenant_id)
        result = await self.db.execute(stmt)
        return result.scalar() or 0
    
    async def count_active_by_tenant(self, tenant_id: int) -> int:
        """
        Contar usuários ativos por tenant
        """
        stmt = select(func.count(User.id)).where(
            and_(
                User.tenant_id == tenant_id,
                User.is_active == True
            )
        )
        result = await self.db.execute(stmt)
        return result.scalar() or 0
    
    async def email_exists_in_tenant(self, email: str, tenant_id: int) -> bool:
        """
        Verificar se email já existe no tenant
        """
        stmt = select(func.count(User.id)).where(
            and_(
                User.email == email,
                User.tenant_id == tenant_id
            )
        )
        result = await self.db.execute(stmt)
        count = result.scalar() or 0
        return count > 0
    
    async def get_super_admins(self) -> List[User]:
        """
        Buscar todos os super admins
        """
        stmt = select(User).where(User.role == UserRole.SUPER_ADMIN)
        result = await self.db.execute(stmt)
        return result.scalars().all()
