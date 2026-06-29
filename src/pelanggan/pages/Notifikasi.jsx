import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { FaBell, FaArrowLeft, FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Notifikasi() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";

  useEffect(() => {
    fetchNotif();
  }, []);

  const fetchNotif = async () => {
    try {
      setLoading(true);

      if (!user) {
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("id", {
          ascending: false,
        });

      if (error) {
        console.log(error);
        return;
      }

      const uniqueBookings = [
        ...new Map(
          (data || []).map((item) => [
            item.id,
            item,
          ])
        ).values(),
      ];

      const formatted = uniqueBookings.map((b) => ({
        id: b.id,
        pesan:
          b.status === "approved"
            ? "✅ Booking Disetujui"
            : b.status === "rejected"
            ? "❌ Booking Ditolak"
            : b.status === "done"
            ? "🏁 Booking Selesai"
            : "⏳ Booking Sedang Diproses",
        tanggal: new Date(b.tanggal).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        lapangan: b.lapangan_id,
        jam: `${b.jam_mulai.slice(0, 5)} - ${b.jam_selesai.slice(0, 5)}`,
      }));

      setNotifications(formatted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-x-hidden p-4 md:p-8 text-slate-800">
      {/* BACKGROUND DECORATIVE BUBBLES */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-400/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-green-300/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        
        {/* BANNER HERO UTAMA */}
        <div className="relative rounded-3xl overflow-hidden shadow-md h-56 md:h-64 transition-all duration-300">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay gradasi gelap */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 via-slate-900/60 to-blue-950/40" />

          {/* KONTEN DI DALAM BANNER (Ditambahkan md:pb-14 agar tulisan naik ke atas) */}
          <div className="relative z-10 h-full w-full p-6 md:p-8 md:pb-14 flex flex-col justify-between">
            
            {/* TOMBOL BACK BULAT MINIMALIS DI DALAM BANNER */}
            <div className="flex items-center justify-start">
              <button
                onClick={() => navigate("/pelanggan")}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full p-2.5 transition-all duration-200 active:scale-95 border border-white/10"
                title="Kembali ke Dashboard"
              >
                <FaArrowLeft className="text-base md:text-lg" />
              </button>
            </div>

            {/* TEXT INFO UTAMA */}
            <div className="text-white">
              <p className="uppercase tracking-widest text-[9px] font-bold bg-blue-500/30 text-blue-200 w-fit px-2.5 py-1 rounded-full mb-2 backdrop-blur-sm">
                Portal Notifikasi
              </p>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
                <FaBell className="text-white text-xl md:text-3xl" />
                Semua Notifikasi
              </h1>
              <p className="mt-1 text-xs md:text-sm text-slate-300">
                Halo {username}, berikut riwayat pembaruan status booking kamu 👋
              </p>
            </div>

          </div>
        </div>

        {/* DAFTAR NOTIFIKASI */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-400">Memuat data...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
            <div className="text-4xl mb-3">🔔</div>
            <p className="text-sm font-medium text-slate-400">Belum ada notifikasi saat ini.</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-slate-800 mb-3 tracking-tight">
                      {item.pesan}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        <span>🏸</span>
                        <span>Lapangan {item.lapangan}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <FaCalendarAlt className="text-slate-400 text-xs" />
                        <span>{item.tanggal}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <FaRegClock className="text-slate-400 text-xs" />
                        <span>{item.jam}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}