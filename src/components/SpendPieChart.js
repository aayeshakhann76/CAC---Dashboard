// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// export default function SpendPieChart({ data }) {
//   if (!data || !data.channels) return <p>No data available</p>;

//   // Spend data
//   const spendData = data.channels.map((ch) => ({
//     name: ch.channel,
//     value: ch.spend,
//   }));

//   // Yellow theme colors (light → dark)
//   const COLORS = ["#FFD966", "#F4B400", "#FF9900", "#FF6F00", "#C77700"];

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <PieChart>
//         <Pie
//           data={spendData}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           outerRadius={120}
//           fill="#8884d8"
//           dataKey="value"
//           label={({ name, percent }) =>
//             `${name}: ${(percent * 100).toFixed(0)}%`
//           }
//         >
//           {spendData.map((entry, index) => (
//             <Cell
//               key={`cell-${index}`}
//               fill={COLORS[index % COLORS.length]}
//             />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend verticalAlign="bottom" height={36} />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }


import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SpendPieChart({ data }) {
  if (!data || !data.channels) return <p>No data available</p>;

  // Spend data
  const spendData = data.channels.map((ch) => ({
    name: ch.channel,
    value: ch.spend,
  }));

  // Yellow theme colors (light → dark)
  // const COLORS = [
  //   "#FFD966",
  //   "#F4B400",
  //   "#FF9900",
  //   "#FF6F00",
  //   "#C77700",
  //   "#FFA500",
  //   "#FFB84D",
  //   "#FF9933",
  //   "#FF8000",
  //   "#CC6600",
  // ];

// const COLORS = ["#64B5F6", "#42A5F5", "#26A69A", "#66BB6A", "#9CCC65"];
const COLORS = [
  "#f8b26a", // Facebook - Orange
  "#f46a5f", // Instagram - Reddish
  "#6baed6", // LinkedIn - Light Blue
  "#b3a2d3", // Pinterest - Lavender
  "#9acd32", // Quora Ads - Green
  "#f9c74f", // Snapchat Ads - Yellow-Orange
  "#ff6f00", // Temu - Dark Orange
  "#b497bd", // Twitter(X) - Purple
  "#fff176", // YouTube - Light Yellow
];



  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={spendData}
          cx="50%"
          cy="50%"
          innerRadius={60}   // donut chart
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          labelLine={true}   // connector lines ON
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(1)}%`
          }
        >
          {spendData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
