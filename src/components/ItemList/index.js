import Item from "./Item";

const ItemList = (props) => {
  const {
    items,
    fields,
    editableFields,
    deleteFunction,
    editFunction,
    editable = true,
  } = props;
  const handleDelete = (item) => {
    deleteFunction(item);
  };
  const handleEdit = (item) => {
    editFunction(item);
  };
  return (
    <ul>
      {items.map((item) => {
        return (
          <Item
            isEditable={editable}
            key={item.id}
            item={item}
            fields={fields}
            onDelete={handleDelete}
            onEdit={handleEdit}
            editableFields={editableFields}
          />
        );
      })}
    </ul>
  );
};
export default ItemList;
