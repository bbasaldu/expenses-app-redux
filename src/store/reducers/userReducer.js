import { combineReducers } from "@reduxjs/toolkit";
import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
} from "../actions/expenseActions";
import { ADD_USER, DELETE_USER, EDIT_USER } from "../actions/userActions";

const inital_state = {
  "05dbe00a-6733-4852-93ee-4d13b885e9bd": {
    firstName: "Joe",
    lastName: "Smith",
    id: "05dbe00a-6733-4852-93ee-4d13b885e9bd",
    expenses: [
      "788736b4-f738-40db-9b6d-36df17551137",
      "2b3f36d4-d45e-4ed5-af76-610016b8c608",
      "c6360262-5998-4796-a19c-d0a66a561727",
      "1abe8857-79a3-477e-8873-c5f20a723013",
      "675dfacf-41e9-4e9d-8e1a-f21e7225b83a",
      "5c5f9aea-234e-48f5-a7f7-6e53e277c331",
    ],
    totalExpenses: 28,
  },
  "e1393d1b-3433-4d63-a5cb-3934b5b071f7": {
    firstName: "Brian",
    lastName: "Burger",
    id: "e1393d1b-3433-4d63-a5cb-3934b5b071f7",
    expenses: [
      "64c5f2e5-46cf-488e-9591-05a566265c94",
      "8e8227f0-2516-4ff7-aead-06882cdbe635",
      "7d40b094-d0d6-4b9d-8013-58b4a823c66a",
    ],
    totalExpenses: 15,
  },
};
function usersById(state = inital_state, action) {
  switch (action.type) {
    case ADD_USER: {
      const user = action.payload;
      return {
        ...state,
        [user.id]: user,
      };
    }
    case EDIT_USER: {
      const user = action.payload;
      return {
        ...state,
        [user.id]: {
          ...state[user.id],
          ...user,
        },
      };
    }
    case DELETE_USER: {
      const { id } = action.payload;
      const objCopy = { ...state };
      delete objCopy[id];
      return objCopy;
    }
    //expense actions
    case ADD_EXPENSE: {
      const { cost, userId, id } = action.payload;
      const user = { ...state[userId] };
      user.totalExpenses += cost;
      user.expenses.push(id);
      return {
        ...state,
        [userId]: user,
      };
    }
    case DELETE_EXPENSE: {
      const { cost, userId, id } = action.payload;
      const user = { ...state[userId] };
      user.totalExpenses -= cost;
      const eIdx = user.expenses.findIndex((expense) => expense.id === id);
      user.expenses.splice(eIdx, 1);

      return {
        ...state,
        [userId]: user,
      };
    }
    case EDIT_EXPENSE: {
      const { userId, diff } = action.payload;
      const user = { ...state[userId] };
      user.totalExpenses += diff
      return {
        ...state,
        [userId]: user,
      };
    }
    default:
      return state;
  }
}
export default combineReducers({
  byId: usersById,
});
