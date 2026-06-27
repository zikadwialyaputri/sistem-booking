import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState("Semua");
  const [laporan, setLaporan] = useState([]);

  const hargaBooking = 35000;

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "approved"); // 🔥 FIX: hanya approved

    if (error) {
      console.log("ERROR:", error);
      return;
    }

    const grouped = {};

    data.forEach((item) => {
      const date = new Date(item.tanggal);

      const bulan = date.toLocaleString("id-ID", {
        month: "long",
      });

      if (!grouped[bulan]) {
        grouped[bulan] = {
          bulan,
          totalBooking: 0,
        };
      }

      grouped[bulan].totalBooking += 1;
    });

    const result = Object.values(grouped).map((item) => ({
      ...item,
      pendapatan: item.totalBooking * hargaBooking,
    }));

    setLaporan(result);
  };

  const filtered =
    selectedMonth === "Semua"
      ? laporan
      : laporan.filter((item) => item.bulan === selectedMonth);

  const totalBooking = filtered.reduce(
    (acc, cur) => acc + cur.totalBooking,
    0
  );

  const totalPendapatan = filtered.reduce(
    (acc, cur) => acc + cur.pendapatan,
    0
  );

  const formatRupiah = (num) =>
    "Rp " + num.toLocaleString("id-ID");

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

      <div className="relative z-10 p-5 md:p-10">

        <PageHeader
          title="Laporan Bulanan"
          breadcrumb={["Admin", "Laporan"]}
        />

        {/* FILTER */}
        <div className="mt-6 mb-6">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 rounded-lg shadow bg-white"
          >
            <option>Semua</option>

            {laporan.map((item) => (
              <option key={item.bulan} value={item.bulan}>
                {item.bulan}
              </option>
            ))}
          </select>
        </div>

        {/* CARD */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-400">Total Booking</p>
            <h2 className="text-3xl font-bold">{totalBooking}</h2>
            <FaCalendarAlt className="text-blue-500 mt-2" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-400">Total Pendapatan</p>
            <h2 className="text-3xl font-bold">
              {formatRupiah(totalPendapatan)}
            </h2>
            <FaMoneyBillWave className="text-green-500 mt-2" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-400">Rata-rata Booking</p>
            <h2 className="text-3xl font-bold">
              {filtered.length
                ? Math.round(totalBooking / filtered.length)
                : 0}
            </h2>
            <FaChartLine className="text-purple-500 mt-2" />
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Bulan</th>
                <th className="p-4 text-left">Total Booking</th>
                <th className="p-4 text-left">Pendapatan</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.bulan}
                  className="border-t hover:bg-blue-50"
                >
                  <td className="p-4 font-semibold">
                    {item.bulan}
                  </td>

                  <td className="p-4">
                    {item.totalBooking}
                  </td>

                  <td className="p-4 text-green-600 font-bold">
                    {formatRupiah(item.pendapatan)}
                  </td>

                  <td className="p-4">
                    <Link
                      to={`/admin/reports/${item.bulan}`}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                    >
                      Detail
                    </Link>
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