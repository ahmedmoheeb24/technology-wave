"""
Migration script to add new columns to services table
Run this to update your existing database
"""

from sqlalchemy import create_engine, text
from app.core.config import settings

def migrate_services_table():
    """Add new columns to services table"""
    engine = create_engine(settings.DATABASE_URL)
    
    with engine.connect() as conn:
        try:
            # Check if columns exist before adding
            print("Adding new columns to services table...")
            
            # Add slug column
            try:
                conn.execute(text("ALTER TABLE services ADD COLUMN slug TEXT UNIQUE"))
                print("✅ Added slug column")
            except Exception as e:
                print(f"⚠️  slug column may already exist: {e}")
            
            # Add detailed_description column
            try:
                conn.execute(text("ALTER TABLE services ADD COLUMN detailed_description TEXT"))
                print("✅ Added detailed_description column")
            except Exception as e:
                print(f"⚠️  detailed_description column may already exist: {e}")
            
            # Add features column (already exists but ensure it's TEXT)
            try:
                conn.execute(text("ALTER TABLE services ADD COLUMN features TEXT"))
                print("✅ Added features column")
            except Exception as e:
                print(f"⚠️  features column may already exist: {e}")
            
            # Add image column
            try:
                conn.execute(text("ALTER TABLE services ADD COLUMN image TEXT"))
                print("✅ Added image column")
            except Exception as e:
                print(f"⚠️  image column may already exist: {e}")
            
            # Generate slugs for existing services
            try:
                result = conn.execute(text("SELECT id, title FROM services WHERE slug IS NULL"))
                services = result.fetchall()
                
                for service in services:
                    import re
                    slug = re.sub(r'[^a-z0-9]+', '-', service[1].lower()).strip('-')
                    conn.execute(
                        text("UPDATE services SET slug = :slug WHERE id = :id"),
                        {"slug": slug, "id": service[0]}
                    )
                print(f"✅ Generated slugs for {len(services)} existing services")
            except Exception as e:
                print(f"⚠️  Error generating slugs: {e}")
            
            conn.commit()
            print("\n✅ Migration completed successfully!")
            
        except Exception as e:
            print(f"❌ Migration failed: {e}")
            conn.rollback()

if __name__ == "__main__":
    migrate_services_table()
