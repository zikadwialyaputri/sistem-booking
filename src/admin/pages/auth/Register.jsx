import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../../services/supabase";

export default function Register() {
  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    nama: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !dataForm.nama ||
      !dataForm.username ||
      !dataForm.phone ||
      !dataForm.email ||
      !dataForm.password ||
      !dataForm.confirmPassword
    ) {
      alert("Semua field wajib diisi");
      return;
    }

    if (dataForm.password !== dataForm.confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    setLoading(true);

    try {
      const email = dataForm.email.trim().toLowerCase();

      // ==========================
      // REGISTER AUTH
      // ==========================
      const { data, error } = await supabase.auth.signUp({
        email,
        password: dataForm.password,
      });

      console.log("========== REGISTER ==========");
      console.log("REGISTER DATA:", data);
      console.log("REGISTER USER:", data?.user);
      console.log("REGISTER SESSION:", data?.session);
      console.log("REGISTER ERROR:", error);
      console.log("==============================");

      if (error) throw error;

      if (!data.user) {
        throw new Error("Gagal membuat akun.");
      }

      // ==========================
      // SIMPAN KE TABEL USERS
      // ==========================
      const { error: dbError } = await supabase
        .from("users")
        .insert([
          {
            auth_id: data.user.id,
            nama: dataForm.nama,
            username: dataForm.username,
            phone: dataForm.phone,
            email: email,
            role: "pelanggan",
          },
        ]);

      if (dbError) {
        console.error("========== DATABASE ERROR ==========");
        console.error(dbError);
        console.error("====================================");
        throw dbError;
      }

      console.log("User berhasil disimpan ke tabel users");

      alert("Registrasi berhasil!");

      navigate("/login");
    } catch (err) {
      console.error("========== REGISTER ERROR ==========");
      console.error(err);
      console.error("====================================");

      alert(err.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Buat Akun Baru ✨
        </h2>

        <p className="text-gray-500 mt-2 text-sm">
          Daftar untuk mulai booking lapangan badminton
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="nama"
          value={dataForm.nama}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          className="w-full px-4 py-3 border rounded-xl"
        />

        <input
          type="text"
          name="username"
          value={dataForm.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-3 border rounded-xl"
        />

        <input
          type="text"
          name="phone"
          value={dataForm.phone}
          onChange={handleChange}
          placeholder="Nomor Telepon"
          className="w-full px-4 py-3 border rounded-xl"
        />

        <input
          type="email"
          name="email"
          value={dataForm.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 border rounded-xl"
        />

        <input
          type="password"
          name="password"
          value={dataForm.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-xl"
        />

        <input
          type="password"
          name="confirmPassword"
          value={dataForm.confirmPassword}
          onChange={handleChange}
          placeholder="Konfirmasi Password"
          className="w-full px-4 py-3 border rounded-xl"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 text-white"
        >
          {loading ? "Loading..." : "Daftar Sekarang"}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          Sudah punya akun?
          <Link to="/login" className="text-blue-600 font-semibold ml-1">
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
}