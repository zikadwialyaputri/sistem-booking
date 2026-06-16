import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function StatusJadwal() {
  const [search, setSearch] = useState("");

  const jadwal = [
    {
      id: 1,
      lapangan: "Lapangan A",
      tanggal: "09 Juni 2026",
      jam: "19:00 - 20:00",
      status: "Dikonfirmasi",
    },
    {
      id: 2,
      lapangan: "Lapangan B",
      tanggal: "09 Juni 2026",
      jam: "16:00 - 17:00",
      status: "Menunggu",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Dikonfirmasi":
        return "bg-green-100 text-green-700";
      case "Menunggu":
        return "bg-yellow-100 text-yellow-700";
      case "Ditolak":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // 🔥 SEARCH FILTER (multi field)
  const filteredJadwal = jadwal.filter((item) =>
    `${item.lapangan} ${item.tanggal} ${item.jam} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
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
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        <PageHeader
          title="Status Jadwal Lapangan"
          breadcrumb={["Petugas", "Jadwal"]}
        />

        {/* SEARCH BAR */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Cari lapangan, tanggal, jam, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-4 py-3 rounded-xl shadow-md border bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">

          <h2 className="text-lg font-bold mb-5">
            Daftar Jadwal
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b text-gray-600">
                  <th className="p-3">Lapangan</th>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3">Jam</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredJadwal.length > 0 ? (
                  filteredJadwal.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium">
                        {item.lapangan}
                      </td>

                      <td className="p-3 text-gray-600">
                        {item.tanggal}
                      </td>

                      <td className="p-3 text-gray-600">
                        {item.jam}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-400">
                      Data tidak ditemukan
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