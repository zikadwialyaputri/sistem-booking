import { useEffect, useState } from "react";
import {
  FaBell,
  FaClock,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function Dashboard() {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] =
    useState(false);

  const [showNotif, setShowNotif] =
    useState(false);

  const [showAllJadwal, setShowAllJadwal] =
    useState(false);

  const [showAllRiwayat, setShowAllRiwayat] =
    useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [bookings, setBookings] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const profile = {
    name: user?.username || "User",
    foto:
      user?.foto ||
      "https://i.pravatar.cc/100?img=12",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!user) return;

    const { data, error } =
      await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("tanggal", {
          ascending: true,
        });

    if (!error) {

      const uniqueBookings = [
        ...new Map(
          (data || []).map((item) => [
            `${item.tanggal}-${item.jam_mulai}-${item.jam_selesai}-${item.lapangan_id}`,
            item,
          ])
        ).values(),
      ];

      setBookings(uniqueBookings);

      const notifData =
        uniqueBookings.map((item) => ({
          id: item.id,

          pesan:
            item.status ===
            "approved"
              ? "✅ Booking Disetujui"
              : item.status ===
                "rejected"
              ? "❌ Booking Ditolak"
              : item.status ===
                "done"
              ? "🏁 Booking Selesai"
              : "⏳ Booking Diproses",

          tanggal: item.tanggal,
        }));

      setNotifications(
        notifData
      );
    }
  };

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const nextBooking =
    bookings.find(
      (b) =>
        b.status ===
          "approved" ||
        b.status ===
          "pending"
    );

  const stats = [
    {
      title: "Menunggu",
      value:
        bookings.filter(
          (b) =>
            b.status ===
            "pending"
        ).length,
      icon: <FaClock />,
    },

    {
      title: "Disetujui",
      value:
        bookings.filter(
          (b) =>
            b.status ===
            "approved"
        ).length,
      icon: (
        <FaCheckCircle />
      ),
    },

    {
      title: "Selesai",
      value:
        bookings.filter(
          (b) =>
            b.status ===
            "done"
        ).length,
      icon: <FaHistory />,
    },
  ];

  const semuaJadwal =
    bookings.filter(
      (b) =>
        b.tanggal ===
          today &&
        (b.status ===
          "pending" ||
          b.status ===
            "approved")
    );

  const jadwal =
    showAllJadwal
      ? semuaJadwal
      : semuaJadwal.slice(
          0,
          3
        );

  const semuaRiwayat =
    bookings.filter(
      (b) =>
        b.status ===
          "done" ||
        b.status ===
          "rejected"
    );

  const riwayat =
    showAllRiwayat
      ? semuaRiwayat
      : semuaRiwayat.slice(
          0,
          3
        );

  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "done":
        return "bg-blue-100 text-blue-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-xl text-white mb-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              Halo, {profile.name}
            </h1>

            <p className="text-blue-100">
              Selamat datang kembali
            </p>

          </div>

          <div className="flex gap-5 items-center">

            {/* NOTIF */}

            <div className="relative">

              <FaBell
                className="text-2xl cursor-pointer"
                onClick={() =>
                  setShowNotif(
                    !showNotif
                  )
                }
              />

              {notifications.length >
                0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full text-xs flex justify-center items-center">
                  {
                    notifications.length
                  }
                </span>
              )}

              {showNotif && (

                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl text-black z-50">

                  <div className="bg-blue-500 p-3 text-white font-bold">
                    🔔 Notifikasi
                  </div>

                  {notifications
                    .slice(
                      0,
                      3
                    )
                    .map(
                      (
                        item
                      ) => (

                        <div
                          key={
                            item.id
                          }
                          className="p-3 border-b"
                        >

                          <p>
                            {
                              item.pesan
                            }
                          </p>

                          <small>
                            📅{" "}
                            {
                              item.tanggal
                            }
                          </small>

                        </div>

                      )
                    )}

                  <div className="p-3 text-center">

                    <button
                      onClick={() =>
                        navigate(
                          "/pelanggan/notifikasi"
                        )
                      }
                      className="text-blue-500 font-bold"
                    >
                      Lihat Selengkapnya
                    </button>

                  </div>

                </div>

              )}

            </div>

            {/* PROFILE */}

            <div className="relative">

              <img
                src={
                  profile.foto
                }
                className="w-11 h-11 rounded-full border-2 border-white cursor-pointer"
                onClick={() =>
                  setShowProfile(
                    !showProfile
                  )
                }
              />

              {showProfile && (

                <div className="absolute right-0 top-14 bg-white p-4 rounded-2xl shadow-xl w-52 text-black">

                  <p className="font-bold text-center mb-3">
                    {
                      profile.name
                    }
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        "/pelanggan/profile"
                      )
                    }
                    className="w-full bg-blue-500 text-white p-2 rounded-lg mb-2"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() => {

                      localStorage.removeItem(
                        "user"
                      );

                      navigate(
                        "/login"
                      );

                    }}
                    className="w-full bg-red-500 text-white p-2 rounded-lg"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* STATISTIK */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        {stats.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow hover:scale-105 duration-300"
            >

              <div className="text-3xl mb-3">
                {
                  item.icon
                }
              </div>

              <h3>
                {
                  item.title
                }
              </h3>

              <p className="text-3xl font-bold">
                {
                  item.value
                }
              </p>

            </div>

          )
        )}

      </div>

      {/* JADWAL */}

      <div className="bg-white p-6 rounded-3xl shadow mb-8">

        <h2 className="font-bold text-xl mb-5">
          📅 Jadwal Hari Ini
        </h2>

        <div className="space-y-4">

          {jadwal.map(
            (item) => (

              <div
                key={
                  item.id
                }
                className="bg-gray-50 border p-5 rounded-2xl hover:shadow-md"
              >

                <h3 className="font-bold">
                  🏸 Lapangan{" "}
                  {
                    item.lapangan_id
                  }
                </h3>

                <p>
                  🕒{" "}
                  {
                    item.jam_mulai
                  }
                  -
                  {
                    item.jam_selesai
                  }
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}
                >
                  {
                    item.status
                  }
                </span>

              </div>

            )
          )}

        </div>

      </div>

      {/* RIWAYAT */}

      <div className="bg-white p-6 rounded-3xl shadow">

        <h2 className="font-bold text-xl mb-5">
          📜 Riwayat Booking
        </h2>

        <div className="space-y-4">

          {riwayat.map(
            (item) => (

              <div
                key={
                  item.id
                }
                className="bg-gray-50 border p-5 rounded-2xl hover:shadow-md"
              >

                <h3 className="font-bold">
                  🏸 Lapangan{" "}
                  {
                    item.lapangan_id
                  }
                </h3>

                <p>
                  📅{" "}
                  {
                    item.tanggal
                  }
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}
                >
                  {
                    item.status
                  }
                </span>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}