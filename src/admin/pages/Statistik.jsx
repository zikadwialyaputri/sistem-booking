import PageHeader from "../components/PageHeader";

export default function Statistik() {

  const data = [
    { jam: "06:00", level: 20 },
    { jam: "07:00", level: 40 },
    { jam: "08:00", level: 80 },
    { jam: "09:00", level: 60 },
    { jam: "10:00", level: 50 },
    { jam: "11:00", level: 30 },
    { jam: "12:00", level: 70 },
    { jam: "13:00", level: 90 },
    { jam: "14:00", level: 60 },
    { jam: "15:00", level: 85 },
    { jam: "16:00", level: 95 },
    { jam: "17:00", level: 100 },
    { jam: "18:00", level: 90 },
    { jam: "19:00", level: 80 },
    { jam: "20:00", level: 70 },
    { jam: "21:00", level: 50 },
  ];

  const avg =
    data.reduce((acc, cur) => acc + cur.level, 0) / data.length;

  const getColor = (level) => {
    if (level >= 80) return "bg-red-500";
    if (level >= 50) return "bg-yellow-400";
    return "bg-green-400";
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-500/60 to-indigo-600/80"></div>
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
            <p className="text-gray-400 text-sm">Rata-rata Keramaian</p>
            <h2 className="text-2xl font-bold">{avg.toFixed(1)}%</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-red-500">
            <p className="text-gray-400 text-sm">Jam Teramai</p>
            <h2 className="text-2xl font-bold">17:00</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-green-500">
            <p className="text-gray-400 text-sm">Jam Sepi</p>
            <h2 className="text-2xl font-bold">06:00</h2>
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
                <p>{item.level}%</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}