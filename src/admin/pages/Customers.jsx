import { useState, useEffect } from "react";
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
    <div className="w-full min-h-screen text-slate-700 font-sans antialiased">
      <div className="space-y-6">
        
        {/* 1. HERO BANNER */}
        <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-6 md:p-10 min-h-[170px] flex flex-col justify-end shadow-sm">
          <img
            src="/img/badminton.jpg"
            alt="badminton"
            className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none transform scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Judul Utama Banner dengan Deskripsi Singkat */}
          <div className="relative z-10">
            <h1 className="text-2xl md:text-[32px] font-black tracking-tight text-white leading-tight">
              Data Pelanggan
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1.5 opacity-90 font-medium max-w-xl">
              Halaman pantauan data registrasi pengguna, kelola informasi profil pelanggan, serta lihat detail aktivitas akun.
            </p>
          </div>
        </div>

        {/* SUB-JUDUL DI LUAR BANNER */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ringkasan Pengguna</h3>
        </div>

        {/* 2. BARIS KONTROL: TOTAL PELANGGAN & PENCARIAN (RAPID DAN SIMETRIS) */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between max-w-4xl">
          
          {/* TOTAL CARD */}
          <div className="w-full md:w-72 bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 relative overflow-hidden transition-all duration-300 hover:shadow-md flex items-center shrink-0">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="flex items-center gap-4 w-full">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600 border border-blue-100/30 shrink-0">
                <FaUsers size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Total Pelanggan</p>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{filteredUsers.length}</h2>
              </div>
            </div>
          </div>

          {/* BAR PENCARIAN (Tinggi seimbang dengan total card, tidak kosong melompong) */}
          <div className="relative w-full max-w-md shadow-sm rounded-2xl bg-white border border-slate-200 focus-within:ring-4 focus-within:ring-blue-100/70 focus-within:border-blue-500 transition-all duration-200 flex items-center py-2">
            <FaSearch className="absolute left-4 text-slate-400 pointer-events-none" size={14} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama atau username pelanggan..."
              className="w-full bg-transparent pl-11 pr-4 outline-none text-slate-800 text-sm placeholder-slate-400 font-medium"
            />
          </div>

        </div>

        {/* 3. KONTAINER TABEL UTAMA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50/70 border-b border-slate-200/60 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 text-center font-bold w-20">
                    <div className="flex items-center justify-center gap-1">
                      <FaHashtag size={10} /> No
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold">Nama Pelanggan</th>
                  <th className="py-4 px-6 text-left font-bold">Username</th>
                  <th className="py-4 px-6 text-left font-bold">Tanggal Registrasi</th>
                  <th className="py-4 px-6 text-center font-bold w-36">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 text-sm font-medium">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors duration-150"
                    >
                      {/* NO */}
                      <td className="py-5 px-6 text-center font-bold text-slate-400">
                        {index + 1}
                      </td>

                      {/* NAMA PELANGGAN */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                            {item.nama?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <span className="font-semibold text-slate-800 tracking-tight">
                            {item.nama || "Tanpa Nama"}
                          </span>
                        </div>
                      </td>

                      {/* USERNAME */}
                      <td className="py-5 px-6">
                        <span className="bg-slate-100/80 px-2.5 py-1 rounded-md text-xs font-mono font-bold tracking-wide text-slate-600 border border-slate-200/40">
                          @{item.username}
                        </span>
                      </td>

                      {/* TANGGAL REGISTRASI */}
                      <td className="py-5 px-6 text-slate-600">
                        {item.created_at ? (
                          <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold">
                            <FaCalendarAlt className="text-slate-400" size={11} />
                            {formatTanggal(item.created_at)}
                          </div>
                        ) : (
                          <span className="text-slate-400 font-normal">-</span>
                        )}
                      </td>

                      {/* AKSI TOMBOL DETAIL */}
                      <td className="py-5 px-6 text-center">
                        <Link
                          to={`/admin/customers/${item.id}`}
                          className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <FaEye size={12} /> Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2 text-slate-400">
                        <span className="text-4xl animate-pulse">🔍</span>
                        <p className="font-bold text-slate-700 text-sm mt-1">Pelanggan tidak ditemukan</p>
                        <p className="text-xs text-slate-400 max-w-xs">
                          Coba gunakan kata kunci lain atau periksa kembali ejaan pencarian Anda.
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