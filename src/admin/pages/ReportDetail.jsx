import { useParams, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function ReportDetail() {
  const { bulan } = useParams();

  const biayaPerBooking = 35000;

  const bookingData = {
    Januari: [
      {
        id: 1,
        nama: "Andi Saputra",
        lapangan: "Lapangan 1",
        tanggal: "2025-01-05",
        jam: "16:00",
      },
      {
        id: 2,
        nama: "Budi Santoso",
        lapangan: "Lapangan 2",
        tanggal: "2025-01-10",
        jam: "18:00",
      },
      {
        id: 3,
        nama: "Citra Dewi",
        lapangan: "Lapangan 1",
        tanggal: "2025-01-18",
        jam: "20:00",
      },
    ],

    Februari: [
      {
        id: 4,
        nama: "Dewi Lestari",
        lapangan: "Lapangan 1",
        tanggal: "2025-02-03",
        jam: "15:00",
      },
      {
        id: 5,
        nama: "Eko Prasetyo",
        lapangan: "Lapangan 2",
        tanggal: "2025-02-12",
        jam: "17:00",
      },
    ],

    Maret: [
      {
        id: 6,
        nama: "Fajar Nugroho",
        lapangan: "Lapangan 1",
        tanggal: "2025-03-05",
        jam: "18:00",
      },
      {
        id: 7,
        nama: "Gina Maharani",
        lapangan: "Lapangan 2",
        tanggal: "2025-03-20",
        jam: "19:00",
      },
    ],

    April: [
      {
        id: 8,
        nama: "Hendra Wijaya",
        lapangan: "Lapangan 1",
        tanggal: "2025-04-08",
        jam: "16:00",
      },
    ],

    Mei: [
      {
        id: 9,
        nama: "Indah Permata",
        lapangan: "Lapangan 2",
        tanggal: "2025-05-15",
        jam: "17:00",
      },
    ],

    Juni: [
      {
        id: 10,
        nama: "Joko Susilo",
        lapangan: "Lapangan 1",
        tanggal: "2025-06-11",
        jam: "20:00",
      },
    ],
  };

  const data = bookingData[bulan] || [];

  const formatRupiah = (angka) =>
    "Rp " + angka.toLocaleString("id-ID");

  return (
    <div className="p-6">
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
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.nama}</td>
                <td className="p-4">{item.lapangan}</td>
                <td className="p-4">{item.tanggal}</td>
                <td className="p-4">{item.jam}</td>
                <td className="p-4 text-green-600 font-semibold">
                  {formatRupiah(biayaPerBooking)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}