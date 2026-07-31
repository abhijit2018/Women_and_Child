// src/features/home/hooks/useHome.ts

import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/hooks";

import { fetchHomeData } from "../homeThunk";

import {
  selectSliders,
  selectBanners,
  selectFeatured,
  selectHomeLoading,
  selectHomeError,
} from "../homeSelectors";

const useHome = () => {
  const dispatch = useAppDispatch();

  const sliders = useAppSelector(selectSliders);

  const banners = useAppSelector(selectBanners);

  const featured = useAppSelector(selectFeatured);

  const loading = useAppSelector(selectHomeLoading);

  const error = useAppSelector(selectHomeError);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  return {
    sliders,
    banners,
    featured,
    loading,
    error,
  };
};

export default useHome;