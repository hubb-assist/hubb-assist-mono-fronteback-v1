"""
Security Utilities
Utilitários para autenticação, autorização e criptografia
"""

from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from passlib.context import CryptContext
from jose import JWTError, jwt
import secrets
import string

from app.core.config import settings


# Context para hash de senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """
    Criar access token JWT
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire, "type": "access"})
    
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.SECRET_KEY, 
        algorithm=settings.ALGORITHM
    )
    
    return encoded_jwt


def create_refresh_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """
    Criar refresh token JWT
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    to_encode.update({"exp": expire, "type": "refresh"})
    
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.SECRET_KEY, 
        algorithm=settings.ALGORITHM
    )
    
    return encoded_jwt


def create_password_reset_token(email: str, tenant_id: int) -> str:
    """
    Criar token para reset de senha
    """
    delta = timedelta(hours=settings.PASSWORD_RESET_TOKEN_EXPIRE_HOURS)
    now = datetime.utcnow()
    expires = now + delta
    
    exp = expires.timestamp()
    encoded_jwt = jwt.encode(
        {
            "exp": exp, 
            "nbf": now.timestamp(), 
            "sub": email,
            "tenant_id": tenant_id,
            "type": "password_reset"
        },
        settings.SECRET_KEY, 
        algorithm=settings.ALGORITHM,
    )
    
    return encoded_jwt


def verify_password_reset_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Verificar token de reset de senha
    """
    try:
        decoded_token = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM]
        )
        
        if decoded_token.get("type") != "password_reset":
            return None
            
        return decoded_token
        
    except JWTError:
        return None


def verify_token(token: str, token_type: str = "access") -> Optional[Dict[str, Any]]:
    """
    Verificar e decodificar token JWT
    """
    try:
        payload = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM]
        )
        
        if payload.get("type") != token_type:
            return None
            
        return payload
        
    except JWTError:
        return None


def get_password_hash(password: str) -> str:
    """
    Gerar hash da senha
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verificar senha plain text contra hash
    """
    return pwd_context.verify(plain_password, hashed_password)


def generate_random_string(length: int = 32) -> str:
    """
    Gerar string aleatória segura
    """
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))


def generate_tenant_slug(company_name: str) -> str:
    """
    Gerar slug único para tenant baseado no nome da empresa
    """
    import re
    import unicodedata
    
    # Normalizar e remover acentos
    slug = unicodedata.normalize('NFKD', company_name)
    slug = slug.encode('ascii', 'ignore').decode('ascii')
    
    # Converter para lowercase e substituir espaços/caracteres especiais
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', slug).lower()
    slug = re.sub(r'[\s-]+', '-', slug).strip('-')
    
    # Adicionar sufixo aleatório para garantir unicidade
    random_suffix = generate_random_string(6).lower()
    slug = f"{slug}-{random_suffix}"
    
    return slug


def validate_cpf(cpf: str) -> bool:
    """
    Validar CPF brasileiro
    """
    # Remover formatação
    cpf = re.sub(r'[^0-9]', '', cpf)
    
    # Verificar se tem 11 dígitos
    if len(cpf) != 11:
        return False
    
    # Verificar se todos os dígitos são iguais
    if cpf == cpf[0] * 11:
        return False
    
    # Calcular primeiro dígito verificador
    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    resto = soma % 11
    dv1 = 0 if resto < 2 else 11 - resto
    
    # Calcular segundo dígito verificador
    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    resto = soma % 11
    dv2 = 0 if resto < 2 else 11 - resto
    
    # Verificar dígitos
    return cpf[9] == str(dv1) and cpf[10] == str(dv2)


def validate_cnpj(cnpj: str) -> bool:
    """
    Validar CNPJ brasileiro
    """
    import re
    
    # Remover formatação
    cnpj = re.sub(r'[^0-9]', '', cnpj)
    
    # Verificar se tem 14 dígitos
    if len(cnpj) != 14:
        return False
    
    # Verificar se todos os dígitos são iguais
    if cnpj == cnpj[0] * 14:
        return False
    
    # Calcular primeiro dígito verificador
    multiplicadores = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    soma = sum(int(cnpj[i]) * multiplicadores[i] for i in range(12))
    resto = soma % 11
    dv1 = 0 if resto < 2 else 11 - resto
    
    # Calcular segundo dígito verificador
    multiplicadores = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    soma = sum(int(cnpj[i]) * multiplicadores[i] for i in range(13))
    resto = soma % 11
    dv2 = 0 if resto < 2 else 11 - resto
    
    # Verificar dígitos
    return cnpj[12] == str(dv1) and cnpj[13] == str(dv2)


def sanitize_filename(filename: str) -> str:
    """
    Sanitizar nome de arquivo
    """
    import re
    
    # Remover caracteres perigosos
    filename = re.sub(r'[^\w\-_\.]', '', filename)
    
    # Limitar tamanho
    if len(filename) > 255:
        name, ext = filename.rsplit('.', 1) if '.' in filename else (filename, '')
        filename = name[:250] + ('.' + ext if ext else '')
    
    return filename
