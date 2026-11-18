import sqlite3

conn = sqlite3.connect('campaign_data.db')
cursor = conn.cursor()

cursor.execute("""
               CREATE TABLE IF NOT EXISTS campaigns (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               channel TEXT NOT NULL,
               spend REAL NOT NULL,
               new_customers INTEGER NOT NULL,
               cltv REAL NOT NULL

               
               )
               """)

conn.commit()
conn.close()

print("Campaigns table created ( or already exists).")