import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const nav = useNavigate();
  const { login, logout, token, user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [pending, setPending] = useState(false);

  const ch = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setErr("");
    const data = await registerUser(form);
    setPending(false);
    if (data?.token) {
      login(data.token, data.user);
      nav("/dashboard");
    } else setErr(data?.message || data?.errors?.[0]?.msg || "Registration failed");
  };

  // If already logged in, show logout
  if (token && user) {
    return (
      <div className="auth-card">
        <h2>You already have an account</h2>
        <p>Logged in as {user.name}</p>
        <button className="btn" onClick={() => { logout(); nav("/signup"); }}>
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
      <h2>Create Account</h2>
      <form onSubmit={submit}>
        <input className="input" name="name" placeholder="Full Name" onChange={ch} />
        <input className="input" name="email" placeholder="Email" onChange={ch} />
        <input className="input" name="password" type="password" placeholder="Password (min 6)" onChange={ch} />
        {err && <div className="error">{err}</div>}
        <button className="btn" disabled={pending}>
          {pending ? "Creating..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <Link className="link" to="/login">Login</Link>
      </p>
    </div>
  );
}
