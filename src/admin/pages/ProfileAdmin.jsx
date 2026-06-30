import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaLock,
  FaPen,
  FaTimes,
  FaCheck,
  FaExclamationCircle,
  FaCheckCircle
} from "react-icons/fa";
import { supabase } from "../../services/supabase";

export default function ProfileAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));

  // SINKRONISASI FOTO: Mengakomodasi jika di dashboard menggunakan nama property yang berbeda
  const fotoAdmin = user?.foto || user?.avatar_url || user?.foto_url || null;

  const [isEdit, setIsEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(fotoAdmin);

  const [form, setForm] = useState({
    name: user?.nama || user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
  });

  // STATE TOAST PREMIUM (TANPA ANIMASI)
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: ""
  });

  const triggerToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setForm({
      name: user?.nama || user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
    });
    setProfileImage(fotoAdmin); // Reset ke foto semula saat batal
    setIsEdit(false);
  };

  const handleSave = async () => {
    // 1. VALIDASI APAKAH ADA PERUBAHAN DATA
    const isNameSame = form.name === (user?.nama || user?.username || "");
    const isPhoneSame = form.phone === (user?.phone || "");
    const isImageSame = profileImage === fotoAdmin;
    const isPasswordEmpty = form.password.trim() === "";

    if (isNameSame && isPhoneSame && isImageSame && isPasswordEmpty) {
      triggerToast("warning", "Anda tidak memperbarui apapun");
      return;
    }

    // 2. VALIDASI MINIMAL KARAKTER PASSWORD
    if (!isPasswordEmpty && form.password.length < 6) {
      triggerToast("warning", "Password baru minimal 6 karakter");
      return;
    }

    // 3. PROSES SIMPAN KE DATABASE
    try {
      // Kita update kolom 'foto' di database, sesuaikan jika nama kolom Anda di Supabase berbeda
      const updatedData = {
        nama: form.name,
        phone: form.phone,
        foto: profileImage, 
      };

      if (!isPasswordEmpty) {
        updatedData.password = form.password;
      }

      const { error } = await supabase
        .from("users")
        .update(updatedData)
        .eq("id", user.id);

      if (error) {
        console.log(error);
        triggerToast("error", "Gagal memperbarui profil: " + error.message);
        return;
      }

      // Ikut perbarui local storage agar dashboard & profil langsung sinkron tanpa relogin
      const updatedUser = {
        ...user,
        ...updatedData,
        avatar_url: profileImage, // Duplikat ke key alternatif agar aman untuk dashboard
        foto_url: profileImage
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      triggerToast("success", "Profil admin berhasil diperbarui");
      setIsEdit(false);
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.log(err);
      triggerToast("error", "Terjadi kesalahan koneksi");
    }
  };

  return (
    <div className="min-h-screen text-slate-700 font-sans antialiased bg-[#f8fafc] p-4 md:p-8 relative">
      
      {/* TOAST CAPSULE LUXURY (TANPA ANIMASI) */}
      {toast.show && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3.5 px-6 py-3 rounded-full shadow-xl bg-white/95 backdrop-blur-md border border-slate-150">
          {toast.type === "success" && (
            <>
              <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <FaCheckCircle size={15} />
              </div>
              <span className="text-sm font-bold text-slate-800">{toast.message}</span>
            </>
          )}
          {toast.type === "warning" && (
            <>
              <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                <FaExclamationCircle size={15} />
              </div>
              <span className="text-sm font-bold text-slate-800">{toast.message}</span>
            </>
          )}
          {toast.type === "error" && (
            <>
              <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                <FaExclamationCircle size={15} />
              </div>
              <span className="text-sm font-bold text-slate-800">{toast.message}</span>
            </>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* BANNER MATCHING DASHBOARD STYLE */}
        <div className="relative h-60 md:h-64 bg-slate-950 flex flex-col justify-between p-8 md:p-12 rounded-[28px] overflow-hidden shadow-sm">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Arena Background"
            className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/95 via-slate-900/75 to-blue-950/45 pointer-events-none" />
          
          <div className="relative z-10 w-full flex flex-col justify-start items-start">
            <span className="uppercase tracking-widest text-[10px] font-bold bg-blue-500/20 text-blue-300 w-fit px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
              PORTAL ADMINISTRATOR
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none">
              Profil Admin
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-3 font-medium max-w-md leading-relaxed opacity-90">
              Kelola informasi kredensial dan pengaturan identitas super administrator Anda
            </p>
          </div>
        </div>

        {/* CARD FORM CONTAINER */}
        <div className="max-w-4xl mx-auto px-4 -mt-12 pb-16 relative z-20">
          <div className="bg-white rounded-[28px] shadow-xl shadow-slate-950/[0.02] border border-slate-200/60 p-6 md:p-10 flex flex-col justify-between">
            
            <div>
              {/* AVATAR WRAPPER */}
              <div className="flex flex-col items-center border-b border-slate-100 pb-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white ring-4 ring-blue-500/10 shadow-md bg-slate-100 flex items-center justify-center text-slate-400">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile Admin"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser size={48} className="text-slate-300" />
                    )}
                  </div>

                  {isEdit && (
                    <label className="absolute bottom-1 right-1 w-9 h-9 bg-gradient-to-tr from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md shadow-blue-500/30 transition-transform hover:scale-105">
                      <FaCamera size={13} />
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>

                <h2 className="text-xl font-black text-slate-800 mt-4 tracking-tight">
                  {form.name || "Administrator"}
                </h2>
                <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mt-1 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Role: Super Admin
                </p>
              </div>

              {/* GRID FORM FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                
                {/* INPUT NAMA */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <FaUser size={12} className="text-slate-400" /> Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!isEdit}
                    placeholder="Masukkan nama lengkap"
                    className={`w-full px-4 py-3 text-sm rounded-xl border font-medium transition-all outline-none ${
                      isEdit
                        ? "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
                        : "border-slate-100 bg-slate-50/50 text-slate-500 cursor-not-allowed"
                    }`}
                  />
                </div>

                {/* INPUT EMAIL */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <FaEnvelope size={12} className="text-slate-400" /> Alamat Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    disabled
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-100 bg-slate-50/70 text-slate-400 font-medium cursor-not-allowed"
                  />
                </div>

                {/* INPUT NOMOR HP */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <FaPhone size={12} className="text-slate-400" /> Nomor Handphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!isEdit}
                    placeholder="Contoh: 08123456789"
                    className={`w-full px-4 py-3 text-sm rounded-xl border font-medium transition-all outline-none ${
                      isEdit
                        ? "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
                        : "border-slate-100 bg-slate-50/50 text-slate-500 cursor-not-allowed"
                    }`}
                  />
                </div>

                {/* INPUT PASSWORD BARU */}
                {isEdit && (
                  <div className="space-y-2 md:col-span-2 bg-amber-50/40 border border-amber-100/70 rounded-2xl p-5 mt-2">
                    <label className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-2">
                      <FaLock size={12} className="text-amber-600" /> Ubah Password Baru (Opsional)
                    </label>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Kosongkan kolom di bawah jika Anda tidak ingin mengganti password akun admin saat ini.
                    </p>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Masukkan kombinasi password baru"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-amber-200/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white font-medium outline-none mt-2"
                    />
                  </div>
                )}

              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
              {isEdit ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <FaTimes size={12} /> Batal
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <FaCheck size={12} /> Simpan Perubahan
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer group"
                >
                  <FaPen size={11} className="text-blue-200 group-hover:text-white transition-colors" /> Edit Profile
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}