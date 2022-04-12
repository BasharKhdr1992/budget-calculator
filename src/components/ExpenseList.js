import React from 'react';
import Item from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

export const ExpenseList = ({
  expenses,
  handleDelete,
  onClear,
  handleEdit,
}) => {
  return (
    <>
      <ul className="list">
        {expenses.map((e) => {
          return (
            <Item
              key={e.id}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              expense={e}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button onClick={() => onClear()} className="btn">
          clear expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
