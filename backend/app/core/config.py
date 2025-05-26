"""
Application Configuration
Configurações da aplicação com suporte a environment variables
"""

import os
from typing import List, Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Configurações da aplicação HUBB Assist SaaS
    """
    
    # App Info
    PROJECT_NAME: str = "HUBB Assist SaaS"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Sistema multi-tenant para clínicas de saúde"
    
    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "true").lower() == "true"
    
    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "hubb-assist-super-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 1
    PASSWORD_RESET_TOKEN_EXPIRE_HOURS: int = 24
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/hubb_assist")
    
    # CORS
    ALLOWED_HOSTS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5000",
        "https://hubb-assist.vercel.app",
        "*" if DEBUG else ""
    ]
    
    # External APIs
    VIACEP_API_URL: str = "https://viacep.com.br/ws"
    
    # Email (para password reset)
    SMTP_TLS: bool = True
    SMTP_PORT: Optional[int] = None
    SMTP_HOST: Optional[str] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[str] = None
    EMAILS_FROM_NAME: Optional[str] = None
    
    # File Upload
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_FILE_TYPES: List[str] = [
        "image/jpeg",
        "image/png", 
        "image/gif",
        "application/pdf"
    ]
    
    # Pagination
    DEFAULT_PAGE_SIZE: int = 20
    MAX_PAGE_SIZE: int = 100
    
    # Cache
    REDIS_URL: Optional[str] = os.getenv("REDIS_URL")
    CACHE_TTL: int = 300  # 5 minutes
    
    # Monitoring
    SENTRY_DSN: Optional[str] = os.getenv("SENTRY_DSN")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    # Multi-tenant
    DEFAULT_TENANT_PLAN: str = "basic"
    MAX_USERS_PER_TENANT: int = 50
    
    # HUBB Modules
    HUBB_HOF_ENABLED: bool = True
    HUBB_VISION_ENABLED: bool = True
    HUBB_RH_ENABLED: bool = True
    HUBB_IA_ENABLED: bool = True
    HUBB_CORE_ENABLED: bool = True
    
    class Config:
        case_sensitive = True
        env_file = ".env"


# Instância global das configurações
settings = Settings()


def get_settings() -> Settings:
    """
    Obter configurações da aplicação
    """
    return settings
