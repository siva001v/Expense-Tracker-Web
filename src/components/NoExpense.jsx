import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function NoExpense() {
  const navigate = useNavigate();

  return (
    <div className="noexpense">
      <h2 className="noexpense__title">No expenses yet</h2>
      <p className="noexpense__description">
        Start tracking your expenses to see insights here.
      </p>
      <button
        className="noexpense__btn"
        type="button"
        onClick={() => navigate("/expenses/new")}
      >
        <IoAddCircleOutline className="noexpense__btn-icon" />
        <span>Add your first expense</span>
      </button>
    </div>
  );
}

export default NoExpense;
