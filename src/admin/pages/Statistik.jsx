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
      "15:00",
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
    const maxBooking = Math.max(
      ...Object.values(grouped),
      1
    );

    // ubah ke persentase
    const result = Object.entries(grouped).map(
      ([jam, total]) => ({
        jam,
        total,
        level: Math.round(
          (total / maxBooking) * 100
        ),
      })
    );

    setData(result);
  };

  // rata-rata
  const avg =
    data.length > 0
      ? data.reduce(
          (acc, cur) => acc + cur.level,
          0
        ) / data.length
      : 0;

  // jam teramai
  const jamTeramai =
    data.length > 0
      ? data.reduce((a, b) =>
          a.level > b.level ? a : b
        )
      : null;

  // jam sepi (bisa lebih dari satu)
  const minLevel =
    data.length > 0
      ? Math.min(
          ...data.map((item) => item.level)
        )
      : 0;

  const jamSepi =
    data.length > 0
      ? data
          .filter(
            (item) =>
              item.level === minLevel
          )
          .map((item) => item.jam)
          .join(", ")
      : "-";

  const getColor = (level) => {
    if (level >= 80)
      return "bg-red-500";

    if (level >= 50)
      return "bg-yellow-400";

    return "bg-green-500";
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">

        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-500/60 to-indigo-600/80" />

      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        <PageHeader
          title="Statistik Ramai"
          breadcrumb={["Admin", "Statistik"]}
        />

        {/* SUMMARY */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">

          <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-blue-500">

            <p className="text-gray-400 text-sm">
              Rata-rata Keramaian
            </p>

            <h2 className="text-2xl font-bold">
              {avg.toFixed(1)}%
            </h2>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-red-500">

            <p className="text-gray-400 text-sm">
              Jam Teramai
            </p>

            <h2 className="text-2xl font-bold">
              {jamTeramai?.jam || "-"}
            </h2>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-green-500">

            <p className="text-gray-400 text-sm">
              Jam Sepi
            </p>

            <h2 className="text-2xl font-bold">
              {jamSepi}
            </h2>

          </div>

        </div>

        {/* HEATMAP */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl">

          <h3 className="font-bold text-gray-700 mb-4">
            Grafik Jam Ramai
          </h3>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">

            {data.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-white text-center text-xs font-bold ${getColor(
                  item.level
                )}`}
              >

                <p>{item.jam}</p>

                <p>
                  {item.level}%
                </p>

                <p>
                  {item.total} booking
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}