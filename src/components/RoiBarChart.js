import React, { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function RoiBarChart({ data = {} }) {
  const chartData = useMemo(() => {
    return (data.channels || []).map(d => ({
      channel: d.channel,
      roi: Number(d.roi),
    }));
  }, [data]);

  return (
    <div className="chart-card">
      <h3>ROI per Channel</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="channel" />
          <YAxis />
          {/* <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} /> */}
          <Tooltip formatter={(value) => `${value.toFixed(2)}x`} />

          <Bar dataKey="roi" fill="#9CCC65" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
