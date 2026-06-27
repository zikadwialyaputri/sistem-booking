import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";

export default function StatusLapangan() {
  const [lapangan, setLapangan] = useState([]);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select(`*, users(id, nama)`);

    if (error) {
      console.log("ERROR:", error);
      return;
    }

    const daftarLapangan = [
      { id: 1, nama: "Lapangan 1", gambar: "/img/detail1.jpg" },
      { id: 2, nama: "Lapangan 2", gambar: "/img/detail2.jpg" },
    ];

    const now = new Date();

    const hasil = daftarLapangan.map((lap) => {
      const bookings = data?.filter(
        (item) => item.lapangan === lap.nama
      );

      if (!bookings || bookings.length === 0) {
        return {
          ...lap,
          listBooking: [],
        };
      }

      const listBooking = bookings
        .map((b) => {
          // ✅ FIX aman parsing tanggal
          const mulai = new Date(`${b.tanggal}T${b.jam_mulai}`);
          const selesai = new Date(`${b.tanggal}T${b.jam_selesai}`);

          let status = "Tersedia";

          // 🔴 sedang digunakan
          if (now >= mulai && now <= selesai) {
            status = "Sedang Digunakan";
          }
          // 🟡 akan digunakan (masa depan)
          else if (mulai > now) {
            status = "Akan Digunakan";
          }

          return {
            ...b,
            mulai,
            selesai,
            status,
          };
        })
        // 🔥 urutkan dari yang paling dekat
        .sort((a, b) => new Date(a.mulai) - new Date(b.mulai));

      return {
        ...lap,
        listBooking,
      };
    });

    setLapangan(hasil);
  };

  const statusColor = (status) => {
    switch (status) {
      case "Sedang Digunakan":
        return "bg-red-500";
      case "Akan Digunakan":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-500/60 to-indigo-600/80" />
      </div>

      <div className="relative z-10 p-5 md:p-10">

        <PageHeader
          title="Status Lapangan"
          breadcrumb={["Admin", "Status Lapangan"]}
        />

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {lapangan.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl"
            >

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.gambar}
                  className="w-full h-72 object-cover"
                />
              </div>

              <div className="p-7">

                <h2 className="text-3xl font-bold">
                  {item.nama}
                </h2>

                <div className="mt-5 border-t pt-4 space-y-4">

                  {item.listBooking.length > 0 ? (
                    item.listBooking.map((b, i) => (
                      <div key={i} className="border-b pb-3">

                        <p className="font-semibold">
                          {b.status === "Sedang Digunakan" && "🔴"}
                          {b.status === "Akan Digunakan" && "🟡"}
                          {b.status === "Tersedia" && "🟢"}{" "}
                          {b.status}
                        </p>

                        <p>
                          <b>Tanggal:</b> {b.tanggal}
                        </p>

                        <p>
                          <b>Jam:</b> {b.jam_mulai} - {b.jam_selesai}
                        </p>

                        <p>
                          <b>Pelanggan:</b> {b.users?.nama || "-"}
                        </p>

                      </div>
                    ))
                  ) : (
                    <p>🟢 Belum ada booking</p>
                  )}

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}