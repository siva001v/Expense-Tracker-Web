import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { IoAddCircleOutline } from "react-icons/io5";
import { NoData } from "../../components/NoData/NoData";
import {
  useDeleteExpense,
  useExpenses,
  useSummary,
  useTrends,
} from "../../hooks/useDashboardData";
import Error from "../../components/Error/Error";
import Filter from "../../components/Filter/Filter";
import ExpenseTable from "../../components/ExpenseTable/ExpenseTable";
import DashboardHeader from "../../components/Header/Header";
import SummaryPieChart from "../../components/SummaryPieChart/SummaryPieChart";
import TrendsLineChart from "../../components/TrendsLineChart/TrendsLineChart";
import Analytics from "../../components/Analytics/Analytics";
import "./Dashboard.scss";
import Button from "../../components/Button/Button";

function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);

  const deleteModalTitle = "Delete Expense";
  const deleteModalContent = "Are you sure you want to delete this expense?";

  const [filterValues, setFilterValues] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);

  const {
    isPending: isExpensePending,
    isError: isExpenseError,
    error: expenseError,
    data: expenseData,
  } = useExpenses(appliedFilters);

  const {
    isPending: isTrendsPending,
    isError: isTrendsError,
    error: trendsError,
    data: trends,
  } = useTrends();

  const {
    isPending: isSummaryPending,
    isError: isSummaryError,
    error: summaryError,
    data: summary,
  } = useSummary();

  const mutation = useDeleteExpense();

  const handleDeleteModalClose = () => {
    setSelectedDeleteItem(null);
  };

  const handleExpenseEdit = (expense) => {
    navigate(`/expenses/${expense.id}/edit`);
  };

  const openDeleteModal = (expense) => {
    setSelectedDeleteItem(expense);
  };

  const handleExpenseDelete = async () => {
    const expense = { ...selectedDeleteItem };
    setSelectedDeleteItem(null);
    setLoading(true);
    try {
      await mutation.mutateAsync(expense.id);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleFilterInputChange = (event) => {
    const { name, value } = event.target;
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterApply = () => {
    setAppliedFilters(filterValues);
    setFilterOpen(false);
  };

  const handleFilterClear = () => {
    setAppliedFilters({});
    setFilterValues((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {})
    );
    setFilterOpen((prev) => !prev);
  };

  const handleFilterToggle = () => {
    setFilterOpen((prev) => !prev);
    setFilterValues((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = appliedFilters[key] ?? "";
        return acc;
      }, {})
    );
  };

  if (isExpensePending || isSummaryPending || isTrendsPending || loading)
    return <Loader />;

  if (isExpenseError || isSummaryError || isTrendsError) {
    const errors = [];

    if (isExpenseError) {
      errors.push(
        `Expense Error: ${expenseError.name} - ${expenseError.message}`
      );
    }
    if (isSummaryError) {
      errors.push(
        `Summary Error: ${summaryError.name} - ${summaryError.message}`
      );
    }
    if (isTrendsError) {
      errors.push(`Trends Error: ${trendsError.name} - ${trendsError.message}`);
    }

    return <Error errorMessage={errors.join("\n")} />;
  }

  return (
    <div className="dashboard">
      {selectedDeleteItem && (
        <Modal
          title={deleteModalTitle}
          content={deleteModalContent}
          onClose={handleDeleteModalClose}
          onSuccess={handleExpenseDelete}
        />
      )}
      <DashboardHeader />
      <div className="dashboard__container">
        <h3 className="dashboard__container-header">DASHBOARD</h3>
        <div className="dashboard__main">
          <div className="dashboard__statistics">
            <Analytics data={expenseData} />
            <SummaryPieChart summary={summary ?? []} />
            <TrendsLineChart trends={trends ?? []} />
          </div>
          <div className="dashboard__content">
            <div className="dashboard__content-header">
              <h3>RECENT EXPENSES</h3>
              <div className="dashboard__content-header-action">
                <Filter
                  filters={filterValues}
                  isOpen={filterOpen}
                  onApply={handleFilterApply}
                  onClear={handleFilterClear}
                  onToggle={handleFilterToggle}
                  onInputChange={handleFilterInputChange}
                />
                <Button
                  type="button"
                  handleClick={() => navigate("/expenses/new")}
                >
                  <IoAddCircleOutline className="dashboard__button-add-icon" />
                  <span>ADD EXPENSE</span>
                </Button>
              </div>
            </div>
            <ExpenseTable
              data={expenseData.expenses ?? []}
              onEdit={handleExpenseEdit}
              onDelete={openDeleteModal}
            />
            {(!expenseData ||
              !expenseData.expenses ||
              expenseData.expenses.length == 0) && <NoData />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
