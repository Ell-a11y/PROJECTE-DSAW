import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUser } from "./communicationsManager";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("checking");
  const [user, setUser] = useState(null);

  const refreshSession = async () => { 
    const token = localStorage.getItem("token"); // Revisa si el token existeix
    if (!token) {
      setUser(null);
      setStatus("unauthenticated");
      return null;
    }

    try { // Si existe el usuario con un ID valido sacara como autenticado
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

  // Eliminara el token y pondra de estado que NO esta autenticado
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

  // Proveemos el contexto
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { // nos dara la informacion para ver si esta logueado o no de una manera mas facil
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
