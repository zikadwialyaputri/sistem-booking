export default function RiwayatBooking() {
  const bookings = [
    {
      id: 1,
      lapangan: "Lapangan 1",
      tanggal: "10 Juni 2026",
      jam: "18.00 - 20.00",
      status: "Menunggu Konfirmasi",
    },
    {
      id: 2,
      lapangan: "Lapangan 2",
      tanggal: "15 Juni 2026",
      jam: "19.00 - 21.00",
      status: "Disetujui",
    },
    {
      id: 3,
      lapangan: "Lapangan 3",
      tanggal: "18 Juni 2026",
      jam: "16.00 - 18.00",
      status: "Ditolak",
    },
    {
      id: 4,
      lapangan: "Lapangan 1",
      tanggal: "20 Juni 2026",
      jam: "18.00 - 20.00",
      status: "Selesai",
    },
  ];

  const pending = bookings.filter(
    (b) => b.status === "Menunggu Konfirmasi"
  );

  const approved = bookings.filter(
    (b) => b.status === "Disetujui"
  );

  const rejected = bookings.filter(
    (b) => b.status === "Ditolak"
  );

  const selesai = bookings.filter(
    (b) => b.status === "Selesai"
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Menunggu Konfirmasi":
        return "bg-yellow-100 text-yellow-700";

      case "Disetujui":
        return "bg-green-100 text-green-700";

      case "Ditolak":
        return "bg-red-100 text-red-700";

      case "Selesai":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderSection = (
    title,
    color,
    data
  ) => (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

      <h2
        className={`text-lg font-bold mb-4 ${color}`}
      >
        {title} ({data.length})
      </h2>

      <div className="space-y-4">

        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-5 flex flex-col lg:flex-row lg:justify-between"
            >
              <div>

                <h3 className="font-bold text-lg">
                  {item.lapangan}
                </h3>

                <p className="text-gray-600 mt-2">
                  📅 {item.tanggal}
                </p>

                <p className="text-gray-600">
                  🕒 {item.jam}
                </p>

              </div>

              <div className="mt-4 lg:mt-0 flex items-center">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">
            Tidak ada data
          </p>
        )}

      </div>
    </div>
  );

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>

      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">

        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>

      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        <h1 className="text-3xl font-bold text-white mb-10">
          Riwayat Booking
        </h1>

        {renderSection(
          "Menunggu Konfirmasi",
          "text-orange-500",
          pending
        )}

        {renderSection(
          "Disetujui",
          "text-green-600",
          approved
        )}

        {renderSection(
          "Ditolak",
          "text-red-600",
          rejected
        )}

        {renderSection(
          "Selesai",
          "text-blue-600",
          selesai
        )}

      </div>
    </div>
  );
}