import {
  FaCalendarCheck,
  FaClock,
  FaTimesCircle,
  FaWallet,
} from "react-icons/fa";

import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Booking",
      value: 350,
      icon: <FaCalendarCheck size={18} />,
      color: "blue",
    },
    {
      title: "Menunggu",
      value: 12,
      icon: <FaClock size={18} />,
      color: "orange",
    },
    {
      title: "Dibatalkan",
      value: 40,
      icon: <FaTimesCircle size={18} />,
      color: "red",
    },
    {
      title: "Pendapatan",
      value: "Rp 4.5jt",
      icon: <FaWallet size={18} />,
      color: "green",
    },
  ];

  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-500",
      iconBg: "bg-blue-500",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-500",
      iconBg: "bg-orange-500",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-500",
      iconBg: "bg-red-500",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-500",
      iconBg: "bg-green-500",
    },
  };

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* BACKGROUND EFFECT */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* HEADER IMAGE */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt="badminton"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        {/* HEADER */}
        <PageHeader
          title="Dashboard Overview"
          breadcrumb={["Petugas", "Dashboard"]}
          actionLabel="Tambah Booking"
        />

        {/* STATS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">

          {stats.map((item, index) => {
            const c = colorMap[item.color];

            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-6 shadow-md border-l-4 ${c.border} hover:-translate-y-2 transition`}
              >

                <div className="flex justify-between items-start">

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      {item.title}
                    </p>

                    <h3 className="text-3xl font-bold text-gray-800 mt-2 group-hover:scale-110 transition">
                      {item.value}
                    </h3>
                  </div>

                  <div
                    className={`w-11 h-11 flex items-center justify-center rounded-xl text-white shadow-lg ${c.iconBg}`}
                  >
                    {item.icon}
                  </div>

                </div>

                {/* hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-gradient-to-r from-blue-400 to-indigo-400 transition"></div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}