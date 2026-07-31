// src/features/home/homeSelectors.ts

import type { RootState } from "../../app/store";

export const selectHome = (state: RootState) => state.home;

export const selectHomeLoading = (state: RootState) =>
  state.home.loading;

export const selectHomeError = (state: RootState) =>
  state.home.error;

export const selectSliders = (state: RootState) =>
  state.home.sliders;

export const selectBanners = (state: RootState) =>
  state.home.banners;

export const selectFeatured = (state: RootState) =>
  state.home.featured;