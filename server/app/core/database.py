from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from app.core.config import settings
import os

# Create engine with appropriate config
# SQLite needs check_same_thread=False, PostgreSQL doesn't need it
connect_args = {}
if "sqlite" in settings.DATABASE_URL:
    connect_args = {"check_same_thread": False}
    # For Vercel serverless with SQLite, ensure database directory exists
    if os.getenv("VERCEL"):
        db_path = settings.DATABASE_URL.replace("sqlite:///", "")
        db_dir = os.path.dirname(db_path) if "/" in db_path else "/tmp"
        if db_dir and not os.path.exists(db_dir):
            os.makedirs(db_dir, exist_ok=True)

# Create engine
# For serverless, use NullPool to avoid connection pooling issues
if os.getenv("VERCEL"):
    # Serverless environment - no connection pooling
    engine = create_engine(
        settings.DATABASE_URL,
        connect_args=connect_args,
        poolclass=NullPool  # No pooling for serverless
    )
else:
    # Traditional environment - use connection pooling
    engine = create_engine(
        settings.DATABASE_URL,
        connect_args=connect_args,
        pool_pre_ping=True,
        pool_recycle=300,
        pool_size=5,
        max_overflow=10
    )

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Initialize database
async def init_db():
    from app.models import user, product, service, hero_banner, about
    Base.metadata.create_all(bind=engine)
    
    # Create default admin user
    db = SessionLocal()
    try:
        from app.models.user import User
        from app.core.security import get_password_hash
        
        existing_user = db.query(User).filter(User.username == settings.ADMIN_USERNAME).first()
        if not existing_user:
            admin_user = User(
                username=settings.ADMIN_USERNAME,
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                is_admin=True
            )
            db.add(admin_user)
            db.commit()
            print(f"✅ Admin user created: {settings.ADMIN_USERNAME}")
        else:
            print(f"ℹ️  Admin user already exists: {settings.ADMIN_USERNAME}")
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
    finally:
        db.close()
