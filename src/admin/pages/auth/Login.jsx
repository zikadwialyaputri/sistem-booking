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

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: dataForm.password,
      });

      if (error) throw error;
      if (!data.user) throw new Error("Login gagal");

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (userError) throw new Error("Data user tidak ditemukan");

      await supabase.from("login_history").insert([
        {
          user_id: userData.id,
          nama: userData.nama,
          email: userData.email,
          login_at: new Date().toISOString(),
        },
      ]);

      localStorage.setItem("user", JSON.stringify(userData));

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
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-2">
        Selamat Datang 👋
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Login untuk booking lapangan
      </p>

      {error && (
        <div className="bg-red-100 p-3 mb-4 rounded flex items-center text-red-600">
          <BsFillExclamationDiamondFill className="mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={dataForm.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          value={dataForm.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-3 rounded"
        />

        {/* FORGOT PASSWORD */}
        <div className="text-right">
          <Link to="/forgot" className="text-blue-600 text-sm">
            Lupa password?
          </Link>
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <ImSpinner2 className="animate-spin mr-2" />
              Loading...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Belum punya akun? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}