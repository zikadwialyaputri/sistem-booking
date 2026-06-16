import { useState } from "react";
import {
  FaUser,
  FaBell,
  FaSignOutAlt,
  FaClock,
  FaCheckCircle,
  FaHistory,
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

  const stats = [
    {
      title: "Menunggu",
      value: 2,
      icon: <FaClock />,
      link: "/pelanggan/riwayat?status=menunggu",
    },
    {
      title: "Disetujui",
      value: 8,
      icon: <FaCheckCircle />,
      link: "/pelanggan/riwayat?status=disetujui",
    },
    {
      title: "Selesai",
      value: 2,
      icon: <FaHistory />,
      link: "/pelanggan/riwayat?status=selesai",
    },
  ];
const [profile] = useState({
  name: "Nene",
  foto: "https://i.pravatar.cc/100?img=12",
});
  const jadwalHariIni = [
    {
      lapangan: "Lapangan 1",
      jam: "18.00 - 20.00",
      status: "Terisi",
    },
    {
      lapangan: "Lapangan 2",
      jam: "20.00 - 22.00",
      status: "Kosong",
    },
  ];

  const riwayat = [
    {
      lapangan: "Lapangan 2",
      tanggal: "15 Juni",
      status: "Disetujui",
    },
    {
      lapangan: "Lapangan 1",
      tanggal: "10 Juni",
      status: "Selesai",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Disetujui":
        return "bg-green-100 text-green-700";

      case "Selesai":
        return "bg-blue-100 text-blue-700";

      case "Terisi":
        return "bg-red-100 text-red-600";

      case "Kosong":
        return "bg-green-100 text-green-600";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">
      {/* TOP BAR */}
      <div className="absolute top-5 right-5 flex items-center gap-4 z-20">
        <FaBell
          onClick={() => navigate("/pelanggan/notifikasi")}
          className="text-white text-xl cursor-pointer hover:scale-110 transition"
        />

        {/* PROFILE */}
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow cursor-pointer"
          >
            <img
              src={profile.foto}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />

            <span className="text-sm font-semibold text-gray-700">
              {profile.name}
            </span>

            <FaUser className="text-gray-500 text-sm" />
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl p-3">
              <button
                onClick={() => navigate("/pelanggan/profile")}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
              >
                <FaUser />
                Profil Saya
              </button>

              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="w-full text-left px-3 py-2 hover:bg-red-100 text-red-500 rounded flex items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-700/70 to-indigo-700/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">
        {/* WELCOME */}
        <div className="text-white mb-10">
          <h1 className="text-4xl font-bold">Halo, Nene 👋</h1>

          <p className="text-blue-100 mt-2">
            Selamat datang kembali di Sistem Booking Lapangan Badminton
          </p>
        </div>

        {/* BOOKING BERIKUTNYA */}
        <div className="bg-white rounded-3xl shadow-lg border-l-8 border-blue-500 p-6 mb-8 hover:shadow-2xl transition">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold">Booking Berikutnya</h2>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                nextBooking.status,
              )}`}
            >
              {nextBooking.status}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400 text-sm">Lapangan</p>

              <p className="font-bold text-lg">{nextBooking.lapangan}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Tanggal</p>

              <p className="font-bold">{nextBooking.tanggal}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Jam</p>

              <p className="font-bold">{nextBooking.jam}</p>
            </div>
          </div>
        </div>

        {/* STATISTIK */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {stats.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.link)}
              className="bg-white rounded-3xl p-5 shadow cursor-pointer hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-gray-500">{item.title}</h3>

              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* JADWAL */}
        <div className="bg-white rounded-3xl p-6 shadow mb-8">
          <h2 className="font-bold text-xl mb-5">Jadwal Hari Ini</h2>

          {jadwalHariIni.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <p className="font-semibold">{item.lapangan}</p>

                <p className="text-sm text-gray-500">🕒 {item.jam}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  item.status,
                )}`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* RIWAYAT */}
        <div className="bg-white rounded-3xl p-6 shadow">
          <h2 className="font-bold text-xl mb-5">Riwayat Terakhir</h2>

          {riwayat.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <p className="font-semibold">{item.lapangan}</p>

                <p className="text-sm text-gray-500">📅 {item.tanggal}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  item.status,
                )}`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
