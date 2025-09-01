import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  defaultSummary,
  deleteExpense,
  formatDate,
  getCategoryColor,
  getExpenses,
  getSummary,
  getTrends,
} from "../service/Dashboard";

export const useExpenses = (filter) =>
  useQuery({
    queryKey: ["getExpenses", filter],
    queryFn: ({ queryKey }) => {
      const [_key, filter] = queryKey;
      let filterQuery = "";
      Object.keys(filter).forEach((key) => {
        if (filter[key] != "") {
          if (key.includes("Date")) {
            const formattedDate = new Date(filter[key]).toISOString();
            filterQuery +=
              filterQuery === ""
                ? `?${key}=${formattedDate}`
                : `&${key}=${formattedDate}`;
          } else {
            filterQuery +=
              filterQuery === ""
                ? `?${key}=${filter[key]}`
                : `&${key}=${filter[key]}`;
          }
        }
      });
      return getExpenses(filterQuery);
    },
    select: (data) => {
      let total = 0;
      const sortedDate = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const expenseData = sortedDate.map((expense) => {
        total += expense.amount;
        return {
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          date: formatDate(expense.date),
          id: expense._id,
          categoryColor: getCategoryColor(expense.category),
        };
      });
      return {
        total: total,
        expenses: expenseData,
        count: expenseData.length,
      };
    },
  });

export const useTrends = () =>
  useQuery({
    queryKey: ["getTrends"],
    queryFn: getTrends,
    select: (data) => {
      const trendData = data.map((resData) => {
        const date = new Date(resData.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        });
        return {
          date: date,
          total: resData.total,
        };
      });
      return trendData;
    },
  });

export const useSummary = () =>
  useQuery({
    queryKey: ["getSummary"],
    queryFn: getSummary,
    select: (data) => {
      const summaryData = defaultSummary.map((item) => ({ ...item }));
      const total = Object.values(data).reduce((sum, item) => sum + item, 0);
      if (total == 0) {
        return [];
      } else {
        Object.keys(data).forEach((key) => {
          const inx = summaryData.findIndex((data) => data.name === key);
          summaryData[inx].value = data[key];
          summaryData[inx].percent = Math.round((data[key] / total) * 100);
        });
        return summaryData;
      }
    },
  });

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteExpense"],
    mutationFn: deleteExpense,
    onSuccess: async () => {
      await queryClient.refetchQueries(["getExpenses"]);
    },
  });
};
