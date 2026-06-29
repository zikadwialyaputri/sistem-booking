import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import {
  FaCheck,
  FaTimes,
  FaSearch,
  FaClock,
  FaCalendarCheck,
  FaTimesCircle,
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";

import bookingService from "../../services/bookingService";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBooking();

    const interval = setInterval(() => {
      loadBooking();
    }, 30000); // Sinkronisasi real-time setiap 30 detik

    return () => clearInterval(interval);
  }, []);

  async function loadBooking() {
    try {
      setLoading(true);
      let data = await bookingService.getBookings();
      const now = new Date();

      for (const item of data) {
        if (item.status === "approved" && item.tanggal && item.jam_selesai) {
          const selesai = new Date(`${item.tanggal}T${item.jam_selesai}`);

          // Jika waktu sekarang sudah melewati jam selesai, ubah status ke 'done'
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
      const booking = bookings.find((item) => item.id === id);
      if (!booking) return;

      const now = new Date();
      const bookingDateTime = new Date(`${booking.tanggal}T${booking.jam_selesai}`);

      if (now >= bookingDateTime && status !== "done") {
        alert("Jadwal sewa sudah lewat, status tidak dapat diubah lagi.");
        return;
      }

      await bookingService.updateStatus(id, status);
      loadBooking();
    } catch (error) {
      console.log(error);
      alert("Gagal memperbarui status booking");
    }
  }

  // ========================================================
  // MEMPROSES DATA UNIK DAN MENANGGULANGI DUPLIKAT
  // ========================================================
  const uniqueBookings = Array.from(
    new Map(
      bookings.map((item) => [
        `${item.tanggal}_${item.jam_mulai}_${item.jam_selesai}_${item.lapangan?.id}_${item.users?.id}`,
        item,
      ])
    ).values()
  );

  const filtered = uniqueBookings.filter(
    (item) =>
      item.users?.nama?.toLowerCase().includes(search.toLowerCase()) || !search
  );

  const pending = filtered.filter((x) => x.status === "pending");
  const approved = filtered.filter((x) => x.status === "approved");
  const rejected = filtered.filter((x) => x.status === "rejected");
  const done = filtered.filter((x) => x.status === "done");

  const getStatusBadge = (status, item) => {
    const now = new Date();
    
    if (status === "approved" && item?.tanggal && item?.jam_mulai && item?.jam_selesai) {
      const mulai = new Date(`${item.tanggal}T${item.jam_mulai}`);
      const selesai = new Date(`${item.tanggal}T${item.jam_selesai}`);
      
      if (now >= mulai && now <= selesai) {
        return {
          bg: "bg-blue-100 text-blue-900 border-blue-300",
          text: "Bermain",
          icon: <FaCircle className="text-blue-600 animate-ping" size={8} />,
        };
      } else if (now < mulai) {
        return {
          bg: "bg-indigo-100 text-indigo-900 border-indigo-300",
          text: "Terjadwal",
          icon: <FaCalendarCheck className="text-indigo-700" size={12} />,
        };
      }
    }

    switch (status) {
      case "pending":
        return {
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          text: "Menunggu",
          icon: <FaClock className="text-amber-700" size={12} />,
        };
      case "rejected":
        return {
          bg: "bg-rose-100 text-rose-900 border-rose-300",
          text: "Ditolak",
          icon: <FaTimesCircle className="text-rose-700" size={12} />,
        };
      case "done":
        return {
          bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          text: "Selesai",
          icon: <FaCheckCircle className="text-emerald-700" size={12} />,
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-900 border-slate-300",
          text: status,
          icon: <FaCircle className="text-slate-500" size={12} />,
        };
    }
  };

  // Helper fungsi untuk render kolom Tindakan Admin secara real-time
  const renderAdminAction = (item) => {
    const now = new Date();
    
    if (item.status === "pending") {
      const selesai = new Date(`${item.tanggal}T${item.jam_selesai}`);
      if (now > selesai) {
        return (
          <span className="text-red-500 text-xs font-medium bg-red-50 px-3 py-1 rounded-md border border-red-200">
            Booking Kadaluarsa
          </span>
        );
      }
      return (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => updateStatus(item.id, "approved")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 text-xs shadow-sm transition-all"
          >
            <FaCheck size={10} /> Setujui
          </button>
          <button
            onClick={() => updateStatus(item.id, "rejected")}
            className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 text-xs shadow-sm transition-all"
          >
            <FaTimes size={10} /> Tolak
          </button>
        </div>
      );
    }

    if (item.status === "approved") {
      const mulai = new Date(`${item.tanggal}T${item.jam_mulai}`);
      const selesai = new Date(`${item.tanggal}T${item.jam_selesai}`);

      if (now >= mulai && now <= selesai) {
        return (
          <span className="text-blue-700 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200 animate-pulse">
            ⚡ Sedang Digunakan
          </span>
        );
      } else if (now < mulai) {
        return (
          <span className="text-indigo-700 font-medium text-xs bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            Belum Mulai
          </span>
        );
      }
    }

    if (item.status === "done") {
      return <span className="text-emerald-600 text-xs font-semibold bg-emerald-50/50 px-2 py-1 rounded">✓ Selesai Main</span>;
    }

    if (item.status === "rejected") {
      return <span className="text-slate-400 text-xs font-normal">Sudah Dibatalkan</span>;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER HERO BANNER */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm h-36 flex flex-col justify-center px-6 md:px-8">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Court"
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-blue-900/40" />
          <div className="relative z-10 text-white">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Kelola Booking Lapangan</h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
              Halaman validasi pemesanan jadwal olahraga. Sistem memantau jam bermain secara real-time.
            </p>
          </div>
        </div>

        {/* STATISTIK RINGKASAN */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Menunggu</p>
            <h2 className="text-3xl font-black text-amber-600 mt-1">
              {pending.length} <span className="text-xs font-normal text-slate-400">jadwal</span>
            </h2>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Disetujui Aktif</p>
            <h2 className="text-3xl font-black text-emerald-600 mt-1">
              {approved.length} <span className="text-xs font-normal text-slate-400">jadwal</span>
            </h2>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ditolak / Batal</p>
            <h2 className="text-3xl font-black text-rose-600 mt-1">
              {rejected.length} <span className="text-xs font-normal text-slate-400">jadwal</span>
            </h2>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Selesai Main</p>
            <h2 className="text-3xl font-black text-blue-600 mt-1">
              {done.length} <span className="text-xs font-normal text-slate-400">jadwal</span>
            </h2>
          </div>
        </div>

        {/* FILTER PENCARIAN */}
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
            <FaSearch size={14} />
          </span>
          <input
            type="text"
            placeholder="Ketik nama pelanggan untuk mencari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm text-slate-800 shadow-inner"
          />
        </div>

        {/* TABEL DATA UTAMA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-bold text-slate-800 text-base">Tabel Data Jadwal Sewa</h2>
            <p className="text-xs text-slate-500 mt-0.5">Menampilkan seluruh alokasi tanding lapangan berdasarkan pencarian.</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-3 text-slate-500">
              <div className="w-9 h-9 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-medium">Sedang memuat data sewa terbaru...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-100/70 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4">Nama Pelanggan</th>
                    <th className="p-4">Pilihan Lapangan</th>
                    <th className="p-4">Tanggal Main</th>
                    <th className="p-4">Durasi Jam</th>
                    <th className="p-4">Total Biaya</th>
                    <th className="p-4">Status Pemesanan</th>
                    <th className="p-4 text-center">Tindakan Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                  {filtered.length > 0 ? (
                    filtered.map((item) => {
                      const badge = getStatusBadge(item.status, item);
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-semibold text-slate-900">{item.users?.nama || "-"}</td>
                          <td className="p-4">
                            <span className="font-medium bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 rounded-md text-xs">
                              {item.lapangan?.nama || "-"}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-slate-800">
                            {item.tanggal 
                              ? new Date(item.tanggal).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "-"}
                          </td>
                          <td className="p-4 font-mono text-xs text-slate-600">
                            {item.jam_mulai?.slice(0, 5)} - {item.jam_selesai?.slice(0, 5)}
                          </td>
                          <td className="p-4 font-bold text-slate-900">
                            Rp {Number(item.total || item.lapangan?.harga || 0).toLocaleString("id-ID")}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
                              {badge.icon} {badge.text}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {renderAdminAction(item)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-12 text-slate-500 font-medium">
                        Daftar riwayat sewa kosong atau tidak ditemukan.
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