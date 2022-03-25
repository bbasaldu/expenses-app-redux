import { v4 } from "uuid";
//action types
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
//actions
export const addUser = (user) => ({
  type: ADD_USER,
  payload: { ...user, id: v4(), expenses: [], totalExpenses: 0 },
});
export const editUser = (user) => ({
  type: EDIT_USER,
  payload: user,
});
export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});
//thunk action creators
