import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <nav className="w-full z-10 bg-white/10 backdrop-blur-md border-b border-white/20">

      <div className="flex items-center justify-between px-6 md:px-10 py-4">

        {/* SEARCH */}
        <div className="hidden md:flex items-center w-1/3">
          <div className="relative w-full">

            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Cari booking, customer..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

          </div>
        </div>

        {/* TITLE MOBILE */}
        <div className="md:hidden text-white font-bold text-lg">
          SmashBooking
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3 text-black">

          <div className="hidden sm:block text-right">
            <p className="text-xs opacity-80">Welcome</p>
            <p className="text-sm font-bold">Kelompok 5</p>
          </div>

          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img
              src="/img/pp.jpg"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </nav>
  );
}