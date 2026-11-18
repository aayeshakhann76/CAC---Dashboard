import React, { useEffect, useState } from "react";
import "./PredictiveAnalysis.css";

// import CustomerAcquisitionChart from "./CustomerAcquisitionChart";

export default function PredictiveAnalysis({ userEmail }) {
  // Parse localStorage currentUser and extract email
  const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const USER = (userEmail || storedUser.email || "").trim().toLowerCase();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!USER) {
      setError("No user email provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(
      `http://127.0.0.1:5000/api/predict/analysis?user_email=${encodeURIComponent(
        USER
      )}`
    )
      .then((res) => res.json())
      .then((j) => {
        if (j.error) setError(j.error);
        else setData(j);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [USER]);

  return (
    <div className="predictive-page">
      <div className="predictive-container">
        <div className="predictive-card">
          <h3>Future Revenue Prediction</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div>
            {/* <p>₹ {Number(data.predicted_revenue).toLocaleString()}</p> */}
             {/* <FutureRevenueChart data={data} /> */}
            <p className="text-lg">
                      Based on current trends, the next week is predicted to see a revenue of{' '}
                <span className="font-bold">₹ {Number(data.predicted_revenue).toLocaleString()}</span>.
            </p>
            </div>  
          )}
        </div>

        <div className="predictive-card">
          <h3>Customer Acquisition Prediction</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div>
            {/* <p>{Math.round(data.predicted_customers)} customers</p> */}
            <p className="text-lg">
                      The expected number of new customers for next week is{' '}
                <span className="font-bold">{Math.round(data.predicted_customers)}</span>.
            </p>
            {/* <CustomerAcquisitionChart data={data.history} /> */}
            </div>
          )}
        </div>

        <div className="predictive-card">
          <h3>ROI Forecasting</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div>
            {/* <p>{Number(data.predicted_roi).toFixed(2)}%</p> */}
            <p className="text-lg">
                     The forecasted ROI for next week is{' '}
            <span className="font-bold">{Number(data.predicted_roi).toFixed(2)}%</span>.
            </p>
          </div>
          )}
        </div>
      </div>

      {/* Small history table */}
      {/* {data && data.history && data.history.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h4>History (Actual vs Predicted)</h4>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Date</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Channel</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>
                  Actual Revenue
                </th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>
                  Predicted Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {data.history.map((h, idx) => (
                <tr key={idx}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{h.date}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{h.channel || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    ₹ {Number(h.actual_revenue).toLocaleString()}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    ₹ {Number(h.predicted_revenue).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  );
}
