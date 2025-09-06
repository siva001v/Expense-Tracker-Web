import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import "./TrendsLineChart.scss";

function TrendsLineChart({ trends }) {
  if (!trends) return null;

  return (
    <div className="trends">
      <p>TRENDS</p>
      <div className="trends__line-chart">
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
      </div>
    </div>
  );
}

export default TrendsLineChart;
