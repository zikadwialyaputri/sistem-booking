import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const navClass = ({ isActive }) =>
    isActive
      ? "relative text-blue-600 font-semibold after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[3px] after:bg-blue-600 after:rounded-full"
      : "relative text-gray-700 hover:text-blue-600 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:w-0 after:h-[3px] after:bg-blue-600 after:rounded-full hover:after:w-full after:transition-all after:duration-300";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition duration-300">
            🏸
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Smash<span className="text-blue-600">Booking</span>
            </h1>

            <p className="text-xs text-gray-500 tracking-wide">
              Sistem Booking Lapangan Badminton GOR Gabus
            </p>
          </div>

        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium">

          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/booking" className={navClass}>
            Booking
          </NavLink>

          <NavLink to="/about" className={navClass}>
            Tentang
          </NavLink>

        </nav>

        {/* Button */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Daftar
          </Link>

        </div>

      </div>
    </header>
  );
}