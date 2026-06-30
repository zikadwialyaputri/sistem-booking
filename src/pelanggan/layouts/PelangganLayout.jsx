import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Pastikan react-icons sudah terinstall
import Sidebar from "../components/Sidebar";

export default function PelangganLayout() {
  // 1. Buat state untuk mengontrol buka/tutup sidebar di layar kecil
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-100 text-slate-700 font-sans flex antialiased relative">
      
      {/* 2. SIDEBAR */}
      {/* Kita oper state & fungsi close ke komponen Sidebar supaya sinkron */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 3. AREA KONTEN UTAMA */}
      {/* md:ml-72 memberikan jarak di sebelah kiri agar konten tidak tertutup sidebar desktop */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-72">
        
        {/* ========================================================= */}
        {/* TOP NAVBAR RESPONSIVE (Hanya muncul di layar HP / Split)   */}
        {/* ========================================================= */}
        <header className="flex md:hidden items-center justify-between bg-white border-b border-slate-100 px-5 py-4 sticky top-0 z-30 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-50 border border-slate-100 flex items-center gap-2 font-bold text-xs transition"
          >
            <FaBars size={14} />
            <span>Menu</span>
          </button>
          <span className="font-bold text-xs text-blue-600 tracking-wider">SmashBooking</span>
        </header>

        {/* Sub-Header Breadcrumb Mini (Opsional untuk estetika desktop) */}
        <div className="hidden md:flex px-8 pt-6 pb-2 items-center gap-2 text-sm text-slate-500 font-semibold">
          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
          <span>SmashBooking / Pelanggan</span>
        </div>

        {/* 4. MAIN RENDER AREA */}
        <main className="p-4 md:p-8 pt-2 md:pt-2 flex-1 w-full max-w-[1600px] mx-auto">
          <div className="bg-white rounded-2xl shadow-sm min-h-full p-6">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}