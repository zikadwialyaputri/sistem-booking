import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function Customers() {
  const breadcrumb = ["Dashboard", "Daftar Pengguna"];

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");

      console.log("DATA SUPABASE:", data);

      if (!error) setUsers(data || []);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (item) =>
      item.nama?.toLowerCase().includes(query.toLowerCase()) ||
      item.username?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative bg-gray-100 min-h-screen">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt="Badminton"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-500/60 to-indigo-600/80" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">
        <PageHeader title="Data Pelanggan" breadcrumb={breadcrumb} />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari pelanggan..."
          className="mt-6 mb-5 p-3 w-full bg-white rounded-xl shadow"
        />

        <div className="overflow-hidden rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Tanggal Registrasi</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {filteredUsers.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3 font-medium">
                    {item.nama}
                  </td>

                  <td className="px-4 py-3">
                    {item.username}
                  </td>

                  <td className="px-4 py-3">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/customers/${item.id}`}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}