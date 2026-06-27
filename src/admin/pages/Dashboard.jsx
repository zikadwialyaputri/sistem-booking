import { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaTimesCircle,
  FaWallet,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const profile = {
    name: user?.username || "Admin",
    foto:
      user?.foto ||
      "https://i.pravatar.cc/100?img=12",
  };

  const hargaBooking = 35000;

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const totalBooking = data.length;

    const pendingBooking = data.filter(
      (x) => x.status === "pending"
    ).length;

    const rejectedBooking = data.filter(
      (x) => x.status === "rejected"
    ).length;

    const income = data
      .filter(
        (x) => x.status === "approved"
      )
      .reduce(
        (total) => total + hargaBooking,
        0
      );

    setStats([
      {
        title: "Total Booking",
        value: totalBooking,
        route: "/admin/orders",
        icon: (
          <FaCalendarCheck size={18} />
        ),
        color: "blue",
      },

      {
        title:
          "Menunggu Konfirmasi",
        value: pendingBooking,
        route:
          "/admin/orders?status=pending",
        icon: <FaClock size={18} />,
        color: "orange",
      },

      {
        title: "Dibatalkan",
        value: rejectedBooking,
        route:
          "/admin/orders?status=rejected",
        icon: (
          <FaTimesCircle size={18} />
        ),
        color: "red",
      },

      {
        title:
          "Pendapatan Bulan Ini",
        value: `Rp ${income.toLocaleString(
          "id-ID"
        )}`,
        route: "/admin/reports",
        icon: <FaWallet size={18} />,
        color: "green",
      },
    ]);

    const grouped = {};

    data.forEach((item) => {
      if (!item.tanggal) return;

      const bulan = new Date(
        item.tanggal
      ).toLocaleString(
        "id-ID",
        {
          month: "short",
        }
      );

      grouped[bulan] =
        (grouped[bulan] || 0) + 1;
    });

    const result =
      Object.entries(grouped).map(
        ([bulan, booking]) => ({
          bulan,
          booking,
        })
      );

    setBookingData(result);
  };

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

      {/* Header Background */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"/>
      </div>

      <div className="relative z-10 p-5 md:p-10">

        {/* Header + Profile */}
        <div className="flex justify-between items-center">

          <PageHeader
            title="Dashboard Overview"
            breadcrumb={[
              "Admin",
              "Dashboard",
            ]}
          />

          <div className="relative">

            <button
              onClick={() =>
                setOpenProfile(
                  !openProfile
                )
              }
              className="bg-white rounded-xl px-4 py-2 shadow flex items-center gap-3"
            >

              <img
                src={profile.foto}
                className="w-10 h-10 rounded-full"
              />

              <div>

                <p className="font-semibold">
                  {profile.name}
                </p>

                <p className="text-xs text-gray-500">
                  Admin
                </p>

              </div>

            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl">

                <button
                  onClick={() =>
                    navigate(
                      "/admin/profile"
                    )
                  }
                  className="w-full p-3 hover:bg-gray-100 text-left"
                >
                  <div className="flex gap-2 items-center">
                    <FaUserCircle />
                    Edit Profile
                  </div>
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem(
                      "user"
                    );

                    localStorage.removeItem(
                      "token"
                    );

                    navigate(
                      "/login"
                    );
                  }}
                  className="w-full p-3 hover:bg-red-100 text-red-500 text-left"
                >
                  <div className="flex gap-2 items-center">
                    <FaSignOutAlt />
                    Logout
                  </div>
                </button>

              </div>
            )}

          </div>

        </div>

        {/* Statistik */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">

          {stats.map(
            (item, index) => {
              const c =
                colorMap[
                  item.color
                ];

              return (
                <div
                  key={index}
                  onClick={() =>
                    navigate(
                      item.route
                    )
                  }
                  className={`bg-white rounded-2xl p-6 shadow border-l-4 ${c.border} cursor-pointer hover:scale-105 transition`}
                >

                  <div className="flex justify-between">

                    <div>
                      <p className="text-xs text-gray-400">
                        {item.title}
                      </p>

                      <h2 className="text-3xl font-bold mt-2">
                        {item.value}
                      </h2>
                    </div>

                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${c.iconBg}`}>
                      {item.icon}
                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

        {/* Grafik */}
        <div className="mt-10 bg-white rounded-2xl shadow-xl p-6">

          <h3 className="font-bold text-lg mb-6">
            Grafik Booking Bulanan
          </h3>

          <div className="h-72">

            <ResponsiveContainer>
              <BarChart
                data={bookingData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan"/>
                <YAxis/>
                <Tooltip/>
                <Bar
                  dataKey="booking"
                  fill="#2563eb"
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </div>
  );
}