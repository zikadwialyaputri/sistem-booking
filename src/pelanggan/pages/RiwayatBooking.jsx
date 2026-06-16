const bookings = [
  {
    id: 1,
    lapangan: "Lapangan 1",
    tanggal: "10 Juni 2026",
    jam: "18.00 - 20.00",
    status: "Selesai",
  },
  {
    id: 2,
    lapangan: "Lapangan 2",
    tanggal: "15 Juni 2026",
    jam: "19.00 - 21.00",
    status: "Disetujui",
  },
];

export default function RiwayatBooking() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Riwayat Booking
      </h1>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Lapangan</th>
              <th className="p-4 text-left">Tanggal</th>
              <th className="p-4 text-left">Jam</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.lapangan}</td>
                <td className="p-4">{item.tanggal}</td>
                <td className="p-4">{item.jam}</td>
                <td className="p-4">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}