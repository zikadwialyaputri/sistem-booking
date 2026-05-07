import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaMoneyBillWave, FaCalendarAlt, FaChartLine } from "react-icons/fa";

export default function Laporan() {
  const [selectedMonth, setSelectedMonth] = useState("Semua");

  const laporan = [
    { bulan: "Januari", totalBooking: 120, pendapatan: 3000000 },
    { bulan: "Februari", totalBooking: 150, pendapatan: 3750000 },
    { bulan: "Maret", totalBooking: 180, pendapatan: 4500000 },
    { bulan: "April", totalBooking: 200, pendapatan: 5000000 },
    { bulan: "Mei", totalBooking: 170, pendapatan: 4200000 },
    { bulan: "Juni", totalBooking: 210, pendapatan: 5300000 },
  ];

  const filtered =
    selectedMonth === "Semua"
      ? laporan
      : laporan.filter((l) => l.bulan === selectedMonth);

  const totalBooking = filtered.reduce((acc, cur) => acc + cur.totalBooking, 0);
  const totalPendapatan = filtered.reduce(
    (acc, cur) => acc + cur.pendapatan,
    0,
  );

  const formatRupiah = (num) => "Rp " + num.toLocaleString("id-ID");

  return (
    <div className="relative bg-gray-100 min-h-screen">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img src="/img/badminton.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-500/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">
        <PageHeader title="Laporan Bulanan" breadcrumb={["Admin", "Laporan"]} />

        {/* FILTER */}
        <div className="mt-6 mb-6">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 rounded-lg shadow outline-none bg-white text-gray-700 border border-gray-200 focus:ring-2 focus:ring-blue-400"
          >
            <option>Semua</option>
            {laporan.map((l, i) => (
              <option key={i}>{l.bulan}</option>
            ))}
          </select>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center border-b-4 border-blue-500">
            <div>
              <p className="text-gray-400 text-sm">Total Booking</p>
              <h2 className="text-2xl font-bold">{totalBooking}</h2>
            </div>
            <FaCalendarAlt className="text-blue-500 text-2xl" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center border-b-4 border-green-500">
            <div>
              <p className="text-gray-400 text-sm">Total Pendapatan</p>
              <h2 className="text-2xl font-bold">
                {formatRupiah(totalPendapatan)}
              </h2>
            </div>
            <FaMoneyBillWave className="text-green-500 text-2xl" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center border-b-4 border-purple-500">
            <div>
              <p className="text-gray-400 text-sm">Rata-rata Booking</p>
              <h2 className="text-2xl font-bold">
                {filtered.length
                  ? Math.round(totalBooking / filtered.length)
                  : 0}
              </h2>
            </div>
            <FaChartLine className="text-purple-500 text-2xl" />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4 text-left">Bulan</th>
                <th className="p-4 text-left">Total Booking</th>
                <th className="p-4 text-left">Pendapatan</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-blue-50 transition"
                >
                  <td className="p-4 font-semibold">{item.bulan}</td>
                  <td className="p-4">{item.totalBooking}</td>
                  <td className="p-4 font-bold text-green-600">
                    {formatRupiah(item.pendapatan)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
