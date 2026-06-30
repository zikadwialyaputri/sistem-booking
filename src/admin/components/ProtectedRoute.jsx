import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    user = null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = String(user.role || "").trim().toLowerCase();
  const requiredRole = String(role || "").trim().toLowerCase();

  if (role && userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}