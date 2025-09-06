import "./Analytics.scss";

function Analytics({ data }) {
  return (
    <div className="statistics__general">
      <div className="statistics__general-item">
        <p>Expense Count</p>
        <span>{data ? data.count : 0}</span>
      </div>
      <div className="statistics__general-item">
        <p>Total Expense</p>
        <span>{data ? `$${data.total}` : "$0"}</span>
      </div>
    </div>
  );
}

export default Analytics;
