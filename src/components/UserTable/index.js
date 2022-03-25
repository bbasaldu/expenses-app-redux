import Card from "../Card";
import Form from "../Form";
import { addUser, deleteUser, editUser } from "../../store/actions/userActions";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import ItemList from "../ItemList";
const fields = ["firstName", "lastName", "totalExpenses"];
const usersById = (state) => state.users.byId;
const selectUsers = createSelector([usersById], (usersById) => {
  return Object.keys(usersById).map((id) => usersById[id]);
});
const editableFields = [
  { field: "firstName", type: "text" },
  { field: "lastName", type: "text" },
];
const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    dispatch(addUser({ firstName, lastName }));
  };
  const handleDelete = (user) => {
    dispatch(deleteUser(user));
  };
  const handleEdit = (user) => {
    dispatch(editUser(user));
  };
  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name</label>
          <input ref={firstNameRef} id="fname" type="text"></input>
        </div>
        <div>
          <label htmlFor="lname">Last Name</label>
          <input ref={lastNameRef} id="lname" type="text"></input>
        </div>
        <button type="submit">Submit</button>
      </Form>
      <ItemList
        items={users}
        fields={fields}
        deleteFunction={handleDelete}
        editFunction={handleEdit}
        editableFields={editableFields}
      />
    </Card>
  );
};
export default UserTable;
