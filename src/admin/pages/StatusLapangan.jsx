import PageHeader from "../components/PageHeader";

export default function StatusLapangan() {

  const fields = [
    {
      name: "Lapangan 1",
      status: "Digunakan",
      jam: "08:00 - 10:00",
      user: "Andi",
    },
    {
      name: "Lapangan 2",
      status: "Tersedia",
      jam: "-",
      user: "-",
    },
  ];

  const statusColor = (status) => {
    if (status === "Tersedia") return "bg-green-100 text-green-600 border-green-500";
    if (status === "Digunakan") return "bg-red-100 text-red-600 border-red-500";
    return "bg-yellow-100 text-yellow-600 border-yellow-500";
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
          title="Status Lapangan"
          breadcrumb={["Admin", "Status Lapangan"]}
        />

        {/* GRID LAPLAGAN */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">

          {fields.map((field, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl p-6 border-l-4 hover:scale-105 transition"
            >

              {/* HEADER CARD */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {field.name}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor(
                    field.status
                  )}`}
                >
                  {field.status}
                </span>
              </div>

              {/* DETAIL */}
              <div className="text-gray-500 text-sm space-y-2">
                <p>
                  <span className="font-semibold">Jadwal:</span>{" "}
                  {field.jam}
                </p>
                <p>
                  <span className="font-semibold">Dipakai oleh:</span>{" "}
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