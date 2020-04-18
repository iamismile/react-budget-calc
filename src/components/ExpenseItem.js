import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

function ExpenseItem(props) {
  const { id, charge, amount } = props.expense;
  const { handleDelete, handleEdit } = props;

  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button
          className="edit-btn"
          aria-label="edit-button"
          onClick={() => handleEdit(id)}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          aria-label="delete-button"
          onClick={() => handleDelete(id)}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
