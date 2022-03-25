import Card from "../Card";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import ItemList from "../ItemList";
const fields = ["id", "total"];
const expenses = state => state.expenses
const selectCategories = createSelector([expenses], (expenses) => {
  return Object.keys(expenses.byCategory).map((category) => expenses.byCategory[category]);
});
const editableFields = [];
const CompanyExpensesTable = () => {
  const categories = useSelector(selectCategories);
  return (
    <Card>
      <ItemList
        items={categories}
        fields={fields}
        editable={false}
        editableFields={editableFields}
        
      />
    </Card>
  );
};
export default CompanyExpensesTable;
