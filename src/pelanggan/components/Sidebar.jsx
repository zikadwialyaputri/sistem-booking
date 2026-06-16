import {
  MdSpaceDashboard,
  MdSportsTennis,
  MdHistory,
} from "react-icons/md";
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
          path: "/pelanggan",
        },
        {
          name: "Booking Lapangan",
          icon: <MdSportsTennis size={22} />,
          path: "/pelanggan/booking",
        },
        {
          name: "Riwayat Booking",
          icon: <MdHistory size={22} />,
          path: "/pelanggan/riwayat",
        },
      ],
    },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-gray-100 shadow-sm flex flex-col">

      {/* HEADER */}
      <div className="px-6 py-8 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600">
          SmashBooking
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Portal Pelanggan
        </p>
      </div>

      {/* MENU */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {menus.map((section, index) => (
          <div key={index} className="mb-8">

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
              {section.title}
            </p>

            <div className="space-y-2">
              {section.items.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.path}
                  end={item.path === "/pelanggan"}
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

      {/* FOOTER */}
      <div className="mt-auto px-6 py-4 border-t border-gray-100 text-xs text-gray-400 bg-white">
        © 2025 SmashBooking
      </div>

    </aside>
  );
}