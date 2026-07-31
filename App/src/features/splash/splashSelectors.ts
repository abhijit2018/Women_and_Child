import { RootState } from "../../app/store";

/**
 * ==========================================================
 * Splash Selectors
 * ==========================================================
 */

export const selectSplash = (
  state: RootState
) => state.splash;

export const selectSplashLoading = (
  state: RootState
) => state.splash.loading;

export const selectSplashInitialized = (
  state: RootState
) => state.splash.initialized;

export const selectIsAuthenticated = (
  state: RootState
) => state.splash.isAuthenticated;

export const selectSplashUser = (
  state: RootState
) => state.splash.user;

export const selectSplashError = (
  state: RootState
) => state.splash.error;