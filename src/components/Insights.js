// import React from "react";
// import { ArrowUpRight, TrendingDown, Target } from "lucide-react";

// import "./Insights.css"; // styling alag rakheng

// export default function Insights() {
//   return (
//     <div className="p-6 space-y-6 bg-yellow-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Key Insights & Highlights</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Efficiency Card */}
//         <div className="bg-white rounded-2xl shadow p-4 border border-yellow-100">
//           <div className="flex items-center space-x-2 mb-2 text-green-600 font-semibold">
//             <ArrowUpRight size={18} />
//             <span>Efficiency Gained</span>
//           </div>
//           <div className="h-12 flex items-center justify-center text-gray-400">
//             Placeholder
//           </div>
//         </div>

//         {/* Conversion Dip Card */}
//         <div className="bg-white rounded-2xl shadow p-4 border border-yellow-100">
//           <div className="flex items-center space-x-2 mb-2 text-red-500 font-semibold">
//             <TrendingDown size={18} />
//             <span>Conversion Dip</span>
//           </div>
//           <div className="h-12 flex items-center justify-center text-gray-400">
//             Placeholder
//           </div>
//         </div>

//         {/* Channel Mix Card */}
//         <div className="bg-white rounded-2xl shadow p-4 border border-yellow-100">
//           <div className="flex items-center space-x-2 mb-2 text-blue-600 font-semibold">
//             <Target size={18} />
//             <span>Channel Mix</span>
//           </div>
//           <div className="h-12 flex items-center justify-center text-gray-400">
//             Placeholder
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { FiTrendingUp, FiTrendingDown, FiTarget } from "react-icons/fi";
// import WhatIfAnalysis from "./WhatIfAnalysis";
// const cardStyle = {
//   flex: 1,
//   minWidth: "250px",
//   background: "#ffffff",
//   borderRadius: "12px",
//   padding: "16px",
//   boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
// };

// const headerStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "8px",
//   marginBottom: "8px",
// };

// const Insights = () => {
//   return (
//     <div style={{ padding: "20px", background: "#fff89a", borderRadius: "12px", marginTop: "20px" }}>
//       <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>
//         Key Insights & Highlights
//       </h2>

//       <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
//         {/* Card 1 */}
//         <div style={{ ...cardStyle, borderLeft: "6px solid #2ecc71" }}>
//           <div style={headerStyle}>
//             <FiTrendingUp size={18} />
//             <h3 style={{ margin: 0 }}>Efficiency Gained</h3>
//           </div>
//           <p>Placeholder</p>
//         </div>

//         {/* Card 2 */}
//         <div style={{ ...cardStyle, borderLeft: "6px solid #e74c3c" }}>
//           <div style={headerStyle}>
//             <FiTrendingDown size={18} />
//             <h3 style={{ margin: 0 }}>Conversion Dip</h3>
//           </div>
//           <p>Placeholder</p>
//         </div>

//         {/* Card 3 */}
//         <div style={{ ...cardStyle, borderLeft: "6px solid #3498db" }}>
//           <div style={headerStyle}>
//             <FiTarget size={18} />
//             <h3 style={{ margin: 0 }}>Channel Mix</h3>
//           </div>
//           <p>Placeholder</p>
//         </div>
//       </div>

//      {/*What-If Analysis Placeholder Add Karo */}
//       <WhatIfAnalysis /> 
//     </div>
//   );
// };

// export default Insights;


import React, { useEffect, useState } from "react";
import { FiTrendingUp, FiTrendingDown, FiTarget } from "react-icons/fi";
import WhatIfAnalysis from "./WhatIfAnalysis";

const cardStyle = {
  flex: 1,
  minWidth: "250px",
  background: "#ffffff",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
};

const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user?.email) return;

    fetch(`http://localhost:5000/api/campaigns/raw?user=${encodeURIComponent(user.email)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Insights Data:", data);

        if (!data.campaigns || data.campaigns.length === 0) {
          setInsights({
            efficiency: "No data yet",
            dip: "No data yet",
            channel: "No data yet",
          });
          setLoading(false);
          return;
        }

        const campaigns = data.campaigns;

        // 🔹 Efficiency: best ROI
        const bestROI = campaigns.reduce((prev, curr) =>
          (curr.roi || 0) > (prev.roi || 0) ? curr : prev
        );

        // 🔹 Conversion dip: worst ROI
        const worstROI = campaigns.reduce((prev, curr) =>
          (curr.roi || 0) < (prev.roi || 0) ? curr : prev
        );

        // 🔹 Channel mix: lowest CAC
        const bestCAC = campaigns.reduce((prev, curr) =>
          (curr.cac || Infinity) < (prev.cac || Infinity) ? curr : prev
        );

        setInsights({
          efficiency: `${bestROI.channel} ROI is ${(bestROI.roi * 100).toFixed(1)}%`,
          dip: `${worstROI.channel} ROI dropped to ${(worstROI.roi * 100).toFixed(1)}%`,
          channel: `${bestCAC.channel} has lowest CAC of ₹${bestCAC.cac}`,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching insights:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading insights...</p>;

  return (
    <div
      style={{
        padding: "20px",
        background: "#fff89a",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>
        Key Insights & Highlights
      </h2>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {/* Card 1 */}
        <div style={{ ...cardStyle, borderLeft: "6px solid #2ecc71" }}>
          <div style={headerStyle}>
            <FiTrendingUp size={18} />
            <h3 style={{ margin: 0 }}>Efficiency Gained</h3>
          </div>
          <p>{insights.efficiency}</p>
        </div>

        {/* Card 2 */}
        <div style={{ ...cardStyle, borderLeft: "6px solid #e74c3c" }}>
          <div style={headerStyle}>
            <FiTrendingDown size={18} />
            <h3 style={{ margin: 0 }}>Conversion Dip</h3>
          </div>
          <p>{insights.dip}</p>
        </div>

        {/* Card 3 */}
        <div style={{ ...cardStyle, borderLeft: "6px solid #3498db" }}>
          <div style={headerStyle}>
            <FiTarget size={18} />
            <h3 style={{ margin: 0 }}>Channel Mix</h3>
          </div>
          <p>{insights.channel}</p>
        </div>
      </div>

      {/* What-If Analysis Placeholder */}
      <WhatIfAnalysis />
      
    </div>
  );
};

export default Insights;
