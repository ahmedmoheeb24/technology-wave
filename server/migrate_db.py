"""
Database migration script to add new columns to existing database
"""
import sqlite3
import os

db_path = "store.db"

if not os.path.exists(db_path):
    print("✅ No existing database found. New one will be created automatically.")
    exit(0)

print("🔄 Migrating database...")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Check if products table exists
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='products'")
if cursor.fetchone():
    # Get existing columns
    cursor.execute("PRAGMA table_info(products)")
    columns = [col[1] for col in cursor.fetchall()]
    
    # Add missing columns
    migrations = []
    
    if 'slug' not in columns:
        migrations.append("ALTER TABLE products ADD COLUMN slug VARCHAR")
        print("  Adding 'slug' column...")
    
    if 'description' not in columns:
        migrations.append("ALTER TABLE products ADD COLUMN description TEXT")
        print("  Adding 'description' column...")
    
    if 'features' not in columns:
        migrations.append("ALTER TABLE products ADD COLUMN features TEXT")
        print("  Adding 'features' column...")
    
    if 'details' not in columns:
        migrations.append("ALTER TABLE products ADD COLUMN details TEXT")
        print("  Adding 'details' column...")
    
    if 'in_stock' not in columns:
        migrations.append("ALTER TABLE products ADD COLUMN in_stock BOOLEAN DEFAULT 1")
        print("  Adding 'in_stock' column...")
    
    if 'featured' not in columns:
        migrations.append("ALTER TABLE products ADD COLUMN featured BOOLEAN DEFAULT 0")
        print("  Adding 'featured' column...")
    
    # Check if price needs to be converted to FLOAT
    cursor.execute("PRAGMA table_info(products)")
    for col in cursor.fetchall():
        if col[1] == 'price' and col[2] != 'FLOAT':
            print("  ⚠️ Note: 'price' column type cannot be changed directly in SQLite")
            print("     It will work as FLOAT through SQLAlchemy")
    
    # Execute migrations
    for migration in migrations:
        try:
            cursor.execute(migration)
            conn.commit()
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    # Generate slugs for existing products
    cursor.execute("SELECT id, title FROM products WHERE slug IS NULL")
    products = cursor.fetchall()
    
    if products:
        print(f"  Generating slugs for {len(products)} existing products...")
        import re
        for product_id, title in products:
            if title:
                slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
                cursor.execute("UPDATE products SET slug = ? WHERE id = ?", (slug, product_id))
        conn.commit()
    
    print("✅ Migration completed successfully!")
else:
    print("✅ Products table doesn't exist yet. Will be created on first run.")

conn.close()
