const API = " https://finance-tracker-backend-j4gc.onrender.com";
const json = (m, body, token) => ({
  method: m,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

export async function registerUser(payload) {
  const r = await fetch(`${API}/api/auth/register`, json("POST", payload));
  return r.json();
}
export async function loginUser(payload) {
  const r = await fetch(`${API}/api/auth/login`, json("POST", payload));
  return r.json();
}
export async function fetchMe(token) {
  const r = await fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` }});
  return r.json();
}

export async function getTransactions(token) {
  const r = await fetch(`${API}/api/transactions`, { headers: { Authorization: `Bearer ${token}` }});
  return r.json();
}
export async function addTransaction(token, payload) {
  const r = await fetch(`${API}/api/transactions`, json("POST", payload, token));
  return r.json();
}
export async function deleteTransaction(token, id) {
  const r = await fetch(`${API}/api/transactions/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` }});
  return r.json();
}
export async function getSummary(token) {
  const r = await fetch(`${API}/api/transactions/summary`, { headers: { Authorization: `Bearer ${token}` }});
  return r.json();
}
