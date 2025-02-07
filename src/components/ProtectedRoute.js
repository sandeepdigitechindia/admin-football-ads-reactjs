import { Navigate } from "react-router-dom";
import isAuthenticated from "../authMiddleware";

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
