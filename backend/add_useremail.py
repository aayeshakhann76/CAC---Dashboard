import sqlite3

DB_FILE = "campaign_data.db"

def add_user_email_column():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Check if column already exists
    cursor.execute("PRAGMA table_info(campaigns)")
    columns = [info[1] for info in cursor.fetchall()]

    if "user_email" in columns:
        print("Column 'user_email' already exists.")
    else:
        cursor.execute("ALTER TABLE campaigns ADD COLUMN user_email TEXT")
        conn.commit()
        print("Column 'user_email' added successfully!")

    conn.close()

if __name__ == "__main__":
    add_user_email_column()
