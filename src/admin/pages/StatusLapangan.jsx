import PageHeader from "../components/PageHeader";

export default function StatusLapangan() {
  const fields = [
    {
      id: 1,
      lapangan: "Lapangan 1",
      status: "Sedang Digunakan",
      jam: "16:00 - 18:00",
      user: "Andi Saputra",
    },

    {
      id: 2,
      lapangan: "Lapangan 1",
      status: "Akan Digunakan",
      jam: "18:00 - 20:00",
      user: "Cici Amelia",
    },

    {
      id: 3,
      lapangan: "Lapangan 2",
      status: "Sedang Digunakan",
      jam: "15:00 - 17:00",
      user: "Budi Santoso",
    },

    {
      id: 4,
      lapangan: "Lapangan 2",
      status: "Akan Digunakan",
      jam: "17:00 - 19:00",
      user: "Dewi Lestari",
    },
  ];

  const statusColor = (status) => {
    if (status === "Tersedia")
      return "bg-green-100 text-green-700 border-green-500";

    if (status === "Sedang Digunakan")
      return "bg-red-100 text-red-700 border-red-500";

    if (status === "Akan Digunakan")
      return "bg-yellow-100 text-yellow-700 border-yellow-500";

    return "bg-gray-100 text-gray-700 border-gray-500";
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt="Badminton"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-500/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">
        <PageHeader
          title="Status Lapangan"
          breadcrumb={["Admin", "Status Lapangan"]}
        />

        {/* INFO STATUS */}
        <div className="grid md:grid-cols-3 gap-4 mt-6 mb-8">
          <div className="bg-green-100 text-green-700 p-4 rounded-xl shadow">
            <h3 className="font-bold">Tersedia</h3>
            <p className="text-sm">
              Belum ada jadwal booking untuk lapangan.
            </p>
          </div>

          <div className="bg-red-100 text-red-700 p-4 rounded-xl shadow">
            <h3 className="font-bold">Sedang Digunakan</h3>
            <p className="text-sm">
              Lapangan sedang digunakan pelanggan saat ini.
            </p>
          </div>

          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-xl shadow">
            <h3 className="font-bold">Akan Digunakan</h3>
            <p className="text-sm">
              Booking berikutnya kurang dari 2 jam lagi.
            </p>
          </div>
        </div>

        {/* CARD STATUS */}
        <div className="grid md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div
              key={field.id}
              className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-blue-500 hover:shadow-2xl transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {field.lapangan}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor(
                    field.status
                  )}`}
                >
                  {field.status}
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Jadwal :</span> {field.jam}
                </p>

                <p>
                  <span className="font-semibold">Pelanggan :</span>{" "}
                  {field.user}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}