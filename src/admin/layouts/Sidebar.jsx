import {
  MdSpaceDashboard,
  MdSportsTennis,
  MdBarChart
} from "react-icons/md";


import {
  AiOutlineUnorderedList,
  AiOutlineUser
} from "react-icons/ai";


import { NavLink } from "react-router-dom";


export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex items-center p-3 rounded-lg transition-all ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
    }`;


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
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col min-h-screen">
     
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-blue-600">SmashBooking</h1>
        <p className="text-sm text-gray-400">Manajemen Lapangan</p>
      </div>


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
    </div>
  );
}

