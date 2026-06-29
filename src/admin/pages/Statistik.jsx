import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { FaChartBar, FaFire, FaMoon, FaClock, FaCalendarCheck } from "react-icons/fa";

export default function Statistik() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStatistik();
  }, []);

  const fetchStatistik = async () => {
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("jam_mulai,status")
      .eq("status", "approved");

    if (error) {
      console.log("ERROR:", error);
      return;
    }

    // Daftar jam operasional
    const jamOperasional = [
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
    ];

    const grouped = {};

    // Isi awal = 0 booking
    jamOperasional.forEach((jam) => {
      grouped[jam] = 0;
    });

    // Hitung booking tiap jam
    bookings.forEach((item) => {
      const jam = item.jam_mulai?.slice(0, 5);

      if (grouped[jam] !== undefined) {
        grouped[jam] += 1;
      }
    });

    // Booking tertinggi
    const maxBooking = Math.max(...Object.values(grouped), 1);

    // Ubah ke persentase
    const result = Object.entries(grouped).map(([jam, total]) => ({
      jam,
      total,
      level: Math.round((total / maxBooking) * 100),
    }));

    setData(result);
  };

  // Rata-rata
  const avg =
    data.length > 0
      ? data.reduce((acc, cur) => acc + cur.level, 0) / data.length
      : 0;

  // Jam teramai
  const jamTeramai =
    data.length > 0 ? data.reduce((a, b) => (a.level > b.level ? a : b)) : null;

  // Jam sepi (bisa lebih dari satu)
  const minLevel =
    data.length > 0 ? Math.min(...data.map((item) => item.level)) : 0;

  const jamSepi =
    data.length > 0
      ? data
          .filter((item) => item.level === minLevel)
          .map((item) => item.jam)
          .join(", ")
      : "-";

  return (
    <div className="w-full min-h-screen text-slate-700 font-sans antialiased">
      <div className="space-y-6">
        
        {/* 1. HERO BANNER (SAMA PERSIS FORMATNYA DENGAN PAGES LAIN) */}
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
              Statistik Lapangan
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1.5 opacity-90 font-medium max-w-xl">
              Analisis visual tingkat keramaian operasional, pantau jam produktif pengguna, serta optimalisasi efisiensi jadwal booking.
            </p>
          </div>
        </div>

        {/* SUB-JUDUL DI LUAR BANNER */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Metrik Utama Analytics</h3>
        </div>

        {/* 2. SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {/* Card Rata-rata */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Rata-rata Utilitas</p>
                <h2 className="text-2xl font-black text-blue-600 tracking-tight">{avg.toFixed(1)}%</h2>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600 border border-blue-100/30">
                <FaChartBar size={18} />
              </div>
            </div>
          </div>

          {/* Card Jam Teramai */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Jam Teramai</p>
                <h2 className="text-2xl font-black text-red-500 tracking-tight">{jamTeramai?.jam || "-"}</h2>
              </div>
              <div className="bg-red-50 p-3 rounded-xl text-red-500 border border-red-100/30">
                <FaFire size={18} />
              </div>
            </div>
          </div>

          {/* Card Jam Sepi */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 relative overflow-hidden transition-all duration-300 hover:shadow-md sm:col-span-2 md:col-span-1">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Jam Paling Senggang</p>
                <h2 className="text-xl font-black text-emerald-600 tracking-tight mt-0.5">{jamSepi}</h2>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 border border-emerald-100/30 shrink-0">
                <FaMoon size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* 3. KONTAINER GRAFIK / DETAIL JAM OPERASIONAL */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
              <FaClock size={16} />
            </div>
            <div>
              <h2 className="font-black text-lg text-slate-800 tracking-tight">Statistik Jam Operasional</h2>
              <p className="text-slate-400 text-xs font-medium">Tingkat akumulasi aktivitas penggunaan lapangan per slot waktu.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-slate-300/80 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Slot Waktu</p>
                  <h2 className="font-black text-xl text-slate-800 tracking-tight mt-0.5">{item.jam}</h2>
                </div>

                {/* Progress Bar Mini */}
                <div className="w-full bg-slate-100 rounded-full h-2 mt-5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500
                    ${
                      item.level >= 80
                        ? "bg-red-500"
                        : item.level >= 50
                        ? "bg-amber-400"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${item.level}%` }}
                  />
                </div>

                {/* Info Kuantitas Bawah */}
                <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 text-xs font-semibold">
                  <span className="text-slate-400 flex items-center gap-1 font-medium">
                    <FaCalendarCheck size={10} className="text-slate-300" />
                    {item.total} Book
                  </span>
                  <span
                    className={`font-bold
                    ${
                      item.level >= 80
                        ? "text-red-500"
                        : item.level >= 50
                        ? "text-amber-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {item.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}