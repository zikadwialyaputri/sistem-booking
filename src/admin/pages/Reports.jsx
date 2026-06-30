import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabase";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartLine,
  FaSearch,
  FaChevronRight,
  FaFileInvoiceDollar,
  FaHashtag,
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
      .in("status", ["approved", "done"]);

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
  const totalPendapatan = filtered.reduce(
    (acc, cur) => acc + cur.pendapatan,
    0,
  );

  const formatRupiah = (num) => "Rp " + num.toLocaleString("id-ID");

  return (
    <div className="w-full min-h-screen text-slate-700 font-sans antialiased">
      <div className="space-y-6">
        {/* 1. HERO BANNER (FORMAT SAMA PERSIS DENGAN PAGES LAIN) */}
        <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-6 md:p-10 min-h-[170px] flex flex-col justify-end shadow-sm">
          <img
            src="/img/badminton.jpg"
            alt="badminton"
            className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none transform scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Judul Utama Banner dengan Deskripsi Singkat */}
          <div className="relative z-10">
            <h1 className="text-2xl md:text-[32px] font-black tracking-tight text-white leading-tight">
              Laporan Rekapitulasi Bulanan
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1.5 opacity-90 font-medium max-w-xl">
              Halaman panel kontrol data sewa, akumulasi omset pendapatan
              bersih, dan rekam log aktivitas transaksi GOR.
            </p>
          </div>
        </div>

        {/* SUB-JUDUL DI LUAR BANNER */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Ringkasan Finansial
          </h3>
        </div>

        {/* 2. AREA KONTROL (FILTER DROPDOWN) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-4xl">
          <div className="relative w-full max-w-md shadow-sm rounded-2xl bg-white border border-slate-200 focus-within:ring-4 focus-within:ring-blue-100/70 focus-within:border-blue-500 transition-all duration-200 flex items-center py-1">
            <FaSearch
              className="absolute left-4 text-slate-400 pointer-events-none"
              size={14}
            />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 bg-transparent outline-none text-slate-800 text-sm font-bold cursor-pointer appearance-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
                backgroundSize: "14px",
              }}
            >
              <option value="Semua">🗓️ Semua Bulan Aktif</option>
              {laporan.map((item) => (
                <option key={item.bulan} value={item.bulan}>
                  📦 Bulan {item.bulan}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. METRICS STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {/* Card Volume Transaksi */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Volume Transaksi
                </p>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {totalBooking}{" "}
                  <span className="text-xs font-bold text-slate-400 normal-case ml-0.5">
                    Jadwal
                  </span>
                </h2>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600 border border-blue-100/30">
                <FaCalendarAlt size={18} />
              </div>
            </div>
          </div>

          {/* Card Akumulasi Omset */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Akumulasi Omset
                </p>
                <h2 className="text-2xl font-black text-emerald-600 tracking-tight">
                  {formatRupiah(totalPendapatan)}
                </h2>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 border border-emerald-100/30">
                <FaMoneyBillWave size={18} />
              </div>
            </div>
          </div>

          {/* Card Rata-Rata Booking */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden transition-all duration-300 hover:shadow-md sm:col-span-2 md:col-span-1">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Rata-Rata Booking
                </p>
                <h2 className="text-2xl font-black text-purple-600 tracking-tight">
                  {filtered.length
                    ? Math.round(totalBooking / filtered.length)
                    : 0}{" "}
                  <span className="text-xs font-bold text-slate-400 normal-case ml-0.5">
                    / Bln
                  </span>
                </h2>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl text-purple-600 border border-purple-100/30">
                <FaChartLine size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* 4. KONTAINER TABEL UTAMA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50/70 border-b border-slate-200/60 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 text-center font-bold w-20">
                    <div className="flex items-center justify-center gap-1">
                      <FaHashtag size={10} /> No
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold">Bulan Buku</th>
                  <th className="py-4 px-6 text-left font-bold">
                    Total Kuantitas Booking
                  </th>
                  <th className="py-4 px-6 text-left font-bold">
                    Estimasi Pendapatan Bersih
                  </th>
                  <th className="py-4 px-6 text-center font-bold w-36">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 text-sm font-medium">
                {filtered.length > 0 ? (
                  filtered.map((item, index) => (
                    <tr
                      key={item.bulan}
                      className="hover:bg-slate-50/50 transition-colors duration-150"
                    >
                      {/* NO */}
                      <td className="py-5 px-6 text-center font-bold text-slate-400">
                        {index + 1}
                      </td>

                      {/* BULAN BUKU */}
                      <td className="py-5 px-6 font-semibold text-slate-800 tracking-tight capitalize">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          {item.bulan}
                        </div>
                      </td>

                      {/* TOTAL QUANTITY */}
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-md text-xs font-bold text-slate-600 border border-slate-200/40">
                          <FaFileInvoiceDollar
                            size={11}
                            className="text-slate-400"
                          />
                          {item.totalBooking} Booking
                        </span>
                      </td>

                      {/* ESTIMATED INCOME */}
                      <td className="py-5 px-6 font-black text-emerald-600 text-base">
                        {formatRupiah(item.pendapatan)}
                      </td>

                      {/* ACTION BUTTON */}
                      <td className="py-5 px-6 text-center">
                        <Link
                          to={`/admin/reports/${item.bulan}`}
                          className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          Lihat Detail <FaChevronRight size={8} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2 text-slate-400">
                        <span className="text-4xl animate-pulse">🔍</span>
                        <p className="font-bold text-slate-700 text-sm mt-1">
                          Laporan tidak ditemukan
                        </p>
                      </div>
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
