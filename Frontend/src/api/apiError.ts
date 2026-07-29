import axios from "axios";

export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export const getApiError = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Something went wrong."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error occurred.";
};