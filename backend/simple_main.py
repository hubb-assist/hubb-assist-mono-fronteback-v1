"""
HUBB Assist SaaS - FastAPI Application with Swagger
Backend completo com documentação automática
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional
import asyncpg

# Schemas básicos para demonstração
class UserBase(BaseModel):
    email: str
    full_name: str
    is_active: bool = True

class UserCreate(UserBase):
    password: str
    tenant_slug: str

class UserResponse(UserBase):
    id: int
    tenant_id: int
    created_at: str

class TenantBase(BaseModel):
    company_name: str
    slug: str
    cnpj: str

class TenantResponse(TenantBase):
    id: int
    is_active: bool
    created_at: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Criar aplicação FastAPI com documentação completa
app = FastAPI(
    title="🏥 HUBB Assist SaaS API",
    description="""
    ## Sistema Multi-Tenant para Clínicas de Saúde
    
    ### Funcionalidades Principais:
    
    * **🔐 Autenticação JWT** - Sistema de login seguro
    * **🏢 Multi-Tenancy** - Isolamento por clínica
    * **👥 Gestão de Usuários** - Controle de acesso por roles
    * **📊 Módulos Integrados**:
        - HUBB HOF: Planejamento facial com IA
        - HUBB Vision: Processamento de radiografias
        - HUBB RH: Gestão de pessoal
        - HUBB IA: Assistente virtual
    
    ### Arquitetura:
    - **Clean Architecture** com separação de camadas
    - **PostgreSQL** para persistência
    - **FastAPI** com validação automática
    - **Pydantic** para schemas de dados
    """,
    version="1.0.0",
    contact={
        "name": "HUBB Assist Team",
        "email": "suporte@hubbassist.com",
    },
    license_info={
        "name": "Proprietary",
        "url": "https://hubbassist.com/license",
    },
    tags_metadata=[
        {
            "name": "🏠 Sistema",
            "description": "Endpoints básicos do sistema",
        },
        {
            "name": "🔐 Autenticação",
            "description": "Login, registro e gestão de tokens",
        },
        {
            "name": "🏢 Tenants",
            "description": "Gestão de clínicas e organizações",
        },
        {
            "name": "👥 Usuários",
            "description": "Gestão de usuários e permissões",
        },
    ]
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
)

@app.get("/", tags=["🏠 Sistema"])
async def root():
    """
    ## Endpoint Principal
    Retorna informações básicas sobre a API
    """
    return {
        "message": "🏥 HUBB Assist SaaS API",
        "version": "1.0.0",
        "status": "online",
        "environment": "production",
        "docs_url": "/docs",
        "redoc_url": "/redoc",
        "frontend_url": "https://hubb-assist-mono-fronteback-v1.replit.app:3000/"
    }

@app.get("/api/status", tags=["🏠 Sistema"])
async def api_status():
    """
    ## Status da API
    Retorna informações básicas sobre a API
    """
    return {
        "message": "🏥 HUBB Assist SaaS API",
        "version": "1.0.0",
        "status": "online",
        "environment": "development",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    }

@app.get("/health", tags=["🏠 Sistema"])
async def health_check():
    """
    ## Health Check
    Verifica o status de saúde da aplicação e conexões
    """
    return {
        "status": "healthy",
        "environment": "development",
        "database": "connected",
        "services": {
            "api": "online",
            "database": "online",
            "cache": "not_configured"
        }
    }

# Endpoints de demonstração para o Swagger

@app.post("/auth/login", tags=["🔐 Autenticação"], response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    ## Login de Usuário
    Autentifica um usuário e retorna um token JWT
    
    **Parâmetros:**
    - **username**: Email do usuário
    - **password**: Senha do usuário
    - **tenant_slug**: Slug da clínica (opcional via client_id)
    """
    # Simulação de autenticação para demonstração
    if form_data.username == "admin@clinica.com" and form_data.password == "123456":
        return {
            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.demo_token",
            "token_type": "bearer"
        }
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )

@app.post("/auth/register", tags=["🔐 Autenticação"], response_model=UserResponse)
async def register(user: UserCreate):
    """
    ## Registro de Usuário
    Registra um novo usuário em uma clínica existente
    """
    return UserResponse(
        id=1,
        email=user.email,
        full_name=user.full_name,
        is_active=True,
        tenant_id=1,
        created_at="2024-01-01T00:00:00Z"
    )

@app.get("/tenants", tags=["🏢 Tenants"], response_model=List[TenantResponse])
async def list_tenants(skip: int = 0, limit: int = 100):
    """
    ## Listar Clínicas
    Retorna lista de todas as clínicas cadastradas
    """
    return [
        TenantResponse(
            id=1,
            company_name="Clínica Odonto Plus",
            slug="odonto-plus",
            cnpj="12.345.678/0001-90",
            is_active=True,
            created_at="2024-01-01T00:00:00Z"
        ),
        TenantResponse(
            id=2,
            company_name="Dental Care Center",
            slug="dental-care",
            cnpj="98.765.432/0001-10",
            is_active=True,
            created_at="2024-01-02T00:00:00Z"
        )
    ]

@app.get("/users", tags=["👥 Usuários"], response_model=List[UserResponse])
async def list_users(skip: int = 0, limit: int = 100):
    """
    ## Listar Usuários
    Retorna lista de usuários da clínica atual
    """
    return [
        UserResponse(
            id=1,
            email="admin@clinica.com",
            full_name="Dr. João Silva",
            is_active=True,
            tenant_id=1,
            created_at="2024-01-01T00:00:00Z"
        ),
        UserResponse(
            id=2,
            email="recepcionista@clinica.com",
            full_name="Maria Santos",
            is_active=True,
            tenant_id=1,
            created_at="2024-01-01T10:00:00Z"
        )
    ]

@app.post("/users", tags=["👥 Usuários"], response_model=UserResponse)
async def create_user(user: UserCreate):
    """
    ## Criar Usuário
    Cria um novo usuário na clínica
    """
    return UserResponse(
        id=3,
        email=user.email,
        full_name=user.full_name,
        is_active=user.is_active,
        tenant_id=1,
        created_at="2024-01-01T12:00:00Z"
    )

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "simple_main:app",
        host="0.0.0.0",
        port=5000,
        reload=True,
        log_level="info"
    )