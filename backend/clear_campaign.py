import sqlite3

conn = sqlite3.connect("campaign_data.db")
cursor = conn.cursor()

cursor.execute("DELETE FROM campaigns")  # removes all rows
conn.commit()
conn.close()

print("All old data deleted.")
