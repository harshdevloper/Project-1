import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login, logout, user, token } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [pending, setPending] = useState(false);

  const ch = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setErr("");
    const data = await loginUser(form);
    setPending(false);
    if (data?.token) {
      login(data.token, data.user);
      nav("/dashboard");
    } else setErr(data?.message || data?.errors?.[0]?.msg || "Login failed");
  };

  // If already logged in, show logout
  if (token && user) {
    return (
      <div className="auth-card">
        <h2>You’re already logged in</h2>
        <p>Welcome back, {user.name}!</p>
        <button className="btn" onClick={() => { logout(); nav("/login"); }}>
          Logout
        </button>
        <button className="btn" style={{ marginLeft: 8 }} onClick={() => nav("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h2>Welcome Back</h2>
      <form onSubmit={submit}>
        <input className="input" name="email" placeholder="Email" onChange={ch} />
        <input className="input" name="password" type="password" placeholder="Password" onChange={ch} />
        {err && <div className="error">{err}</div>}
        <button className="btn" disabled={pending}>
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        New here? <Link className="link" to="/signup">Create an account</Link>
      </p>
    </div>
  );
}
