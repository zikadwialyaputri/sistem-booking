import { useState } from "react";
import {
  FaUser,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  const nextBooking = {
    lapangan: "Lapangan 2",
    tanggal: "20 Juni 2026",
    jam: "18.00 - 20.00",
    status: "Disetujui",
  };

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* TOP BAR */}
      <div className="absolute top-5 right-5 flex items-center gap-4 z-20">

        {/* NOTIFIKASI */}
        <FaBell
          onClick={() => navigate("/pelanggan/notifikasi")}
          className="text-white text-xl cursor-pointer hover:scale-110 transition"
        />

        {/* PROFILE */}
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
          >
            <FaUser />
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl p-3">
              <button
                onClick={() => navigate("/pelanggan/profile")}
                className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
              >
                Profil Saya
              </button>

              <button
                onClick={() => alert("Logout")}
                className="w-full text-left px-2 py-2 hover:bg-red-100 text-red-500 rounded flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BACKGROUND EFFECT */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt="badminton"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        {/* WELCOME */}
        <div className="text-white mb-10">
          <h1 className="text-4xl font-bold mb-2">
            Halo, Nene 👋
          </h1>
          <p className="text-blue-100 max-w-2xl">
            Selamat datang kembali di Sistem Booking Lapangan Badminton.
          </p>
        </div>

        {/* NEXT BOOKING (TETAP) */}
        <div className="bg-white rounded-2xl shadow-xl border p-6 mb-8">
          <h2 className="text-xl font-bold mb-5">
            Booking Berikutnya
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <div>
              <p className="text-gray-400 text-sm">Lapangan</p>
              <p className="font-semibold">{nextBooking.lapangan}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Tanggal</p>
              <p className="font-semibold">{nextBooking.tanggal}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Jam</p>
              <p className="font-semibold">{nextBooking.jam}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Status</p>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {nextBooking.status}
              </span>
            </div>

          </div>
        </div>

        {/* MENU CEPAT DIHAPUS */}
        {/* sudah tidak ada Booking / Riwayat / Profil card lagi */}

      </div>
    </div>
  );
}