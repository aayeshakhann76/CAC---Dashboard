# add_date_column.py
import sqlite3

# Database se connect
conn = sqlite3.connect("campaign_data.db")
cursor = conn.cursor()

# Check karo column already hai ya nahi
cursor.execute("PRAGMA table_info(campaigns);")
columns = [col[1] for col in cursor.fetchall()]

if "date" not in columns:
    cursor.execute("ALTER TABLE campaigns ADD COLUMN date TEXT;")
    print("✅ 'date' column added successfully!")
else:
    print("⚠️ 'date' column already exists.")

conn.commit()
conn.close()
