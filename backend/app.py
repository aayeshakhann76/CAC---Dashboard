# from flask import Flask, request, jsonify
# import sqlite3
# from sqlite3 import Row
# from flask_cors import CORS
# from datetime import datetime

# app = Flask(__name__)
# CORS(app)

# # ------------------- UPLOAD CAMPAIGN -------------------
# @app.route("/api/upload", methods=["POST"])
# def upload_campaign():
#     try:
#         data = request.json
#         channel = data.get("channel")
#         spend = data.get("spend")
#         new_customers = data.get("customers")
#         cltv = data.get("cltv")
#         user_email = data.get("user_email")  # ✅ user email

#         if not channel or spend is None or new_customers is None or not user_email:
#             return jsonify({"error": "Missing required fields"}), 400

#         date_today = datetime.now().date()
#         conn = sqlite3.connect("campaign_data.db")
#         cursor = conn.cursor()

#         cursor.execute(
#             """
#             INSERT INTO campaigns (channel, spend, new_customers, cltv, date, user_email)
#             VALUES (?, ?, ?, ?, ?, ?)
#             """,
#             (channel, spend, new_customers, cltv, date_today, user_email),
#         )
#         conn.commit()
#         conn.close()

#         return jsonify({"message": "Campaign data uploaded successfully!"}), 201

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # ------------------- GET CAMPAIGNS BY USER -------------------
# @app.route("/api/campaigns", methods=["GET"])
# def get_campaigns():
#     user_email = request.args.get("user")
#     if not user_email:
#         return jsonify({"error": "Missing user_email"}), 400

#     conn = sqlite3.connect("campaign_data.db")
#     conn.row_factory = Row
#     cursor = conn.cursor()

#     cursor.execute(
#         """
#         SELECT
#             channel,
#             SUM(spend) AS spend,
#             SUM(new_customers) AS customers,
#             SUM(new_customers * cltv) AS revenue
#         FROM campaigns
#         WHERE user_email = ?
#         GROUP BY channel
#         """,
#         (user_email,)
#     )
#     rows = cursor.fetchall()
#     conn.close()

#     channels = []
#     total_spend = 0.0
#     total_customers = 0
#     total_revenue = 0.0

#     for r in rows:
#         spend = float(r["spend"] or 0.0)
#         customers = int(r["customers"] or 0)
#         revenue = float(r["revenue"] or 0.0)
#         cac = (spend / customers) if customers else None
#         cltv_avg = (revenue / customers) if customers else None
#         roi = ((revenue - spend) / spend) if spend else None

#         channels.append({
#             "channel": r["channel"],
#             "spend": round(spend, 2),
#             "customers": customers,
#             "revenue": round(revenue, 2),
#             "cac": round(cac, 2) if cac else None,
#             "cltv": round(cltv_avg, 2) if cltv_avg else None,
#             "roi": round(roi, 4) if roi else None,
#         })

#         total_spend += spend
#         total_customers += customers
#         total_revenue += revenue

#     totals = {
#         "spend": round(total_spend, 2),
#         "customers": total_customers,
#         "revenue": round(total_revenue, 2),
#         "cac": round(total_spend / total_customers, 2) if total_customers else 0,
#         "cltv": round(total_revenue / total_customers, 2) if total_customers else 0,
#         "roi": round((total_revenue - total_spend) / total_spend, 4) if total_spend else 0,
#     }

#     return jsonify({"channels": channels, "totals": totals})

# # ------------------- GET RAW CAMPAIGNS (with date) -------------------
# @app.route("/api/campaigns/raw", methods=["GET"])
# def get_raw_campaigns_endpoint():
#     user_email = request.args.get("user")
#     if not user_email:
#         return jsonify({"error": "Missing user_email"}), 400

#     conn = sqlite3.connect("campaign_data.db")
#     conn.row_factory = Row
#     cursor = conn.cursor()

#     cursor.execute(
#         """
#         SELECT
#             channel,
#             spend,
#             new_customers AS customers,
#             cltv,
#             (new_customers * cltv) AS revenue,
#             date
#         FROM campaigns
#         WHERE user_email = ?
#         ORDER BY date ASC
#         """,
#         (user_email,)
#     )
#     rows = cursor.fetchall()
#     conn.close()

