// src/features/home/homeSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { fetchHomeData } from "./homeThunk";
import { HomeState } from "./homeTypes";

const initialState: HomeState = {
  loading: false,
  error: null,

  sliders: [],
  banners: [],
  featured: [],
};

const homeSlice = createSlice({
  name: "home",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;

        state.sliders = action.payload.sliders;
        state.banners = action.payload.banners;
        state.featured = action.payload.featured;
      })

      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong.";
      });
  },
});

export default homeSlice.reducer;