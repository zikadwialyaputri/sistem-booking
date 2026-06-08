import {
  FaCalendarCheck,
  FaClock,
  FaTimesCircle,
  FaWallet,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
export default function Dashboard() {
  const bookingData = [
    { bulan: "Jan", booking: 15 },
    { bulan: "Feb", booking: 22 },
    { bulan: "Mar", booking: 18 },
    { bulan: "Apr", booking: 30 },
    { bulan: "Mei", booking: 27 },
    { bulan: "Jun", booking: 35 },
  ];
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
      {/* GLOW BACKGROUND */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* BACKGROUND IMAGE */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt="badminton"
          className="w-full h-full object-cover scale-110 transition-transform duration-700 hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">
        {/* HEADER */}
        <div className="animate-fadeIn">
          <PageHeader
            title="Dashboard Overview"
            breadcrumb={["Admin", "Dashboard"]}
            actionLabel="Tambah Booking"
          />
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">
          {stats.map((item, index) => {
            const c = colorMap[item.color];

            return (
              <div
                key={index}
                className={`
                  group relative bg-white rounded-2xl p-6 shadow-md 
                  border-l-4 ${c.border}
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-2xl
                `}
              >
                {/* ICON */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      {item.title}
                    </p>

                    <h3 className="text-3xl font-bold text-gray-800 mt-2 transition-all group-hover:scale-110">
                      {item.value}
                    </h3>
                  </div>

                  <div
                    className={`
                      w-11 h-11 flex items-center justify-center rounded-xl text-white shadow-lg
                      ${c.iconBg}
                      group-hover:rotate-6 transition-transform duration-300
                    `}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* glow hover effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-gradient-to-r from-blue-400 to-indigo-400 transition"></div>
              </div>
            );
          })}
        </div>

        {/* CHART */}
        <div className="mt-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-700 text-lg">
              Grafik Okupansi Lapangan
            </h3>

            <button className="text-blue-600 text-sm font-semibold hover:underline hover:scale-105 transition">
              Lihat Laporan Lengkap →
            </button>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="booking" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
