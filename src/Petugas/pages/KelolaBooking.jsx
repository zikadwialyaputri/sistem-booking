import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function KelolaBooking() {
  const [search, setSearch] = useState("");

  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "Andi Saputra",
      phone: "081234567890",
      court: "Lapangan 1",
      date: "2026-06-14",
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
      date: "2026-06-14",
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
      date: "2026-06-15",
      time: "18:00 - 19:00",
      price: 35000,
      payment: "Belum Bayar",
      status: "rejected",
    },
  ]);

  const updateStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const formatRupiah = (num) =>
    "Rp " + num.toLocaleString("id-ID");

  const filtered = bookings.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const pending = filtered.filter((b) => b.status === "pending");
  const accepted = filtered.filter((b) => b.status === "accepted");
  const rejected = filtered.filter((b) => b.status === "rejected");

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* HEADER IMAGE */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        <PageHeader
          title="Kelola Booking"
          breadcrumb={["Admin", "Booking"]}
        />

        {/* STATISTIK */}
        <div className="grid md:grid-cols-3 gap-4 mt-6 mb-8">

          <div className="bg-white rounded-xl shadow-md p-5">
            <p className="text-gray-500 text-sm">Menunggu</p>
            <h2 className="text-3xl font-bold text-orange-500">
              {pending.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5">
            <p className="text-gray-500 text-sm">Diterima</p>
            <h2 className="text-3xl font-bold text-green-600">
              {accepted.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5">
            <p className="text-gray-500 text-sm">Ditolak</p>
            <h2 className="text-3xl font-bold text-red-600">
              {rejected.length}
            </h2>
          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari nama pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-4 py-3 rounded-xl shadow-md border bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* PENDING */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-orange-600 mb-4">
            Menunggu Konfirmasi ({pending.length})
          </h2>

          <div className="space-y-4">
            {pending.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-5 flex flex-col lg:flex-row lg:justify-between"
              >
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.phone}</p>
                  <p className="text-gray-600">{item.court}</p>
                  <p className="text-gray-600">
                    {item.date} • {item.time}
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

                {/* 🔥 BUTTON UPGRADE */}
               <div className="mt-4 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:items-end w-full lg:w-auto">

  <div className="flex gap-2 w-full lg:w-auto">

    <button
      onClick={() => updateStatus(item.id, "accepted")}
      className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1 
      px-4 py-2 rounded-lg text-xs font-medium
      bg-green-500 hover:bg-green-600 text-white
      active:scale-95 transition shadow-sm"
    >
      <FaCheck size={10} />
      Terima
    </button>

    <button
      onClick={() => updateStatus(item.id, "rejected")}
      className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1 
      px-4 py-2 rounded-lg text-xs font-medium
      bg-red-500 hover:bg-red-600 text-white
      active:scale-95 transition shadow-sm"
    >
      <FaTimes size={10} />
      Tolak
    </button>

  </div>

</div>
              </div>
            ))}
          </div>
        </div>

        {/* ACCEPTED */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-green-600 mb-4">
            Diterima ({accepted.length})
          </h2>

          <div className="space-y-4">
            {accepted.map((item) => (
              <div key={item.id} className="border rounded-xl p-5">
                <h3 className="font-bold">{item.name}</h3>
                <p>{item.phone}</p>
                <p>{item.court}</p>
                <p>{item.date} • {item.time}</p>
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

        {/* REJECTED */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-bold text-red-600 mb-4">
            Ditolak ({rejected.length})
          </h2>

          <div className="space-y-4">
            {rejected.map((item) => (
              <div key={item.id} className="border rounded-xl p-5">
                <h3 className="font-bold">{item.name}</h3>
                <p>{item.phone}</p>
                <p>{item.court}</p>
                <p>{item.date} • {item.time}</p>
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