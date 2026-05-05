import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Daftar Booking", path: "/admin/bookings" },
    { name: "Status Lapangan", path: "/admin/lapangan" },
    { name: "Laporan", path: "/admin/laporan" },
    { name: "Statistik", path: "/admin/statistik" },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h1 className="text-xl font-bold mb-6">SmashBooking</h1>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`block p-3 rounded-lg mb-2 ${
            pathname === item.path
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}