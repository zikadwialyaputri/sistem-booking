import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

import { supabase } from "../../../services/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  /* handle input */
  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setDataForm({
      ...dataForm,
      [name]: value,
    });

    if (error) {
      setError("");
    }
  };

  /* process login */
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!dataForm.email || !dataForm.password) {
    setError("Email dan password harus diisi");
    return;
  }

  setLoading(true);
  setError("");

  try {

    // cek email dan password dari tabel users
   // cek user
const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("email", dataForm.email)
  .eq("password", dataForm.password)
  .single();

if (error || !data) {
  throw new Error("Email atau password salah");
}

// simpan login history
const { error: historyError } = await supabase
  .from("login_history")
  .insert([
    {
      user_id: data.id,
      nama: data.nama,
      email: data.email,
      login_at: new Date()
    }
  ]);

if (historyError) {
  console.log(historyError);
}

// simpan session
localStorage.setItem(
  "user",
  JSON.stringify(data)
);
    // redirect sesuai role
    if (data.role === "admin") {
      navigate("/admin");
    }

    else if (data.role === "petugas") {
      navigate("/petugas");
    }

    else {
      navigate("/pelanggan");
    }

  } catch (err) {
    console.log(err);

    setError(
      err.message || "Login gagal"
    );

  } finally {
    setLoading(false);
  }
};

  const errorInfo = error ? (
    <div className="bg-red-100 border border-red-200 mb-5 p-4 text-sm text-red-600 rounded-xl flex items-center">
      <BsFillExclamationDiamondFill className="mr-2 text-lg" />
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-gray-100 border border-gray-200 mb-5 p-4 text-sm text-gray-600 rounded-xl flex items-center">
      <ImSpinner2 className="mr-2 animate-spin" />
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div>

      {/* Heading */}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Selamat Datang 👋
        </h2>

        <p className="text-gray-500 mt-2 text-sm">
          Login untuk melakukan booking lapangan badminton dengan mudah
        </p>
      </div>

      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            disabled={loading}
            className="
            w-full px-4 py-3
            border border-gray-300
            rounded-xl
            bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />
        </div>

        {/* Password */}

        <div>

          <div className="flex items-center justify-between mb-2">

            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <Link
              to="/forgot"
              className="text-sm text-blue-600"
            >
              Lupa Password?
            </Link>

          </div>

          <input
            type="password"
            id="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            disabled={loading}
            className="
            w-full px-4 py-3
            border border-gray-300
            rounded-xl
            bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

        </div>

        {/* Remember */}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox"/>
          Ingat Saya
        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="
          w-full py-3
          rounded-xl
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-semibold
          "
        >

          {loading ? (
            <span className="flex justify-center items-center">
              <ImSpinner2 className="animate-spin mr-2"/>
              Loading...
            </span>
          ) : (
            "Login Sekarang"
          )}

        </button>

      </form>

      <div className="text-center mt-6">

        <p className="text-sm text-gray-500">

          Belum punya akun?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Daftar sekarang
          </Link>

        </p>

      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        SmashBooking - Sistem Booking Lapangan Badminton
      </p>

    </div>
  );
}