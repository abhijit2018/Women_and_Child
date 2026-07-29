// src/app/rootReducer.ts

import { combineReducers } from "@reduxjs/toolkit";

import homeReducer from "../features/home/homeSlice";

const rootReducer = combineReducers({
  home: homeReducer,
});

export default rootReducer;