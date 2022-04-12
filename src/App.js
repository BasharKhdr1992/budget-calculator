import './App.css';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

const App = () => {
  // -------------------------- state values ---------------
  // all expenses, single expense
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({ show: false, type: '', text: '' });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');
  // ------------------ functionality ------------------
  const handleCharge = (e) => setCharge(e.target.value);
  const handleAmount = (e) => setAmount(+e.target.value);
  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };
  // handle delete, clear, and edit
  const handleClear = () => {
    setExpenses([]);
  };
  const handleDelete = (id) => {
    setExpenses((currentState) => {
      return currentState.filter((e) => e.id !== id);
    });
    handleAlert({ type: 'danger', text: 'item deleted successfully' });
  };

  const handleEdit = (id) => {
    const expenseToEdit = expenses.find((e) => e.id === id);
    setCharge(expenseToEdit.charge);
    setAmount(expenseToEdit.amount);
    setId(id);
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
    setAmount(0);
    setCharge('');
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((e) => {
          return e.id === id ? { ...e, amount, charge } : e;
        });
        setExpenses(tempExpenses);
        handleAlert({ type: 'success', text: 'expense updated successfully' });
        setEdit(false);
      } else {
        setExpenses((currentState) => {
          return currentState.concat({
            id: uuidv4(),
            charge,
            amount,
          });
        });
        handleAlert({ type: 'success', text: 'expense added successfully' });
      }

      setCharge('');
      setAmount(0);
    } else {
      // handle alert called
      handleAlert({
        type: 'danger',
        text: `charge cannot be empty, and amount has to be bigger than zero`,
      });
    }
  };

  // whenever an expense gets updated, update the local storage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    return () => localStorage.clear();
  }, [expenses]);

  // sort the items in descending order
  const sortedExpenses = expenses.sort((a, b) => b.amount - a.amount);

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          edit={edit}
          onCancel={handleCancel}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
        <ExpenseList
          handleEdit={handleEdit}
          onClear={handleClear}
          handleDelete={handleDelete}
          expenses={sortedExpenses}
        />
      </main>
      <h1>
        Total spending:&nbsp;
        <span className="total">
          $ {expenses.reduce((acc, current) => acc + current.amount, 0)}
        </span>
      </h1>
    </>
  );
};

export default App;
