import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthService from "./authService";

import {
  LoginRequest,
  LoginResponse,

} from "./authTypes";

// ===============================
// Login
// ===============================

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(payload);
      console.log("Login response:", response);

      await AsyncStorage.setItem(
        "token",
        response.token
      );

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Login failed"
      );
    }
  }
);




