import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function TrendsLineChart({ trends }) {
  if (!trends) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={trends}
        margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
      >
        <CartesianGrid />
        <Line dataKey="total" />
        <XAxis dataKey="date" interval={0} />
        <YAxis />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default TrendsLineChart;
