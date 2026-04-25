import {
  FaCalendarCheck,
  FaClock,
  FaTimesCircle,
  FaWallet,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <div id="dashboard-wrapper" className="relative bg-gray-100 min-h-screen">
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        {/* FOTO BACKGROUND */}
        <img
          src="/public/img/badminton.jpg" 
          alt="badminton"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-500/60 to-indigo-600/80"></div>
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-0 w-72 h-72 bg-indigo-400 opacity-20 rounded-full blur-3xl"></div>
      </div>

      {/* 2. Konten Utama */}
      <div className="relative z-10 p-5 md:p-10">
        {/* PageHeader (Judul & Tombol Tambah) */}
        <PageHeader />
        <div
          id="dashboard-grid"
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {/* Total Booking */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-b-4 border-blue-500 transform hover:scale-105 transition-transform">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase">
                Total Booking
              </p>
              <h3 className="text-2xl font-bold text-gray-800">350</h3>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg text-white shadow-blue-200 shadow-lg">
              <FaCalendarCheck size={20} />
            </div>
          </div>

          {/* Menunggu Konfirmasi */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-b-4 border-orange-500 transform hover:scale-105 transition-transform">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase">
                Menunggu
              </p>
              <h3 className="text-2xl font-bold text-gray-800">12</h3>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg text-white shadow-orange-200 shadow-lg">
              <FaClock size={20} />
            </div>
          </div>

          {/* Dibatalkan */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-b-4 border-red-500 transform hover:scale-105 transition-transform">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase">
                Dibatalkan
              </p>
              <h3 className="text-2xl font-bold text-gray-800">40</h3>
            </div>
            <div className="bg-red-500 p-3 rounded-lg text-white shadow-red-200 shadow-lg">
              <FaTimesCircle size={20} />
            </div>
          </div>

          {/* Estimasi Pendapatan */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-b-4 border-green-500 transform hover:scale-105 transition-transform">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase">
                Pendapatan
              </p>
              <h3 className="text-2xl font-bold text-gray-800 text-nowrap">
                Rp 4.5jt
              </h3>
            </div>
            <div className="bg-green-500 p-3 rounded-lg text-white shadow-green-200 shadow-lg">
              <FaWallet size={20} />
            </div>
          </div>
        </div>

        {/* Grafik Section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-700 text-lg">
              Grafik Okupansi Lapangan
            </h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">
              Lihat Laporan Lengkap
            </button>
          </div>
          <div className="h-72 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 italic">
            [ Area Grafik Visualisasi Booking Bulanan ]
          </div>
        </div>
      </div>
    </div>
  );
}
