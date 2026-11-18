// import React from "react";
// import "./WhatIfAnalysis.css";

// const WhatIfAnalysis = () => {
//   return (
//     <div className="whatif-section">
//       <h2>What-If Analysis</h2>
//       <div className="whatif-card">
//         <h3>📊 What-If Analysis</h3>

//         {/* Sliders Placeholder */}
//         <div className="sliders">
//           <div className="slider-group">
//             <label>Monthly Ad Spend: $50,000</label>
//             <input type="range" min="10000" max="200000" defaultValue="50000" />
//           </div>

//           <div className="slider-group">
//             <label>Conversion Rate: 2.5%</label>
//             <input type="range" min="0.5" max="10" step="0.1" defaultValue="2.5" />
//           </div>

//           <div className="slider-group">
//             <label>Average Order Value: $120</label>
//             <input type="range" min="50" max="500" defaultValue="120" />
//           </div>
//         </div>

//         {/* Metrics Placeholder */}
//         <div className="metrics-grid">
//           <div className="metric-card blue">
//             <h4>$4</h4>
//             <p>Projected CAC</p>
//           </div>
//           <div className="metric-card green">
//             <h4>12,500</h4>
//             <p>New Customers</p>
//           </div>
//           <div className="metric-card purple">
//             <h4>90:1</h4>
//             <p>LTV:CAC Ratio</p>
//           </div>
//           <div className="metric-card orange">
//             <h4>2900%</h4>
//             <p>ROI</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhatIfAnalysis;


// WhatIfAnalysis.js
import React, { useState } from "react";
import "./WhatIfAnalysis.css";

const rupee = (v) =>
  typeof v === "number" ? `₹${v.toLocaleString("en-IN", { maximumFractionDigits: 2 })}` : v;

export default function WhatIfAnalysis() {
  const [spend, setSpend] = useState(22000);       // ₹
  const [conversion, setConversion] = useState(8.6); // %
  const [cltv, setCltv] = useState(500);           // ₹
  const [cpc, setCpc] = useState(10);              // ₹ per click (new)

  // ---- Realistic calculations ----
  const clicks = cpc > 0 ? spend / cpc : 0;
  const newCustomersRaw = clicks * (conversion / 100);
  const newCustomers = Math.max(0, Math.round(newCustomersRaw));

  const projectedCAC = newCustomers > 0 ? spend / newCustomers : spend;
  const revenue = newCustomers * cltv;
  const roi = spend > 0 ? ((revenue - spend) / spend) * 100 : 0;
  const ltvToCac = projectedCAC > 0 ? (cltv / projectedCAC).toFixed(2) : "—";

  return (
    <div className="whatif-section">
      <h2>What-If Analysis</h2>
      <div className="whatif-card">
        <div className="sliders" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
          <div className="slider-group">
            <label>Monthly Ad Spend: {rupee(spend)}</label>
            <input type="range" min="0" max="100000" step="1000" value={spend}
              onChange={(e) => setSpend(Number(e.target.value))} />
          </div>

          <div className="slider-group">
            <label>Conversion Rate: {conversion}%</label>
            <input type="range" min="0.1" max="50" step="0.1" value={conversion}
              onChange={(e) => setConversion(Number(e.target.value))} />
            <small style={{ color: "#555" }}>Conversion = % of clicks that convert to customers</small>
          </div>

          <div className="slider-group">
            <label>Customer Lifetime Value (CLTV): {rupee(cltv)}</label>
            <input type="range" min="100" max="20000" step="50" value={cltv}
              onChange={(e) => setCltv(Number(e.target.value))} />
          </div>

          <div className="slider-group">
            <label>Avg Cost-per-Click (CPC): {rupee(cpc)}</label>
            <input type="range" min="1" max="500" step="1" value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))} />
            <small style={{ color: "#555" }}>Estimate clicks = spend / CPC</small>
          </div>
        </div>

        {/* Metrics */}
        <div className="metrics-grid" style={{ marginTop: 18 }}>
          <div className="metric-card blue">
            <h4>{rupee(Number(projectedCAC.toFixed(2)))}</h4>
            <p>Projected CAC</p>
          </div>

          <div className="metric-card green">
            <h4>{newCustomers}</h4>
            <p>New Customers</p>
          </div>

          <div className="metric-card purple">
            <h4>{ltvToCac}:1</h4>
            <p>LTV : CAC Ratio</p>
          </div>

          <div className="metric-card orange">
            <h4>{roi.toFixed(2)}%</h4>
            <p>ROI</p>
          </div>
        </div>

        <div style={{ marginTop: 10, fontSize: 13, color: "#333" }}>
          <b>Note:</b> This assumes: <i>clicks = spend / CPC</i> and conversion% = <i>% of clicks → customers</i>.
          Use the CPC slider to reflect channel-specific costs (Facebook, Google, etc.) — lower CPC increases clicks → conversions → revenue.
        </div>
      </div>
    </div>
  );
}
