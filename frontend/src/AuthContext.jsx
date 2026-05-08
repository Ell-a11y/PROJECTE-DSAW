import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUser } from "./communicationsManager";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("checking");
  const [user, setUser] = useState(null);

  const refreshSession = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setStatus("unauthenticated");
      return null;
    }

    try {
      const data = await getUser();
      if (data && data.id) {
        setUser(data);
        setStatus("authenticated");
        localStorage.setItem("user_nom", data.nom || "");
        return data;
      }
    } catch (error) {

    }

    localStorage.removeItem("token");
    localStorage.removeItem("user_nom");
    setUser(null);
    setStatus("unauthenticated");
    return null;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_nom");
    setUser(null);
    setStatus("unauthenticated");
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const value = useMemo(
    () => ({ status, user, refreshSession, logout }),
    [status, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
