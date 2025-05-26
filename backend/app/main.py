"""
HUBB Assist SaaS - FastAPI Main Application
Sistema multi-tenant para clínicas de saúde
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import engine, get_db
from app.domain.models import user, tenant
from app.api.routes import auth, tenants, users


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Gerencia o ciclo de vida da aplicação"""
    # Startup
    print("🚀 Iniciando HUBB Assist SaaS...")
    
    # Criar todas as tabelas
    from app.domain.models.user import Base
    from app.domain.models.tenant import Base as TenantBase
    
    async with engine.begin() as conn:
        await conn.run_sync(user.Base.metadata.create_all)
        await conn.run_sync(tenant.Base.metadata.create_all)
    
    print("✅ Database inicializada com sucesso!")
    print(f"📡 Servidor rodando em: http://0.0.0.0:{settings.PORT}")
    
    yield
    
    # Shutdown
    print("🛑 Encerrando HUBB Assist SaaS...")


# Criar aplicação FastAPI
app = FastAPI(
    title="HUBB Assist SaaS",
    description="Sistema multi-tenant para clínicas de saúde",
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    lifespan=lifespan
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
)

# Incluir rotas
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Autenticação"])
app.include_router(tenants.router, prefix="/api/v1/tenants", tags=["Tenants"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Usuários"])


@app.get("/")
async def root():
    """Endpoint raiz - Health check"""
    return {
        "message": "HUBB Assist SaaS API",
        "version": "1.0.0",
        "status": "online",
        "environment": settings.ENVIRONMENT
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "database": "connected"
    }


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
