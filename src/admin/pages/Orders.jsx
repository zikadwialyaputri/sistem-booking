import { useEffect, useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaSearch,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCircle,
  FaCalendarAlt,
  FaFutbol,
  FaMoneyBillWave,
} from "react-icons/fa";
import bookingService from "../../services/bookingService";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadBooking();

    const interval = setInterval(() => {
      loadBooking();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  async function loadBooking() {
    try {
      setLoading(true);
      let data = await bookingService.getBookings();
      const now = new Date();

      for (const item of data) {
        if (
          item.status === "approved" &&
          item.tanggal &&
          item.jam_selesai
        ) {
          const selesai = new Date(`${item.tanggal}T${item.jam_selesai}`);
          if (now > selesai) {
            await bookingService.updateStatus(item.id, "done");
            item.status = "done";
          }
        }
      }

      data = await bookingService.getBookings();
      setBookings(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      await bookingService.updateStatus(id, status);
      loadBooking();
    } catch (err) {
      console.log(err);
      alert("Gagal memperbarui status");
    }
  }

  const filtered = bookings.filter(
    (item) =>
      item.users?.nama?.toLowerCase().includes(search.toLowerCase()) || !search
  );

  const pending = filtered.filter((x) => x.status === "pending");
  const approved = filtered.filter((x) => x.status === "approved");
  const rejected = filtered.filter((x) => x.status === "rejected");
  const done = filtered.filter((x) => x.status === "done");

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200/60",
          text: "Menunggu",
          icon: <FaClock className="text-amber-500" size={13} />,
        };
      case "approved":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
          text: "Disetujui",
          icon: <FaCheckCircle className="text-emerald-500" size={13} />,
        };
      case "rejected":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200/60",
          text: "Ditolak",
          icon: <FaTimesCircle className="text-rose-500" size={13} />,
        };
      case "done":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200/60",
          text: "Selesai",
          icon: <FaCheckCircle className="text-blue-500" size={13} />,
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-200/60",
          text: status,
          icon: <FaCircle className="text-slate-500" size={13} />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 pb-16">
      
      {/* HEADER PAGE */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Daftar Transaksi</h1>
        <p className="text-sm text-slate-500 mt-1">Kelola data pemesanan, konfirmasi penyewaan, dan pantau status lapangan.</p>
      </div>

      {/* CARD STATISTIK DENGAN INDIKATOR WARNA */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/50 relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Menunggu</p>
          <h2 className="text-3xl font-black text-slate-800">{pending.length}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/50 relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Disetujui</p>
          <h2 className="text-3xl font-black text-slate-800">{approved.length}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/50 relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Ditolak</p>
          <h2 className="text-3xl font-black text-slate-800">{rejected.length}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/50 relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Selesai</p>
          <h2 className="text-3xl font-black text-slate-800">{done.length}</h2>
        </div>
      </div>

      {/* BAR PENCARIAN ELEGAN */}
      <div className="relative mb-6 max-w-md shadow-sm rounded-2xl bg-white border border-slate-200/60 focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all duration-200">
        <FaSearch className="absolute left-4 top-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari pesanan pelanggan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent rounded-2xl py-3.5 pl-12 pr-4 outline-none text-slate-700 text-sm placeholder-slate-400"
        />
      </div>

      {/* KONTAINER TABEL UTAMA */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-slate-400 font-semibold tracking-wide animate-pulse">
            Memuat pembukuan data transaksi...
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6 text-left">Pelanggan</th>
                    <th className="py-4 px-6 text-left">Lapangan</th>
                    <th className="py-4 px-6 text-left">Jadwal Sewa</th>
                    <th className="py-4 px-6 text-left">Total Pembayaran</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6 text-center">Tindakan Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-medium">
                  {filtered.length > 0 ? (
                    (showAll ? filtered : filtered.slice(0, 5)).map((item) => {
                      const badge = getStatusBadge(item.status);
                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-blue-50/30 transition-colors duration-150"
                        >
                          {/* NAMA PELANGGAN DENGAN AVATAR INITIAL */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shadow-inner">
                                {item.users?.nama?.charAt(0).toUpperCase() || "?"}
                              </div>
                              <span className="font-bold text-slate-800">
                                {item.users?.nama || "Tanpa Nama"}
                              </span>
                            </div>
                          </td>

                          {/* LAPANGAN */}
                          <td className="py-4 px-6 text-slate-600">
                            <div className="flex items-center gap-2">
                              <FaFutbol className="text-slate-300" size={13} />
                              <span>{item.lapangan?.nama || "-"}</span>
                            </div>
                          </td>

                          {/* JADWAL SEWA */}
                          <td className="py-4 px-6">
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold">
                                <FaCalendarAlt className="text-slate-400" size={11} />
                                {item.tanggal
                                  ? new Date(item.tanggal).toLocaleDateString("id-ID", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "-"}
                              </div>
                              <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 w-max">
                                {item.jam_mulai} - {item.jam_selesai}
                              </span>
                            </div>
                          </td>

                          {/* TOTAL BAYAR */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                              <FaMoneyBillWave className="text-emerald-400" size={13} />
                              <span>Rp {Number(item.total || 0).toLocaleString("id-ID")}</span>
                            </div>
                          </td>

                          {/* BADGE STATUS */}
                          <td className="py-4 px-6 text-center">
                            <span
                              className={`px-3 py-1.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 shadow-sm/50 ${badge.bg}`}
                            >
                              {badge.icon}
                              {badge.text}
                            </span>
                          </td>

                          {/* AKSI TOMBOL */}
                          <td className="py-4 px-6 text-center">
                            {item.status === "pending" ? (
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => updateStatus(item.id, "approved")}
                                  className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-xl transition-all shadow-sm hover:scale-105 active:scale-95"
                                  title="Setujui Pesanan"
                                >
                                  <FaCheck size={12} />
                                </button>
                                <button
                                  onClick={() => updateStatus(item.id, "rejected")}
                                  className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-xl transition-all shadow-sm hover:scale-105 active:scale-95"
                                  title="Tolak Pesanan"
                                >
                                  <FaTimes size={12} />
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs font-bold text-slate-300 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                                Terarsip
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center space-y-2 text-slate-400">
                          <span className="text-5xl animate-pulse">📋</span>
                          <p className="font-bold text-base text-slate-700">Data pesanan kosong</p>
                          <p className="text-xs text-slate-400">Tidak ada nama pelanggan "{search}" dalam database.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* TOMBOL SHOW MORE */}
            {filtered.length > 5 && (
              <div className="p-5 border-t border-slate-100 flex justify-center bg-slate-50/40">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm tracking-wide transition-all duration-150"
                >
                  {showAll ? "PAGINASI SEDIKIT" : "TAMPILKAN SEMUA DATA"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}