import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

export default function ScatterChartCACvsCLTV({ data = {} }) {
  const points = useMemo(() => {
    const arr = Array.isArray(data?.channels) ? data.channels : [];
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"];

    return arr.map((d, i) => ({
      channel: d.channel || "Unknown",
      CAC: Number(d.cac) || 0,
      CLTV: Number(d.cltv) || 0,
      fill: colors[i % colors.length],
    }));
  }, [data]);

  const max = points.length ? Math.max(...points.flatMap(p => [p.CAC, p.CLTV])) : 1;

  return (
    <div className="chart-card">
      <h3>CAC vs CLTV</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 16, right: 24, bottom: 60, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="CAC" name="CAC" />
          <YAxis type="number" dataKey="CLTV" name="CLTV" />
          
          {/* ✅ Tooltip per point */}
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div style={{ background: "#fff", padding: 5, border: "1px solid #ccc" }}>
                    <p><strong>{d.channel}</strong></p>
                    <p>CAC: ₹{d.CAC}</p>
                    <p>CLTV: ₹{d.CLTV}</p>
                  </div>
                );
              }
              return null;
            }}
          />

          <ReferenceLine
            segment={[{ x: 0, y: 0 }, { x: max, y: max }]}
            stroke="red"
            strokeDasharray="3 3"
          />

          {/* ✅ Single Scatter with all points */}
          <Scatter
            name="Channels"
            data={points}
            label={{ position: "top", formatter: (point) => point.channel }}
          >
            {points.map((p, i) => (
              <circle key={i} r={6} fill={p.fill} />
            ))}
          </Scatter>

          {/* ✅ Custom Legend */}
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            payload={points.map((p) => ({
              id: p.channel,
              value: p.channel,
              type: "circle",
              color: p.fill
            }))}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
