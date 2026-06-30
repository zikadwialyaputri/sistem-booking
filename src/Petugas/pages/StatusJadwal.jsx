import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import bookingService from "../../services/bookingService";
import { FaRegCalendarAlt, FaRegClock, FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function StatusJadwal() {
  const [search, setSearch] = useState("");
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJadwal();
  }, []);

  async function loadJadwal() {
    try {
      setLoading(true);
      const data = await bookingService.getBookings();
      setJadwal(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "success":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rejected":
      case "dibatalkan":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "done":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "success":
        return "Dikonfirmasi";
      case "pending":
        return "Menunggu";
      case "rejected":
      case "dibatalkan":
        return "Ditolak";
      case "done":
        return "Selesai";
      default:
        return status;
    }
  };

  // ========================================================
  // MEMPROSES DATA UNIK & MENANGGULANGI DUPLIKAT
  // ========================================================
  const uniqueJadwal = Array.from(
    new Map(
      jadwal.map((item) => [
        `${item.tanggal}_${item.jam_mulai}_${item.jam_selesai}_${item.lapangan?.id}_${item.users?.id}`,
        item,
      ])
    ).values()
  );

  // Pencarian multi field
  const filteredJadwal = uniqueJadwal.filter((item) =>
    `${item.lapangan?.nama} ${item.tanggal} ${item.jam_mulai} ${item.jam_selesai} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER HERO BANNER (Disamakan dengan halaman Kelola Booking) */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm h-36 flex flex-col justify-center px-6 md:px-8">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Court"
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-blue-900/40" />
          <div className="relative z-10 text-white w-full">
            <PageHeader
              title="Status Jadwal Lapangan"
              breadcrumb={["Petugas", "Jadwal"]}
            />
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
              Memantau alokasi jam tanding dan status ketersediaan lapangan secara real-time.
            </p>
          </div>
        </div>

        {/* FILTER PENCARIAN */}
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
            <FaSearch size={14} />
          </span>
          <input
            type="text"
            placeholder="Cari lapangan, tanggal, jam..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm text-slate-800 shadow-inner"
          />
        </div>

        {/* AREA DAFTAR DATA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-800 text-base">Daftar Reservasi Aktif</h2>
              <p className="text-xs text-slate-500 mt-0.5">Memantau seluruh alokasi jam tanding lapangan</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl font-bold border border-slate-200 shadow-sm">
              Total: {filteredJadwal.length} Data
            </span>
          </div>

          {loading ? (
            /* SKELETON LOADING ANIMATION */
            <div className="space-y-3 p-5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 w-full bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100/70 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4">Nama Lapangan</th>
                    <th className="p-4">Tanggal Main</th>
                    <th className="p-4">Alokasi Waktu</th>
                    <th className="p-4 text-center">Status Jadwal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm text-slate-700 font-medium">
                  {filteredJadwal.length > 0 ? (
                    filteredJadwal.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* LAPANGAN */}
                        <td className="p-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm border border-blue-100">
                              <FaMapMarkerAlt size={12} />
                            </div>
                            <span className="font-bold text-slate-800">
                              {item.lapangan?.nama || "-"}
                            </span>
                          </div>
                        </td>

                        {/* TANGGAL */}
                        <td className="p-4 text-slate-800">
                          <div className="flex items-center gap-2">
                            <FaRegCalendarAlt size={13} className="text-slate-400" />
                            <span>
                              {item.tanggal
                                ? new Date(item.tanggal).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  })
                                : "-"}
                            </span>
                          </div>
                        </td>

                        {/* JAM */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <FaRegClock size={13} className="text-slate-400" />
                            <span className="text-xs text-blue-600 bg-blue-50/70 border border-blue-100 px-2.5 py-1 rounded-md font-bold shadow-sm">
                              {item.jam_mulai?.slice(0, 5)} - {item.jam_selesai?.slice(0, 5)} WIB
                            </span>
                          </div>
                        </td>

                        {/* STATUS BADGE */}
                        <td className="p-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border shadow-sm tracking-wide ${getStatusStyle(
                              item.status
                            )}`}
                          >
                            {getStatusText(item.status)}
                          </span>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-14 text-slate-400 italic text-xs font-medium bg-slate-50/10">
                        Jadwal tanding tidak ditemukan atau kata kunci salah.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}