#     campaigns = []
#     for r in rows:
#         spend = float(r["spend"] or 0.0)
#         customers = int(r["customers"] or 0)
#         revenue = float(r["revenue"] or 0.0)
#         cac = (spend / customers) if customers else None
#         roi = ((revenue - spend) / spend) if spend else None

#         campaigns.append({
#             "channel": r["channel"],
#             "date": r["date"],
#             "spend": round(spend, 2),
#             "customers": customers,
#             "revenue": round(revenue, 2),
#             "cltv": round(r["cltv"], 2) if r["cltv"] else None,
#             "cac": round(cac, 2) if cac else None,
#             "roi": round(roi, 4) if roi else None,
#         })

#     return jsonify({"campaigns": campaigns})


# # ------------------- MAIN -------------------
# if __name__ == "__main__":
#     app.run(debug=True)







from flask import Flask, request, jsonify
import sqlite3
from sqlite3 import Row
from flask_cors import CORS
from datetime import datetime


import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)

# ------------------- UPLOAD CAMPAIGN -------------------
@app.route("/api/upload", methods=["POST"])
def upload_campaign():
    try:
        data = request.json
        channel = data.get("channel")
        spend = data.get("spend")
        new_customers = data.get("customers")
        cltv = data.get("cltv")
        user_email = data.get("user_email")  # ✅ user email

        if not channel or spend is None or new_customers is None or not user_email:
            return jsonify({"error": "Missing required fields"}), 400

        date_today = datetime.now().date()
        conn = sqlite3.connect("campaign_data.db")
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO campaigns (channel, spend, new_customers, cltv, date, user_email)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (channel, spend, new_customers, cltv, date_today, user_email),
        )
        conn.commit()
        conn.close()

        return jsonify({"message": "Campaign data uploaded successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------- GET CAMPAIGNS BY USER -------------------
@app.route("/api/campaigns", methods=["GET"])
def get_campaigns():
    user_email = request.args.get("user")
    if not user_email:
        return jsonify({"error": "Missing user_email"}), 400

    conn = sqlite3.connect("campaign_data.db")
    conn.row_factory = Row
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            channel,
            SUM(spend) AS spend,
            SUM(new_customers) AS customers,
            SUM(new_customers * cltv) AS revenue
        FROM campaigns
        WHERE user_email = ?
        GROUP BY channel
        """,
        (user_email,)
    )
    rows = cursor.fetchall()
    conn.close()

    channels = []
    total_spend = 0.0
    total_customers = 0
    total_revenue = 0.0

    for r in rows:
        spend = float(r["spend"] or 0.0)
        customers = int(r["customers"] or 0)
        revenue = float(r["revenue"] or 0.0)
        cac = (spend / customers) if customers else None
        cltv_avg = (revenue / customers) if customers else None
        roi = ((revenue - spend) / spend) if spend else None

        channels.append({
            "channel": r["channel"],
            "spend": round(spend, 2),
            "customers": customers,
            "revenue": round(revenue, 2),
            "cac": round(cac, 2) if cac else None,
            "cltv": round(cltv_avg, 2) if cltv_avg else None,
            "roi": round(roi, 4) if roi else None,
        })

        total_spend += spend
        total_customers += customers
        total_revenue += revenue

    totals = {
        "spend": round(total_spend, 2),
        "customers": total_customers,
        "revenue": round(total_revenue, 2),
        "cac": round(total_spend / total_customers, 2) if total_customers else 0,
        "cltv": round(total_revenue / total_customers, 2) if total_customers else 0,
        "roi": round((total_revenue - total_spend) / total_spend, 4) if total_spend else 0,
    }

    return jsonify({"channels": channels, "totals": totals})

# ------------------- GET RAW CAMPAIGNS (with date) -------------------
@app.route("/api/campaigns/raw", methods=["GET"])
def get_raw_campaigns_endpoint():
    user_email = request.args.get("user")
    if not user_email:
        return jsonify({"error": "Missing user_email"}), 400

    conn = sqlite3.connect("campaign_data.db")
    conn.row_factory = Row
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            channel,
            spend,
            new_customers AS customers,
            cltv,
            (new_customers * cltv) AS revenue,
            date
        FROM campaigns
        WHERE user_email = ?
        ORDER BY date ASC
        """,
        (user_email,)
    )
    rows = cursor.fetchall()
    conn.close()

    campaigns = []
    for r in rows:
        spend = float(r["spend"] or 0.0)
        customers = int(r["customers"] or 0)
        revenue = float(r["revenue"] or 0.0)
        cac = (spend / customers) if customers else None
        roi = ((revenue - spend) / spend) if spend else None

        campaigns.append({
            "channel": r["channel"],
            "date": r["date"],
            "spend": round(spend, 2),
            "customers": customers,
            "revenue": round(revenue, 2),
            "cltv": round(r["cltv"], 2) if r["cltv"] else None,
            "cac": round(cac, 2) if cac else None,
            "roi": round(roi, 4) if roi else None,
        })

    return jsonify({"campaigns": campaigns})

# from sklearn.model_selection import train_test_split
@app.route("/api/predict/analysis", methods=["GET"])
def predict_analysis():
    try:
        user_email = request.args.get("user_email") or request.args.get("user")
        if not user_email:
            return jsonify({"error": "Missing user parameter (use ?user=<email>)"}), 400

        conn = sqlite3.connect("campaign_data.db")
        sql = """
            SELECT
                spend,
                new_customers AS customers,
                cltv,
                (new_customers * cltv) AS revenue,
                date
            FROM campaigns
            WHERE user_email = ?
            ORDER BY date ASC
        """
        df = pd.read_sql_query(sql, conn, params=(user_email,))
        conn.close()

        if df.empty:
            return jsonify({"error": "No raw campaigns found for this user"}), 404

        # Convert numeric columns
        for col in ["spend", "customers", "revenue", "cltv"]:
            df[col] = pd.to_numeric(df[col], errors="coerce")

        if "date" in df.columns:
            df["date"] = pd.to_datetime(df["date"])
            df = df.sort_values("date")

        df = df.dropna(subset=["spend", "customers", "cltv"])

        # Simple fallback when insufficient data
        if df.shape[0] < 3:
            mean_spend = df["spend"].mean()
            mean_customers = df["customers"].mean()
            mean_revenue = df["revenue"].mean()
            mean_roi = ((mean_revenue - mean_spend) / mean_spend * 100) if mean_spend else 0

            history = []
            for _, r in df.iterrows():
                pred = (r["revenue"] or mean_revenue) * 1.1
                history.append({
                    "date": str(r["date"]),
                    "actual_revenue": float(r["revenue"]),
                    "predicted_revenue": round(pred, 2)
                })

            return jsonify({
                "predicted_revenue": round(mean_revenue, 2),
                "predicted_customers": round(mean_customers, 2),
                "predicted_roi": round(mean_roi, 2),
                "history": history
            })

        # Features: drop channel column
        features = ["spend", "customers", "cltv"]
        X = df[features].fillna(0)
        y_revenue = df["revenue"].fillna(0)

        # Train Revenue model
        rev_model = LinearRegression()
        rev_model.fit(X, y_revenue)
        df["predicted_revenue"] = rev_model.predict(X)

        future_vals = [df[f].mean() for f in features]
        predicted_revenue = max(0, rev_model.predict([future_vals])[0])

        # Train Customer model
        y_customers = df["customers"].fillna(0)
        cust_model = LinearRegression()
        cust_model.fit(X, y_customers)
        predicted_customers = max(0, cust_model.predict([future_vals])[0])

        # Train ROI model
        df["roi"] = ((df["revenue"] - df["spend"]) / df["spend"]) * 100
        y_roi = df["roi"].fillna(0)
        roi_model = LinearRegression()
        roi_model.fit(X, y_roi)
        predicted_roi = roi_model.predict([future_vals])[0]

        # History
        history = []
        for _, r in df.iterrows():
            history.append({
                "date": str(r["date"]),
                "actual_revenue": float(r["revenue"]),
                "predicted_revenue": float(r["predicted_revenue"])
            })

        return jsonify({
            "predicted_revenue": round(predicted_revenue, 2),
            "predicted_customers": round(predicted_customers),
            "predicted_roi": round(predicted_roi, 2),
            "history": history
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# ------------------- MAIN -------------------
if __name__ == "__main__":
    app.run(debug=True)


