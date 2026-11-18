import sqlite3


conn = sqlite3.connect("campaign_data.db")
cursor = conn.cursor()


cursor.execute("""
    INSERT INTO campaigns (channel, spend, new_customers, cltv,date) 
    VALUES (?, ?, ?, ?, DATE('now'))
""", ("Google Ads", 5000.0, 50, 200.0))

conn.commit()
conn.close()

print(" Dummy record inserted!")
