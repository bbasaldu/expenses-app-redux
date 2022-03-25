import Card from "../Card";
import Form from "../Form";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import ItemList from "../ItemList";
import {
  addExpenese,
  deleteExpense,
  editExpense,
} from "../../store/actions/expenseActions";
const fields = ["fullName", "category", "description", "cost"];
const categories = ["Food", "Travel", "Supplies"];
const usersById = (state) => state.users.byId;
const selectUsers = createSelector([usersById], (usersById) => {
  return Object.keys(usersById).map((id) => usersById[id]);
});
const expensesById = (state) => state.expenses.byId;
const selectExpenses = createSelector(
  [expensesById, usersById],
  (expensesById, usersById) => {
    return Object.keys(expensesById).map((id) => {
      const expense = expensesById[id];
      const user = usersById[expense.userId];
      return { ...expense, fullName: `${user.firstName} ${user.lastName}` };
    });
  }
);
const editableFields = [
  { field: "description", type: "text" },
  { field: "cost", type: "text" },
];
const ExpensesTable = () => {
  const dispatch = useDispatch();
  const usersById = useSelector((state) => state.users.byId);
  const users = useSelector(selectUsers);
  const expenses = useSelector(selectExpenses);
  const expensesById = useSelector((state) => state.expenses.byId);
  const userRef = useRef(users[0] ? users[0].id : null);
  const categoryRef = useRef(categories[0]);
  const descriptionRef = useRef();
  const costRef = useRef();
  useEffect(() => {
    userRef.current = users[0] ? users[0].id : null;
  }, [users]);
  const handleUserChange = (ev) => {
    userRef.current = ev.target.value;
  };
  const handleCategoryChange = (ev) => {
    categoryRef.current = ev.target.value;
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const userId = userRef.current;
    const fullName = `${usersById[userId].firstName} ${usersById[userId].lastName}`;
    const category = categoryRef.current;
    const description = descriptionRef.current.value;
    const cost = +costRef.current.value;

    dispatch(addExpenese({ userId, fullName, category, description, cost }));
  };
  const handleDelete = (expense) => {
    dispatch(deleteExpense(expense));
  };
  const handleEdit = (expense) => {
    const oldExpense = expensesById[expense.id];
    const diff = expense.cost - oldExpense.cost;
    dispatch(editExpense({ ...oldExpense, ...expense, diff }));
  };
  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <select onChange={handleUserChange}>
          {users.map((user) => {
            return (
              <option value={user.id} key={`${user.id}_option`}>
                {`${user.firstName} ${user.lastName}`}
              </option>
            );
          })}
        </select>
        <select onChange={handleCategoryChange}>
          {categories.map((category) => {
            return (
              <option value={category} key={category}>
                {category}
              </option>
            );
          })}
        </select>
        <div>
          <label htmlFor="desc">Description</label>
          <input ref={descriptionRef} id="desc" type="text"></input>
        </div>
        <div>
          <label htmlFor="cost">Cost</label>
          <input ref={costRef} id="cost" type="text"></input>
        </div>
        <button type="submit">Submit</button>
      </Form>
      <ItemList
        items={expenses}
        fields={fields}
        deleteFunction={handleDelete}
        editFunction={handleEdit}
        editableFields={editableFields}
      />
    </Card>
  );
};
export default ExpensesTable;
