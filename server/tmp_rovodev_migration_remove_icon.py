"""
Migration script to remove icon column from services table
Run this after deploying the updated code
"""
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv('.env.production')

DATABASE_URL = os.getenv('DATABASE_URL')

# Convert postgres:// to postgresql:// for SQLAlchemy
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        # Check if column exists
        result = conn.execute(text("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='services' AND column_name='icon'
        """))
        
        if result.fetchone():
            print("Removing 'icon' column from services table...")
            conn.execute(text("ALTER TABLE services DROP COLUMN IF EXISTS icon"))
            conn.commit()
            print("✅ Successfully removed 'icon' column from services table")
        else:
            print("ℹ️  'icon' column does not exist, nothing to remove")
            
except Exception as e:
    print(f"❌ Error: {e}")
    print("Note: You may need to run this migration manually on your production database")
