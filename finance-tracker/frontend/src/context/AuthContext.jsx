import { createContext, useContext, useEffect, useState } from "react";
import { fetchMe } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  // Fetch logged-in user info when token changes
  useEffect(() => {
    (async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const me = await fetchMe(token);
      if (me?._id) {
        setUser(me);
      } else {
        logout(); // if token invalid/expired
      }
      setLoading(false);
    })();
  }, [token]);

  const login = (t, u) => {
    localStorage.setItem("token", t);
    setToken(t);
    setUser(u || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
