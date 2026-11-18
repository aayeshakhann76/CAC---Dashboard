// src/components/LineChart.js
import React from "react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LineChart = ({ data }) => {
  if (!data || !data.channels) return <p>No data available</p>;

  const chartData = data.channels.map(row => ({
    channel: row.channel,
    Revenue: row.revenue,
    Spend: row.spend
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="channel" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Revenue" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Spend" stroke="#8884d8" />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;



