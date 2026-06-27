import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { FaBell } from "react-icons/fa";

export default function Notifikasi() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchNotif = async () => {
      setLoading(true);

      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (!error) {
       const formatted = (data || [])
  .map((b) => ({
    id: b.id,
    pesan:
      b.status === "approved"
        ? "Booking disetujui"
        : b.status === "rejected"
        ? "Booking ditolak"
        : "Booking sedang diproses",
    tanggal: b.tanggal,
    status: b.status,
  }))
  .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

        setNotifications(formatted);
      }

      setLoading(false);
    };

    fetchNotif();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "done":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">

      {/* BACKGROUND STYLE (SAMA KAYAK RIWAYAT) */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        <h1 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <FaBell /> Notifikasi
        </h1>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          {notifications.length === 0 ? (
            <p className="text-center text-gray-400">
              Belum ada notifikasi
            </p>
          ) : (
            <div className="space-y-4">

              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="border rounded-xl p-5 flex justify-between items-center hover:shadow-md transition"
                >

                  {/* LEFT */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {n.pesan}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      📅 {n.tanggal}
                    </p>
                  </div>

                  {/* STATUS BADGE */}
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(n.status)}`}>
                    {n.status}
                  </span>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}