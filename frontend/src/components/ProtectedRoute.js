import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  // Muestra un loader mientras se verifica la autenticación
  if (loading) {
    console.log("loading");
  }

  // Si no está cargando y no hay usuario, redirige a login
  if (!user && !loading) {
    return navigate("/login", {
      replace: true, 
    });
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};