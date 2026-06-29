import { useState, useEffect, useRef } from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaTimesCircle,
  FaUserCircle,
  FaSignOutAlt,
  FaCalendarDay,
  FaCircle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService";

export default function Dashboard() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [openProfile, setOpenProfile] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState({ name: "", foto: "" });

  useEffect(() => {
    loadData();

    // Ambil data user login dari localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    setProfile({
      name: user?.nama || user?.username || "Petugas",
      foto: user?.foto || "",
    });

    // Event listener untuk menutup dropdown profil ketika klik di luar menu
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function loadData() {
    try {
      const data = await bookingService.getBookings();
      setBookings(data || []);
    } catch (err) {
      console.error("Gagal memuat data booking:", err);
    }
  }

  // ========================================================
  // MEMPROSES DATA UNIK & MENANGGULANGI DUPLIKAT (SAFE SCOPE)
  // ========================================================
  const uniqueBookings = Array.from(
    new Map(
      bookings.map((item) => [
        `${item.tanggal}_${item.jam_mulai}_${item.jam_selesai}_${item.lapangan?.id}_${item.users?.id}`,
        item,
      ])
    ).values()
  );

  const totalBooking = uniqueBookings.length;

  const pendingBooking = uniqueBookings.filter(
    (item) => item.status?.toLowerCase() === "pending"
  ).length;

  const rejectedBooking = uniqueBookings.filter(
    (item) => item.status?.toLowerCase() === "rejected" || item.status?.toLowerCase() === "dibatalkan"
  ).length;

  // Format tanggal lokal (YYYY-MM-DD) penyeimbang zona waktu runtime browser
  const todayLocalStr = new Date().toLocaleDateString("sv-SE"); 

  const todayBooking = uniqueBookings.filter((item) => {
    if (!item.tanggal) return false;
    return item.tanggal.startsWith(todayLocalStr);
  }).length;

  const stats = [
    {
      title: "TOTAL BOOKING",
      value: totalBooking,
      icon: <FaCalendarCheck size={18} />,
      badgeStyle: "bg-blue-50 text-blue-500",
      path: "/petugas/booking",
    },
    {
      title: "MENUNGGU KONFIRMASI",
      value: pendingBooking,
      icon: <FaClock size={18} />,
      badgeStyle: "bg-amber-50 text-amber-500",
      path: "/petugas/booking",
    },
    {
      title: "DIBATALKAN",
      value: rejectedBooking,
      icon: <FaTimesCircle size={18} />,
      badgeStyle: "bg-rose-50 text-rose-500",
      path: "/petugas/booking",
    },
    {
      title: "BOOKING HARI INI",
      value: todayBooking,
      icon: <FaCalendarDay size={18} />,
      badgeStyle: "bg-emerald-50 text-emerald-500",
      path: "/petugas/jadwal",
    },
  ];

  const pendingList = uniqueBookings
    .filter((x) => x.status?.toLowerCase() === "pending")
    .slice(0, 3);

  // Menampilkan seluruh jadwal hari ini yang berstatus aktif (bukan rejected)
  const jadwalHariIni = uniqueBookings.filter((item) => {
    if (!item.tanggal) return false;
    const isToday = item.tanggal.startsWith(todayLocalStr);
    const isNotRejected =
      item.status?.toLowerCase() !== "rejected" &&
      item.status?.toLowerCase() !== "dibatalkan";
    return isToday && isNotRejected;
  });

  return (
    <div className="w-full min-h-screen text-slate-700 font-sans antialiased">
      <div className="space-y-6">
        
        {/* 1. HERO BANNER (MODERN RADIAL DECORATION) */}
        <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-6 md:p-10 min-h-[180px] flex flex-col justify-end shadow-sm">
          <img
            src="/img/badminton.jpg"
            alt="badminton"
            className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none transform scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* BARIS TOP MENU (BADGE & PROFIL) */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-20">
            <span className="inline-block text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-md bg-white/10 text-white/90 backdrop-blur-md">
              PETUGAS
            </span>

            {/* Kontainer Dropdown Profil */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-full shadow-sm text-white text-xs font-bold backdrop-blur-md active:scale-95"
              >
                <span className="tracking-tight hidden sm:inline">{profile.name}</span>
                {profile.foto ? (
                  <img src={profile.foto} className="w-6 h-6 rounded-full object-cover ring-2 ring-white/20" alt="Profile" />
                ) : (
                  <FaUserCircle size={16} className="text-white/90" />
                )}
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-50 text-slate-700">
                  <button
                    onClick={() => { navigate("/petugas/profile"); setOpenProfile(false); }}
                    className="w-full px-3 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition flex gap-2.5 items-center"
                  >
                    <FaUserCircle size={14} className="text-slate-400" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 font-black rounded-lg transition flex gap-2.5 items-center border-t border-slate-100 mt-1"
                  >
                    <FaSignOutAlt size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Teks Sapaan Utama */}
          <div className="relative z-10 mt-10 md:mt-0">
            <h1 className="text-2xl md:text-[32px] font-black tracking-tight text-white leading-tight">
              Halo, {profile.name}!
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1 opacity-90 font-medium">
              Selamat datang kembali, semoga harimu produktif! 👋
            </p>
          </div>
        </div>

        {/* 2. STATISTIK KARTU (GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-[20px] p-6 border border-slate-100 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between group"
            >
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">{item.title}</p>
                <h3 className="text-[28px] font-black tracking-tight text-slate-800 leading-none">{item.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${item.badgeStyle}`}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 3. SUB MONITORING JADWAL & ANTRIAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Kolom Menunggu Konfirmasi */}
          <div className="bg-white rounded-[22px] border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-50 pb-3 text-sm md:text-base">
                <span className="text-amber-500">⏳</span> Booking Menunggu Konfirmasi
              </h3>
              <div className="divide-y divide-slate-50">
                {pendingList.length > 0 ? (
                  pendingList.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.users?.nama || item.users?.username || "-"}</p>
                        <p className="text-xs text-slate-400 mt-1 font-semibold">
                          {item.lapangan?.nama || "-"} • <span className="font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[11px]">{item.jam_mulai?.slice(0, 5)} - {item.jam_selesai?.slice(0, 5)}</span>
                        </p>
                      </div>
                      <span className="bg-amber-50 text-amber-600 font-bold px-3 py-1 rounded-xl text-[11px] border border-amber-100 shadow-sm animate-pulse">
                        Menunggu
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400 text-xs italic font-medium">Tidak ada antrean saat ini</div>
                )}
              </div>
            </div>
          </div>

          {/* Kolom Status Lapangan */}
          <div className="bg-white rounded-[22px] border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-50 pb-3 text-sm md:text-base">
                <span className="text-blue-500">🏸</span> Status Lapangan Saat Ini (Hari Ini)
              </h3>
              <div className="divide-y divide-slate-50">
                {jadwalHariIni.length > 0 ? (
                  jadwalHariIni.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0">
                      <div>
                        <span className="font-bold text-slate-800 text-sm">{item.lapangan?.nama || "-"}</span>
                        <p className="text-xs text-slate-400 mt-1 font-semibold">Penyewa: {item.users?.nama || "-"}</p>
                      </div>
                      <span className={`font-bold px-3 py-1 rounded-xl text-[11px] flex items-center gap-1.5 border shadow-sm ${
                        item.status?.toLowerCase() === "success" || item.status?.toLowerCase() === "approved"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}>
                        <FaCircle size={6} className={item.status?.toLowerCase() === "success" || item.status?.toLowerCase() === "approved" ? "text-emerald-500 animate-ping" : "text-amber-500"} />
                        {item.status?.toLowerCase() === "success" || item.status?.toLowerCase() === "approved" ? "Disetujui" : "Menunggu"}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400 text-xs italic font-medium">Semua lapangan kosong hari ini</div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* 4. MANIFEST TABEL UTAMA */}
        <div className="bg-white rounded-[22px] border border-slate-100 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
            <span className="text-blue-600">📅</span> Manifest Jadwal Pertandingan Hari Ini
          </h3>
          
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-[11px] uppercase bg-slate-50/70 text-slate-400 border-b border-slate-100 font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Lapangan</th>
                  <th className="px-6 py-4">Jam Main</th>
                  <th className="px-6 py-4">Nama Pelanggan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jadwalHariIni.length > 0 ? (
                  jadwalHariIni.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{item.lapangan?.nama || "-"}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md text-xs shadow-sm">
                          {item.jam_mulai?.slice(0, 5)} - {item.jam_selesai?.slice(0, 5)} WIB
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-semibold">{item.users?.nama || item.users?.username || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-12 text-slate-400 italic text-xs font-medium bg-slate-50/10">
                      Belum ada agenda pertandingan terjadwal untuk hari ini
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}