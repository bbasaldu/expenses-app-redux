import './App.css';
import CompanyExpensesTable from './components/CompanyExpensesTable';
import ExpensesTable from './components/ExpensesTable';
import UserTable from './components/UserTable';
function App() {
  return (
    <div className='app'>
      <UserTable/>
      <ExpensesTable/>
      <CompanyExpensesTable/>
    </div>
  );
}

export default App;
