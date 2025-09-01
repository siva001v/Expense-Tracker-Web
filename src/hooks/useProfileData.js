import { useMutation, useQuery } from "@tanstack/react-query";
import { changeUserPassword, getUser, saveProfile } from "../service/Profile";

export const useProfileUser = () =>
  useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

export const useUpdateProfile = (handleSunness, handleError) =>
  useMutation({
    mutationKey: ["saveProfile"],
    mutationFn: saveProfile,
    onSuccess: handleSunness,
    onError: handleError,
  });

export const useChangeUserPassword = (handleSunness, handleError) =>
  useMutation({
    mutationKey: ["changeUserPassword"],
    mutationFn: changeUserPassword,
    onSuccess: handleSunness,
    onError: handleError,
  });
