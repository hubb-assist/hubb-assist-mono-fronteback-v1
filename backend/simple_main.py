"""
HUBB Assist SaaS - FastAPI Simple Application
Versão simplificada para teste inicial
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Criar aplicação FastAPI
app = FastAPI(
    title="HUBB Assist SaaS",
    description="Sistema multi-tenant para clínicas de saúde",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Endpoint raiz - Health check"""
    return {
        "message": "HUBB Assist SaaS API",
        "version": "1.0.0",
        "status": "online",
        "environment": "development"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": "development",
        "database": "not_connected"
    }

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "simple_main:app",
        host="0.0.0.0",
        port=5000,
        reload=True,
        log_level="info"
    )