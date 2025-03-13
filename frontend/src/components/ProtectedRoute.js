import { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      // No redirijas si el estado aún no se ha cargado
      return;
    }
    
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (user) {
    return children;
  }

  return null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};