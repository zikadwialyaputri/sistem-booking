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
    <div className="w-full min-h-screen bg-slate-50/50 text-slate-700 font-sans antialiased pb-12">
      
      {/* HEADER BANNER WITH GRADIENT OVERLAY */}
      <div className="relative w-full h-[220px] overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex flex-col justify-end p-6 md:p-10 shadow-inner">
        <img
          src="/img/badminton.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <PageHeader
            title="Status Jadwal Lapangan"
            breadcrumb={["Petugas", "Jadwal"]}
          />
        </div>
      </div>

      {/* CONTAINER UTAMA */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 -mt-10 relative z-20 space-y-6">
        
        {/* BARIS PENCARIAN (INTEGRATED ICON) */}
        <div className="w-full md:w-96 relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <FaSearch size={14} />
          </span>
          <input
            type="text"
            placeholder="Cari lapangan, tanggal, jam..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl shadow-sm border border-slate-200/80 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* AREA DAFTAR DATA */}
        <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-800">Daftar Reservasi Aktif</h2>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">Memantau seluruh alokasi jam tanding lapangan</p>
            </div>
            <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl font-bold border border-slate-100 shadow-sm">
              Total: {filteredJadwal.length} Data
            </span>
          </div>

          {loading ? (
            /* SKELETON LOADING ANIMATION */
            <div className="space-y-3 py-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 w-full bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-sm text-left text-slate-600 min-w-[700px]">
                <thead className="text-[11px] uppercase bg-slate-50/70 text-slate-400 border-b border-slate-100 font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Nama Lapangan</th>
                    <th className="px-6 py-4">Tanggal Main</th>
                    <th className="px-6 py-4">Alokasi Waktu</th>
                    <th className="px-6 py-4 text-center">Status Jadwal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredJadwal.length > 0 ? (
                    filteredJadwal.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                        
                        {/* LAPANGAN */}
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                              <FaMapMarkerAlt size={12} />
                            </div>
                            <span className="font-bold text-slate-800 text-[14px]">
                              {item.lapangan?.nama || "-"}
                            </span>
                          </div>
                        </td>

                        {/* TANGGAL */}
                        <td className="px-6 py-4.5 text-slate-600">
                          <div className="flex items-center gap-2 text-xs">
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
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-2">
                            <FaRegClock size={13} className="text-slate-400" />
                            <span className="text-xs text-blue-600 bg-blue-50/70 border border-blue-100 px-2.5 py-1 rounded-md font-bold shadow-sm">
                              {item.jam_mulai?.slice(0, 5)} - {item.jam_selesai?.slice(0, 5)} WIB
                            </span>
                          </div>
                        </td>

                        {/* STATUS BADGE */}
                        <td className="px-6 py-4.5 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-xl text-[11px] font-bold border shadow-sm tracking-wide ${getStatusStyle(
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