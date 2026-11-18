# routes_predict.py (ya directly app.py mein daal do)
import sqlite3
import pandas as pd
import numpy as np
from flask import request, jsonify
from sklearn.linear_model import LinearRegression

DB_PATH = "marketing.db"   # apna DB path lagao

def read_user_data(user_email, metric):
    conn = sqlite3.connect(DB_PATH)
    df = pd.read_sql_query(
        f"SELECT date, {metric} FROM campaigns WHERE user_email = ?",
        conn, params=(user_email,))
    conn.close()
    return df

@app.route("/api/predict/revenue")
def predict_revenue():
    user = request.args.get("user")
    if not user:
        return jsonify({"error": "Missing user_email"}), 400

    df = read_user_data(user, "revenue")
    if df.empty:
        return jsonify([])

    # parse date
    df['date'] = pd.to_datetime(df['date'], errors='coerce')
    df = df.dropna(subset=['date'])
    if df.empty:
        return jsonify({"error": "Invalid dates"}), 400

    # monthly aggregate
    df['month'] = df['date'].dt.to_period('M').dt.to_timestamp()
    monthly = df.groupby('month', as_index=False)['revenue'].sum().sort_values('month')

    if len(monthly) < 2:
        return jsonify({"error": "Not enough data"}), 400

    # regression on month index
    monthly['month_index'] = (monthly['month'] - monthly['month'].min()).dt.days // 30
    X = monthly[['month_index']]
    y = monthly['revenue']

    model = LinearRegression().fit(X, y)

    # future predictions (next 3 months)
    future_idx = np.arange(monthly['month_index'].max()+1, monthly['month_index'].max()+4).reshape(-1,1)
    future_preds = model.predict(future_idx)

    # build response
    res = []
    for _, row in monthly.iterrows():
        res.append({
            "month": row['month'].strftime("%Y-%m"),
            "actual": float(row['revenue']),
            "predicted": float(model.predict([[row['month_index']]])[0])
        })

    for i, pred in enumerate(future_preds, start=1):
        future_month = (monthly['month'].max() + pd.DateOffset(months=i)).strftime("%Y-%m")
        res.append({"month": future_month, "actual": None, "predicted": float(pred)})

    return jsonify(res)
