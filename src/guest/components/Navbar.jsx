import { NavLink, Link } from "react-router-dom";

export default function Navbar() {

  const navClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600"
      : "text-gray-600 hover:text-blue-600 transition-all relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 hover:after:w-full after:transition-all";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">
          SmashBooking
        </h1>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">

          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={navClass}>
            About
          </NavLink>

        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 font-semibold
            hover:bg-blue-50 hover:shadow-md transition-all duration-200"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold
            hover:bg-blue-700 hover:scale-105 hover:shadow-lg shadow-blue-200 transition-all duration-200"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </header>
  );
}