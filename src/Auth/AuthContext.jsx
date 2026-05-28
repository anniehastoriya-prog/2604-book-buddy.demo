import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Whenever the token changes, load (or clear) the current user.
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    apiFetch("/users/me", { token })
      .then(setUser)
      .catch(() => {
        // Token is missing/expired — clean it up.
        localStorage.removeItem("token");
        setToken(null);
      });
  }, [token]);

  async function register(fields) {
    const data = await apiFetch("/users/register", {
      method: "POST",
      body: fields,
    });
    localStorage.setItem("token", data.token);
    setToken(data.token);
  }

  async function login(credentials) {
    const data = await apiFetch("/users/login", {
      method: "POST",
      body: credentials,
    });
    localStorage.setItem("token", data.token);
    setToken(data.token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
