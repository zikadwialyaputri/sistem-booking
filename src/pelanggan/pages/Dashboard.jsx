import { useEffect, useState } from "react";
import {
  FaBell,
  FaClock,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function Dashboard() {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showAllJadwal, setShowAllJadwal] = useState(false);
  const [showAllRiwayat, setShowAllRiwayat] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const profile = {
    name: user?.username || "User",
    foto: user?.foto || "https://i.pravatar.cc/100?img=12",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("tanggal", { ascending: true });

    if (!error) {
      const uniqueBookings = [
        ...new Map(
          (data || []).map((item) => [
            `${item.tanggal}-${item.jam_mulai}-${item.jam_selesai}-${item.lapangan_id}`,
            item,
          ])
        ).values(),
      ];

      setBookings(uniqueBookings);

      const notifData = uniqueBookings.map((item) => ({
        id: item.id,
        pesan:
          item.status === "approved"
            ? "✅ Booking Disetujui"
            : item.status === "rejected"
            ? "❌ Booking Ditolak"
            : item.status === "done"
            ? "🏁 Booking Selesai"
            : "⏳ Booking Diproses",
        tanggal: item.tanggal,
      }));

      setNotifications(notifData);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const stats = [
    {
      title: "Menunggu",
      value: bookings.filter((b) => b.status === "pending").length,
      icon: <FaClock />,
      color: "text-amber-500 bg-amber-50",
    },
    {
      title: "Disetujui",
      value: bookings.filter((b) => b.status === "approved").length,
      icon: <FaCheckCircle />,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      title: "Selesai",
      value: bookings.filter((b) => b.status === "done").length,
      icon: <FaHistory />,
      color: "text-blue-500 bg-blue-50",
    },
  ];

  const semuaJadwal = bookings.filter(
    (b) => b.tanggal === today && (b.status === "pending" || b.status === "approved")
  );

  const jadwal = showAllJadwal ? semuaJadwal : semuaJadwal.slice(0, 3);

  const semuaRiwayat = bookings.filter(
    (b) => b.status === "done" || b.status === "rejected"
  );

  const riwayat = showAllRiwayat ? semuaRiwayat : semuaRiwayat.slice(0, 3);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700 font-medium px-3 py-1 rounded-full text-xs capitalize";
      case "pending":
        return "bg-amber-100 text-amber-700 font-medium px-3 py-1 rounded-full text-xs capitalize";
      case "done":
        return "bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-xs capitalize";
      case "rejected":
        return "bg-rose-100 text-rose-700 font-medium px-3 py-1 rounded-full text-xs capitalize";
      default:
        return "bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full text-xs capitalize";
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-x-hidden p-4 md:p-8 text-slate-800">
      
      {/* BACKGROUND DECORATIVE BUBBLES */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-400/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-green-300/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-20 space-y-6">
        
        {/* BANNER HERO UTAMA */}
        <div className="relative rounded-3xl overflow-visible shadow-md h-60 md:h-72 transition-all duration-300 z-30">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <img
              src="/img/badminton.jpg"
              alt="Badminton Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/95 via-slate-900/75 to-blue-950/45" />
          </div>

          {/* KONTEN UTAMA BANNER */}
          <div className="relative z-10 h-full w-full p-6 md:p-10 flex flex-row justify-between items-start">
            
            {/* SISI KIRI: TEXT INFO UTAMA (DIPERBESAR & DI ATAS) */}
            <div className="text-white self-start pt-1">
              <p className="uppercase tracking-widest text-[10px] md:text-xs font-bold bg-blue-500/30 text-blue-200 w-fit px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
                Portal Pelanggan
              </p>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
                Halo, {profile.name}
              </h1>
              <p className="text-slate-300 text-sm md:text-lg mt-3 font-medium max-w-sm md:max-w-2xl leading-relaxed">
                Selamat datang kembali di portal pelanggan 👋
              </p>
            </div>

            {/* SISI KANAN: TOMBOL DROPDOWN NOTIF & PROFILE */}
            <div className="flex items-center gap-3 md:gap-4 self-start">
              
              {/* NOTIFIKASI DROP DOWN */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowNotif(!showNotif);
                    setShowProfile(false);
                  }}
                  className="p-3 bg-white/10 hover:bg-white/20 transition rounded-xl relative focus:outline-none backdrop-blur-sm border border-white/10"
                >
                  <FaBell className="text-xl text-white" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 w-5 h-5 rounded-full text-[10px] font-bold flex justify-center items-center border-2 border-slate-900">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {showNotif && (
                  <div className="absolute right-0 top-14 w-72 md:w-80 bg-white rounded-2xl shadow-2xl text-slate-800 z-50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-slate-50 border-b border-slate-100 p-4 text-sm font-semibold text-slate-700 flex justify-between items-center">
                      <span>🔔 Notifikasi Terbaru</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <p className="p-4 text-center text-xs text-slate-400">Tidak ada notifikasi</p>
                      ) : (
                        notifications.slice(0, 3).map((item) => (
                          <div key={item.id} className="p-4 hover:bg-slate-50 transition">
                            <p className="text-sm text-slate-700 font-medium">{item.pesan}</p>
                            <span className="text-[11px] text-slate-400 block mt-1">📅 {item.tanggal}</span>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-2 bg-slate-50 text-center border-t border-slate-100">
                      <button
                        onClick={() => navigate("/pelanggan/notifikasi")}
                        className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition w-full py-1"
                      >
                        Lihat Selengkapnya
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* PROFILE DROP DOWN */}
              <div className="relative">
                <img
                  src={profile.foto}
                  alt="Avatar"
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl border-2 border-white/50 cursor-pointer shadow-sm hover:scale-105 transition object-cover"
                  onClick={() => {
                    setShowProfile(!showProfile);
                    setShowNotif(false);
                  }}
                />

                {showProfile && (
                  <div className="absolute right-0 top-14 bg-white p-2 rounded-xl shadow-2xl w-52 text-slate-800 z-50 border border-slate-100">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="font-semibold text-sm text-slate-800 truncate">{profile.name}</p>
                      <p className="text-xs text-slate-400">Pelanggan</p>
                    </div>
                    <button
                      onClick={() => navigate("/pelanggan/profile")}
                      className="w-full text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 p-2 rounded-lg transition"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/login");
                      }}
                      className="w-full text-left text-sm text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition font-medium mt-1"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* STATISTIK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center justify-between transition hover:shadow-md duration-200"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-400 mb-1">{item.title}</span>
                <span className="text-3xl font-bold text-slate-800 tracking-tight">{item.value}</span>
              </div>
              <div className={`p-3 rounded-xl text-xl ${item.color}`}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* JADWAL HARI INI */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative z-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <span>📅</span> Jadwal Hari Ini
            </h2>
            {semuaJadwal.length > 3 && (
              <button 
                onClick={() => setShowAllJadwal(!showAllJadwal)}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                {showAllJadwal ? "Sembunyikan" : "Lihat Semua"}
              </button>
            )}
          </div>

          <div className="space-y-3">
            {jadwal.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-400">Tidak ada jadwal untuk hari ini.</p>
              </div>
            ) : (
              jadwal.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 hover:bg-slate-100/70 border border-slate-100 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-slate-700 text-sm sm:text-base">
                      🏸 Lapangan {item.lapangan_id}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span className="text-slate-500">🕒</span> {item.jam_mulai.slice(0,5)} - {item.jam_selesai.slice(0,5)}
                    </p>
                  </div>
                  <span className={getStatusColor(item.status)}>
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIWAYAT BOOKING */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative z-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <span>📜</span> Riwayat Booking
            </h2>
            {semuaRiwayat.length > 3 && (
              <button 
                onClick={() => setShowAllRiwayat(!showAllRiwayat)}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                {showAllRiwayat ? "Sembunyikan" : "Lihat Semua"}
              </button>
            )}
          </div>

          <div className="space-y-3">
            {riwayat.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-400">Belum ada riwayat booking.</p>
              </div>
            ) : (
              riwayat.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 hover:bg-slate-100/70 border border-slate-100 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-slate-700 text-sm sm:text-base">
                      🏸 Lapangan {item.lapangan_id}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span className="text-slate-500">📅</span> {item.tanggal}
                    </p>
                  </div>
                  <span className={getStatusColor(item.status)}>
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}