import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaLock,
} from "react-icons/fa";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    name: "Khalifa",
    email: "khalifa@email.com",
    phone: "08123456789",
    password: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("DATA DISIMPAN:", form);
    setIsEdit(false);

    // nanti di sini kamu bisa fetch API backend
  };

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>
      </div>

      <div className="relative z-10 p-5 md:p-10">

        {/* TITLE + BUTTON */}
        <div className="flex justify-between items-center text-white mb-10">
          <div>
            <h1 className="text-4xl font-bold">Profil Saya</h1>
            <p className="text-blue-100 mt-2">Informasi akun pelanggan</p>
          </div>

          <button
            onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
            className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold"
          >
            {isEdit ? "Simpan" : "Edit"}
          </button>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">

          {/* FOTO */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">

              {profileImage ? (
                <img src={profileImage} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 text-5xl">
                  <FaUser />
                </div>
              )}

              <label className="absolute bottom-1 right-1 bg-blue-600 text-white p-3 rounded-full cursor-pointer">
                <FaCamera size={14} />
                <input type="file" hidden onChange={handleImageChange} />
              </label>
            </div>

            <h2 className="text-2xl font-bold mt-4">{form.name}</h2>
          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {/* NAMA */}
            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaUser className="text-blue-500" />
                <p className="font-semibold">Nama</p>
              </div>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!isEdit}
                className="w-full p-3 rounded-lg border bg-gray-50 disabled:bg-gray-100"
              />
            </div>

            {/* EMAIL */}
            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaEnvelope className="text-green-500" />
                <p className="font-semibold">Email</p>
              </div>

              <input
                value={form.email}
                disabled
                className="w-full p-3 rounded-lg bg-gray-100"
              />
            </div>

            {/* PHONE */}
            <div className="border rounded-xl p-4 md:col-span-2">
              <div className="flex items-center gap-3 mb-2">
                <FaPhone className="text-orange-500" />
                <p className="font-semibold">Nomor HP</p>
              </div>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={!isEdit}
                className="w-full p-3 rounded-lg border bg-gray-50 disabled:bg-gray-100"
              />
            </div>

            {/* PASSWORD */}
            {isEdit && (
              <div className="border rounded-xl p-4 md:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <FaLock className="text-red-500" />
                  <p className="font-semibold">Password Baru</p>
                </div>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Masukkan password baru"
                  className="w-full p-3 rounded-lg border"
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}