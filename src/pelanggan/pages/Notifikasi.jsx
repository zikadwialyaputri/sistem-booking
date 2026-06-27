import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import {
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarCheck,
} from "react-icons/fa";

export default function Notifikasi() {
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // =========================
  // FETCH DATA
  // =========================
useEffect(() => {
  const fetchNotif = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          tanggal,
          status,
          users(nama),
          lapangan(nama)
        `)
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      const formatted = (data || []).map((b) => {

        let pesan = "";
        let notifStatus = "";

        if (b.status === "approved") {
          pesan = `Booking ${b.lapangan?.nama || ""} disetujui`;
          notifStatus = "success";
        }

        else if (b.status === "rejected") {
          pesan = `Booking ${b.lapangan?.nama || ""} ditolak`;
          notifStatus = "danger";
        }

        else {
          pesan = `Booking ${b.lapangan?.nama || ""} sedang diproses`;
          notifStatus = "info";
        }

        return {
          id: b.id,
          pesan,
          tanggal: new Date(
            b.tanggal
          ).toLocaleDateString("id-ID"),
          status: notifStatus,
        };
      });

      setNotifications(formatted);

    } catch (err) {
      console.log(err);
    }
  };

  fetchNotif();

}, []);
  // =========================
  // FILTER
  // =========================
  const approved = notifications.filter((n) => n.status === "success");
  const rejected = notifications.filter((n) => n.status === "danger");

  const statusConfig = {
    success: {
      label: "Disetujui",
      icon: <FaCheckCircle />,
      class: "bg-green-100 text-green-700",
      iconClass: "bg-green-100 text-green-600",
    },
    danger: {
      label: "Ditolak",
      icon: <FaTimesCircle />,
      class: "bg-red-100 text-red-700",
      iconClass: "bg-red-100 text-red-600",
    },
    info: {
      label: "Info",
      icon: <FaCalendarCheck />,
      class: "bg-blue-100 text-blue-700",
      iconClass: "bg-blue-100 text-blue-600",
    },
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 p-5 md:p-10">

        {/* HEADER */}
        <div className="text-white mb-10">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <FaBell />
            Notifikasi
          </h1>
        </div>

        {/* STAT */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white rounded-xl p-5 shadow">
            <p>Total</p>
            <h2 className="text-3xl font-bold">{notifications.length}</h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <p>Disetujui</p>
            <h2 className="text-3xl font-bold text-green-600">{approved.length}</h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <p>Ditolak</p>
            <h2 className="text-3xl font-bold text-red-600">{rejected.length}</h2>
          </div>

        </div>

        {/* LIST */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-6">
            Daftar Notifikasi
          </h2>

          {notifications.length === 0 ? (
            <p className="text-center text-gray-400">
              Belum ada notifikasi
            </p>
          ) : (
            notifications.map((n) => {
              const config = statusConfig[n.status];

              return (
                <div
                  key={n.id}
                  className="border rounded-xl p-4 flex justify-between items-center mb-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${config.iconClass}`}>
                      {config.icon}
                    </div>

                    <div>
                      <p className="font-semibold">{n.pesan}</p>
                      <p className="text-sm text-gray-500">{n.tanggal}</p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 text-xs rounded-full ${config.class}`}>
                    {config.label}
                  </span>
                </div>
              );
            })
          )}

        </div>
      </div>
    </div>
  );
}