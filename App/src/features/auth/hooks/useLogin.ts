import { useCallback } from "react";

import {
    useAppDispatch,
    useAppSelector,
} from "@/hooks";

import { loginUser } from "../authThunk";

import {
    selectError,
    selectIsAuthenticated,
    selectLoading,
    selectToken,
    selectUser,
} from "../authSelectors";

import type {
    LoginRequest,
    LoginResponse,
} from "../authTypes";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const isAuthenticated = useAppSelector(
    selectIsAuthenticated
  );

  const login = useCallback(
    async (
      payload: LoginRequest
    ): Promise<LoginResponse> => {
      return await dispatch(
        loginUser(payload)
      ).unwrap();
    },
    [dispatch]
  );

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,

    login,
  };
};

export default useLogin;