
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
      const email = dataForm.email.trim().toLowerCase();

      // LOGIN AUTH
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: dataForm.password,
      });

      console.log("AUTH DATA:", data);
      console.log("AUTH ERROR:", error);

      if (error) throw error;

      if (!data.user) {
        throw new Error("Login gagal");
      }

      // AMBIL DATA USER BERDASARKAN EMAIL
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (userError) {
        console.log(userError);
        throw new Error("Data user tidak ditemukan");
      }

      // SIMPAN LOGIN HISTORY
      const { error: historyError } = await supabase
        .from("login_history")
        .insert([
          {
            user_id: userData.id,
            nama: userData.nama,
            email: userData.email,
            login_at: new Date().toISOString(),
          },
        ]);

      if (historyError) {
        console.log("LOGIN HISTORY:", historyError);
      }

      // SIMPAN SESSION
      localStorage.setItem("user", JSON.stringify(userData));

      // REDIRECT BERDASARKAN ROLE
      switch (userData.role) {
        case "admin":
          navigate("/admin");
          break;

        case "petugas":
          navigate("/petugas");
          break;

        case "pelanggan":
          navigate("/pelanggan");
          break;

        default:
          navigate("/");
          break;
      }

    } catch (err) {
      console.error(err);
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
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

