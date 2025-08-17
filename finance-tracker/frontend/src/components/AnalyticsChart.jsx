import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AnalyticsChart({ transactions = [] }) {
  const income = transactions.filter(t => t.type === "income").reduce((a, b) => a + Number(b.amount), 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, b) => a + Number(b.amount), 0);
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];
  const COLORS = ["#2E7D32", "#E53935"]; // green, red

  return (
    <div className="chart-card">
      <h3>Income vs Expense</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip /><Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
