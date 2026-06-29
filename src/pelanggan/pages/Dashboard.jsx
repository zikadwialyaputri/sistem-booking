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

  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showAllJadwal, setShowAllJadwal] = useState(false);
  const [showAllRiwayat, setShowAllRiwayat] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const profile = {
    name: user?.username || "User",
    foto: user?.foto || "https://i.pravatar.cc/100?img=12",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (!error) {

      // hapus data booking duplikat
      const uniqueBookings = data.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (b) =>
              b.tanggal === item.tanggal &&
              b.jam_mulai === item.jam_mulai &&
              b.lapangan_id === item.lapangan_id
          )
      );

      setBookings(uniqueBookings);

      const notifData = uniqueBookings.map(
        (item) => ({
          id: item.id,
          pesan:
            item.status === "approved"
              ? "✅ Booking Disetujui"
              : item.status === "rejected"
              ? "❌ Booking Ditolak"
              : "⏳ Booking Diproses",

          tanggal: item.tanggal,
        })
      );

      setNotifications(notifData);
    }
  };

  const nextBooking = bookings.find(
    (b) =>
      b.status === "approved" ||
      b.status === "pending"
  );

  const stats = [
    {
      title: "Menunggu",
      value: bookings.filter(
        (b) => b.status === "pending"
      ).length,
      icon: <FaClock />,
    },

    {
      title: "Disetujui",
      value: bookings.filter(
        (b) => b.status === "approved"
      ).length,
      icon: <FaCheckCircle />,
    },

    {
      title: "Selesai",
      value: bookings.filter(
        (b) => b.status === "done"
      ).length,
      icon: <FaHistory />,
    },
  ];

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const semuaJadwal = bookings.filter(
    (b) => b.tanggal === today
  );

  const jadwal = showAllJadwal
    ? semuaJadwal
    : semuaJadwal.slice(0, 3);

  const riwayat = showAllRiwayat
    ? bookings
    : bookings.slice(0, 3);

  const getStatusColor = (status) => {
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

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-xl text-white mb-8">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              Halo, {profile.name}
            </h1>

            <p className="text-blue-100">
              Selamat datang kembali
            </p>
          </div>

          <div className="flex gap-4 items-center">

            {/* NOTIF */}

            <div className="relative">

              <FaBell
                className="text-2xl cursor-pointer"
                onClick={() =>
                  setShowNotif(!showNotif)
                }
              />

              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              )}

              {showNotif && (
                <div className="absolute right-0 top-10 w-72 bg-white text-black rounded-xl shadow-xl max-h-80 overflow-y-auto">

                  <div className="font-bold p-3 border-b">
                    Notifikasi
                  </div>

                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 border-b"
                    >
                      <p>{n.pesan}</p>
                      <small>{n.tanggal}</small>
                    </div>
                  ))}

                </div>
              )}
            </div>

            <img
              src={profile.foto}
              className="w-11 h-11 rounded-full border-2 border-white cursor-pointer"
              onClick={() =>
                setShowProfile(!showProfile)
              }
            />

          </div>
        </div>
      </div>

      {/* Booking berikutnya */}

      <div className="bg-white p-6 rounded-3xl shadow mb-8">

        <h2 className="font-bold text-lg mb-3">
          Booking Berikutnya
        </h2>

        {nextBooking ? (
          <>
            <p>
              🏸 Lapangan {nextBooking.lapangan_id}
            </p>

            <p>
              📅 {nextBooking.tanggal}
            </p>

            <p>
              🕒 {nextBooking.jam_mulai} -
              {nextBooking.jam_selesai}
            </p>
          </>
        ) : (
          <p>Belum ada booking</p>
        )}
      </div>

      {/* Statistik */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow hover:scale-105 duration-300"
          >

            <div className="text-3xl mb-3">
              {item.icon}
            </div>

            <h3 className="text-gray-500">
              {item.title}
            </h3>

            <p className="text-3xl font-bold">
              {item.value}
            </p>

          </div>

        ))}

      </div>

      {/* Jadwal */}

      <div className="bg-white p-6 rounded-3xl shadow mb-8">

        <h2 className="font-bold mb-4">
          Jadwal Hari Ini
        </h2>

        {jadwal.map((item) => (
          <div
            key={item.id}
            className="border-b p-3"
          >
            <p>
              🏸 Lapangan {item.lapangan_id}
            </p>

            <p>
              🕒 {item.jam_mulai} -
              {item.jam_selesai}
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}
            >
              {item.status}
            </span>

          </div>
        ))}

      </div>

      {/* Riwayat */}

      <div className="bg-white p-6 rounded-3xl shadow">

        <h2 className="font-bold mb-4">
          Riwayat
        </h2>

        {riwayat.map((item) => (
          <div
            key={item.id}
            className="border-b p-3"
          >
            <p>
              🏸 Lapangan {item.lapangan_id}
            </p>

            <p>
              📅 {item.tanggal}
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}
            >
              {item.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}