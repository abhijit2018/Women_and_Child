import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";

import { initializeApp, logout } from "../splashThunk";

import {
    selectIsAuthenticated,
    selectSplashError,
    selectSplashInitialized,
    selectSplashLoading,
    selectSplashUser,
} from "../splashSelectors";

const useSplash = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectSplashLoading);

  const initialized = useAppSelector(
    selectSplashInitialized
  );

  const isAuthenticated = useAppSelector(
    selectIsAuthenticated
  );

  const user = useAppSelector(selectSplashUser);

  const error = useAppSelector(selectSplashError);

  /**
   * Initialize App
   */
  const initialize = useCallback(async () => {
    return await dispatch(initializeApp()).unwrap();
  }, [dispatch]);

  /**
   * Logout
   */
  const signOut = useCallback(async () => {
    return await dispatch(logout()).unwrap();
  }, [dispatch]);

  return {
    loading,
    initialized,
    isAuthenticated,
    user,
    error,

    initialize,
    signOut,
  };
};

export default useSplash;