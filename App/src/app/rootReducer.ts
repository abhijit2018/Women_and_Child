import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import splashReducer from "../features/splash/splashSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  splash: splashReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;