import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return <div style={{ textAlign: "center", padding: 40 }}>Loading...</div>;
  return token ? children : <Navigate to="/login" replace />;
}
