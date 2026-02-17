from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings

# Password hashing with bcrypt compatibility settings for Vercel
# Truncate passwords to 72 bytes as per bcrypt spec
pwd_context = CryptContext(
    schemes=["bcrypt"], 
    deprecated="auto",
    bcrypt__ident="2b",  # Use bcrypt 2b format
    bcrypt__rounds=12     # Secure rounds
)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Truncate password to 72 bytes for bcrypt compatibility
    truncated = plain_password[:72] if len(plain_password.encode('utf-8')) > 72 else plain_password
    return pwd_context.verify(truncated, hashed_password)

def get_password_hash(password: str) -> str:
    # Truncate password to 72 bytes for bcrypt compatibility
    truncated = password[:72] if len(password.encode('utf-8')) > 72 else password
    return pwd_context.hash(truncated)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None
