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
      const data = await bookingService.getBookings();
      const now = new Date();

      const updatedData = (data || []).map((item) => {
        if (
          item.status === "approved" &&
          item.tanggal &&
          item.jam_selesai
        ) {
          const selesai = new Date(`${item.tanggal}T${item.jam_selesai}`);
          if (now > selesai) {
            bookingService.updateStatus(item.id, "done").catch(console.error);
            return { ...item, status: "done" };
          }
        }
        return item;
      });

      const uniqueBookings = Array.from(
        new Map(updatedData.map((item) => [item.id, item])).values()
      );

      setBookings(uniqueBookings);
    } catch (err) {
      console.error("Gagal memuat data booking:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      await bookingService.updateStatus(id, status);
      loadBooking();
    } catch (err) {
      console.error(err);
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
          bg: "bg-amber-50 text-amber-700 border-amber-200/50",
          text: "Menunggu",
          icon: <FaClock className="text-amber-500" size={12} />,
        };
      case "approved":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200/50",
          text: "Disetujui",
          icon: <FaCheckCircle className="text-emerald-500" size={12} />,
        };
      case "rejected":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200/50",
          text: "Ditolak",
          icon: <FaTimesCircle className="text-rose-500" size={12} />,
        };
      case "done":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200/50",
          text: "Selesai",
          icon: <FaCheckCircle className="text-blue-500" size={12} />,
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-200/50",
          text: status,
          icon: <FaCircle className="text-slate-500" size={12} />,
        };
    }
  };

  return (
    <div className="w-full min-h-screen text-slate-700 font-sans antialiased">
      <div className="space-y-6">
        
        {/* 1. HERO BANNER */}
        <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-6 md:p-10 min-h-[170px] flex flex-col justify-end shadow-sm">
          <img
            src="/img/badminton.jpg"
            alt="badminton"
            className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none transform scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Judul Utama Banner dengan Deskripsi Singkat Estetik */}
          <div className="relative z-10">
            <h1 className="text-2xl md:text-[32px] font-black tracking-tight text-white leading-tight">
              Daftar Booking
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1.5 opacity-90 font-medium max-w-xl">
              Halaman pantauan data penyewaan lapangan, kelola status persetujuan, serta lacak riwayat transaksi masuk.
            </p>
          </div>
        </div>

        {/* SUB-JUDUL DI LUAR BANNER AGAR TIDAK SEPI */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ringkasan Aktivitas</h3>
        </div>

        {/* 2. CARD STATISTIK */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Menunggu", count: pending.length, color: "bg-amber-500" },
            { title: "Disetujui", count: approved.length, color: "bg-emerald-500" },
            { title: "Ditolak", count: rejected.length, color: "bg-rose-500" },
            { title: "Selesai", count: done.length, color: "bg-blue-500" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <div className={`absolute top-0 left-0 w-1 h-full ${stat.color}`}></div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">{stat.title}</p>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">{stat.count}</h2>
            </div>
          ))}
        </div>

        {/* 3. BAR PENCARIAN */}
        <div className="relative max-w-sm shadow-sm rounded-2xl bg-white border border-slate-200 focus-within:ring-4 focus-within:ring-blue-100/70 focus-within:border-blue-500 transition-all duration-200">
          <FaSearch className="absolute left-4 top-4 text-slate-400 pointer-events-none" size={14} />
          <input
            type="text"
            placeholder="Cari pesanan pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent rounded-2xl py-3.5 pl-11 pr-4 outline-none text-slate-800 text-sm placeholder-slate-400 font-medium"
          />
        </div>

        {/* 4. KONTAINER TABEL UTAMA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          {loading && bookings.length === 0 ? (
            <div className="p-24 text-center text-slate-400 font-medium tracking-wide animate-pulse">
              Memuat data transaksi dari server...
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-slate-50/70 border-b border-slate-200/60 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-6 text-left font-bold">Pelanggan</th>
                      <th className="py-4 px-6 text-left font-bold">Lapangan</th>
                      <th className="py-4 px-6 text-left font-bold">Jadwal Sewa</th>
                      <th className="py-4 px-6 text-left font-bold">Total Pembayaran</th>
                      <th className="py-4 px-6 text-center font-bold">Status</th>
                      <th className="py-4 px-6 text-center font-bold">Tindakan Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 text-sm font-medium">
                    {filtered.length > 0 ? (
                      (showAll ? filtered : filtered.slice(0, 5)).map((item) => {
                        const badge = getStatusBadge(item.status);
                        
                        const databaseTotal = item.total;
                        const hargaStandarLapangan = item.lapangan?.harga || 35000; 

                        const nominalPembayaran = (databaseTotal !== null && databaseTotal !== undefined && databaseTotal !== 0)
                          ? databaseTotal
                          : hargaStandarLapangan;

                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-slate-50/50 transition-colors duration-150"
                          >
                            {/* NAMA PELANGGAN */}
                            <td className="py-5 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shadow-inner border border-blue-100/30">
                                  {item.users?.nama?.charAt(0).toUpperCase() || "?"}
                                </div>
                                <span className="font-semibold text-slate-800 tracking-tight">
                                  {item.users?.nama || "Tanpa Nama"}
                                </span>
                              </div>
                            </td>

                            {/* LAPANGAN */}
                            <td className="py-5 px-6 text-slate-600">
                              <div className="flex items-center gap-2">
                                <FaFutbol className="text-slate-400" size={13} />
                                <span className="text-slate-700 font-medium">{item.lapangan?.nama || "-"}</span>
                              </div>
                            </td>

                            {/* JADWAL SEWA */}
                            <td className="py-5 px-6">
                              <div className="flex flex-col gap-1">
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
                                <span className="text-[10px] font-mono font-bold tracking-wide text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/50 w-max">
                                  {item.jam_mulai?.slice(0, 5)} - {item.jam_selesai?.slice(0, 5)}
                                </span>
                              </div>
                            </td>

                            {/* TOTAL BAYAR */}
                            <td className="py-5 px-6">
                              <div className="flex items-center gap-1.5 text-slate-800 font-bold tracking-tight">
                                <FaMoneyBillWave className="text-emerald-500" size={13} />
                                <span>Rp {Number(nominalPembayaran).toLocaleString("id-ID")}</span>
                              </div>
                            </td>

                            {/* BADGE STATUS */}
                            <td className="py-5 px-6 text-center">
                              <span
                                className={`px-2.5 py-1 rounded-full border text-[11px] font-bold inline-flex items-center gap-1.5 shadow-xs ${badge.bg}`}
                              >
                                {badge.icon}
                                {badge.text}
                              </span>
                            </td>

                            {/* AKSI TOMBOL ADMIN */}
                            <td className="py-5 px-6 text-center">
                              {item.status === "pending" ? (
                                <div className="flex gap-2 justify-center">
                                  <button
                                    onClick={() => updateStatus(item.id, "approved")}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-xl transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 cursor-pointer"
                                    title="Setujui Pesanan"
                                  >
                                    <FaCheck size={11} />
                                  </button>
                                  <button
                                    onClick={() => updateStatus(item.id, "rejected")}
                                    className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-xl transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 cursor-pointer"
                                    title="Tolak Pesanan"
                                  >
                                    <FaTimes size={11} />
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100/80 border border-slate-200/60 px-2 py-1 rounded-md tracking-wider uppercase">
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
                            <span className="text-4xl">📋</span>
                            <p className="font-bold text-slate-700 text-sm mt-1">Data pesanan tidak ditemukan</p>
                            <p className="text-xs text-slate-400">Tidak ada data transaksi yang cocok dengan pencarian.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* TOMBOL PAGINASI */}
              {filtered.length > 5 && (
                <div className="p-4 border-t border-slate-100 flex justify-center bg-slate-50/50">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm tracking-wider transition-all duration-200 cursor-pointer"
                  >
                    {showAll ? "TAMPILKAN LEBIH SEDIKIT" : "TAMPILKAN SEMUA DATA TRANSAKSI"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}