import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePetugas() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    foto: "",
    password: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    axios
      .get("/api/petugas/profile", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setProfile({
          name: res.data.name || "",
          foto: res.data.foto || "",
          password: "",
        });
        setPreview(res.data.foto);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, foto: reader.result });
      setPreview(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleSave = () => {
    axios
      .put("/api/petugas/profile", profile, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(() => {
        alert("Profile berhasil diupdate");

        // logout kalau password diganti (opsional tapi aman)
        if (profile.password) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          navigate("/petugas/dashboard");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center text-white">
          <h2 className="text-xl font-bold">Profile Petugas</h2>
          <p className="text-sm opacity-80">Kelola akun kamu</p>
        </div>

        <div className="p-6">

          {/* FOTO */}
          <div className="flex flex-col items-center mb-6">

            <div className="relative">
              <img
                src={preview || "https://via.placeholder.com/120"}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />

              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer text-xs shadow-md hover:bg-blue-700">
                ✎
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Klik icon untuk ganti foto
            </p>
          </div>

          {/* NAMA */}
          <label className="text-sm text-gray-600">Nama</label>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan nama"
          />

          {/* PASSWORD */}
          <label className="text-sm text-gray-600">
            Password Baru
          </label>
          <input
            name="password"
            type="password"
            value={profile.password}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 mt-1 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Kosongkan jika tidak ingin ganti password"
          />

          {/* BUTTON SAVE */}
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
          >
            Simpan Perubahan
          </button>

          {/* BUTTON BACK */}
          <button
            onClick={() => navigate("/petugas/dashboard")}
            className="w-full mt-3 bg-gray-100 text-gray-700 p-3 rounded-xl hover:bg-gray-200 transition"
          >
            Kembali
          </button>

        </div>
      </div>
    </div>
  );
}