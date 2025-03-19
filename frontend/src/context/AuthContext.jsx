import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/cashflow/api/verify-auth",
          {
            credentials: "include", // Incluye cookies en la solicitud
          }
        );
        const data = await response.json();
        console.log("Data from verifyAuth:", data); // Depuración
        if (data.user) {
          setUser(data.user); // Actualiza el estado del usuario
        } else {
          return navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying auth:", error);
      }
    };

    verifyAuth();
  }, [navigate]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/cashflow/api/logout", {
        method: "POST",
        credentials: "include", // Incluye cookies en la solicitud
      });
      setUser(null); // Limpia los datos del usuario
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
