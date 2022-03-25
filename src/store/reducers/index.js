import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import expenseReducer from "./expenseReducer";
export default combineReducers({
  users: userReducer,
  expenses: expenseReducer,
});
