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

  const menus = [
    {
      title: "MAIN MENU",
      items: [
        {
          name: "Dashboard",
          icon: <MdSpaceDashboard />,
          path: "/admin/dashboard",
        },
        {
          name: "Daftar Booking",
          icon: <AiOutlineUnorderedList />,
          path: "/admin/orders", // ✅ sesuai Orders.jsx
        },
      ],
    },
    {
      title: "MANAJEMEN",
      items: [
        {
          name: "Data Pelanggan",
          icon: <AiOutlineUser />,
          path: "/admin/customers",
        },
        {
          name: "Status Lapangan",
          icon: <MdSportsTennis />,
          path: "/admin/status-lapangan", // ✅ konsisten
        },
      ],
    },
    {
      title: "MONITORING",
      items: [
        {
          name: "Laporan Bulanan",
          icon: <MdBarChart />,
          path: "/admin/reports", // ✅ dari Reports.jsx
        },
        {
          name: "Statistik Ramal",
          icon: <MdBarChart />,
          path: "/admin/statistik",
        },
      ],
    },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h1 className="text-xl font-bold mb-6">SmashBooking</h1>

<<<<<<< HEAD
      {/* Menu */}
      {menus.map((section, index) => (
        <div key={index} className="mb-6">
          <p className="text-xs text-gray-400 mb-2">
            {section.title}
          </p>

          {section.items.map((item, i) => (
            <NavLink key={i} to={item.path} className={menuClass}>
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      ))}

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-400">
        © 2025 SmashBooking
      </div>
=======
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
>>>>>>> e3b00a9a6abd8dcd48ca9b13a99a413c1ee41b69
    </div>
  );
}