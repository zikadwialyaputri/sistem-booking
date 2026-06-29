import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { FaBell, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Notifikasi() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchNotif();
  }, []);

  const fetchNotif = async () => {
    try {
      setLoading(true);

      if (!user) {
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("id", {
          ascending: false,
        });

      if (error) {
        console.log(error);
        return;
      }

      // hilangkan duplikat berdasarkan ID
      const uniqueBookings = [
        ...new Map(
          (data || []).map((item) => [
            item.id,
            item,
          ])
        ).values(),
      ];

      const formatted =
        uniqueBookings.map((b) => ({
          id: b.id,

          pesan:
            b.status === "approved"
              ? "✅ Booking Disetujui"
              : b.status === "rejected"
              ? "❌ Booking Ditolak"
              : b.status === "done"
              ? "🏁 Booking Selesai"
              : "⏳ Booking Sedang Diproses",

          tanggal: new Date(
            b.tanggal
          ).toLocaleDateString(
            "id-ID",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          ),

          lapangan: b.lapangan_id,

          jam: `${b.jam_mulai} - ${b.jam_selesai}`,
        }));

      setNotifications(formatted);

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

       <button
  onClick={() =>
    navigate("/pelanggan")
  }
  className="bg-white p-3 rounded-full shadow hover:scale-110 duration-300"
>
  <FaArrowLeft />
</button>

        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaBell />
          Semua Notifikasi
        </h1>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="bg-white rounded-3xl p-10 text-center shadow">
          Memuat data...
        </div>

      ) : notifications.length === 0 ? (

        <div className="bg-white rounded-3xl p-10 text-center shadow">
          Belum ada notifikasi
        </div>

      ) : (

        <div className="space-y-4">

          {notifications.map(
            (item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow p-5 hover:shadow-lg transition-all"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <p className="font-semibold text-lg mb-2">
                      {item.pesan}
                    </p>

                    <div className="text-gray-600 space-y-1">

                      <p>
                        🏸 Lapangan{" "}
                        {item.lapangan}
                      </p>

                      <p>
                        📅 {item.tanggal}
                      </p>

                      <p>
                        🕒 {item.jam}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}