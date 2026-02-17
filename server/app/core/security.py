from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import hashlib
import secrets
from app.core.config import settings

# Use PBKDF2 (built-in, no external deps) instead of bcrypt for Vercel compatibility
# This is secure and works reliably on serverless platforms

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash using PBKDF2"""
    try:
        # Hash format: algorithm$salt$hash
        parts = hashed_password.split('$')
        if len(parts) != 3:
            return False
        
        algorithm, salt, stored_hash = parts
        
        # Compute hash of provided password with stored salt
        computed_hash = hashlib.pbkdf2_hmac(
            'sha256',
            plain_password.encode('utf-8'),
            salt.encode('utf-8'),
            100000  # iterations
        ).hex()
        
        # Constant-time comparison
        return secrets.compare_digest(computed_hash, stored_hash)
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    """Hash a password using PBKDF2"""
    # Generate random salt
    salt = secrets.token_hex(16)
    
    # Compute hash
    pwd_hash = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('utf-8'),
        100000  # iterations
    ).hex()
    
    # Return in format: algorithm$salt$hash
    return f"pbkdf2_sha256${salt}${pwd_hash}"

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
