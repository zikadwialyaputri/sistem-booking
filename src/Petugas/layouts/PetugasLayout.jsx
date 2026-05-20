import { Outlet, NavLink } from "react-router-dom";

export default function PetugasLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">SmashBooking</h1>

        <nav className="space-y-3">
          <NavLink
            to="/petugas/dashboard"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-blue-700 font-semibold"
                  : "hover:bg-blue-500"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/petugas/booking"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-blue-700 font-semibold"
                  : "hover:bg-blue-500"
              }`
            }
          >
            Kelola Booking
          </NavLink>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
