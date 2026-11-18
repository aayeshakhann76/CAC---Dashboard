import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

const CustomerAcquisitionChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis
          dataKey="date"
          tickFormatter={(str) => str.slice(5, 10)} // Format: MM-DD
        />
        <YAxis />
        <Tooltip
          formatter={(value) => [value, "Customers"]}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Area
          type="monotone"
          dataKey="actual_customers"
          stroke="#00A86B"
          fill="#00A86B88"
          name="Actual Customers"
        />
        <Area
          type="monotone"
          dataKey="predicted_customers"
          stroke="#7B68EE"
          fill="#7B68EE88"
          strokeDasharray="5 5"
          name="Predicted Customers"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomerAcquisitionChart;
