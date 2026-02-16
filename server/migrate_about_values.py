"""
Migrate About table values column from TEXT to JSON
"""
import sqlite3
import os
import json

db_path = "store.db"

if not os.path.exists(db_path):
    print("✅ No existing database found.")
    exit(0)

print("🔄 Migrating About values column to JSON...")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Check if about table exists
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='about'")
if cursor.fetchone():
    # Get existing values data
    cursor.execute("SELECT id, values FROM about WHERE values IS NOT NULL AND values != ''")
    rows = cursor.fetchall()
    
    if rows:
        print(f"  Found {len(rows)} row(s) with values data")
        
        # For SQLite, we need to recreate the column as JSON
        # Since values is TEXT, we'll migrate the data first
        for row_id, values_text in rows:
            # Convert comma-separated text to JSON array of objects
            if values_text:
                value_items = [v.strip() for v in values_text.split(',') if v.strip()]
                values_json = json.dumps([{"title": item, "description": ""} for item in value_items])
                cursor.execute("UPDATE about SET values = ? WHERE id = ?", (values_json, row_id))
                print(f"  ✅ Migrated values for ID {row_id}")
        
        conn.commit()
        print("✅ Values migration completed successfully!")
    else:
        print("  No existing values data to migrate")
else:
    print("✅ About table doesn't exist yet.")

conn.close()
