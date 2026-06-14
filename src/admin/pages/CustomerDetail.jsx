import { useParams } from "react-router-dom";
import users from "../data/users.json";
import { useEffect, useState } from "react";

export default function CustomerDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = users.find((u) => u.id === parseInt(id));
    setUser(foundUser || null);
  }, [id]);

  if (!user) {
    return <div className="p-4">User tidak ditemukan...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Detail Pelanggan
      </h1>

      {/* FOTO */}
      <img
        src={user.photo}
        alt={user.name}
        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-500"
      />

      {/* INFO USER */}
      <div className="space-y-3 text-gray-700">

        <p>
          <strong>Nama :</strong> {user.name}
        </p>

        <p>
          <strong>Username :</strong> {user.username}
        </p>

        <p>
          <strong>Nomor HP :</strong> {user.phone}
        </p>

        <p>
          <strong>Tanggal Registrasi :</strong> {user.registerDate}
        </p>

      </div>

      {/* NANTI KAMU TAMBAH INI */}
      <hr className="my-6" />

      <p className="font-semibold text-gray-600">
        Riwayat Login & Booking akan ditambahkan di sini
      </p>

    </div>
  );
}