import { useMutation } from "@tanstack/react-query";
import { getLogin, postRegister } from "../service/Auth";

export const useRegister = (handleSuccess, handleError) =>
  useMutation({
    mutationKey: ["postMutation"],
    mutationFn: postRegister,
    onSuccess: handleSuccess,
    onError: handleError,
  });

export const useLogin = (handleSuccess, handleError) =>
  useMutation({
    mutationKey: ["getLogin"],
    mutationFn: getLogin,
    onSuccess: handleSuccess,
    onError: handleError,
  });
