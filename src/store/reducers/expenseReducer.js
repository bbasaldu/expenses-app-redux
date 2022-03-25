import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
} from "../actions/expenseActions";
import { DELETE_USER } from "../actions/userActions";

const inital_id_state = {
  "788736b4-f738-40db-9b6d-36df17551137": {
    userId: "05dbe00a-6733-4852-93ee-4d13b885e9bd",
    fullName: "Joe Smith",
    category: "Food",
    description: "2",
    cost: 2,
    id: "788736b4-f738-40db-9b6d-36df17551137",
  },
  "2b3f36d4-d45e-4ed5-af76-610016b8c608": {
    userId: "05dbe00a-6733-4852-93ee-4d13b885e9bd",
    fullName: "Joe Smith",
    category: "Food",
    description: "2",
    cost: 2,
    id: "2b3f36d4-d45e-4ed5-af76-610016b8c608",
  },
  "c6360262-5998-4796-a19c-d0a66a561727": {
    userId: "05dbe00a-6733-4852-93ee-4d13b885e9bd",
    fullName: "Joe Smith",
    category: "Food",
    description: "2",
    cost: 2,
    id: "c6360262-5998-4796-a19c-d0a66a561727",
  },
  "1abe8857-79a3-477e-8873-c5f20a723013": {
    userId: "05dbe00a-6733-4852-93ee-4d13b885e9bd",
    fullName: "Joe Smith",
    category: "Food",
    description: "2",
    cost: 2,
    id: "1abe8857-79a3-477e-8873-c5f20a723013",
  },
  "64c5f2e5-46cf-488e-9591-05a566265c94": {
    userId: "e1393d1b-3433-4d63-a5cb-3934b5b071f7",
    fullName: "Brian Burger",
    category: "Travel",
    description: "2",
    cost: 5,
    id: "64c5f2e5-46cf-488e-9591-05a566265c94",
  },
  "8e8227f0-2516-4ff7-aead-06882cdbe635": {
    userId: "e1393d1b-3433-4d63-a5cb-3934b5b071f7",
    fullName: "Brian Burger",
    category: "Travel",
    description: "2",
    cost: 5,
    id: "8e8227f0-2516-4ff7-aead-06882cdbe635",
  },
  "7d40b094-d0d6-4b9d-8013-58b4a823c66a": {
    userId: "e1393d1b-3433-4d63-a5cb-3934b5b071f7",
    fullName: "Brian Burger",
    category: "Travel",
    description: "2",
    cost: 5,
    id: "7d40b094-d0d6-4b9d-8013-58b4a823c66a",
  },
  "675dfacf-41e9-4e9d-8e1a-f21e7225b83a": {
    userId: "05dbe00a-6733-4852-93ee-4d13b885e9bd",
    fullName: "Joe Smith",
    category: "Supplies",
    description: "3",
    cost: 10,
    id: "675dfacf-41e9-4e9d-8e1a-f21e7225b83a",
  },
  "5c5f9aea-234e-48f5-a7f7-6e53e277c331": {
    userId: "05dbe00a-6733-4852-93ee-4d13b885e9bd",
    fullName: "Joe Smith",
    category: "Supplies",
    description: "3",
    cost: 10,
    id: "5c5f9aea-234e-48f5-a7f7-6e53e277c331",
  },
};
const inital_category_state = {
  'Food':{
    id: 'Food',
    total: 8,

  },
  'Travel': {
    id: 'Travel',
    total: 15,
  },
  'Supplies': {
    id: 'Supplies',
    total: 20,
  }
};
const initalExpenseState = {
  byId: inital_id_state,
  byCategory: inital_category_state
}
function expenseReducer(state = initalExpenseState, action){
  switch (action.type) {
    //expense actions
    case ADD_EXPENSE: {
      const expense = action.payload;
      const byId = state.byId
      const byCategory = state.byCategory
      const lastTotal = byCategory[expense.category].total
      return {
        byId:{
          ...byId,
          [expense.id]: expense
        },
        byCategory: {
          ...byCategory,
          [expense.category]: {
            id: expense.category,
            total: lastTotal + expense.cost
          }
        }
      };
    }
    case DELETE_EXPENSE: {
      const expense = action.payload;
      const expenseStateCopy = { ...state };
      const lastTotal = expenseStateCopy.byCategory[expense.category].total
      delete expenseStateCopy.byId[expense.id]
      expenseStateCopy.byCategory[expense.category].total = lastTotal - expense.cost
      return expenseStateCopy
    }
    case EDIT_EXPENSE: {
      const expense = action.payload;
      const byId = state.byId
      const byCategory = state.byCategory
      const lastTotal = byCategory[expense.category].total
      return {
        byId:{
          ...byId,
          [expense.id]: expense
        },
        byCategory: {
          ...byCategory,
          [expense.category]: {
            id: expense.category,
            total: lastTotal + expense.diff
          }
        }
      };
    }

    //user actions
    case DELETE_USER: {
      const { expenses } = action.payload;
      const expenseStateCopy = { ...state };
      expenses.forEach(expenseId => {
        const expense = expenseStateCopy.byId[expenseId]
        expenseStateCopy.byCategory[expense.category].total -= expense.cost
        delete expenseStateCopy.byId[expenseId]
      })
      return expenseStateCopy
    }
    default:
      return state;
  }
}

export default expenseReducer
