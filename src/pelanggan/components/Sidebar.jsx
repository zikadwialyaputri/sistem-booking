import { MdSpaceDashboard, MdSportsTennis, MdHistory } from "react-icons/md";
import { FaTimes } from "react-icons/fa"; // Icon X untuk menutup menu di HP
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  // Fungsi styling dinamis untuk menu aktif & tidak aktif
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
    ${
      isActive
        ? "bg-blue-100 text-blue-600 shadow-sm font-bold"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  // Struktur Data Menu Navigasi Pelanggan
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
    <>
      {/* ========================================================= */}
      {/* SIDEBAR UTAMA (RESPONSIF DENGAN TRANSLATE ANIMATION)      */}
      {/* ========================================================= */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 shadow-sm flex flex-col transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER SIDEBAR (Logo & Tombol Close HP) */}
        <div className="px-6 py-8 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
              SmashBooking
            </h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">
              Portal Pelanggan
            </p>
          </div>

          {/* Tombol Close - Hanya muncul ketika layar HP atau Split Screen */}
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl text-gray-400 hover:bg-gray-50 md:hidden transition border border-gray-100"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* AREA LINK NAVIGASI */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          {menus.map((section, index) => (
            <div key={index} className="mb-8">
              {/* Judul Section Menu */}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
                {section.title}
              </p>

              {/* List Item NavLink */}
              <div className="space-y-2">
                {section.items.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.path}
                    end={item.path === "/pelanggan"} // Mencegah aktif bersamaan pada rute utama
                    onClick={() => setIsOpen(false)} // Otomatis menutup sidebar saat menu diklik di HP
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

        {/* FOOTER SIDEBAR */}
        <div className="mt-auto px-6 py-4 border-t border-gray-100 text-xs font-semibold text-gray-400 bg-gray-50/50">
          © 2026 SmashBooking
        </div>
      </aside>

      {/* ========================================================= */}
      {/* BACKDROP GELAP (Akan muncul di luar menu ketika di HP)     */}
      {/* ========================================================= */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} // Klik di area kosong luar menu untuk menutup
          className="fixed inset-0 bg-slate-900/20 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
        />
      )}
    </>
  );
}