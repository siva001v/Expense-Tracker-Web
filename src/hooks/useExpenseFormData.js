import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateExpense, getExpense } from "../service/ExpenseForm";

export const useExpense = (id) =>
  useQuery({
    queryKey: ["getExpense", id],
    queryFn: () => getExpense(id),
    enabled: !!id,
  });

export const useAddOrUpdateExpense = (handleSuccess) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addOrUpdateExpense"],
    mutationFn: addOrUpdateExpense,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["getExpenses"]);
      handleSuccess();
    },
  });
};
