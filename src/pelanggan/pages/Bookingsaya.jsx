const bookings = [
  {
    id: 1,
    lapangan: "Lapangan 1",
    tanggal: "20 Juni 2026",
    jam: "18.00 - 20.00",
    status: "Menunggu",
  },
  {
    id: 2,
    lapangan: "Lapangan 2",
    tanggal: "25 Juni 2026",
    jam: "19.00 - 21.00",
    status: "Disetujui",
  },
];

export default function BookingSaya() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Booking Saya
      </h1>

      <div className="space-y-4">
        {bookings.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="font-bold text-xl">
              {item.lapangan}
            </h2>

            <p>{item.tanggal}</p>

            <p>{item.jam}</p>

            <p className="mt-2">
              Status :
              <span className="font-semibold ml-2">
                {item.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}