import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import NoExpense from "../NoExpense/NoExpense";
import "./SummaryPieChart.scss";

function SummaryPieChart({ summary }) {
  const COLORS = [
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#ff973a",
    "#e84393",
    "#16a085",
    "#7f8c8d",
  ];

  if (!summary || summary.length === 0) return <NoExpense />;

  return (
    <div className="summary">
      <p>SUMMARY</p>
      <div className="summary__pie-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={summary} dataKey="value" outerRadius={100}>
              {summary.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SummaryPieChart;
