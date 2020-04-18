import React from 'react';
import { MdDelete } from 'react-icons/md';
import Item from './ExpenseItem';

function ExpenseList(props) {
  const { expenses, clearItems, handleDelete, handleEdit } = props;

  return (
    <>
      <ul className="list">
        {expenses.map((expense) => (
          <Item
            key={expense.id}
            expense={expense}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          clear expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
}

export default ExpenseList;
