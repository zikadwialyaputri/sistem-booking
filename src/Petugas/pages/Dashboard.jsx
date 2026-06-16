import { FaCalendarCheck, FaClock, FaTimesCircle } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const stats = [
    {
      title: "Total Booking",
      value: 350,
      icon: <FaCalendarCheck size={18} />,
      color: "blue",
      path: "/petugas/booking",
    },
    {
      title: "Menunggu Konfirmasi",
      value: 12,
      icon: <FaClock size={18} />,
      color: "orange",
      path: "/petugas/booking",
    },
    {
      title: "Booking Hari Ini",
      value: 28,
      icon: <FaCalendarCheck size={18} />,
      color: "green",
      path: "/petugas/jadwal",
    },
    {
      title: "Dibatalkan",
      value: 40,
      icon: <FaTimesCircle size={18} />,
      color: "red",
      path: "/petugas/booking",
    },
  ];
  const colorMap = {
    blue: {
      border: "border-blue-500",
      iconBg: "bg-blue-500",
    },
    orange: {
      border: "border-orange-500",
      iconBg: "bg-orange-500",
    },
    red: {
      border: "border-red-500",
      iconBg: "bg-red-500",
    },
    green: {
      border: "border-green-500",
      iconBg: "bg-green-500",
    },
  };

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* Header Image */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt="badminton"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 md:p-10">
        <PageHeader
          title="Dashboard Overview"
          breadcrumb={["Petugas", "Dashboard"]}
        />

        {/* Statistik */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">
          {stats.map((item, index) => {
            const c = colorMap[item.color];

            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`bg-white rounded-2xl p-6 shadow-md border-l-4 ${c.border}
                cursor-pointer hover:scale-105 hover:shadow-xl transition duration-300`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      {item.title}
                    </p>

                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                      {item.value}
                    </h3>
                  </div>

                  <div
                    className={`w-11 h-11 flex items-center justify-center rounded-xl text-white ${c.iconBg}`}
                  >
                    {item.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking Menunggu + Status Lapangan */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          {/* Booking Menunggu */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-5">
              Booking Menunggu Konfirmasi
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-semibold">Andi</p>
                  <p className="text-sm text-gray-500">
                    Lapangan A • 17:00 - 19:00
                  </p>
                </div>

                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                  Menunggu
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-semibold">Budi</p>
                  <p className="text-sm text-gray-500">
                    Lapangan B • 19:00 - 21:00
                  </p>
                </div>

                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                  Menunggu
                </span>
              </div>
            </div>
          </div>

          {/* Status Lapangan */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-5">Status Lapangan</h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Lapangan A</span>
                <span className="text-red-500 font-semibold">Dipakai</span>
              </div>

              <div className="flex justify-between">
                <span>Lapangan B</span>
                <span className="text-green-500 font-semibold">Tersedia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Jadwal Hari Ini */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
          <h3 className="text-xl font-bold mb-5">Jadwal Hari Ini</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Lapangan</th>
                  <th className="text-left py-3">Jam</th>
                  <th className="text-left py-3">Pelanggan</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-3">Lapangan A</td>
                  <td>15:00 - 17:00</td>
                  <td>Andi</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Lapangan B</td>
                  <td>19:00 - 21:00</td>
                  <td>Budi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
