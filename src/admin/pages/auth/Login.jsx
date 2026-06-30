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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataForm.email || !dataForm.password) {
      setError("Email dan password harus diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. LOGIN AUTH
      const { data, error } = await supabase.auth.signInWithPassword({
        email: dataForm.email.trim().toLowerCase(),
        password: dataForm.password,
      });

      if (error || !data.user) {
        throw new Error(error?.message || "Email atau password salah");
      }

      const authUser = data.user;

      // 2. AMBIL USER PROFILE
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, nama, email, role")
        .eq("id", authUser.id)
        .maybeSingle();

      if (userError || !userData) {
        throw new Error("User profile tidak ditemukan");
      }

      // 3. LOGIN HISTORY (TIDAK BOLEH GAGAL LOGIN KALAU ERROR)
      await supabase.from("login_history").insert([
        {
          user_id: userData.id,
          nama: userData.nama,
          email: userData.email,
          login_at: new Date(),
        },
      ]).catch(() => {
        console.log("Login history gagal, tapi login tetap lanjut");
      });

      // 4. SIMPAN SESSION
      localStorage.setItem("user", JSON.stringify(userData));

      // 5. REDIRECT
      const role = (userData.role || "").toLowerCase().trim();

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "petugas") {
        navigate("/petugas");
      } else if (role === "pelanggan") {
        navigate("/pelanggan");
      } else {
        throw new Error("Role tidak valid");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Selamat Datang 👋
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Login untuk melakukan booking lapangan badminton
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-200 mb-5 p-4 text-sm text-red-600 rounded-xl flex items-center">
          <BsFillExclamationDiamondFill className="mr-2 text-lg" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="email"
          name="email"
          value={dataForm.email}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-4 py-3 border rounded-xl bg-gray-50"
          placeholder="Masukkan email"
        />

        <input
          type="password"
          name="password"
          value={dataForm.password}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-4 py-3 border rounded-xl bg-gray-50"
          placeholder="Masukkan password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <ImSpinner2 className="animate-spin mr-2" />
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
          <Link to="/register" className="text-blue-600 font-semibold">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}