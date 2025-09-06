import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./NoExpense.scss";
import Button from "../Button/Button";

function NoExpense() {
  const navigate = useNavigate();

  return (
    <div className="noexpense">
      <h2 className="noexpense__title">No expenses yet</h2>
      <p className="noexpense__description">
        Start tracking your expenses to see insights here.
      </p>
      <Button type="button" handleClick={() => navigate("/expenses/new")}>
        <IoAddCircleOutline className="noexpense__btn-icon" />
        <span>Add your first expense</span>
      </Button>
    </div>
  );
}

export default NoExpense;
