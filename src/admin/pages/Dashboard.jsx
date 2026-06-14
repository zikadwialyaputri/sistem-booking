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
import bookings from "../data/bookings.json";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const totalBooking = bookings.length;

  const pendingBooking = bookings.filter(
    (item) => item.status === "pending"
  ).length;

  const rejectedBooking = bookings.filter(
    (item) => item.status === "rejected"
  ).length;

  const income = bookings
    .filter((item) => item.status === "accepted")
    .reduce((total, item) => total + item.price, 0);

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
      value: totalBooking,
      route: "/admin/orders",
      icon: <FaCalendarCheck size={18} />,
      color: "blue",
    },
    {
      title: "Menunggu Konfirmasi",
      value: pendingBooking,
      route: "/admin/orders?status=pending",
      icon: <FaClock size={18} />,
      color: "orange",
    },
    {
      title: "Dibatalkan",
      value: rejectedBooking,
      route: "/admin/orders?status=rejected",
      icon: <FaTimesCircle size={18} />,
      color: "red",
    },
    {
      title: "Pendapatan Bulan Ini",
      value: `Rp ${income.toLocaleString("id-ID")}`,
      route: "/admin/reports",
      icon: <FaWallet size={18} />,
      color: "green",
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
      {/* Glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt="badminton"
          className="w-full h-full object-cover scale-110 transition-transform duration-700 hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 md:p-10">
        <PageHeader
          title="Dashboard Overview"
          breadcrumb={["Admin", "Dashboard"]}
        />

        {/* Statistik */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">
          {stats.map((item, index) => {
            const c = colorMap[item.color];

            return (
              <div
                key={index}
                onClick={() => navigate(item.route)}
                className={`
                  cursor-pointer
                  group relative bg-white rounded-2xl p-6 shadow-md
                  border-l-4 ${c.border}
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-2xl
                `}
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
                    className={`
                      w-11 h-11 flex items-center justify-center
                      rounded-xl text-white shadow-lg
                      ${c.iconBg}
                    `}
                  >
                    {item.icon}
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-gradient-to-r from-blue-400 to-indigo-400 transition"></div>
              </div>
            );
          })}
        </div>

        {/* Grafik */}
        <div className="mt-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-700 text-lg">
              Grafik Okupansi Lapangan
            </h3>

            <button
              onClick={() => navigate("/admin/reports")}
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
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
                <Bar
                  dataKey="booking"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}