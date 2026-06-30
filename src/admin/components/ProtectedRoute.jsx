import { Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";

export default function ProtectedRoute({ children, role }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  // belum login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = String(user.role || "")
    .trim()
    .toLowerCase();

  const requiredRole = String(role || "")
    .trim()
    .toLowerCase();

  // role tidak sesuai
  if (requiredRole && userRole !== requiredRole) {
    return <NotFound />;
  }

  return children;
}
