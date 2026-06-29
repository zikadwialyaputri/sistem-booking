import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaList, 
  FaCalendarAlt, 
  FaBars, 
  FaTimes 
} from "react-icons/fa";

export default function PetugasLayout() {
  // State untuk mengontrol buka/tutup menu di layar HP
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#f4f7fe] text-slate-700 font-sans flex antialiased">
      
      {/* ========================================================= */}
      {/* 1. SIDEBAR LIGHT THEME (SESUAI GAMBAR MOCKUP)            */}
      {/* ========================================================= */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white text-slate-600 flex flex-col justify-between border-r border-slate-100 shadow-sm transition-transform duration-300 md:translate-x-0 md:fixed ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo & Judul Aplikasi */}
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h1 className="text-[26px] font-black tracking-tight text-blue-600 leading-none">
                SmashBooking
              </h1>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                Manajemen Lapangan
              </p>
            </div>

            {/* Tombol Close Sidebar (Hanya Muncul di HP) */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-50 md:hidden transition"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Menu Navigasi */}
          <div className="p-5 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
            
            {/* Bagian: MAIN MENU */}
            <div>
              <h3 className="text-slate-400 font-bold text-[11px] tracking-wider uppercase px-4 mb-3">
                Main Menu
              </h3>
              <nav className="space-y-1">
                <NavLink
                  to="/petugas/dashboard"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-bold"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`
                  }
                >
                  <FaTachometerAlt size={16} className="opacity-80 transition-transform group-hover:scale-105" />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/petugas/booking"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-bold"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`
                  }
                >
                  <FaList size={16} className="opacity-80 transition-transform group-hover:scale-105" />
                  Daftar Booking
                </NavLink>
              </nav>
            </div>

            {/* Bagian: MANAJEMEN */}
            <div>
              <h3 className="text-slate-400 font-bold text-[11px] tracking-wider uppercase px-4 mb-3">
                Manajemen
              </h3>
              <nav className="space-y-1">
                <NavLink
                  to="/petugas/jadwal"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-bold"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`
                  }
                >
                  <FaCalendarAlt size={16} className="opacity-80 transition-transform group-hover:scale-105" />
                  Status Lapangan
                </NavLink>
              </nav>
            </div>

          </div>
        </div>

        {/* Footer Sidebar */}
        <div className="px-8 py-5 border-t border-slate-50 text-[11px] font-semibold text-slate-400 bg-slate-50/30">
          © 2026 SmashBooking
        </div>
      </aside>

      {/* Backdrop Gelap sewaktu Sidebar Terbuka di Layar HP */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-900/20 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* ========================================================= */}
      {/* 2. KONTEN AREA UTAMA (SEBELAH KANAN)                     */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-72">
        
        {/* TOP NAVBAR MOBILE */}
        <header className="flex md:hidden items-center justify-between bg-white border-b border-slate-100 px-5 py-4 sticky top-0 z-30 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-50 border border-slate-100 flex items-center gap-2 font-bold text-xs"
          >
            <FaBars size={14} />
            <span>Menu</span>
          </button>
          <span className="font-bold text-xs text-blue-600 tracking-wider">SmashBooking</span>
        </header>

        {/* Sub-Header Breadcrumb Mini di atas Konten Utama */}
        <div className="hidden md:flex px-8 pt-6 pb-2 items-center gap-2 text-sm text-slate-500 font-semibold">
          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
          <span>SmashBooking</span>
        </div>

        {/* Main Render Area Area */}
        <main className="p-4 md:p-8 pt-2 md:pt-2 flex-1 w-full max-w-[1600px] mx-auto">
          {/* Seluruh isi Dashboard baru yang super bersih akan otomatis masuk ke sini */}
          <Outlet />
        </main>
      </div>

    </div>
  );
}