import { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaPlus, 
  FaUserShield, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaUserAlt,
  FaHashtag
} from "react-icons/fa";

export default function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "pelanggan",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // =====================
  // AMBIL DATA
  // =====================
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setUsers(data || []);
  };

  // =====================
  // INPUT
  // =====================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =====================
  // TAMBAH
  // =====================
  const openAdd = () => {
    setForm({
      nama: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      role: "pelanggan",
    });

    setEditId(null);
    setOpenModal(true);
  };

  // =====================
  // EDIT
  // =====================
  const openEdit = (user) => {
    setForm({
      nama: user.nama || "",
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      password: user.password || "",
      role: user.role || "pelanggan",
    });

    setEditId(user.id);
    setOpenModal(true);
  };

  // =====================
  // SIMPAN
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await supabase
          .from("users")
          .update(form)
          .eq("id", editId);

        alert("Data berhasil diupdate");
      } else {
        await supabase
          .from("users")
          .insert([form]);

        alert("User berhasil ditambahkan");
      }

      setOpenModal(false);
      fetchUsers();

    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan data");
    }
  };

  // =====================
  // HAPUS
  // =====================
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus akun ini?"
    );

    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

      if (error) throw error;

      alert("User berhasil dihapus");
      fetchUsers();

    } catch (error) {
      console.log(error);
      alert("Gagal menghapus user");
    }
  };

  // =====================
  // FILTER
  // =====================
  const filteredUsers = users.filter((user) =>
    user.nama?.toLowerCase().includes(search.toLowerCase()) ||
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen text-slate-700 font-sans antialiased">
      <div className="space-y-6">

        {/* 1. HERO BANNER (STRUKTUR SAMA PERSIS DENGAN DAFTAR BOOKING & DAFTAR PELANGGAN) */}
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
              Kelola Pengguna
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1.5 opacity-90 font-medium max-w-xl">
              Atur hak akses manajemen internal, modifikasi data administrator, petugas lapangan, maupun akun pelanggan terdaftar.
            </p>
          </div>
        </div>

        {/* SUB-JUDUL DI LUAR BANNER */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ringkasan Pengguna</h3>
        </div>

        {/* 2. AREA KONTROL (SEARCH & ADD BUTTON BERDAMPINGAN) */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-between max-w-4xl">
          {/* SEARCH BAR */}
          <div className="relative w-full max-w-md shadow-sm rounded-2xl bg-white border border-slate-200 focus-within:ring-4 focus-within:ring-blue-100/70 focus-within:border-blue-500 transition-all duration-200 flex items-center py-2">
            <FaSearch className="absolute left-4 text-slate-400 pointer-events-none" size={14} />
            <input
              type="text"
              className="w-full bg-transparent pl-11 pr-4 outline-none text-slate-800 text-sm placeholder-slate-400 font-medium"
              placeholder="Cari nama atau username pengguna..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 rounded-2xl text-sm font-bold shadow-sm transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
          >
            <FaPlus size={12} /> Tambah Pengguna
          </button>
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
                  <th className="py-4 px-6 text-left font-bold">Nama</th>
                  <th className="py-4 px-6 text-left font-bold">Username</th>
                  <th className="py-4 px-6 text-left font-bold">Kontak & Email</th>
                  <th className="py-4 px-6 text-center font-bold w-32">Role</th>
                  <th className="py-4 px-6 text-center font-bold w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 text-sm font-medium">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 transition-colors duration-150"
                    >
                      {/* NO */}
                      <td className="py-5 px-6 text-center font-bold text-slate-400">
                        {index + 1}
                      </td>

                      {/* NAMA */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                            {user.nama?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <span className="font-semibold text-slate-800 tracking-tight">
                            {user.nama}
                          </span>
                        </div>
                      </td>

                      {/* USERNAME */}
                      <td className="py-4 px-6">
                        <span className="bg-slate-100/80 px-2.5 py-1 rounded-md text-xs font-mono font-bold tracking-wide text-slate-600 border border-slate-200/40">
                          @{user.username}
                        </span>
                      </td>

                      {/* EMAIL & PHONE */}
                      <td className="py-4 px-6">
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <FaEnvelope className="text-slate-400" size={11} />
                            <span>{user.email || "-"}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <FaPhoneAlt className="text-slate-400" size={10} />
                            <span>{user.phone || "-"}</span>
                          </div>
                        </div>
                      </td>

                      {/* ROLE BADGE */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                          ${
                            user.role === "admin"
                              ? "bg-red-50 text-red-600 border border-red-100/50"
                              : user.role === "petugas"
                              ? "bg-amber-50 text-amber-600 border border-amber-100/50"
                              : "bg-blue-50 text-blue-600 border border-blue-100/50"
                          }`}
                        >
                          <FaUserShield size={10} /> {user.role}
                        </span>
                      </td>

                      {/* AKSI BUTTONS */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => openEdit(user)}
                            className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-xl text-xs font-medium shadow-sm transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
                            title="Edit User"
                          >
                            <FaEdit size={12} />
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl text-xs font-medium shadow-sm transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
                            title="Hapus User"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2 text-slate-400">
                        <span className="text-4xl animate-pulse">🔍</span>
                        <p className="font-bold text-slate-700 text-sm mt-1">Pengguna tidak ditemukan</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. MODAL POPUP */}
        {openModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
            <form
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FaUserAlt size={14} />
                </div>
                <h2 className="font-black text-lg text-slate-800 tracking-tight">
                  {editId ? "Ubah Data Pengguna" : "Tambah Pengguna Baru"}
                </h2>
              </div>

              <div className="space-y-3.5 mb-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <input
                    name="nama"
                    placeholder="Masukkan nama lengkap..."
                    value={form.nama}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Username</label>
                    <input
                      name="username"
                      placeholder="username"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nomor Telepon</label>
                    <input
                      name="phone"
                      placeholder="0812xxxxx"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alamat Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kata Sandi</label>
                  <input
                    type="password"
                    name="password"
                    placeholder={editId ? "Isi hanya jika ingin mengganti sandi..." : "Masukkan kata sandi..."}
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium"
                    required={!editId}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hak Akses (Role)</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all font-bold text-slate-700"
                  >
                    <option value="pelanggan">Pelanggan</option>
                    <option value="petugas">Petugas Lapangan</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

              {/* ACTION FOOTER MODAL */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}