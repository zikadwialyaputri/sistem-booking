import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { FaCalendarAlt, FaClock, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";

export default function RiwayatBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); // State untuk detail popup

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      // Hapus booking duplikat
      const uniqueBookings = (data || []).filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (b) =>
              b.user_id === item.user_id &&
              b.lapangan_id === item.lapangan_id &&
              b.tanggal === item.tanggal &&
              b.jam_mulai === item.jam_mulai &&
              b.jam_selesai === item.jam_selesai
          )
      );

      setBookings(uniqueBookings);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const pending = bookings.filter((b) => b.status === "pending");
  const approved = bookings.filter((b) => b.status === "approved");
  const rejected = bookings.filter((b) => b.status === "rejected");
  const selesai = bookings.filter((b) => b.status === "done");

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { bg: "bg-amber-50 text-amber-700 border-amber-200/60", badge: "bg-amber-500" };
      case "approved":
        return { bg: "bg-emerald-50 text-emerald-700 border-emerald-200/60", badge: "bg-emerald-500" };
      case "rejected":
        return { bg: "bg-rose-50 text-rose-700 border-rose-200/60", badge: "bg-rose-500" };
      case "done":
        return { bg: "bg-blue-50 text-blue-700 border-blue-200/60", badge: "bg-blue-500" };
      default:
        return { bg: "bg-slate-50 text-slate-700 border-slate-200/60", badge: "bg-slate-500" };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending": return "Menunggu Konfirmasi";
      case "approved": return "Disetujui";
      case "rejected": return "Ditolak / Batal";
      case "done": return "Selesai";
      default: return status;
    }
  };

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderSection = (title, data, headingColor) => (
    <div className="bg-white rounded-[24px] shadow-xl shadow-slate-950/[0.02] p-6 border border-slate-200/60 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 border-b pb-3 border-slate-100">
          <h2 className={`text-sm font-black uppercase tracking-wider ${headingColor}`}>{title}</h2>
          <span className="bg-slate-50 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-100">
            {data.length} Item
          </span>
        </div>

        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {data.length > 0 ? (
            data.map((item) => {
              const colors = getStatusColor(item.status);
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedBooking(item)}
                  className="group border border-slate-100 bg-white rounded-xl p-3.5 hover:shadow-md hover:border-blue-500/30 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200">
                      🏸
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-sm tracking-tight">
                        Lapangan {item.lapangan_id}
                      </h3>
                      <p className="text-slate-400 text-[11px] font-medium mt-0.5 flex items-center gap-1">
                        <FaCalendarAlt size={10} className="text-slate-300" /> {formatTanggal(item.tanggal)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                    {/* Diubah agar menampilkan teks bahasa Indonesia yang rapi */}
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${colors.bg}`}>
                      {getStatusText(item.status)}
                    </span>
                    <span className="text-[11px] text-blue-500 font-bold group-hover:text-blue-600 flex items-center gap-1">
                      Detail <FaInfoCircle size={11} />
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs font-medium italic">
              Tidak ada aktivitas di kategori ini
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex justify-center items-center font-bold text-xs uppercase tracking-widest text-blue-600">
        <div className="animate-pulse">Memuat riwayat booking...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-700 font-sans antialiased bg-[#f8fafc] p-4 md:p-8 relative">
      
      {/* BACKGROUND DECORATION BLURS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute top-80 right-0 w-96 h-96 bg-indigo-400/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* BANNER UTAMA — SINKRON 100% SAMA SEPERTI DASHBOARD */}
        <div className="relative rounded-[28px] shadow-sm h-60 md:h-72 bg-slate-950 overflow-hidden">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Arena Background"
            className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/95 via-slate-900/75 to-blue-950/45 pointer-events-none" />
          
          <div className="relative z-10 h-full w-full p-8 md:p-12 flex flex-col justify-start items-start">
            <span className="uppercase tracking-widest text-[10px] font-bold bg-blue-500/20 text-blue-300 w-fit px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
              RIWAYAT AKTIVITAS
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
              Riwayat Booking
            </h1>
            <p className="text-slate-300 text-sm md:text-lg mt-3 font-medium max-w-sm md:max-w-2xl leading-relaxed opacity-90">
              Pantau status verifikasi pembayaran dan jadwal bermain badminton Anda secara real-time
            </p>
          </div>
        </div>

        {/* CONTAINER KONTEN BAWAH — Jarak Pas, Bebas Kehimpit */}
        <div className="px-1 md:px-2 pt-2 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderSection("⏳ Menunggu Konfirmasi", pending, "text-amber-600")}
            {renderSection("✅ Disetujui", approved, "text-emerald-600")}
            {renderSection("🏁 Selesai", selesai, "text-blue-600")}
            {renderSection("❌ Ditolak", rejected, "text-rose-600")}
          </div>
        </div>
      </div>

      {/* POPUP MODAL DETAIL (PREMIUM LUXURY RECEIPT DESIGN) */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
          <div className="bg-white rounded-[28px] w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
            
            {/* Header Modal */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold transition cursor-pointer"
              >
                ✕
              </button>
              <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Nota Validasi Digital</p>
              <h3 className="text-xl font-black mt-1.5 flex items-center gap-2 tracking-tight">
                🏸 Lapangan {selectedBooking.lapangan_id}
              </h3>
            </div>

            {/* Isi Detail Lengkap */}
            <div className="p-6 space-y-5 pb-8">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3.5">
                <div className="flex justify-between items-center text-xs border-b pb-2.5 border-slate-200/50">
                  <span className="text-slate-400 font-medium">ID Transaksi</span>
                  <span className="font-mono font-bold text-slate-700">#BK-{selectedBooking.id}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs border-b pb-2.5 border-slate-200/50">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5"><FaCalendarAlt className="text-blue-500" size={12}/> Tanggal</span>
                  <span className="font-bold text-slate-800">{formatTanggal(selectedBooking.tanggal)}</span>
                </div>

                <div className="flex justify-between items-center text-xs border-b pb-2.5 border-slate-200/50">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5"><FaClock className="text-blue-500" size={12}/> Jam Main</span>
                  <span className="font-black text-blue-600">
                    {selectedBooking.jam_mulai.substring(0, 5)} - {selectedBooking.jam_selesai.substring(0, 5)} WIB
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5"><FaMapMarkerAlt className="text-blue-500" size={12}/> ID Pemesan</span>
                  <span className="font-mono text-[10px] text-slate-500 max-w-[160px] truncate bg-slate-200/40 px-2 py-0.5 rounded border border-slate-200/30">
                    {selectedBooking.user_id}
                  </span>
                </div>
              </div>

              {/* Status Section */}
              <div className="flex flex-col items-center justify-center pt-2 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2.5">Status Saat Ini</p>
                <span className={`text-xs font-black px-4 py-1.5 rounded-full border tracking-wide ${getStatusColor(selectedBooking.status).bg}`}>
                  {getStatusText(selectedBooking.status).toUpperCase()}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}