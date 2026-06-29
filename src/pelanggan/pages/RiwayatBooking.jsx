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
        return { bg: "bg-orange-100 text-orange-700 border-orange-200", badge: "bg-orange-500" };
      case "approved":
        return { bg: "bg-green-100 text-green-700 border-green-200", badge: "bg-green-500" };
      case "rejected":
        return { bg: "bg-red-100 text-red-700 border-red-200", badge: "bg-red-500" };
      case "done":
        return { bg: "bg-blue-100 text-blue-700 border-blue-200", badge: "bg-blue-500" };
      default:
        return { bg: "bg-gray-100 text-gray-700 border-gray-200", badge: "bg-gray-500" };
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

  const renderSection = (title, data) => (
    <div className="bg-white rounded-3xl shadow-md p-6 mb-6 border border-gray-100/50">
      <div className="flex items-center justify-between mb-4 border-b pb-3 border-gray-100">
        <h2 className="text-lg font-bold text-blue-800">{title}</h2>
        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
          {data.length} Transaksi
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {data.length > 0 ? (
          data.map((item) => {
            const colors = getStatusColor(item.status);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedBooking(item)}
                className="group border border-gray-100 bg-white rounded-2xl p-4 hover:shadow-xl hover:border-blue-500/30 transition duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                    <span className="text-xl">🏸</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">
                      Lapangan {item.lapangan_id}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                      <FaCalendarAlt className="inline text-gray-400" /> {formatTanggal(item.tanggal)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colors.bg}`}>
                    {getStatusText(item.status)}
                  </span>
                  <span className="text-xs text-blue-500 font-medium group-hover:underline flex items-center gap-1">
                    Detail <FaInfoCircle />
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm italic">
            Tidak ada riwayat aktivitas
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center font-medium text-blue-600">
        <div className="animate-pulse">Memuat riwayat booking...</div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden pb-12">
      {/* BACKGROUND BLUR */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* HEADER BANNER */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="relative z-10 p-5 md:p-10">
        <div className="text-white mb-10">
          <h1 className="text-4xl font-bold">Riwayat Booking</h1>
          <p className="text-blue-100 mt-2">
            Pantau status verifikasi dan jadwal main badminton kamu
          </p>
        </div>

        {/* SECTION GRID RIWAYAT RINGKAS */}
        <div className="grid md:grid-cols-2 gap-6">
          {renderSection("⏳ Menunggu Konfirmasi", pending)}
          {renderSection("✅ Disetujui", approved)}
          {renderSection("🏁 Selesai", selesai)}
          {renderSection("❌ Ditolak / Batal", rejected)}
        </div>
      </div>

      {/* POPUP MODAL DETAIL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
            
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-5 relative">
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition z-10"
              >
                ✕
              </button>
              <p className="text-xs text-blue-200 font-mono tracking-widest uppercase">Nota Validasi Digital</p>
              <h3 className="text-xl font-bold mt-1 flex items-center gap-2">
                🏸 Lapangan {selectedBooking.lapangan_id}
              </h3>
            </div>

            {/* Isi Detail Lengkap */}
            <div className="p-6 space-y-4 pb-8">
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center text-sm border-b pb-2 border-gray-200/60">
                  <span className="text-gray-500">ID Booking</span>
                  <span className="font-mono font-bold text-gray-700">#BK-{selectedBooking.id}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm border-b pb-2 border-gray-200/60">
                  <span className="text-gray-500 flex items-center gap-1.5"><FaCalendarAlt className="text-blue-500"/> Tanggal</span>
                  <span className="font-semibold text-gray-800">{formatTanggal(selectedBooking.tanggal)}</span>
                </div>

                <div className="flex justify-between items-center text-sm border-b pb-2 border-gray-200/60">
                  <span className="text-gray-500 flex items-center gap-1.5"><FaClock className="text-blue-500"/> Jam Main</span>
                  <span className="font-bold text-blue-600">
                    {selectedBooking.jam_mulai.substring(0, 5)} - {selectedBooking.jam_selesai.substring(0, 5)} WIB
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5"><FaMapMarkerAlt className="text-blue-500"/> ID Pemesan</span>
                  <span className="font-mono text-xs text-gray-600 max-w-[180px] truncate bg-gray-200/60 px-2 py-0.5 rounded">
                    {selectedBooking.user_id}
                  </span>
                </div>
              </div>

              {/* Status Section */}
              <div className="flex flex-col items-center justify-center pt-2 text-center">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Status Saat Ini</p>
                <span className={`text-sm font-bold px-4 py-1.5 rounded-full border ${getStatusColor(selectedBooking.status).bg}`}>
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