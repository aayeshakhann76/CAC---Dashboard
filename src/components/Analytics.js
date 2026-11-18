import React from "react";
import "./Analytics.css";
import ScatterChartCACvsCLTV from "./Scatter";
import ChannelTable from "./ChannelTable";
import RoiBarChart from "./RoiBarChart";

export default function Analytics({ data = [] }) {
  return (
    <div className="analytics-page">
      {/* <h2>Analytics</h2> */}
      <div className="analytics-container">
        {/* 🔹 Table Placeholder - Full Width */}
        <div className="analytics-card full-width">
          <h3>Analytics Table</h3>
          <ChannelTable data={data} />
        </div>

        {/* 🔹 CAC vs CLTV Chart */}
        <div className="analytics-card">
          <p>If CAC is greater than CLTV, that channel is at loss</p>
          <ScatterChartCACvsCLTV data={data} />
        </div>

        {/* 🔹 Which Channel is Best Chart */}
        <div className="analytics-card">
          <h3>Which Channel is Best (ROI per channel)</h3>
          <RoiBarChart data={data} />
        </div>
      </div>
    </div>
  );
}


