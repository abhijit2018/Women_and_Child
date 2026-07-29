import { useCallback } from "react";

import {
    useAppDispatch,
    useAppSelector,
} from "@/hooks";

import {
    loadDashboard,
    refreshDashboard,
} from "../dashboardThunk";

import {
    selectDashboardCards,
    selectDashboardError,
    selectDashboardLoading,
    selectDashboardMenus,
    selectDashboardTitle,
} from "../dashboardSelectors";

const useDashboard = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(
    selectDashboardLoading
  );

  const title = useAppSelector(
    selectDashboardTitle
  );

  const cards = useAppSelector(
    selectDashboardCards
  );

  const menus = useAppSelector(
    selectDashboardMenus
  );

  const error = useAppSelector(
    selectDashboardError
  );

  /**
   * Load Dashboard
   */
  const load = useCallback(async () => {
    return await dispatch(
      loadDashboard()
    ).unwrap();
  }, [dispatch]);

  /**
   * Refresh Dashboard
   */
  const refresh = useCallback(async () => {
    return await dispatch(
      refreshDashboard()
    ).unwrap();
  }, [dispatch]);

  return {
    loading,
    title,
    cards,
    menus,
    error,

    load,
    refresh,
  };
};

export default useDashboard;