import { useState } from "react";
import { FaCalendarCheck, FaClock, FaTimesCircle } from "react-icons/fa";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  // 🔥 PROFILE DATA (bisa nanti dari backend)
  const [profile] = useState({
    name: "Petugas",
    foto: "https://i.pravatar.cc/100?img=12",
  });

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
    blue: { border: "border-blue-500", iconBg: "bg-blue-500" },
    orange: { border: "border-orange-500", iconBg: "bg-orange-500" },
    red: { border: "border-red-500", iconBg: "bg-red-500" },
    green: { border: "border-green-500", iconBg: "bg-green-500" },
  };

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* HEADER IMAGE */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt="badminton"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        {/* HEADER + PROFILE (FIXED) */}
        <div className="flex justify-between items-center mb-6">

          <PageHeader
            title="Dashboard Overview"
            breadcrumb={["Petugas", "Dashboard"]}
          />

          {/* PROFILE DROPDOWN */}
          <div className="relative">

            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
            >
              <img
                src={profile.foto}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border"
              />
              <div className="text-left">
                <p className="text-sm font-semibold leading-4">
                  {profile.name}
                </p>
                <p className="text-xs text-gray-400">Petugas</p>
              </div>
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border overflow-hidden z-50">

                <button
                  onClick={() => {
                    navigate("/petugas/profile");
                    setOpenProfile(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <FaUserCircle />
                    Edit Profile
                  </div>
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-500"
                >
                  <div className="flex items-center gap-2">
                    <FaSignOutAlt />
                    Logout
                  </div>
                </button>

              </div>
            )}

          </div>
        </div>

        {/* STATISTIK (TIDAK DIUBAH) */}
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

        {/* BOTTOM SECTION (TIDAK DIUBAH) */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">

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
            </div>
          </div>

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

        {/* JADWAL (TIDAK DIUBAH) */}
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