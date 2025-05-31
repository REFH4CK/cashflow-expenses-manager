import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Crear el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/cashflow/api/verify-auth",
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        setUser(data.user || null);
      } catch (error) {
        console.error("Error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/cashflow/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      // Redirigir al usuario a la página de inicio o login
      navigate("/login");
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
