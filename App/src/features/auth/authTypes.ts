// features/auth/authTypes.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  role?: string;
}

export interface LoginRequest {
  user_name: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken?: string;
  user: User;
}

export interface VerifyOtpRequest {
  mobile: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token: string;
}

export interface ForgotPasswordRequest {
  mobile: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ProfileResponse {
  success: boolean;
  data: User;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  success: boolean;
  message: string;
}