import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";

export default function ReportDetail() {
  const { bulan } = useParams();
  const [data, setData] = useState([]);

  const biayaPerBooking = 35000;

  useEffect(() => {
    fetchDetail();
  }, [bulan]);

  const fetchDetail = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        tanggal,
        jam_mulai,
        jam_selesai,
        status,
        users(id, nama),
        lapangan(id, nama)
      `)
      .eq("status", "approved");

    if (error) {
      console.log("ERROR:", error);
      return;
    }

    const filtered = (data || []).filter((item) => {
      if (!item.tanggal) return false;

      const date = new Date(item.tanggal);

      if (isNaN(date)) return false;

      const bulanNama = date.toLocaleString("id-ID", {
        month: "long",
      });

      return bulanNama === bulan;
    });

    setData(filtered);
  };

  const formatRupiah = (angka) =>
    "Rp " + angka.toLocaleString("id-ID");

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <PageHeader
        title={`Detail Booking ${bulan}`}
        breadcrumb={["Admin", "Laporan", bulan]}
      />

      <Link
        to="/admin/reports"
        className="inline-block mb-5 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        ← Kembali
      </Link>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Nama</th>
              <th className="p-4 text-left">Lapangan</th>
              <th className="p-4 text-left">Tanggal</th>
              <th className="p-4 text-left">Jam</th>
              <th className="p-4 text-left">Biaya</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-t">

                  <td className="p-4">
                    {item.users?.nama || "-"}
                  </td>

                  {/* 🔥 FIX INI */}
                  <td className="p-4">
                    {item.lapangan?.nama || "-"}
                  </td>

                  <td className="p-4">
                    {item.tanggal}
                  </td>

                  <td className="p-4">
                    {item.jam_mulai} - {item.jam_selesai}
                  </td>

                  <td className="p-4 text-green-600 font-semibold">
                    {formatRupiah(biayaPerBooking)}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Tidak ada data booking approved di bulan ini
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
}