import { useState } from "react";
import { addTransaction } from "../services/api";

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ type: "expense", category: "", amount: "", note: "" });
  const ch = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = { ...form, amount: Number(form.amount) };
    const res = await addTransaction(token, payload);
    if (res?._id) { onAdd(res); setForm({ type: "expense", category: "", amount: "", note: "" }); }
  };

  return (
    <form onSubmit={submit} className="tx-form">
      <select name="type" value={form.type} onChange={ch}>
        <option value="income">Income</option><option value="expense">Expense</option>
      </select>
      <input name="category" placeholder="Category" value={form.category} onChange={ch} required />
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={ch} required />
      <input name="note" placeholder="Note (optional)" value={form.note} onChange={ch} />
      <button className="btn">Add</button>
    </form>
  );
}
