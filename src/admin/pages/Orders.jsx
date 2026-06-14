import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Orders() {
  const [search, setSearch] = useState("");

  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "Andi Saputra",
      phone: "081234567890",
      court: "Lapangan 1",
      date: "2025-06-14",
      time: "15:00 - 16:00",
      price: 35000,
      payment: "Lunas",
      status: "pending",
    },
    {
      id: 2,
      name: "Budi Santoso",
      phone: "082345678901",
      court: "Lapangan 2",
      date: "2025-06-14",
      time: "16:00 - 17:00",
      price: 35000,
      payment: "Lunas",
      status: "accepted",
    },
    {
      id: 3,
      name: "Citra Dewi",
      phone: "083456789012",
      court: "Lapangan 1",
      date: "2025-06-15",
      time: "18:00 - 19:00",
      price: 35000,
      payment: "Belum Bayar",
      status: "rejected",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      phone: "084567890123",
      court: "Lapangan 2",
      date: "2025-06-16",
      time: "20:00 - 21:00",
      price: 35000,
      payment: "Lunas",
      status: "pending",
    },
  ]);

  const updateStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const formatRupiah = (number) => {
    return "Rp " + number.toLocaleString("id-ID");
  };

  const filtered = bookings.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const pendingBookings = filtered.filter(
    (item) => item.status === "pending"
  );

  const acceptedBookings = filtered.filter(
    (item) => item.status === "accepted"
  );

  const rejectedBookings = filtered.filter(
    (item) => item.status === "rejected"
  );

  return (
    <div className="relative bg-gray-100 min-h-screen">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt="badminton"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-500/60 to-indigo-600/80"></div>
      </div>

      <div className="relative z-10 p-5 md:p-10">
        <PageHeader
          title="Kelola Booking"
          breadcrumb={["Admin", "Kelola Booking"]}
        />

        {/* Statistik */}
        <div className="grid md:grid-cols-3 gap-4 mt-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500 text-sm">
              Menunggu Konfirmasi
            </p>
            <h2 className="text-3xl font-bold text-orange-500">
              {pendingBookings.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500 text-sm">
              Booking Diterima
            </p>
            <h2 className="text-3xl font-bold text-green-600">
              {acceptedBookings.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5">
            <p className="text-gray-500 text-sm">
              Booking Ditolak
            </p>
            <h2 className="text-3xl font-bold text-red-600">
              {rejectedBookings.length}
            </h2>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Cari nama pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-4 py-3 rounded-xl shadow-md border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-orange-600 mb-4">
            Menunggu Konfirmasi ({pendingBookings.length})
          </h2>

          <div className="space-y-4">
            {pendingBookings.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-5 flex flex-col lg:flex-row lg:justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-600">
                    {item.phone}
                  </p>

                  <p className="text-gray-600">
                    {item.court}
                  </p>

                  <p className="text-gray-600">
                    {item.date}
                  </p>

                  <p className="text-gray-600">
                    {item.time}
                  </p>

                  <p className="font-bold text-green-600 mt-2">
                    {formatRupiah(item.price)}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                      item.payment === "Lunas"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.payment}
                  </span>
                </div>

                <div className="flex gap-3 mt-5 lg:mt-0">
                  <button
                    onClick={() =>
                      updateStatus(item.id, "accepted")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    Terima
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(item.id, "rejected")
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Tolak
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accepted */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-green-600 mb-4">
            Booking Diterima ({acceptedBookings.length})
          </h2>

          <div className="space-y-4">
            {acceptedBookings.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-5"
              >
                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p>{item.phone}</p>

                <p>{item.court}</p>

                <p>{item.date}</p>

                <p>{item.time}</p>

                <p className="font-bold text-green-600 mt-2">
                  {formatRupiah(item.price)}
                </p>

                <span className="inline-block mt-3 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  Diterima
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Booking Ditolak ({rejectedBookings.length})
          </h2>

          <div className="space-y-4">
            {rejectedBookings.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-5"
              >
                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p>{item.phone}</p>

                <p>{item.court}</p>

                <p>{item.date}</p>

                <p>{item.time}</p>

                <p className="font-bold text-green-600 mt-2">
                  {formatRupiah(item.price)}
                </p>

                <span className="inline-block mt-3 px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                  Ditolak
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}