import React from "react";
import "./KpiCards.css";

const KpiCards = ({ data }) => {
  if (!data || !data.totals) {
    return <p className="p-4">Loading KPIs...</p>;
  }

  console.log("KPI Data received:", data);

  const { cac, customers, spend, roi, cltv, revenue } = data.totals;

  const kpis = [
    { title: "Customer Acquisition Cost", value: cac != null ? `₹${cac.toFixed(2)}` : "—" },
    { title: "Total Customers", value: customers != null ? customers : "—" },
    { title: "Marketing Spend", value: spend != null ? `₹${spend.toFixed(2)}` : "—" },
    { title: "Revenue", value: revenue != null ? `₹${revenue.toFixed(2)}` : "—" },
    { title: "CLTV", value: cltv != null ? `₹${cltv.toFixed(2)}` : "—" },
    { title: "ROI", value: roi != null ? `${roi.toFixed(2)}x` : "—" },
  ];

  return (
    <div className="kpi-grid">
      {kpis.map((kpi, index) => (
        <div key={index} className="kpi-card">
          <h3>{kpi.title}</h3>
          <p className="kpi-value">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
