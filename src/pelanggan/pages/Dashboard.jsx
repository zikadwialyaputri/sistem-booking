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

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("tanggal", {
        ascending: true,
      });

    if (!error) {

      // Hapus data duplikat
      const uniqueBookings = data.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (b) =>
              b.tanggal === item.tanggal &&
              b.jam_mulai === item.jam_mulai &&
              b.jam_selesai === item.jam_selesai &&
              b.lapangan_id === item.lapangan_id
          )
      );

      setBookings(uniqueBookings);

      const notifData =
        uniqueBookings.map((item) => ({
          id: item.id,
          pesan:
            item.status === "approved"
              ? "✅ Booking Disetujui"
              : item.status === "rejected"
              ? "❌ Booking Ditolak"
              : item.status === "done"
              ? "🏁 Booking Selesai"
              : "⏳ Booking Diproses",

          tanggal: item.tanggal,
        }));

      setNotifications(notifData);
    }
  };

  const today = new Date()
    .toISOString()
    .split("T")[0];

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

  // Jadwal hari ini
  const semuaJadwal = bookings.filter(
    (b) =>
      b.tanggal === today &&
      (
        b.status === "approved" ||
        b.status === "pending"
      )
  );

  const jadwal = showAllJadwal
    ? semuaJadwal
    : semuaJadwal.slice(0,3);

  // Riwayat
  const semuaRiwayat =
    bookings.filter(
      (b)=>
        b.status==="done" ||
        b.status==="rejected"
    );

  const riwayat =
    showAllRiwayat
      ? semuaRiwayat
      : semuaRiwayat.slice(0,3);

  const getStatusColor = (status)=>{
    switch(status){

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

          <div className="flex items-center gap-5">

            {/* NOTIF */}

            <div className="relative">

  <FaBell
    className="text-2xl cursor-pointer"
    onClick={() =>
      setShowNotif(!showNotif)
    }
  />

  {notifications.length > 0 && (

    <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-xs flex justify-center items-center">
      {notifications.length}
    </span>

  )}

  {showNotif && (

    <div className="absolute right-0 top-12 w-80 bg-white text-black rounded-2xl shadow-2xl z-50 overflow-hidden">

      {/* Header Notif */}

      <div className="bg-blue-500 text-white p-3 font-bold">

        🔔 Notifikasi

      </div>

      {/* Isi Notif */}

      <div className="max-h-64 overflow-y-auto">

        {notifications.length > 0 ? (

          <>
          
            {notifications
              .slice(0,3)
              .map((item)=>(

                <div
                  key={item.id}
                  className="p-3 border-b hover:bg-gray-100 duration-200"
                >

                  <p className="font-medium">
                    {item.pesan}
                  </p>

                  <small className="text-gray-500">
                    📅 {item.tanggal}
                  </small>

                </div>

            ))}

            {/* tombol */}

            <div className="p-3 text-center">

              <button
                onClick={() => {

                  setShowNotif(false);

                  navigate(
                    "/pelanggan/notifikasi"
                  );

                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Lihat Selengkapnya
              </button>

            </div>

          </>

        ) : (

          <div className="p-4 text-center text-gray-500">

            Belum ada notifikasi

          </div>

        )}

      </div>

    </div>

  )}

</div>


            {/* PROFILE */}

            <div className="relative">

              <img
                src={profile.foto}
                className="w-11 h-11 rounded-full border-2 border-white cursor-pointer"
                onClick={() =>
                  setShowProfile(
                    !showProfile
                  )
                }
              />

              {showProfile && (

                <div className="absolute right-0 top-14 bg-white text-black rounded-2xl shadow-xl w-52 p-4 z-50">

                  <div className="text-center">

                    <img
                      src={profile.foto}
                      className="w-14 h-14 rounded-full mx-auto mb-2"
                    />

                    <p className="font-bold">
                      {profile.name}
                    </p>

                  </div>

                  <hr className="my-3"/>

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
                    onClick={()=>{
                      localStorage.removeItem(
                        "user"
                      );

                      navigate("/login");
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

      {/* BOOKING BERIKUTNYA */}

      <div className="bg-white rounded-3xl p-6 shadow mb-8">

        <h2 className="font-bold text-xl mb-4">
          🔥 Booking Berikutnya
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
              🕒 {nextBooking.jam_mulai}
              -{nextBooking.jam_selesai}
            </p>
          </>
        ) : (
          <p>Belum ada booking</p>
        )}

      </div>

      {/* STATISTIK */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        {stats.map((item,index)=>(

          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow"
          >
            <div className="text-3xl mb-3">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p className="text-3xl font-bold">
              {item.value}
            </p>

          </div>

        ))}

      </div>

      {/* JADWAL */}

      <div className="bg-white p-6 rounded-3xl shadow mb-8">

        <h2 className="font-bold text-xl mb-4">
          📅 Jadwal Hari Ini
        </h2>

        {jadwal.length > 0 ? (
          jadwal.map((item)=>(
            <div
              key={item.id}
              className="border-b py-3"
            >
              <p>🏸 Lapangan {item.lapangan_id}</p>

              <p>
                🕒 {item.jam_mulai}
                -{item.jam_selesai}
              </p>

              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                {item.status}
              </span>

            </div>
          ))
        ) : (
          <p>Belum ada jadwal hari ini</p>
        )}

        {semuaJadwal.length > 3 && (
          <div className="text-center mt-4">

            <button
              onClick={()=>
                setShowAllJadwal(
                  !showAllJadwal
                )
              }
              className="text-blue-500 font-semibold"
            >
              {showAllJadwal
                ? "Lihat Lebih Sedikit"
                : "Lihat Selengkapnya"}
            </button>

          </div>
        )}

      </div>

      {/* RIWAYAT */}

      <div className="bg-white p-6 rounded-3xl shadow">

        <h2 className="font-bold text-xl mb-4">
          📜 Riwayat Booking
        </h2>

        {riwayat.length > 0 ? (
          riwayat.map((item)=>(
            <div
              key={item.id}
              className="border-b py-3"
            >

              <p>
                🏸 Lapangan {item.lapangan_id}
              </p>

              <p>
                📅 {item.tanggal}
              </p>

              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                {item.status}
              </span>

            </div>
          ))
        ) : (
          <p>Belum ada riwayat</p>
        )}

      </div>

    </div>
  );
}