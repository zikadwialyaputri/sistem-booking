import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaLock,
} from "react-icons/fa";

import { supabase } from "../../services/supabase";

export default function ProfileAdmin() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [isEdit, setIsEdit] =
    useState(false);

  const [profileImage, setProfileImage] =
    useState(user?.foto || null);

  const [form, setForm] = useState({
    name:
      user?.nama ||
      user?.username ||
      "",

    email: user?.email || "",

    phone: user?.phone || "",

    password: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader =
        new FileReader();

      reader.onloadend = () => {
        setProfileImage(
          reader.result
        );
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSave =
    async () => {
      try {
        const updatedData = {
          nama: form.name,
          phone: form.phone,
          foto: profileImage,
        };

        if (
          form.password.trim() !==
          ""
        ) {
          updatedData.password =
            form.password;
        }

        const { error } =
          await supabase
            .from("users")
            .update(updatedData)
            .eq(
              "id",
              user.id
            );

        if (error) {
          console.log(error);

          alert(
            "Gagal update: " +
              error.message
          );

          return;
        }

        const updatedUser = {
          ...user,
          ...updatedData,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser
          )
        );

        alert(
          "Profil admin berhasil diperbarui"
        );

        setIsEdit(false);

      } catch (err) {
        console.log(err);

        alert(
          "Terjadi kesalahan"
        );
      }
    };

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">

        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>

      </div>

      <div className="relative z-10 p-5 md:p-10">

        <div className="flex justify-between items-center text-white mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              Profil Admin
            </h1>

            <p className="text-blue-100">
              Informasi akun admin
            </p>
          </div>

          <button
            onClick={() =>
              isEdit
                ? handleSave()
                : setIsEdit(true)
            }
            className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold"
          >
            {isEdit
              ? "Simpan"
              : "Edit"}
          </button>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">

          {/* FOTO */}
          <div className="flex flex-col items-center">

            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">

              {profileImage ? (

                <img
                  src={profileImage}
                  className="w-full h-full object-cover"
                  alt=""
                />

              ) : (

                <div className="w-full h-full bg-blue-100 flex justify-center items-center text-blue-600 text-5xl">

                  <FaUser />

                </div>

              )}

              {isEdit && (
                <label className="absolute bottom-1 right-1 bg-blue-600 text-white p-3 rounded-full cursor-pointer">

                  <FaCamera size={14} />

                  <input
                    type="file"
                    hidden
                    onChange={
                      handleImageChange
                    }
                  />

                </label>
              )}

            </div>

            <h2 className="text-2xl font-bold mt-4">
              {form.name}
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {/* Nama */}
            <div className="border rounded-xl p-4">

              <div className="flex gap-2 items-center mb-2">

                <FaUser />
                <p>Nama</p>

              </div>

              <input
                name="name"
                value={form.name}
                onChange={
                  handleChange
                }
                disabled={!isEdit}
                className="w-full p-3 border rounded-lg"
              />

            </div>

            {/* Email */}
            <div className="border rounded-xl p-4">

              <div className="flex gap-2 items-center mb-2">

                <FaEnvelope />
                <p>Email</p>

              </div>

              <input
                value={form.email}
                disabled
                className="w-full p-3 bg-gray-100 rounded-lg"
              />

            </div>

            {/* Phone */}
            <div className="border rounded-xl p-4 md:col-span-2">

              <div className="flex gap-2 items-center mb-2">

                <FaPhone />
                <p>Nomor HP</p>

              </div>

              <input
                name="phone"
                value={form.phone}
                onChange={
                  handleChange
                }
                disabled={!isEdit}
                className="w-full p-3 border rounded-lg"
              />

            </div>

            {/* Password */}
            {isEdit && (

              <div className="border rounded-xl p-4 md:col-span-2">

                <div className="flex gap-2 items-center mb-2">

                  <FaLock />
                  <p>Password Baru</p>

                </div>

                <input
                  type="password"
                  name="password"
                  value={
                    form.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Masukkan password baru"
                  className="w-full p-3 border rounded-lg"
                />

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}