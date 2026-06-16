export default function Notifikasi() {
  const notifications = [
    {
      id: 1,
      pesan: "Booking Anda Disetujui",
      tanggal: "20 Juni 2026",
    },
    {
      id: 2,
      pesan: "Booking Anda Ditolak",
      tanggal: "18 Juni 2026",
    },
    {
      id: 3,
      pesan: "Booking Berhasil dibuat",
      tanggal: "17 Juni 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Notifikasi</h1>

      <div className="bg-white rounded-xl shadow p-4">
        {notifications.map((n) => (
          <div key={n.id} className="border-b py-3">
            <p className="font-semibold">{n.pesan}</p>
            <p className="text-sm text-gray-500">{n.tanggal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}