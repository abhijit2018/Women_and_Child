// src/features/home/homeThunk.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getHomeData } from "./services/homeService";
import { HomeResponse } from "./homeTypes";

export const fetchHomeData = createAsyncThunk<
  HomeResponse,
  void,
  { rejectValue: string }
>(
  "home/fetchHomeData",
  async (_, { rejectWithValue }) => {
    try {
      return await getHomeData();
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load home data."
      );
    }
  }
);