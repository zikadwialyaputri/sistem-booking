import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function StatusLapangan() {
  const [lapangan, setLapangan] = useState([]);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        tanggal,
        jam_mulai,
        jam_selesai,
        lapangan_id,
        users:users(id, nama)
      `);

    if (error) {
      console.log("ERROR:", error);
      return;
    }

    const now = new Date();

    const masterLapangan = [
      { id: 1, nama: "Lapangan 1", gambar: "/img/detail1.jpg" },
      { id: 2, nama: "Lapangan 2", gambar: "/img/detail2.jpg" },
    ];

    const hasil = masterLapangan.map((lap) => {
      const bookings = data.filter((item) => {
        const selesai = new Date(`${item.tanggal}T${item.jam_selesai}`);
        return item.lapangan_id === lap.id && selesai >= now;
      });

      const listBooking = bookings
        .map((b) => {
          const mulai = new Date(`${b.tanggal}T${b.jam_mulai}`);
          const selesai = new Date(`${b.tanggal}T${b.jam_selesai}`);

          let status = "Tersedia";

          if (now >= mulai && now <= selesai) status = "Sedang Digunakan";
          else if (mulai > now) status = "Akan Digunakan";

          return { ...b, mulai, selesai, status };
        })
        .sort((a, b) => a.mulai - b.mulai);

      return { ...lap, listBooking };
    });

    setLapangan(hasil);
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Sedang Digunakan":
        return "bg-red-100 text-red-600";
      case "Akan Digunakan":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER SIMPLE */}
      <div className="relative h-56 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-5 left-6 text-white">
          <h1 className="text-2xl font-bold">Status Lapangan</h1>
          <p className="text-sm opacity-80">
            Monitoring booking realtime
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-10">

        <div className="grid md:grid-cols-2 gap-6">

          {lapangan.map((item) => {

            const aktif = item.listBooking.filter(
              b => b.status === "Sedang Digunakan"
            ).length;

            const akan = item.listBooking.filter(
              b => b.status === "Akan Digunakan"
            ).length;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={item.gambar}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <h2 className="absolute bottom-3 left-4 text-white font-semibold text-lg">
                    {item.nama}
                  </h2>
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-4">

                  {/* RINGKASAN */}
                  <div className="flex gap-2 text-xs flex-wrap">

                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-600">
                      🔴 {aktif} Aktif
                    </span>

                    <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      🟡 {akan} Akan
                    </span>

                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-600">
                      🟢 {item.listBooking.length === 0 ? 1 : 0} Kosong
                    </span>

                  </div>

                  {/* LIST BOOKING */}
                  {item.listBooking.length > 0 ? (
                    item.listBooking.slice(0, 3).map((b, i) => (
                      <div
                        key={i}
                        className="border rounded-lg p-3 bg-gray-50"
                      >

                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${statusBadge(
                            b.status
                          )}`}
                        >
                          {b.status}
                        </span>

                        <div className="mt-2 text-sm text-gray-700 space-y-1">
                          <p>
                            <span className="font-medium">Tanggal:</span>{" "}
                            {b.tanggal}
                          </p>

                          <p>
                            <span className="font-medium">Jam:</span>{" "}
                            {b.jam_mulai} - {b.jam_selesai}
                          </p>

                          <p>
                            <span className="font-medium">Pelanggan:</span>{" "}
                            {b.users?.nama || "-"}
                          </p>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-green-600 font-semibold">
                        🟢 Lapangan kosong
                      </p>
                      <p className="text-sm text-gray-500">
                        Tidak ada booking aktif
                      </p>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}