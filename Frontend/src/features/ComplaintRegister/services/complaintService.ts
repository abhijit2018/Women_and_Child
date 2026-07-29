// src/features/home/services/homeService.ts

import axiosClient from "../../../api/axios";
import ENDPOINTS from "../../../api/endpoints";

import { HomeResponse } from "../homeTypes";

export const getHomeData = async (): Promise<HomeResponse> => {
  const response = await axiosClient.get<HomeResponse>(
    ENDPOINTS.HOME
  );

  return response.data;
};