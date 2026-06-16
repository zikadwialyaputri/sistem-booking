import {
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarCheck,
} from "react-icons/fa";

export default function Notifikasi() {
  const notifications = [
    {
      id: 1,
      pesan: "Booking Anda Disetujui",
      tanggal: "20 Juni 2026",
      status: "success",
    },
    {
      id: 2,
      pesan: "Booking Anda Ditolak",
      tanggal: "18 Juni 2026",
      status: "danger",
    },
    {
      id: 3,
      pesan: "Booking Berhasil dibuat",
      tanggal: "17 Juni 2026",
      status: "info",
    },
  ];

  const approved = notifications.filter(
    (n) => n.status === "success"
  );

  const rejected = notifications.filter(
    (n) => n.status === "danger"
  );

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>

      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* HEADER IMAGE */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        {/* JUDUL */}
        <div className="text-white mb-10">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <FaBell />
            Notifikasi
          </h1>

          <p className="text-blue-100 mt-2">
            Informasi terbaru booking lapangan Anda
          </p>
        </div>

        {/* STATISTIK */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white rounded-xl shadow-md p-5">
            <FaBell className="text-blue-500 text-2xl mb-2"/>

            <p className="text-gray-500 text-sm">
              Total Notifikasi
            </p>

            <h2 className="text-3xl font-bold text-blue-600">
              {notifications.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5">
            <FaCheckCircle className="text-green-500 text-2xl mb-2"/>

            <p className="text-gray-500 text-sm">
              Disetujui
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {approved.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5">
            <FaTimesCircle className="text-red-500 text-2xl mb-2"/>

            <p className="text-gray-500 text-sm">
              Ditolak
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {rejected.length}
            </h2>
          </div>

        </div>

        {/* LIST NOTIFIKASI */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold text-blue-600 mb-6">
            Daftar Notifikasi
          </h2>

          <div className="space-y-4">

            {notifications.map((n) => (

              <div
                key={n.id}
                className="border rounded-xl p-5 hover:shadow-md transition flex justify-between items-center"
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center
                    ${
                      n.status === "success"
                        ? "bg-green-100 text-green-600"
                        : n.status === "danger"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {n.status === "success" ? (
                      <FaCheckCircle />
                    ) : n.status === "danger" ? (
                      <FaTimesCircle />
                    ) : (
                      <FaCalendarCheck />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {n.pesan}
                    </p>

                    <p className="text-gray-500 text-sm">
                      {n.tanggal}
                    </p>
                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs
                  ${
                    n.status === "success"
                      ? "bg-green-100 text-green-700"
                      : n.status === "danger"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {n.status === "success"
                    ? "Disetujui"
                    : n.status === "danger"
                    ? "Ditolak"
                    : "Info"}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}