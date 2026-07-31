// =========================
// Reducer
// =========================

export { default as authReducer } from "./authSlice";

// =========================
// Actions
// =========================

export {
  clearAuth,
  clearError,
  setToken,
  setUser,
} from "./authSlice";

// =========================
// Thunks
// =========================

export {
  loginUser,
  verifyOtp,
  forgotPassword,
  logoutUser,
  loadUser,
} from "./authThunk";

// =========================
// Selectors
// =========================

export {
  selectAuthState,
  selectUser,
  selectToken,
  selectLoading,
  selectError,
  selectIsAuthenticated,
  selectUserName,
  selectUserEmail,
  selectUserRole,
} from "./authSelectors";

// =========================
// Service
// =========================

export { default as AuthService } from "./authService";

// =========================
// Types
// =========================

export type {
  User,
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LogoutResponse,
  ProfileResponse,
  ApiError,
} from "./authTypes";