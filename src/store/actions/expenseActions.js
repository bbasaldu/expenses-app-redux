import { v4 } from "uuid";

//action types
export const ADD_EXPENSE = "ADD_EXPENSE"
export const DELETE_EXPENSE  = "DELETE_EXPENSE"
export const EDIT_EXPENSE = 'EDIT_EXPENSE'
//actions

export const addExpenese = (expense) => ({
    type: ADD_EXPENSE,
    payload: {...expense, id: v4()}
})
export const deleteExpense = (expense) => ({
    type: DELETE_EXPENSE,
    payload: expense
})
export const editExpense = (expense) => ({
    type: EDIT_EXPENSE,
    payload: expense
})