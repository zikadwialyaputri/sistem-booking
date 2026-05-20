import { NavLink, Link } from "react-router-dom";

export default function Navbar() {

  const navClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600 transition-all";

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-blue-600">
          SmashBooking
        </h1>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-10 text-sm">

          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/booking" className={navClass}>
            Booking
          </NavLink>

          <NavLink to="/about" className={navClass}>
            About
          </NavLink>

        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-6 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-2xl transition-all font-semibold shadow-lg shadow-blue-200"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </header>
  );
}