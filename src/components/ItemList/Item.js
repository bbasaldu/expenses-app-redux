import { useState } from "react";
import cls from "./ItemList.module.css";
const Item = (props) => {
  const {
    item,
    fields,
    isEditable,
    editableFields,
    onDelete: deleteFunc,
    onEdit: editFunc,
  } = props;
  const [editable, setEditable] = useState(false);
  const handleDelete = (item) => {
    deleteFunc(item);
  };
  const handleEdit = (ev) => {
    ev.preventDefault();
    const inputs = ev.target.querySelectorAll("input");
    const newItem = { id: item.id };
    editableFields.forEach((edit, i) => {
      console.log(`${edit.field}: ${inputs.item(i).value}`);
      const value = inputs.item(i).value;
      newItem[edit.field] = isNaN(value) ? value : +value;
    });

    editFunc(newItem);
    setEditable(false);
  };

  return (
    <li>
      <form onSubmit={handleEdit} style={{ display: "inline" }}>
        <div className={cls.fieldRow}>
          {fields.map((field, i) => {
            const component = (
              <div className={cls.itemField} key={`${item.id}_${i}`}>
                {item[field]}
              </div>
            );
            if (editable) {
              if (editableFields.find((f) => f.field === field)) {
                return (
                  <input
                    key={`${item.id}_${i}`}
                    type="text"
                    defaultValue={item[field]}
                  />
                );
              }
              return component;
            }
            return component;
          })}
          {editable && (
            <button className={cls.btn} type="submit">
              Save
            </button>
          )}
          {!editable && isEditable && (
            <button type="button" className={cls.btn} onClick={() => setEditable(true)}>
              Edit
            </button>
          )}

          {isEditable && (
            <button type="button" className={cls.btn} onClick={() => handleDelete(item)}>
              delete
            </button>
          )}
        </div>
      </form>
    </li>
  );
};
export default Item;
