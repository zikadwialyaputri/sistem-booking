import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
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
  FaCheckCircle,
  FaArrowLeft,
  FaChevronDown
} from "react-icons/fa";
import { supabase } from "../../services/supabase";

export default function ProfileAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); 

  // SINKRONISASI FOTO
  const fotoAdmin = user?.foto || user?.avatar_url || user?.foto_url || null;

  const [isEdit, setIsEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(fotoAdmin);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [form, setForm] = useState({
    name: user?.nama || user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
  });

  const profile = {
    name: user?.username || "Admin",
    foto: fotoAdmin || "https://i.pravatar.cc/100?img=12",
  };

  // STATE TOAST PREMIUM
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
    setProfileImage(fotoAdmin); 
    setIsEdit(false);
  };

  const handleSave = async () => {
    const isNameSame = form.name === (user?.nama || user?.username || "");
    const isPhoneSame = form.phone === (user?.phone || "");
    const isImageSame = profileImage === fotoAdmin;
    const isPasswordEmpty = form.password.trim() === "";

    if (isNameSame && isPhoneSame && isImageSame && isPasswordEmpty) {
      triggerToast("warning", "Anda tidak memperbarui apapun");
      return;
    }

    if (!isPasswordEmpty && form.password.length < 6) {
      triggerToast("warning", "Password baru minimal 6 karakter");
      return;
    }

    try {
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
        triggerToast("error", "Gagal memperbarui profil: " + error.message);
        return;
      }

      const updatedUser = {
        ...user,
        ...updatedData,
        avatar_url: profileImage, 
        foto_url: profileImage
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      triggerToast("success", "Profil admin berhasil diperbarui");
      setIsEdit(false);
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      triggerToast("error", "Terjadi kesalahan koneksi");
    }
  };

  return (
    <div className="min-h-screen text-slate-700 font-sans antialiased bg-[#f8fafc] p-4 md:p-8 relative">
      
      {/* TOAST CAPSULE LUXURY */}
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
        
        {/* BANNER WITH PROFILE DROPDOWN ON RIGHT SIDE */}
        <div className="relative h-60 md:h-64 bg-slate-950 flex flex-row justify-between items-start p-8 md:p-12 rounded-[28px] overflow-visible shadow-sm z-30">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Arena Background"
            className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none mix-blend-luminosity rounded-[28px]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/95 via-slate-900/75 to-blue-950/45 pointer-events-none rounded-[28px]" />
          
          {/* KIRI BANNER */}
          <div className="relative z-10 flex flex-col justify-start items-start pt-1">
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

          {/* KANAN BANNER: DROPDOWN PROFIL AKTIF */}
          <div className="relative z-20 flex items-center gap-4">
            <div className="relative">
              <div 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition px-3 py-2 rounded-xl border border-white/10 backdrop-blur-sm cursor-pointer select-none"
              >
                <img
                  src={profile.foto}
                  alt="Avatar Admin"
                  className="w-8 h-8 rounded-lg object-cover border border-white/20 shadow-sm"
                />
                <div className="hidden sm:flex flex-col text-left text-white">
                  <span className="text-xs font-bold leading-none truncate max-w-[100px]">{profile.name}</span>
                  <span className="text-[9px] text-slate-300 font-medium mt-0.5 uppercase tracking-wider">Admin</span>
                </div>
                <FaChevronDown className={`text-[10px] text-slate-300 transition-transform ${showProfileDropdown ? "rotate-180" : ""}`} />
              </div>

              {showProfileDropdown && (
                <div className="absolute right-0 top-14 bg-white p-2 rounded-xl shadow-2xl w-48 text-slate-800 z-50 border border-slate-100">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="font-semibold text-xs text-slate-800 truncate">
                      {profile.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">Super Admin</p>
                  </div>

                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                    className="w-full text-left text-xs text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition font-semibold mt-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              
              {/* TOMBOL KIRI */}
              <button
                onClick={() => navigate("/admin")} 
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm group"
              >
                <FaArrowLeft size={11} className="text-slate-400 group-hover:text-slate-600 transition-colors" /> Kembali ke Dashboard
              </button>

              {/* TOMBOL KANAN */}
              <div className="flex items-center gap-3">
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
    </div>
  );
}