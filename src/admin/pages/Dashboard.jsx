import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaClock,
  FaTimesCircle,
  FaWallet,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const profile = {
    name: user?.username || "Admin",
    foto: user?.foto || "https://i.pravatar.cc/100?img=12",
  };

  const hargaBooking = 35000;

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const { data, error } = await supabase.from("bookings").select("*");

    if (error) {
      console.log(error);
      return;
    }

    // TOTAL
    const totalBooking = data?.length || 0;

    // STATUS
    const pendingBooking = data?.filter(
      (x) => (x.status || "").toLowerCase() === "pending",
    ).length;

    const rejectedBooking = data?.filter(
      (x) => (x.status || "").toLowerCase() === "rejected",
    ).length;

    const income = data
      ?.filter((x) => (x.status || "").toLowerCase() === "approved")
      .reduce((total) => total + hargaBooking, 0);

    setStats([
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
    ]);

    // CHART BULANAN
    const grouped = {};

    data.forEach((item) => {
      if (!item.tanggal) return;

      const bulan = new Date(item.tanggal).toLocaleString("id-ID", {
        month: "short",
      });

      grouped[bulan] = (grouped[bulan] || 0) + 1;
    });

    setBookingData(
      Object.entries(grouped).map(([bulan, booking]) => ({
        bulan,
        booking,
      })),
    );
  };

  const colorMap = {
    blue: { border: "border-blue-500", iconBg: "bg-blue-500/10 text-blue-600" },
    orange: {
      border: "border-orange-500",
      iconBg: "bg-orange-500/10 text-orange-600",
    },
    red: { border: "border-red-500", iconBg: "bg-red-500/10 text-red-600" },
    green: {
      border: "border-green-500",
      iconBg: "bg-green-500/10 text-green-600",
    },
  };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-x-hidden p-4 md:p-8">
      {/* BACKGROUND DECORATIVE BUBBLES */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-400/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-green-300/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        {/* HEADER HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden shadow-md h-56 md:h-64 transition-all duration-300">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay gradasi agar teks mudah dibaca */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 via-slate-900/60 to-blue-950/40" />

          {/* CONTENT INSIDE BANNER */}
          <div className="relative z-10 h-full w-full p-6 md:p-8 flex flex-col justify-between">
            {/* TOP ROW INSIDE BANNER */}
            <div className="flex items-center justify-end w-full">
              {/* PROFILE DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="bg-white/95 hover:bg-white rounded-full p-1.5 pr-4 flex items-center gap-2.5 shadow-lg transition-all duration-200 border border-white/20 backdrop-blur-sm"
                >
                  <img
                    src={profile.foto}
                    alt={profile.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200/50"
                  />

                  <div className="text-left hidden sm:block">
                    <h3 className="font-bold text-slate-800 text-xs tracking-wide leading-none">
                      {profile.name}
                    </h3>

                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mt-0.5">
                      Admin
                    </p>
                  </div>
                </button>

                {openProfile && (
                  <div className="absolute right-0 top-14 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[9999]">
                    <button
                      onClick={() => {
                        setOpenProfile(false);
                        navigate("/admin/profile");
                      }}
                      className="w-full px-4 py-3 hover:bg-slate-50 text-slate-700 flex items-center gap-2 text-sm"
                    >
                      <FaUserCircle />
                      Edit Profile
                    </button>

                    <button
                      onClick={() => {
                        setOpenProfile(false);

                        localStorage.removeItem("user");
                        localStorage.removeItem("token");

                        navigate("/login");
                      }}
                      className="w-full px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-2 text-sm"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* BOTTOM ROW INSIDE BANNER: GREETINGS */}
            <div className="text-white mt-auto">
              <p className="uppercase tracking-widest text-[9px] font-bold bg-blue-500/30 text-blue-200 w-fit px-2.5 py-1 rounded-full mb-2 backdrop-blur-sm">
                Admin Panel
              </p>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight">
                Dashboard Overview
              </h1>
              <p className="mt-1 text-xs md:text-sm text-slate-300">
                Selamat datang kembali, semoga harimu produktif! 👋
              </p>
            </div>
          </div>
        </div>

        {/* STAT CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item, index) => {
            const c = colorMap[item.color];

            return (
              <div
                key={index}
                onClick={() => navigate(item.route)}
                className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 border-l-4 ${c.border} cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex items-center justify-between`}
              >
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.title}
                  </p>
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl ${c.iconBg}`}
                >
                  {item.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* ANALYTICS CHART SECTION */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>📊</span> Statistik Booking Bulanan
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Total visualisasi pesanan lapangan yang masuk setiap bulan.
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookingData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="bulan"
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  fontSize={12}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
                  }}
                />
                <Bar
                  dataKey="booking"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
