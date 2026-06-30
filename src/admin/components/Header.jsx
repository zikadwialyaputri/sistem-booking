import { FaBars } from "react-icons/fa";

export default function Header({ onMenuClick }) {
  return (
    // Hanya muncul di HP (md:hidden). Di desktop (layar komputer) komponen ini tersembunyi total!
    <header className="flex md:hidden items-center justify-between bg-white border-b border-slate-100 px-5 py-4 sticky top-0 z-30 shadow-sm">
      
      {/* Tombol Menu Mobile */}
      <button 
        onClick={onMenuClick}
        className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-50 border border-slate-100 flex items-center gap-2 font-bold text-xs"
      >
        <FaBars size={14} />
        <span>Menu</span>
      </button>

      {/* Teks SmashBooking Kecil */}
      <span className="font-bold text-xs text-blue-600 tracking-wider">
        SmashBooking
      </span>
      
    </header>
  );
}