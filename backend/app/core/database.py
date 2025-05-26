"""
Database Configuration
Configuração do banco de dados PostgreSQL com SQLAlchemy 2.0
"""

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import MetaData

from app.core.config import settings


# Garantir que a URL use asyncpg
database_url = settings.DATABASE_URL
if database_url.startswith("postgresql://"):
    database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
elif not database_url.startswith("postgresql+asyncpg://"):
    database_url = "postgresql+asyncpg://" + database_url.split("://", 1)[1]

# Criar engine assíncrono
engine = create_async_engine(
    database_url,
    echo=settings.DEBUG,
    pool_pre_ping=True,
    pool_recycle=300,
)

# Session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)


# Base class para modelos
class Base(DeclarativeBase):
    """
    Base class para todos os modelos SQLAlchemy
    """
    metadata = MetaData(
        naming_convention={
            "ix": "ix_%(column_0_label)s",
            "uq": "uq_%(table_name)s_%(column_0_name)s",
            "ck": "ck_%(table_name)s_%(constraint_name)s",
            "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
            "pk": "pk_%(table_name)s"
        }
    )


# Dependency para obter sessão do banco
async def get_db() -> AsyncSession:
    """
    Dependency para obter sessão do banco de dados
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


# Função para criar todas as tabelas
async def create_tables():
    """
    Criar todas as tabelas no banco de dados
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# Função para dropar todas as tabelas
async def drop_tables():
    """
    Dropar todas as tabelas do banco de dados
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
