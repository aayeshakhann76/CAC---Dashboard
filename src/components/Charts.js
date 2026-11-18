import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

const CACBarChart = ({ data }) => {
  if (!data || !data.channels) return <p>No data available</p>;

  const chartData = data.channels.map((c) => ({
    channel: c.channel,
    cac: c.customers > 0 ? Number((c.spend / c.customers).toFixed(2)) : 0,
  }));

  //  const COLORS = ["#FACC15", "#F97316", "#22C55E", "#3B82F6", "#6B7280"];
// const COLORS = ["#64B5F6", "#42A5F5", "#26A69A", "#66BB6A", "#9CCC65"];
const COLORS = [
  // "#F59E0B", // Amber
  "#eb8237ff", // Orange
  // "#FACC15", // Yellow
];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} barSize={40}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /> {/* ✅ Gridlines */}
        <XAxis dataKey="channel" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cac" radius={[10, 10, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CACBarChart;
