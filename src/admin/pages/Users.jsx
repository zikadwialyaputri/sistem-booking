import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Users() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Andi Saputra",
      email: "andi@gmail.com",
      phone: "081234567890",
      totalBooking: 12,
      status: "Aktif",
    },
    {
      id: 2,
      name: "Budi Santoso",
      email: "budi@gmail.com",
      phone: "082345678901",
      totalBooking: 8,
      status: "Aktif",
    },
    {
      id: 3,
      name: "Citra Dewi",
      email: "citra@gmail.com",
      phone: "083456789012",
      totalBooking: 3,
      status: "Nonaktif",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      email: "dewi@gmail.com",
      phone: "084567890123",
      totalBooking: 6,
      status: "Aktif",
    },
    {
      id: 5,
      name: "Fajar Ramadhan",
      email: "fajar@gmail.com",
      phone: "085678901234",
      totalBooking: 2,
      status: "Aktif",
    },
  ]);

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Aktif"
                  ? "Nonaktif"
                  : "Aktif",
            }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeUsers = users.filter(
    (user) => user.status === "Aktif"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Nonaktif"
  ).length;

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
          title="Kelola Pengguna"
          breadcrumb={["Admin", "Kelola Pengguna"]}
        />

        {/* Statistik */}
        <div className="grid md:grid-cols-3 gap-4 mt-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-gray-500 text-sm">
              Total Pengguna
            </p>

            <h2 className="text-3xl font-bold text-blue-600">
              {users.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-gray-500 text-sm">
              Pengguna Aktif
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {activeUsers}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-gray-500 text-sm">
              Pengguna Nonaktif
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {inactiveUsers}
            </h2>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari pengguna..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-4 py-3 rounded-xl shadow-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Nama</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">No HP</th>
                  <th className="p-4 text-left">Total Booking</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t hover:bg-blue-50 transition"
                  >
                    <td className="p-4">
                      #{user.id}
                    </td>

                    <td className="p-4 font-semibold">
                      {user.name}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4">
                      {user.phone}
                    </td>

                    <td className="p-4">
                      {user.totalBooking}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.status === "Aktif"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          toggleStatus(user.id)
                        }
                        className={`px-4 py-2 rounded-lg text-white text-sm ${
                          user.status === "Aktif"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {user.status === "Aktif"
                          ? "Nonaktifkan"
                          : "Aktifkan"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Pengguna tidak ditemukan
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}