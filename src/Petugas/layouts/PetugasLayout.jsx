import { Outlet, NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaList,
  FaCalendarAlt,
} from "react-icons/fa";

export default function PetugasLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r">
        {/* Logo */}
        <div className="p-8 border-b">
          <h1 className="text-4xl font-bold text-blue-600">
            SmashBooking
          </h1>
          <p className="text-gray-400 mt-2">Manajemen Booking</p>
        </div>

        <div className="p-6">
          {/* Main Menu */}
          <h3 className="text-gray-400 font-semibold mb-4 uppercase">
            Main Menu
          </h3>

          <nav className="space-y-2">
            <NavLink
              to="/petugas/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-4 rounded-2xl transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FaTachometerAlt size={20} />
              Dashboard
            </NavLink>

            <NavLink
              to="/petugas/booking"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-4 rounded-2xl transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FaList size={20} />
              Kelola Booking
            </NavLink>
          </nav>

          {/* Manajemen */}
          <h3 className="text-gray-400 font-semibold mt-10 mb-4 uppercase">
            Manajemen
          </h3>

          <NavLink
            to="/petugas/jadwal"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <FaCalendarAlt size={20} />
            Status Jadwal
          </NavLink>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}