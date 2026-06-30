import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#f4f7fe] text-slate-700 font-sans flex overflow-x-hidden antialiased">
      
      {/* 1. SIDEBAR DESKTOP: Selalu ada di layar laptop/komputer tanpa hilang */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0 z-40 bg-white border-r border-slate-100">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </aside>

      {/* 2. SIDEBAR MOBILE: Hanya aktif saat klik menu di HP */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden transition-transform duration-300 ease-in-out z-50 w-64 bg-white`}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Backdrop Hitam Transparan di HP */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-900/30 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* 3. AREA KONTEN UTAMA: Otomatis nempel jepret di sebelah kanan sidebar */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* HEADER MOBILE (Hanya merender tombol menu di layar HP) */}
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Konten Halaman (Dashboard, Status Lapangan, dll) */}
        <main className="w-full p-4 md:p-6 lg:p-8 flex-1">
          <Outlet />
        </main>
      </div>

    </div>
  );
}