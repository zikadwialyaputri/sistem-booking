import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Orders() {
  const [search, setSearch] = useState("");

  const bookings = [
    { id: 1, name: "Andi", court: "Lapangan 1", date: "2025-03-01", time: "08:00", status: "Selesai" },
    { id: 2, name: "Budi", court: "Lapangan 2", date: "2025-03-01", time: "10:00", status: "Menunggu" },
    { id: 3, name: "Citra", court: "Lapangan 3", date: "2025-03-01", time: "12:00", status: "Dibatalkan" },
    { id: 4, name: "Dewi", court: "Lapangan 1", date: "2025-03-02", time: "09:00", status: "Selesai" },
    { id: 5, name: "Eko", court: "Lapangan 2", date: "2025-03-02", time: "11:00", status: "Menunggu" },
    { id: 6, name: "Fajar", court: "Lapangan 3", date: "2025-03-02", time: "13:00", status: "Selesai" },
  ];

  const filtered = bookings.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (status) => {
    if (status === "Selesai")
      return "bg-green-100 text-green-700 border-green-300";
    if (status === "Menunggu")
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    if (status === "Dibatalkan")
      return "bg-red-100 text-red-700 border-red-300";
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
          title="Daftar Booking"
          breadcrumb={["Admin", "Booking"]}
        />

        {/* SEARCH */}
        <div className="mt-6 mb-6">
          <input
            type="text"
            placeholder="Cari nama pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-4 py-3 rounded-xl shadow-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Nama</th>
                  <th className="p-4 text-left">Lapangan</th>
                  <th className="p-4 text-left">Tanggal</th>
                  <th className="p-4 text-left">Jam</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-blue-50/50 transition"
                  >
                    <td className="p-4 font-medium text-gray-600">
                      #{item.id}
                    </td>

                    <td className="p-4 font-semibold text-gray-800">
                      {item.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.court}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.date}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.time}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}