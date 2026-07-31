import AsyncStorage from "@react-native-async-storage/async-storage";

import axiosClient from "../../../api/axios";
import { ENDPOINTS } from "../../../api/endpoints";

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

export interface ResultTokenRequest {
  collection_name: string;
}

export interface ResultTokenResponse {
  success: boolean;
  message: string;
  data: any;
}

/**
 * Get token from AsyncStorage
 */
export const getStoredToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("token");
};

/**
 * Verify Login Token
 */
export const verifyTokenApi = async (
  body: VerifyTokenRequest
): Promise<VerifyTokenResponse> => {
  const { data } = await axiosClient.post(
    ENDPOINTS.VERIFY_TOKEN,
    body
  );

  return data;
};

/**
 * Result Token API
 */
export const resultTokenApi = async (
  body: ResultTokenRequest,
  bearerToken: string
): Promise<ResultTokenResponse> => {
  const { data } = await axiosClient.post(
    ENDPOINTS.RESULT_TOKEN,
    body,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }
  );

  return data;
};