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

  return (
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col min-h-screen">
      
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-blue-600">SmashBooking</h1>
        <p className="text-sm text-gray-400">Manajemen Lapangan</p>
      </div>

      {/* MAIN MENU */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-2">MAIN MENU</p>

        <NavLink to="/admin/dashboard" className={menuClass}>
          <MdSpaceDashboard className="mr-3" />
          Dashboard
        </NavLink>

        <NavLink to="/admin/bookings" className={menuClass}>
          <AiOutlineUnorderedList className="mr-3" />
          Daftar Booking
        </NavLink>
      </div>

      {/* MANAJEMEN */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-2">MANAJEMEN</p>

        <NavLink to="/admin/customers" className={menuClass}>
          <AiOutlineUser className="mr-3" />
          Data Pelanggan
        </NavLink>

        <NavLink to="/admin/lapangan" className={menuClass}>
          <MdSportsTennis className="mr-3" />
          Status Lapangan
        </NavLink>
      </div>

      {/* MONITORING */}
      <div>
        <p className="text-xs text-gray-400 mb-2">MONITORING</p>

        <NavLink to="/admin/laporan" className={menuClass}>
          <MdBarChart className="mr-3" />
          Laporan Bulanan
        </NavLink>

        <NavLink to="/admin/statistik" className={menuClass}>
          <MdBarChart className="mr-3" />
          Statistik Ramai
        </NavLink>
      </div>

      <div className="mt-auto text-xs text-gray-400">
        © 2025 SmashBooking
      </div>
    </div>
  );
}