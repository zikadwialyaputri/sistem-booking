import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";

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

    // daftar jam operasional
    const jamOperasional = [
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
    ];

    const grouped = {};

    // isi awal = 0 booking
    jamOperasional.forEach((jam) => {
      grouped[jam] = 0;
    });

    // hitung booking tiap jam
    bookings.forEach((item) => {
      const jam = item.jam_mulai?.slice(0, 5);

      if (grouped[jam] !== undefined) {
        grouped[jam] += 1;
      }
    });

    // booking tertinggi
    const maxBooking = Math.max(...Object.values(grouped), 1);

    // ubah ke persentase
    const result = Object.entries(grouped).map(([jam, total]) => ({
      jam,
      total,
      level: Math.round((total / maxBooking) * 100),
    }));

    setData(result);
  };

  // rata-rata
  const avg =
    data.length > 0
      ? data.reduce((acc, cur) => acc + cur.level, 0) / data.length
      : 0;

  // jam teramai
  const jamTeramai =
    data.length > 0 ? data.reduce((a, b) => (a.level > b.level ? a : b)) : null;

  // jam sepi (bisa lebih dari satu)
  const minLevel =
    data.length > 0 ? Math.min(...data.map((item) => item.level)) : 0;

  const jamSepi =
    data.length > 0
      ? data
          .filter((item) => item.level === minLevel)
          .map((item) => item.jam)
          .join(", ")
      : "-";

  const getColor = (level) => {
    if (level >= 80) return "bg-red-500";

    if (level >= 50) return "bg-yellow-400";

    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HERO */}
      <div className="relative h-72 overflow-hidden rounded-b-[40px] shadow-lg">
        <img src="/img/badminton.jpg" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-indigo-800/70 to-cyan-700/60" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 text-white">
          <p className="uppercase tracking-[5px] text-sm opacity-80">
            Dashboard Analytics
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-2">
            Statistik Lapangan
          </h1>

          <p className="mt-3 text-sm md:text-lg opacity-90">
            Analisis waktu booking paling ramai dan jam sepi
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto p-5 md:p-10 -mt-10 relative z-10">
        {/* SUMMARY CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Rata-rata Keramaian</p>

                <h2 className="text-3xl font-bold text-blue-600 mt-2">
                  {avg.toFixed(1)}%
                </h2>
              </div>

              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Jam Teramai</p>

                <h2 className="text-3xl font-bold text-red-500 mt-2">
                  {jamTeramai?.jam || "-"}
                </h2>
              </div>

              <div className="text-4xl">🔥</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Jam Sepi</p>

                <h2 className="text-2xl font-bold text-green-500 mt-2">
                  {jamSepi}
                </h2>
              </div>

              <div className="text-4xl">🌙</div>
            </div>
          </div>
        </div>


      {/* DETAIL JAM */}
<div className="mt-8 bg-white rounded-3xl p-8 shadow-lg">

  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800">
      ⏰ Statistik Jam Operasional
    </h2>

    <p className="text-gray-500 text-sm mt-1">
      Tingkat penggunaan lapangan setiap jam
    </p>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">

    {data.map((item, index) => (

      <div
        key={index}
        className="bg-white rounded-2xl p-5 shadow-md border border-gray-100
        hover:-translate-y-2 hover:shadow-xl transition duration-300"
      >

        <p className="text-gray-400 text-sm">
          Jam
        </p>

        <h2 className="font-bold text-2xl mt-1 text-gray-800">
          {item.jam}
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-5">

          <div
            className={`h-3 rounded-full
            ${
              item.level >= 80
                ? "bg-red-500"
                : item.level >= 50
                ? "bg-yellow-400"
                : "bg-green-500"
            }`}
            style={{
              width: `${item.level}%`,
            }}
          />

        </div>

        <div className="flex justify-between mt-4">

          <span className="text-sm text-gray-500">
            {item.total} Booking
          </span>

          <span
            className={`font-bold
            ${
              item.level >= 80
                ? "text-red-500"
                : item.level >= 50
                ? "text-yellow-500"
                : "text-green-500"
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
