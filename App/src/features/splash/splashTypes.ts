/**
 * ==========================================================
 * Splash State
 * ==========================================================
 */

export interface SplashState {
  loading: boolean;
  initialized: boolean;
  isAuthenticated: boolean;
  user: any | null;
  error: string | null;
}

/**
 * ==========================================================
 * Verify Token API
 * POST /api/v1/462935265510322665259
 * ==========================================================
 */

export interface VerifyTokenRequest {
  api_url: string;
  api_key: string;
  tok_one: string;
}

export interface VerifyTokenResponse {
  success: boolean;
  message: string;
  token: string;
  collection_name: string;
}

/**
 * ==========================================================
 * Result Token API
 * POST /api/v1/462935265510422666259
 * ==========================================================
 */

export interface ResultTokenRequest {
  collection_name: string;
}

export interface ResultTokenResponse {
  success: boolean;
  message: string;
  data: any;
}

/**
 * ==========================================================
 * Initialize App Response
 * ==========================================================
 */

export interface InitializeAppResponse {
  isAuthenticated: boolean;
  user: any | null;
}

/**
 * ==========================================================
 * API Error
 * ==========================================================
 */

export interface ApiErrorResponse {
  success: boolean;
  message: string;
}