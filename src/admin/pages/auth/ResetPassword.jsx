import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      console.log("SESSION:", data);
      console.log("ERROR:", error);

      if (!data.session) {
        alert("Link reset password tidak valid atau sudah kadaluarsa");
        navigate("/forgot");
      }
    };

    getSession();
  }, [navigate]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Semua field wajib diisi");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    console.log(data);
    console.log(error);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Password berhasil diubah");
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        Reset Password
      </h2>

      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="Password baru"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Konfirmasi password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          {loading ? "Menyimpan..." : "Simpan Password"}
        </button>
      </form>
    </div>
  );
}