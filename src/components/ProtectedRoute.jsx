import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { signed } = useAuth();

  console.log('signed', signed);

  if (!signed) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};