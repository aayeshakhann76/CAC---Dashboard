import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FutureRevenueChart({ data }) {
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.history}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="actual_revenue" stroke="#8884d8" name="Actual Revenue" />
          <Line type="monotone" dataKey="predicted_revenue" stroke="#82ca9d" name="Predicted Revenue" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// export default function FutureRevenueChart({ data }) {
//   // Data cleaning & aggregation
//   const cleanedData = data.history.reduce((acc, item) => {
//     const existing = acc.find(d => d.date === item.date);
//     if (existing) {
//       existing.actual_revenue += item.actual_revenue;
//       existing.predicted_revenue += item.predicted_revenue;
//     } else {
//       acc.push({ ...item });
//     }
//     return acc;
//   }, []);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={cleanedData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip 
//           formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
//         />
//         {/* Actual Revenue: Solid Line */}
//         <Line type="monotone" dataKey="actual_revenue" stroke="#8884d8" strokeWidth={2} dot />
//         {/* Predicted Revenue: Dotted Line */}
//         <Line type="monotone" dataKey="predicted_revenue" stroke="#82ca9d" strokeDasharray="5 5" strokeWidth={2} dot />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }



// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// export default function FutureRevenueBarChart({ data }) {
//   const cleanedData = data.history.reduce((acc, item) => {
//     const existing = acc.find(d => d.date === item.date);
//     if (existing) {
//       existing.actual_revenue += item.actual_revenue;
//       existing.predicted_revenue += item.predicted_revenue;
//     } else {
//       acc.push({ ...item });
//     }
//     return acc;
//   }, []);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={cleanedData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip 
//           formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
//         />
//         {/* Actual Revenue: Blue Bar */}
//         <Bar dataKey="actual_revenue" fill="#8884d8" barSize={30} />
//         {/* Predicted Revenue: Green Bar */}
//         <Bar dataKey="predicted_revenue" fill="#82ca9d" barSize={30} />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }
