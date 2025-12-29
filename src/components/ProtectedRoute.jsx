import { Navigate } from "react-router-dom";

// role can be "ADMIN" or "USER"
export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role
    return <Navigate to="/login" replace />;
  }

  return children;
}
