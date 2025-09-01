import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import ExpensePagination from "./ExpensePagination";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ExpenseTable({ data, onEdit, onDelete }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => (
        <span
          className={`expense__badge expense__badge-${info
            .getValue()
            .toLowerCase()}`}
        >
          {info.getValue()}
        </span>
      ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="dashboard__content-table-button">
          <FaEdit
            className="dashboard__content-table-button-edit"
            onClick={() => onEdit(row.original)}
          />
          <MdDelete
            className="dashboard__content-table-button-delete"
            onClick={() => onDelete(row.original)}
          />
        </div>
      ),
      footer: (info) => info.column.id,
    },
  ];

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="dashboard__content-table">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    data-label={flexRender(
                      cell.column.columnDef.header,
                      cell.getContext()
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {data.length > 0 && (
        <ExpensePagination
          currentPage={table.getState().pagination.pageIndex}
          totalPage={table.getPageCount()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          goToPreviousPage={table.previousPage}
          goToNextPage={table.nextPage}
        />
      )} */}
    </>
  );
}

export default ExpenseTable;
