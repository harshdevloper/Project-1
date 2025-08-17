// src/pages/Home.js
import React from "react";

function Home() {
  return (
    <div className="home">
      <h1 className="title">💰 Finance Tracker</h1>
      <p className="subtitle">
        Track expenses, manage income, and visualize your financial journey 🚀
      </p>

      <div className="features">
        <div className="card">
          <h3>📊 Expense Tracking</h3>
          <p>Easily record and categorize your daily expenses.</p>
        </div>
        <div className="card">
          <h3>📈 Income Management</h3>
          <p>Track multiple income sources and monitor growth.</p>
        </div>
        <div className="card">
          <h3>🔍 Reports & Insights</h3>
          <p>Visualize your spending patterns and plan smarter.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
