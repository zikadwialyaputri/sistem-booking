import NotFound from "../pages/NotFound";

export default function ProtectedRoute({ children, role }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const userRole = String(user?.role || "")
    .trim()
    .toLowerCase();

  const requiredRole = String(role || "")
    .trim()
    .toLowerCase();

  // belum login
  if (!user) {
    return <NotFound />;
  }

  // role tidak sesuai
  if (requiredRole && userRole !== requiredRole) {
    return <NotFound />;
  }

  return children;
}
