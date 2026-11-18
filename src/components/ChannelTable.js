import React from "react";
import "./ChannelTable.css";

export default function ChannelTable({ data = {} }) {
  const rows = (data.channels || []).map((d) => {
    const ratio = d.cac / d.cltv;
    let status = "";
    if (ratio <= 0.3) status = "Excellent";
    else if (ratio <= 0.6) status = "Good";
    else status = "Bad";

    const roi = (d.revenue - d.spend) / d.spend;

    return {
      ...d,
      ratio: ratio.toFixed(2),
      status,
      roi: roi.toFixed(2),
    };
  });

  return (
    <table className="channel-table">
      <thead>
        <tr>
          <th>Channel</th>
          <th>CAC</th>
          <th>CLTV</th>
          <th>Customers</th>
          <th>Revenue</th>
          <th>Spend</th>
          <th>ROI</th>
          <th>CAC/CLTV Ratio</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td>{r.channel}</td>
            <td>₹{r.cac}</td>
            <td>₹{r.cltv}</td>
            <td>{r.customers}</td>
            <td>₹{r.revenue}</td>
            <td>₹{r.spend}</td>
            <td>{r.roi}</td>
            <td className={r.ratio <= 0.6 ? "ratio-positive" : "ratio-negative"}>
              {r.ratio}
            </td>
            <td>
              <span className={`status-badge status-${r.status}`}>
                {r.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
