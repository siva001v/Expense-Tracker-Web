import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/Auth";
export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
