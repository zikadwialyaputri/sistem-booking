import { MdSpaceDashboard, MdSportsTennis, MdBarChart } from "react-icons/md";

import { AiOutlineUnorderedList, AiOutlineUser } from "react-icons/ai";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
    ${
      isActive
        ? "bg-blue-100 text-blue-600 shadow-sm"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  const menus = [
    {
      title: "MAIN MENU",
      items: [
        {
          name: "Dashboard",
          icon: <MdSpaceDashboard size={22} />,
          path: "/admin",
        },
        {
          name: "Daftar Booking",
          icon: <AiOutlineUnorderedList size={22} />,
          path: "/admin/orders",
        },
      ],
    },
    {
      title: "MANAJEMEN",
      items: [
        {
          name: "Data Pelanggan",
          icon: <AiOutlineUser size={22} />,
          path: "/admin/customers",
        },
        {
          name: "Status Lapangan",
          icon: <MdSportsTennis size={22} />,
          path: "/admin/status-lapangan",
        },
      ],
    },
    {
      title: "MONITORING",
      items: [
        {
          name: "Laporan Bulanan",
          icon: <MdBarChart size={22} />,
          path: "/admin/reports",
        },
        {
          name: "Statistik Ramal",
          icon: <MdBarChart size={22} />,
          path: "/admin/statistik",
        },
      ],
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 shadow-sm flex flex-col">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600">SmashBooking</h1>

        <p className="text-sm text-gray-400 mt-1">Manajemen Lapangan</p>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {menus.map((section, index) => (
          <div key={index} className="mb-8">
            {/* Section Title */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
              {section.title}
            </p>

            {/* Menu Items */}
            <div className="space-y-2">
              {section.items.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.path}
                  end={item.path === "/admin"}
                  className={menuClass}
                >
                  {item.icon}

                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-400">
        © 2025 SmashBooking
      </div>
    </aside>
  );
}
