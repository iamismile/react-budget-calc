import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';

// const initialExpenses = [
//   { id: uuidv4(), charge: 'rent', amount: 1600 },
//   { id: uuidv4(), charge: 'car payment', amount: 400 },
//   { id: uuidv4(), charge: 'credit card bill', amount: 1200 },
// ];

const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

function App() {
  // ***************** state values ***********************
  // all expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState('');
  // single amount
  const [amount, setAmount] = useState('');

  // alert
  const [alert, setAlert] = useState({ show: false });

  // edit
  const [edit, setEdit] = useState(false);

  // edit item
  const [id, setId] = useState(0);

  // ***************** useEffect ***********************
  useEffect(() => {
    console.log('Use effect');
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // ***************** functionality ***********************
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpense = expenses.map((item) =>
          item.id === id ? { ...item, charge, amount } : item
        );
        setExpenses(tempExpense);
        setEdit(false);
        handleAlert({ type: 'success', text: 'Item edited' });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: 'success', text: 'Item Added' });
      }
      setCharge('');
      setAmount('');
    } else {
      handleAlert({
        type: 'danger',
        text:
          "Charge can't be empty value & Amount value has to be bigger than 0",
      });
    }
  };

  // clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'All items deleted' });
  };

  // handle delete item
  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: 'danger', text: 'Item deleted' });
  };

  // handle edit item
  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total spending:{' '}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
