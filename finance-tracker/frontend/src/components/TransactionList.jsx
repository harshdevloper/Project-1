import { deleteTransaction } from "../services/api";

export default function TransactionList({ transactions, onDelete }) {
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await deleteTransaction(token, id);
    onDelete(id);
  };

  return (
    <div className="tx-list">
      <h3>Your Transactions</h3>
      <ul>
        {transactions.map(t => (
          <li key={t._id}>
            <span className={`pill ${t.type}`}>{t.type}</span>
            <span className="cat">{t.category}</span>
            <span className="amt">₹{t.amount}</span>
            <button className="link danger" onClick={() => handleDelete(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
