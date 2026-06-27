import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartLine,
  FaSearch,
  FaChevronRight,
  FaFileInvoiceDollar
} from "react-icons/fa";

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState("Semua");
  const [laporan, setLaporan] = useState([]);

  const hargaBooking = 35000;

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "approved");

    if (error) {
      console.log("ERROR:", error);
      return;
    }

    const grouped = {};

    data.forEach((item) => {
      const date = new Date(item.tanggal);
      const bulan = date.toLocaleString("id-ID", { month: "long" });

      if (!grouped[bulan]) {
        grouped[bulan] = {
          bulan,
          totalBooking: 0,
        };
      }
      grouped[bulan].totalBooking += 1;
    });

    const result = Object.values(grouped).map((item) => ({
      ...item,
      pendapatan: item.totalBooking * hargaBooking,
    }));

    setLaporan(result);
  };

  const filtered =
    selectedMonth === "Semua"
      ? laporan
      : laporan.filter((item) => item.bulan === selectedMonth);

  const totalBooking = filtered.reduce((acc, cur) => acc + cur.totalBooking, 0);
  const totalPendapatan = filtered.reduce((acc, cur) => acc + cur.pendapatan, 0);

  const formatRupiah = (num) => "Rp " + num.toLocaleString("id-ID");

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans antialiased text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HERO BANNER BLOCK - UKURAN BACKGROUND GAMBAR DIPERBESAR MAKSIMAL (h-64) */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg h-64 md:h-72 flex flex-col justify-center px-10 md:px-16 border border-slate-200">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Court"
            className="absolute inset-0 w-full h-full object-cover select-none transform scale-105"
          />
          {/* Lapisan Gelap Gelap Terang Agar Teks Tetap Sangat Mudah Dibaca */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-blue-950/60" />
          
          <div className="relative z-10 text-white space-y-3">
            <span className="text-xs md:text-sm font-black text-blue-400 uppercase tracking-widest block bg-blue-500/20 w-fit px-3 py-1 rounded-md backdrop-blur-sm">
              📢 FINANCIAL & VOLUME LOGS
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none drop-shadow-md">
              Laporan Rekapitulasi Bulanan
            </h1>
            <p className="text-slate-300 text-sm md:text-base font-medium max-w-xl">
              Halaman panel kontrol data sewa, akumulasi omset pendapatan bersih, dan rekam log GOR.
            </p>
          </div>
        </div>

        {/* FILTER CONTROL - Dropdown Lebih Besar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72 group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 pointer-events-none group-focus-within:text-blue-600 transition-colors">
              <FaSearch size={14} />
            </span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 text-sm font-bold text-slate-800 shadow-sm transition-all cursor-pointer appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%231e293b\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
            >
              <option value="Semua">🗓️ Semua Bulan Aktif</option>
              {laporan.map((item) => (
                <option key={item.bulan} value={item.bulan}>📦 Bulan {item.bulan}</option>
              ))}
            </select>
          </div>
        </div>

        {/* METRICS STATS CARDS - Angka & Label Diperbesar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-all duration-300">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Volume Transaksi</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{totalBooking} <span className="text-sm font-bold text-slate-500 uppercase tracking-normal ml-0.5">Jadwal</span></h2>
            </div>
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100"><FaCalendarAlt size={22} /></div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-300 transition-all duration-300">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Akumulasi Omset</span>
              <h2 className="text-3xl font-black text-emerald-600 tracking-tight">{formatRupiah(totalPendapatan)}</h2>
            </div>
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100"><FaMoneyBillWave size={22} /></div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm flex items-center justify-between group hover:border-purple-300 transition-all duration-300">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Rata-Rata Booking</span>
              <h2 className="text-3xl font-black text-purple-600 tracking-tight">{filtered.length ? Math.round(totalBooking / filtered.length) : 0} <span className="text-sm font-bold text-slate-500 uppercase tracking-normal ml-0.5">/ Bln</span></h2>
            </div>
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100"><FaChartLine size={22} /></div>
          </div>
        </div>

        {/* LOG AGGREGATION TABLE - Teks Tabel Jauh Lebih Jelas */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-200 bg-[#fafafa]">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-black text-slate-900 text-lg md:text-xl tracking-tight">Ikhtisar Pendapatan GOR</h3>
                <p className="text-sm text-slate-500">Ringkasan total sewa terhitung bulanan yang sudah disahkan sistem.</p>
              </div>
              <span className="hidden sm:inline-block bg-slate-100 text-slate-700 border-2 border-slate-200 text-xs font-bold px-4 py-1.5 rounded-full">{filtered.length} Periode Berjalan</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-5 pl-8">Bulan Buku</th>
                  <th className="p-5">Total Kuantitas Booking</th>
                  <th className="p-5">Estimasi Pendapatan Bersih</th>
                  <th className="p-5 pr-8 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-base text-slate-700 bg-white">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <tr key={item.bulan} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-5 pl-8 font-extrabold text-slate-900 text-lg capitalize group-hover:text-blue-600 transition-colors">
                        <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-blue-600"></span>{item.bulan}</div>
                      </td>
                      <td className="p-5 font-bold text-slate-800">
                        <span className="inline-flex items-center gap-2 font-bold bg-slate-100 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-xl text-sm">
                          <FaFileInvoiceDollar size={13} className="text-slate-500" />{item.totalBooking} Booking
                        </span>
                      </td>
                      <td className="p-5 font-black text-emerald-600 text-lg">{formatRupiah(item.pendapatan)}</td>
                      <td className="p-5 pr-8 text-center">
                        <Link to={`/admin/reports/${item.bulan}`} className="inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-black px-5 py-2.5 rounded-xl border-2 border-blue-100 hover:border-blue-600 shadow-sm transition-all text-sm">
                          Lihat Detail <FaChevronRight size={10} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-center py-20 text-slate-500 text-sm font-medium">Belum memiliki riwayat laporan terarsip.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}