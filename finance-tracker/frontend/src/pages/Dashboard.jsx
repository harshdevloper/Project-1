import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTransactions } from "../services/api";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import AnalyticsChart from "../components/AnalyticsChart";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      const data = await getTransactions(token);
      setTransactions(Array.isArray(data) ? data : []);
    };
    load();
  }, []);

  const addTransaction = (newTx) => setTransactions([newTx, ...transactions]);
  const removeTransaction = (id) => setTransactions(transactions.filter(tx => tx._id !== id));

  const { income, expense, balance } = useMemo(() => {
    const inc = transactions.filter(t => t.type === "income").reduce((a, b) => a + Number(b.amount), 0);
    const exp = transactions.filter(t => t.type === "expense").reduce((a, b) => a + Number(b.amount), 0);
    return { income: inc, expense: exp, balance: inc - exp };
  }, [transactions]);

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <div className="container">
      <h1 className="title">Dashboard</h1>
      <div className="protected">Hi {user?.name}, you’re logged in! ✅</div>
      <button className="btn" style={{ marginTop: 12 }} onClick={handleLogout}>
        Logout
      </button>

      {/* Summary Cards */}
      <div className="cards">
        <div className="card blue">
          <h4>Total Balance</h4>
          <div className="big">₹{balance}</div>
        </div>
        <div className="card green">
          <h4>Total Income</h4>
          <div className="big">₹{income}</div>
        </div>
        <div className="card red">
          <h4>Total Expense</h4>
          <div className="big">₹{expense}</div>
        </div>
      </div>

      {/* Chart */}
      <AnalyticsChart transactions={transactions} />

      {/* Transactions */}
      <div className="section">
        <h2>Your Transactions</h2>
        <TransactionForm onAdd={addTransaction} />
        <TransactionList transactions={transactions} onDelete={removeTransaction} />
      </div>
    </div>
  );
}
