import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import ThunkMiddleware from "redux-thunk";
//dev middleware for logging
const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};
export default createStore(
  rootReducer,
  applyMiddleware(ThunkMiddleware, logger)
);
/*

users: {
    byId: {
        u1: {
            id: u1,
            firstName: uf,
            lastName: ul,
            totalExpenses: 100,
            expenses: [e1,...]
            **could use this to do a filter by user thing
        }
    },
    all: [u1,...]
}
expenses: {
    byId: {
        e1: {
            id: e1,
            category: 'food',
            description: 'pizza',
            cost: 100,
            user: u1
        }
    }
}

companyExpenses: {
    byCategory: {
        'pizza': {
            name: 'pizza',
            total: 100,
            //expenses: []
        }
        ...
    }
}
assuming newTotal > 0
newTotal = 90
difference = 90 - 100 = -10

newTotal = 110
110 - 100 = 10
*expenses table only show expenses for selected user?
** as an exercise to see if code is modular, 
add total company expenses at the end
** could even show all expenses and their associated user,
for each category




*/