import { useEffect, useState } from "react";
import {
  FaUser,
  FaBell,
  FaSignOutAlt,
  FaClock,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
const [showNotif, setShowNotif] = useState(false);
const [profile] = useState({
  name: user?.username || "User",
  foto: user?.foto || "https://i.pravatar.cc/100?img=12",
});

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (!error) setBookings(data || []);
    };

    fetchData();
  }, []);

  const nextBooking = bookings.find(
    (b) => b.status === "pending" || b.status === "approved"
  );

  const stats = [
    {
      title: "Menunggu",
      value: bookings.filter((b) => b.status === "pending").length,
      icon: <FaClock />,
      link: "/pelanggan/riwayat?status=pending",
    },
    {
      title: "Disetujui",
      value: bookings.filter((b) => b.status === "approved").length,
      icon: <FaCheckCircle />,
      link: "/pelanggan/riwayat?status=approved",
    },
    {
      title: "Selesai",
      value: bookings.filter((b) => b.status === "done").length,
      icon: <FaHistory />,
      link: "/pelanggan/riwayat?status=done",
    },
  ];

  const today = new Date().toISOString().split("T")[0];

  const jadwalHariIni = bookings
    .filter((b) => b.tanggal === today)
    .map((b) => ({
      lapangan: `Lapangan ${b.lapangan_id}`,
      jam: `${b.jam_mulai} - ${b.jam_selesai}`,
      status: b.status,
    }));

  const riwayat = bookings.slice(0, 5).map((b) => ({
    lapangan: `Lapangan ${b.lapangan_id}`,
    tanggal: b.tanggal,
    status: b.status,
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "done":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300 animate-pulse";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "⏳ Pending";
      case "approved":
        return "✔ Disetujui";
      case "done":
        return "🏁 Selesai";
      case "rejected":
        return "❌ Ditolak";
      default:
        return status;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-300/30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-indigo-300/30 blur-3xl rounded-full animate-pulse"></div>

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-72 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-blue-900/60 to-indigo-900/70"></div>
      </div>

      {/* TOP BAR */}
      {/* TOP BAR */}
<div className="absolute top-5 right-5 flex items-center gap-4 z-20">

  {/* NOTIF */}
  <div className="relative">
    <FaBell
      className="text-white text-xl cursor-pointer"
      onClick={() => setShowNotif(!showNotif)}
    />

    {showNotif && (
      <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl p-4">
        <p className="font-bold mb-2">Notifikasi</p>
        <p className="text-sm text-gray-500">
          Belum ada notifikasi
        </p>
      </div>
    )}
  </div>

  {/* PROFILE */}
{/* PROFILE */}
<div className="relative">
  <div
    onClick={() => setShowProfile(!showProfile)}
    className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full shadow cursor-pointer"
  >
    <img src={profile.foto} className="w-8 h-8 rounded-full" />
    <span className="text-sm font-semibold">{profile.name}</span>
    👤
  </div>

  {showProfile && (
    <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl p-4 space-y-3 z-50">

      {/* USER INFO */}
      <div className="flex items-center gap-2">
        <img src={profile.foto} className="w-10 h-10 rounded-full" />
        <p className="font-bold">{profile.name}</p>
      </div>

      <hr />

      {/* EDIT PROFILE */}
      <button
        onClick={() => navigate("/pelanggan/profile")}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Edit Profile
      </button>

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>

    </div>
  )}
</div>

</div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        {/* WELCOME */}
        <div className="text-white mb-10 mt-20">
          <h1 className="text-4xl font-bold">
            👋 Halo, {profile.name}
          </h1>
          <p className="text-blue-100">
            Selamat datang kembali
          </p>
        </div>

        {/* NEXT BOOKING */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">🔥 Booking Berikutnya</h2>

          {nextBooking ? (
            <div className="space-y-1">
              <p className="font-bold text-lg">
                🏸 Lapangan {nextBooking.lapangan_id}
              </p>
              <p>📅 {nextBooking.tanggal}</p>
              <p>🕒 {nextBooking.jam_mulai} - {nextBooking.jam_selesai}</p>

              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border mt-2 ${getStatusColor(nextBooking.status)}`}>
                {getStatusLabel(nextBooking.status)}
              </span>
            </div>
          ) : (
            <p className="text-gray-400">Belum ada booking</p>
          )}
        </div>

        {/* STATISTIK */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {stats.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.link)}
              className="bg-white rounded-3xl p-5 shadow hover:-translate-y-2 transition cursor-pointer"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-gray-500">{item.title}</h3>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* JADWAL */}
        <div className="bg-white rounded-3xl p-6 shadow mb-8">
          <h2 className="font-bold text-xl mb-5">📅 Jadwal Hari Ini</h2>

          {jadwalHariIni.length > 0 ? (
            jadwalHariIni.map((item, i) => (
              <div key={i} className="flex justify-between py-3 border-b">
                <div>
                  <p className="font-medium">🏸 {item.lapangan}</p>
                  <p className="text-sm text-gray-500">🕒 {item.jam}</p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                  {getStatusLabel(item.status)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Tidak ada jadwal hari ini</p>
          )}
        </div>

        {/* RIWAYAT */}
        <div className="bg-white rounded-3xl p-6 shadow">
          <h2 className="font-bold text-xl mb-5">📜 Riwayat</h2>

          {riwayat.map((item, i) => (
            <div key={i} className="flex justify-between py-3 border-b">
              <div>
                <p>🏸 {item.lapangan}</p>
                <p className="text-sm text-gray-500">📅 {item.tanggal}</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(item.status)}`}>
                {getStatusLabel(item.status)}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}