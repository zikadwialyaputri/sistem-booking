import { AiOutlineUser, AiOutlineCalendar } from "react-icons/ai";
import {
  MdSpaceDashboard,
  MdOutlineSportsTennis,
  MdOutlineAnalytics,
} from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";

const menuItems = [
  {
    section: "Main Menu",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: MdSpaceDashboard,
        active: true,
      },
      {
        id: "booking",
        label: "Daftar Booking",
        icon: AiOutlineCalendar,
      },
    ],
  },
  {
    section: "Manajemen",
    items: [
      {
        id: "customers",
        label: "Data Pelanggan",
        icon: AiOutlineUser,
      },
      {
        id: "court",
        label: "Status Lapangan",
        icon: MdOutlineSportsTennis,
      },
    ],
  },
  {
    section: "Monitoring (Owner)",
    items: [
      {
        id: "reports",
        label: "Laporan Bulanan",
        icon: HiOutlineDocumentReport,
      },
      {
        id: "stats",
        label: "Statistik Ramai",
        icon: MdOutlineAnalytics,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className="flex min-h-screen w-72 flex-col bg-white p-6 shadow-xl border-r border-gray-100">
      {/* Logo */}
      <div className="flex flex-col px-4 mb-8">
        <div className="flex items-center space-x-3">
          <MdOutlineSportsTennis className="text-3xl text-blue-600" />
          <div className="font-bold text-xl text-slate-800">
            Smash<span className="text-blue-600">Booking</span>
          </div>
        </div>
        <span className="text-[10px] mt-2 font-bold text-gray-400 uppercase tracking-widest">
          Manajemen Lapangan
        </span>
      </div>

      {/* Menu */}
      <div className="flex-grow">
        {menuItems.map((section, index) => (
          <div key={index} className="mt-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase px-4 mb-2">
              {section.section}
            </p>

            <ul className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <div
                      className={`flex items-center rounded-xl p-3 cursor-pointer transition-all
                        ${
                          item.active
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                    >
                      <Icon className="mr-4 text-xl" />
                      {item.label}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="px-2">
          <span className="text-[11px] font-bold text-gray-500 uppercase">
            Badminton Court System
          </span>
          <p className="text-[10px] text-gray-400">
            &copy; 2026 SmashBooking v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
