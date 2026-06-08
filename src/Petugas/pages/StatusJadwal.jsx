export default function StatusJadwal() {
  const jadwal = [
    {
      id: 1,
      lapangan: "Lapangan A",
      tanggal: "09 Juni 2026",
      jam: "08:00 - 10:00",
      status: "Dikonfirmasi",
    },
    {
      id: 2,
      lapangan: "Lapangan B",
      tanggal: "09 Juni 2026",
      jam: "10:00 - 12:00",
      status: "Menunggu",
    },
    {
      id: 3,
      lapangan: "Lapangan C",
      tanggal: "09 Juni 2026",
      jam: "13:00 - 15:00",
      status: "Ditolak",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Status Jadwal Lapangan
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Lapangan</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Jam</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {jadwal.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.lapangan}</td>
                <td className="p-3">{item.tanggal}</td>
                <td className="p-3">{item.jam}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Dikonfirmasi"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Menunggu"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}