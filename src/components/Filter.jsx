import { FaFilter } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

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
      <button
        className={`filter__button  ${isOpen ? "open" : ""}`}
        type="button"
        onClick={onToggle}
      >
        <FaFilter />
        <span>Filter</span>
      </button>
      <div className={`filter__container ${isOpen ? "open" : ""}`}>
        <p>FILTER BY</p>
        <div className="filter__item">
          <span>Category</span>
          <select
            className="filter__item-select"
            name="category"
            value={filters.category}
            onChange={onInputChange}
          >
            <option key="filter-default-category" value="" disabled>
              Please select a Category...
            </option>
            {CATEGORIES.map((category) => (
              <option value={category} key={`filter-${category}`}>
                {category}
              </option>
            ))}
          </select>
          <RiArrowDropDownLine className="filter__item-select-drop-icon" />
        </div>
        <div className="filter__item">
          <span>Start Date</span>
          <input
            className="filter__item-input"
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={onInputChange}
          />
        </div>
        <div className="filter__item">
          <span>End Date</span>
          <input
            className="filter__item-input"
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={onInputChange}
          />
        </div>
        <div className="filter__footer">
          <button
            className="filter__footer-btn clear"
            type="button"
            onClick={onClear}
          >
            Clear
          </button>
          <button
            className="filter__footer-btn apply"
            type="button"
            onClick={onApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
