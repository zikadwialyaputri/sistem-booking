import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  /* navigate */
  const navigate = useNavigate();

  /* state */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  /* handle input */
  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setDataForm({
      ...dataForm,
      [name]: value,
    });

    // hapus error saat user mulai mengetik
    if (error) {
      setError("");
    }
  };

  /* process login */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validasi form kosong
    if (!dataForm.username || !dataForm.password) {
      setError("Username dan password harus diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: dataForm.username,
          password: dataForm.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      // redirect jika login berhasil
      navigate("/");
    } catch (err) {
      console.log(err);

      // error dari API
      if (err.response) {
        setError(
          err.response.data.message || "Username atau password salah"
        );
      }

      // server tidak merespon
      else if (err.request) {
        setError("Tidak dapat terhubung ke server");
      }

      // error lainnya
      else {
        setError("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  /* error info */
  const errorInfo = error ? (
    <div className="bg-red-100 border border-red-200 mb-5 p-4 text-sm text-red-600 rounded-xl flex items-center">
      <BsFillExclamationDiamondFill className="mr-2 text-lg" />
      {error}
    </div>
  ) : null;

  /* loading info */
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

      {/* Error */}
      {errorInfo}

      {/* Loading */}
      {loadingInfo}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Username
          </label>

          <input
            type="text"
            id="username"
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            placeholder="Masukkan username"
            disabled={loading}
            className="
              w-full px-4 py-3
              border border-gray-300
              rounded-xl
              bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
              disabled:bg-gray-100
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
              className="text-sm text-blue-600 hover:text-blue-700"
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
              focus:border-blue-500
              transition
              disabled:bg-gray-100
            "
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Ingat saya
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3 rounded-xl
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold
            transition duration-300
            shadow-md hover:shadow-lg
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <ImSpinner2 className="animate-spin mr-2" />
              Loading...
            </span>
          ) : (
            "Login Sekarang"
          )}
        </button>
      </form>

      {/* Register Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-400 mt-6">
        SmashBooking - Sistem Booking Lapangan Badminton
      </p>
    </div>
  );
}