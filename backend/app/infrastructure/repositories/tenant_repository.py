"""
Tenant Repository
Repositório para operações de tenant no banco de dados
"""

from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete, and_, or_, func
from sqlalchemy.orm import selectinload

from app.domain.models.tenant import Tenant, TenantStatus, TenantPlan
from app.domain.schemas.tenant import TenantCreate, TenantUpdate


class TenantRepository:
    """
    Repositório para operações de tenant
    """
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create(self, tenant_data: TenantCreate) -> Tenant:
        """
        Criar novo tenant
        """
        # Gerar slug se não fornecido
        if not tenant_data.slug:
            from app.core.security import generate_tenant_slug
            tenant_data.slug = generate_tenant_slug(tenant_data.company_name)
        
        # Calcular data de fim do trial
        trial_days = 30
        trial_end = datetime.utcnow() + timedelta(days=trial_days)
        
        tenant = Tenant(
            slug=tenant_data.slug,
            company_name=tenant_data.company_name,
            fantasy_name=tenant_data.fantasy_name,
            cnpj=tenant_data.cnpj,
            cpf=tenant_data.cpf,
            email=tenant_data.email,
            phone=tenant_data.phone,
            segment=tenant_data.segment,
            cep=tenant_data.cep,
            street=tenant_data.street,
            number=tenant_data.number,
            complement=tenant_data.complement,
            neighborhood=tenant_data.neighborhood,
            city=tenant_data.city,
            state=tenant_data.state,
            plan=tenant_data.plan,
            status=TenantStatus.PENDING,
            trial_end_date=trial_end if tenant_data.plan == TenantPlan.TRIAL else None,
            is_active=True
        )
        
        self.db.add(tenant)
        await self.db.commit()
        await self.db.refresh(tenant)
        
        return tenant
    
    async def get_by_id(self, tenant_id: int) -> Optional[Tenant]:
        """
        Buscar tenant por ID
        """
        stmt = select(Tenant).where(Tenant.id == tenant_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_by_slug(self, slug: str) -> Optional[Tenant]:
        """
        Buscar tenant por slug
        """
        stmt = select(Tenant).where(Tenant.slug == slug)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_by_email(self, email: str) -> Optional[Tenant]:
        """
        Buscar tenant por email
        """
        stmt = select(Tenant).where(Tenant.email == email)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_by_cnpj(self, cnpj: str) -> Optional[Tenant]:
        """
        Buscar tenant por CNPJ
        """
        stmt = select(Tenant).where(Tenant.cnpj == cnpj)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def list_tenants(
        self,
        skip: int = 0,
        limit: int = 100,
        search: Optional[str] = None,
        status: Optional[TenantStatus] = None,
        plan: Optional[TenantPlan] = None
    ) -> List[Tenant]:
        """
        Listar tenants com filtros
        """
        stmt = select(Tenant)
        
        # Aplicar filtros
        if search:
            search_filter = or_(
                Tenant.company_name.ilike(f"%{search}%"),
                Tenant.fantasy_name.ilike(f"%{search}%"),
                Tenant.email.ilike(f"%{search}%"),
                Tenant.slug.ilike(f"%{search}%")
            )
            stmt = stmt.where(search_filter)
        
        if status:
            stmt = stmt.where(Tenant.status == status)
        
        if plan:
            stmt = stmt.where(Tenant.plan == plan)
        
        # Aplicar paginação
        stmt = stmt.offset(skip).limit(limit).order_by(Tenant.created_at.desc())
        
        result = await self.db.execute(stmt)
        return result.scalars().all()
    
    async def update_tenant(self, tenant_id: int, tenant_update: TenantUpdate) -> Optional[Tenant]:
        """
        Atualizar tenant
        """
        tenant = await self.get_by_id(tenant_id)
        if not tenant:
            return None
        
        # Atualizar campos fornecidos
        update_data = tenant_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(tenant, field, value)
        
        await self.db.commit()
        await self.db.refresh(tenant)
        
        return tenant
    
    async def deactivate_tenant(self, tenant_id: int) -> bool:
        """
        Desativar tenant (soft delete)
        """
        stmt = update(Tenant).where(Tenant.id == tenant_id).values(
            is_active=False,
            status=TenantStatus.CANCELLED,
            suspended_at=datetime.utcnow()
        )
        
        result = await self.db.execute(stmt)
        await self.db.commit()
        
        return result.rowcount > 0
    
    async def activate_tenant(self, tenant_id: int) -> bool:
        """
        Reativar tenant
        """
        stmt = update(Tenant).where(Tenant.id == tenant_id).values(
            is_active=True,
            status=TenantStatus.ACTIVE,
            activated_at=datetime.utcnow(),
            suspended_at=None
        )
        
        result = await self.db.execute(stmt)
        await self.db.commit()
        
        return result.rowcount > 0
    
    async def complete_onboarding(self, tenant_id: int) -> bool:
        """
        Marcar onboarding como completo
        """
        stmt = update(Tenant).where(Tenant.id == tenant_id).values(
            onboarding_completed=True,
            onboarding_step=3,
            status=TenantStatus.ACTIVE,
            activated_at=datetime.utcnow()
        )
        
        result = await self.db.execute(stmt)
        await self.db.commit()
        
        return result.rowcount > 0
    
    async def update_user_count(self, tenant_id: int) -> bool:
        """
        Atualizar contagem de usuários do tenant
        """
        from app.domain.models.user import User
        
        # Contar usuários ativos
        stmt = select(func.count(User.id)).where(
            and_(
                User.tenant_id == tenant_id,
                User.is_active == True
            )
        )
        result = await self.db.execute(stmt)
        user_count = result.scalar() or 0
        
        # Atualizar tenant
        update_stmt = update(Tenant).where(Tenant.id == tenant_id).values(
            total_users=user_count
        )
        
        await self.db.execute(update_stmt)
        await self.db.commit()
        
        return True
    
    async def update_last_activity(self, tenant_id: int) -> bool:
        """
        Atualizar último acesso do tenant
        """
        stmt = update(Tenant).where(Tenant.id == tenant_id).values(
            last_activity=datetime.utcnow()
        )
        
        result = await self.db.execute(stmt)
        await self.db.commit()
        
        return result.rowcount > 0
    
    async def slug_exists(self, slug: str) -> bool:
        """
        Verificar se slug já existe
        """
        stmt = select(func.count(Tenant.id)).where(Tenant.slug == slug)
        result = await self.db.execute(stmt)
        count = result.scalar() or 0
        return count > 0
    
    async def email_exists(self, email: str) -> bool:
        """
        Verificar se email já existe
        """
        stmt = select(func.count(Tenant.id)).where(Tenant.email == email)
        result = await self.db.execute(stmt)
        count = result.scalar() or 0
        return count > 0
    
    async def cnpj_exists(self, cnpj: str) -> bool:
        """
        Verificar se CNPJ já existe
        """
        stmt = select(func.count(Tenant.id)).where(Tenant.cnpj == cnpj)
        result = await self.db.execute(stmt)
        count = result.scalar() or 0
        return count > 0
    
    async def get_tenant_stats(self, tenant_id: int) -> Optional[Dict[str, Any]]:
        """
        Obter estatísticas detalhadas do tenant
        """
        tenant = await self.get_by_id(tenant_id)
        if not tenant:
            return None
        
        from app.domain.models.user import User
        
        # Contar usuários
        user_count_stmt = select(func.count(User.id)).where(User.tenant_id == tenant_id)
        active_user_count_stmt = select(func.count(User.id)).where(
            and_(User.tenant_id == tenant_id, User.is_active == True)
        )
        
        user_count_result = await self.db.execute(user_count_stmt)
        active_user_count_result = await self.db.execute(active_user_count_stmt)
        
        total_users = user_count_result.scalar() or 0
        active_users = active_user_count_result.scalar() or 0
        
        # Calcular dias restantes
        days_remaining = None
        if tenant.subscription_end:
            delta = tenant.subscription_end - datetime.utcnow()
            days_remaining = max(0, delta.days)
        elif tenant.trial_end_date:
            delta = tenant.trial_end_date - datetime.utcnow()
            days_remaining = max(0, delta.days)
        
        return {
            "tenant_id": tenant.id,
            "company_name": tenant.company_name,
            "slug": tenant.slug,
            "plan": tenant.plan,
            "status": tenant.status,
            "created_at": tenant.created_at,
            "total_users": total_users,
            "active_users": active_users,
            "last_activity": tenant.last_activity,
            "monthly_fee": tenant.monthly_fee,
            "subscription_start": tenant.subscription_start,
            "subscription_end": tenant.subscription_end,
            "days_remaining": days_remaining,
            "total_patients": tenant.total_patients,
            "total_appointments": tenant.total_appointments,
            "storage_used_gb": 0.0,  # TODO: Implementar cálculo real
            "modules_enabled": {
                "hubb_hof": True,
                "hubb_vision": True,
                "hubb_rh": True,
                "hubb_ia": True,
                "hubb_core": True
            }
        }
    
    async def get_expiring_trials(self, days: int = 7) -> List[Tenant]:
        """
        Buscar tenants com trial expirando em X dias
        """
        expiry_date = datetime.utcnow() + timedelta(days=days)
        
        stmt = select(Tenant).where(
            and_(
                Tenant.plan == TenantPlan.TRIAL,
                Tenant.trial_end_date <= expiry_date,
                Tenant.is_active == True
            )
        )
        
        result = await self.db.execute(stmt)
        return result.scalars().all()
