function AnalyticsStats({ data }) {
  return (
    <div className="dashboard__statistics-general">
      <div className="dashboard__statistics-general-item">
        <p>Expense Count</p>
        <span>{data ? data.count : 0}</span>
      </div>
      <div className="dashboard__statistics-general-item">
        <p>Total Expense</p>
        <span>{data ? `$${data.total}` : "$0"}</span>
      </div>
    </div>
  );
}

export default AnalyticsStats;
