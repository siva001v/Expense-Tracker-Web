import { FaFilter } from "react-icons/fa";
import "./Filter.scss";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

function Filter({
  filters,
  isOpen,
  onToggle,
  onInputChange,
  onApply,
  onClear,
}) {
  const CATEGORIES = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Other",
  ];

  return (
    <div className="filter__wrapper">
      <Button
        type="button"
        mode="filter"
        isOpen={isOpen}
        handleClick={onToggle}
      >
        <FaFilter />
        <span>Filter</span>
      </Button>
      <div className={`filter__container ${isOpen ? "open" : ""}`}>
        <p>FILTER BY</p>
        <InputField
          name="category"
          id="category"
          align="row"
          type="select"
          selectLabel="Category"
          placeholder="Please select a Category..."
          value={filters.category}
          selectOptions={CATEGORIES}
          onChange={onInputChange}
        />
        <InputField
          name="startDate"
          id="startDate"
          align="row"
          type="date"
          placeholder="Start Date"
          value={filters.startDate}
          onChange={onInputChange}
        />
        <InputField
          name="endDate"
          id="endDate"
          align="row"
          type="date"
          placeholder="End Date"
          value={filters.endDate}
          onChange={onInputChange}
        />
        <div className="filter__footer">
          <Button type="button" mode="cancel" handleClick={onClear}>
            CLEAR
          </Button>
          <Button type="button" handleClick={onApply}>
            APPLY
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
