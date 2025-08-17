// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">💰 Finance Tracker</div>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>

        {!user ? (
          <>
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/signup" className="btn btn-signup">Signup</Link>
          </>
        ) : (
          <button onClick={logout} className="btn btn-logout">Logout</button>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-layout">
          {/* Navbar */}
          <Navbar />

          <div className="main-container">
            {/* Sidebar */}
            <aside className="sidebar">
              <ul>
                <li><Link to="/dashboard">🏠 Dashboard</Link></li>
                <li><Link to="/expenses">💳 Expenses</Link></li>
                <li><Link to="/income">📈 Income</Link></li>
                <li><Link to="/reports">📊 Reports</Link></li>
                <li><Link to="/settings">⚙️ Settings</Link></li>
              </ul>
            </aside>

            {/* Main Content */}
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
