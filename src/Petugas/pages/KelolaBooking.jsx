import { useState } from "react";

export default function KelolaBooking() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "Ahmad",
      court: "Indoor A",
      date: "2026-05-20",
      time: "10:00",
      status: "pending",
    },
    {
      id: 2,
      customer: "Budi",
      court: "Premium B",
      date: "2026-05-20",
      time: "14:00",
      status: "pending",
    },
  ]);

  const updateStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status } : b
      )
    );
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Kelola Booking
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Lapangan</th>
              <th className="p-4 text-left">Tanggal</th>
              <th className="p-4 text-left">Jam</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b">

                <td className="p-4">{b.customer}</td>
                <td className="p-4">{b.court}</td>
                <td className="p-4">{b.date}</td>
                <td className="p-4">{b.time}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      b.status === "confirmed"
                        ? "bg-green-500"
                        : b.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() =>
                      updateStatus(b.id, "confirmed")
                    }
                    className="px-3 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(b.id, "rejected")
                    }
                    className="px-3 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Reject
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}