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
    alert("Semua field harus diisi");
    return;
  }

  if (dataForm.password !== dataForm.confirmPassword) {
    alert("Password tidak sama");
    return;
  }

  try {

    const { error } = await supabase
      .from("users")
      .insert([
        {
          nama: dataForm.nama,
          username: dataForm.username,
          phone: dataForm.phone,
          email: dataForm.email,
          password: dataForm.password,
          role: "pelanggan"
        }
      ]);

    if (error) throw error;

    alert("Registrasi berhasil ✅");

    navigate("/login");

  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};
  return (
    <div>
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Buat Akun Baru ✨
        </h2>

        <p className="text-gray-500 mt-2 text-sm">
          Daftar untuk mulai booking lapangan badminton dengan mudah
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Nama */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Lengkap
          </label>

          <input
            type="text"
            name="nama"
            value={dataForm.nama}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            placeholder="Masukkan username"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Telepon */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nomor Telepon
          </label>

          <input
            type="text"
            name="phone"
            value={dataForm.phone}
            onChange={handleChange}
            placeholder="Masukkan nomor telepon"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Konfirmasi Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Konfirmasi Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={dataForm.confirmPassword}
            onChange={handleChange}
            placeholder="Ulangi password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Daftar Sekarang
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login disini
          </Link>
        </p>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        SmashBooking - Sistem Booking Lapangan Badminton
      </p>
    </div>
  );
}