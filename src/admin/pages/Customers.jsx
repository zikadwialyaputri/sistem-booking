import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabase";
import {
  FaSearch,
  FaEye,
  FaCalendarAlt,
  FaUsers,
  FaHashtag,
} from "react-icons/fa";

export default function Customers() {
  const breadcrumb = ["Dashboard", "Daftar Pengguna"];

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (!error) {
      setUsers(data || []);
    }
  };

  const filteredUsers = users.filter((item) =>
    item.nama?.toLowerCase().includes(query.toLowerCase()) ||
    item.username?.toLowerCase().includes(query.toLowerCase())
  );

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <div className="relative h-[280px] overflow-hidden">
        <img
          src="/img/badminton.jpg"
          alt="Banner Badminton"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-700/70 to-indigo-700/80"></div>
      </div>

      <div className="relative -mt-28 px-5 md:px-10 max-w-7xl mx-auto pb-10">
        {/* PAGE HEADER */}
        <div className="mb-8 text-white">
          <PageHeader title="Data Pelanggan" breadcrumb={breadcrumb} />
        </div>

        {/* INFO + SEARCH */}
        <div className="grid lg:grid-cols-2 gap-5 mb-8">
          {/* TOTAL */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-2xl">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500">Total Pelanggan</p>
                <h2 className="text-3xl font-bold">{filteredUsers.length}</h2>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="bg-white rounded-3xl p-5 shadow-md flex items-center">
            <FaSearch className="text-gray-400 text-lg" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama atau username..."
              className="ml-4 w-full outline-none"
            />
          </div>
        </div>

        {/* TABEL */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-5 text-center text-gray-500 text-sm font-semibold">
                    <FaHashtag className="inline mr-2" /> No
                  </th>
                  <th className="px-6 py-5 text-left text-gray-500 text-sm font-semibold">
                    Nama Pelanggan
                  </th>
                  <th className="px-6 py-5 text-left text-gray-500 text-sm font-semibold">
                    Username
                  </th>
                  <th className="px-6 py-5 text-left text-gray-500 text-sm font-semibold">
                    Tanggal Registrasi
                  </th>
                  <th className="px-6 py-5 text-center text-gray-500 text-sm font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/50 transition-colors duration-200"
                    >
                      {/* NO */}
                      <td className="px-6 py-5 text-center font-bold text-gray-400">
                        {index + 1}
                      </td>

                      {/* NAMA */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                            {item.nama?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">
                              {item.nama || "Tanpa Nama"}
                            </h3>
                          </div>
                        </div>
                      </td>

                      {/* USERNAME */}
                      <td className="px-6 py-5">
                        <span className="bg-slate-100 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600">
                          @{item.username}
                        </span>
                      </td>

                      {/* TANGGAL */}
                      <td className="px-6 py-5 text-gray-500 text-sm">
                        {item.created_at ? (
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400" />
                            {formatTanggal(item.created_at)}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* AKSI */}
                      <td className="px-6 py-5 text-center">
                        <Link
                          to={`/admin/customers/${item.id}`}
                          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-colors duration-200"
                        >
                          <FaEye /> Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="text-5xl animate-bounce">🔍</div>
                        <h2 className="font-bold text-lg text-gray-700">
                          Pelanggan tidak ditemukan
                        </h2>
                        <p className="text-gray-400 text-sm max-w-xs">
                          Coba gunakan kata kunci lain atau periksa kembali ejaan Anda.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}