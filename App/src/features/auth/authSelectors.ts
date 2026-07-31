// features/auth/authSelectors.ts

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
// =========================
// Base Selector
// =========================

export const selectAuthState = (state: RootState) => state.auth;

// =========================
// User
// =========================

export const selectUser = createSelector(
  [selectAuthState],
  auth => auth.user
);

// =========================
// Token
// =========================

export const selectToken = createSelector(
  [selectAuthState],
  auth => auth.token
);

// =========================
// Loading
// =========================

export const selectLoading = createSelector(
  [selectAuthState],
  auth => auth.loading
);

// =========================
// Error
// =========================

export const selectError = createSelector(
  [selectAuthState],
  auth => auth.error
);

// =========================
// Authentication Status
// =========================

export const selectIsAuthenticated =
  createSelector(
    [selectAuthState],
    auth => auth.isAuthenticated
  );

// =========================
// User Name
// =========================

export const selectUserName =
  createSelector(
    [selectUser],
    user => user?.name ?? ""
  );

// =========================
// User Email
// =========================

export const selectUserEmail =
  createSelector(
    [selectUser],
    user => user?.email ?? ""
  );

// =========================
// User Role
// =========================

export const selectUserRole =
  createSelector(
    [selectUser],
    user => user?.role ?? ""
  );