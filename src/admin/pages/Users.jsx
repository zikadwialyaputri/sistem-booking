import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";
import { FaEdit, FaTrash } from "react-icons/fa";

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
    user.nama
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="relative bg-gray-100 min-h-screen">

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">

        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-500/60 to-indigo-600/80"/>

      </div>

      <div className="relative z-10 p-5 md:p-10">

        <PageHeader
          title="Kelola Pengguna"
          breadcrumb={["Admin","Users"]}
        />

        {/* Search */}
        <div className="flex gap-3 mt-6 mb-6">

          <input
            className="w-full md:w-96 px-4 py-3 rounded-xl border bg-white"
            placeholder="Cari pengguna..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            + Tambah
          </button>

        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-center">Aksi</th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user)=>(

                <tr
                  key={user.id}
                  className="border-t hover:bg-blue-50"
                >

                  <td className="p-4 font-semibold">
                    {user.nama}
                  </td>

                  <td className="p-4">
                    {user.username}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    {user.phone || "-"}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold
                      ${
                        user.role==="admin"
                        ? "bg-red-100 text-red-700"
                        : user.role==="petugas"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                      }
                    `}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2 justify-center">

                      <button
                        onClick={()=>openEdit(user)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                      >
                        <FaEdit/>
                      </button>

                      <button
                        onClick={()=>deleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                      >
                        <FaTrash/>
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

            <form
              onSubmit={handleSubmit}
              className="bg-white w-[400px] p-6 rounded-xl"
            >

              <h2 className="font-bold text-xl mb-4">
                {editId
                  ? "Edit User"
                  : "Tambah User"}
              </h2>

              <input
                name="nama"
                placeholder="Nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-2"
              />

              <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-2"
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-2"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-2"
              />

              <input
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-2"
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-4"
              >
                <option value="pelanggan">Pelanggan</option>
                <option value="petugas">Petugas</option>
                <option value="admin">Admin</option>
              </select>

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={()=>setOpenModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Batal
                </button>

                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Simpan
                </button>

              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}