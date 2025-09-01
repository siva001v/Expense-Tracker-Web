import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ExpensePagination({
  currentPage,
  totalPage,
  canPreviousPage,
  canNextPage,
  goToPreviousPage,
  goToNextPage,
}) {
  return (
    <div className="dashboard__content-table-pagination">
      <button onClick={() => goToPreviousPage()} disabled={!canPreviousPage}>
        <FaChevronLeft />
      </button>
      <span>
        Page {currentPage + 1} of {totalPage}
      </span>
      <button onClick={() => goToNextPage()} disabled={!canNextPage}>
        <FaChevronRight />
      </button>
    </div>
  );
}

export default ExpensePagination;
