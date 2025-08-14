import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../utils/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    // nothing fancy here; backend will reject if token invalid
  }, [token]);

  // const login = useCallback(async (email, password) => {
  //   const res = await fetch("http://localhost:5000/api/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   });
  //   if (!res.ok) throw new Error("Login failed");
  //   const data = await res.json();
  //   localStorage.setItem("token", data.token);
  //   setToken(data.token);
  // }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setToken(data.token);
  }, []);

  // const register = useCallback(async (name, email, password) => {
  //   const res = await fetch("http://localhost:5000/api/auth/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name, email, password }),
  //   });
  //   if (!res.ok) throw new Error("Register failed");
  // }, []);

  const register = useCallback(async (name, email, password) => {
    await api.post("/auth/register", { name, email, password });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
