import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaChevronLeft,
  FaHistory
} from "react-icons/fa";

export default function CustomerDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setUser(data);
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-sm w-full mx-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-500 tracking-wide">Sinkronisasi data pelanggan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfeff] sm:bg-[#f8fafc] p-4 md:p-12 antialiased text-slate-700 flex flex-col items-center selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-2xl space-y-6">
        
        {/* TOP BAR ACTION */}
        <div className="flex items-center justify-between px-1">
          <Link 
            to="/admin/customers" 
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors duration-200 group"
          >
            <FaChevronLeft size={10} className="transform group-hover:-translate-x-0.5 transition-transform" /> 
            Kembali ke pelanggan
          </Link>
          <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-xl border border-slate-200/60 shadow-sm">
            UID: {id ? id.substring(0, 8).toUpperCase() : "---"}
          </span>
        </div>

        {/* MAIN USER INFOCARD */}
        <div className="bg-white rounded-[32px] border border-slate-200/70 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.12)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(148,163,184,0.18)]">
          
          {/* BADMINTON COURT BANNER WITH GRADIENT OVERLAY */}
          <div className="h-44 relative overflow-hidden bg-slate-950">
            {/* Gambar Lapangan Badminton Berkualitas Tinggi */}
            <img 
              src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop" 
              alt="Badminton Court" 
              className="w-full h-full object-cover object-center opacity-80"
            />
            {/* Overlay Gradasi Gelap ke Transparan supaya menyatu dengan Card Putih di bawahnya */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/30" />
            <div className="absolute inset-0 bg-blue-950/25 mix-blend-multiply" /> {/* Memberikan tint biru tipis yang elegan */}
          </div>

          {/* IDENTITY SECTION - ANTI CLIPPING LAYOUT */}
          <div className="px-6 md:px-8 pb-7 relative flex flex-col z-20">
            
            {/* FLOATING AVATAR BOX */}
            <div className="h-12 relative w-full flex justify-center sm:justify-start">
              <div className="absolute -top-16 left-1/2 sm:left-2 transform -translate-x-1/2 sm:translate-x-0 flex-shrink-0">
                {user.foto ? (
                  <img
                    src={user.foto}
                    alt={user.nama}
                    className="w-24 h-24 rounded-[26px] object-cover ring-4 ring-white bg-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15)] hover:scale-[1.03] transition-transform duration-300"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-[26px] bg-slate-50 text-slate-400 flex items-center justify-center ring-4 ring-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15)] border border-slate-200/60">
                    <FaUser size={28} className="text-slate-300" />
                  </div>
                )}
              </div>
            </div>
            
            {/* TEXT IDENTITIES - SAFE ZONE */}
            <div className="text-center sm:text-left space-y-1.5 w-full mt-4 sm:pl-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
                Data Hub Pelanggan
              </span>
              
              <h1 className="text-2xl font-bold text-slate-900 leading-normal tracking-tight block break-words">
                {user.nama}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg border border-slate-200/50">
                  @{user.username}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-lg border border-blue-100/60 capitalize">
                  <FaShieldAlt size={9} /> {user.role}
                </span>
              </div>
            </div>

          </div>

          <hr className="border-slate-100 mx-6 md:mx-8" />

          {/* BALANCED SYMMETRIC FORM TILES */}
          <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* FIELD: PHONE */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm border border-slate-200/40 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100/50 transition-all duration-200">
                <FaPhone size={12} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Kontak Ponsel</span>
                <span className="text-sm font-medium text-slate-800 block truncate tracking-wide">{user.phone || "-"}</span>
              </div>
            </div>

            {/* FIELD: EMAIL */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm border border-slate-200/40 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100/50 transition-all duration-200">
                <FaEnvelope size={12} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Korespondensi Email</span>
                <span className="text-sm font-medium text-slate-800 block truncate tracking-wide">{user.email || "-"}</span>
              </div>
            </div>

            {/* FIELD: JOINED TIMESTAMP */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 sm:col-span-2 group hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm border border-slate-200/40 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100/50 transition-all duration-200">
                <FaCalendarAlt size={12} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Registrasi Keanggotaan</span>
                <span className="text-sm font-medium text-slate-800 block truncate tracking-wide">
                  {user.created_at ? new Date(user.created_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" }) : "-"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* LOG & AUDIT ACTIVITY BLOCK */}
        <div className="bg-white rounded-[24px] border border-slate-200/70 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 px-1 text-slate-800">
            <FaHistory size={13} className="text-slate-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Log Riwayat & Aktivitas</h3>
          </div>
          <div className="border border-dashed border-slate-200/80 bg-slate-50/30 rounded-2xl p-8 text-center text-xs font-medium text-slate-400 leading-relaxed tracking-wide">
            Riwayat Login & Booking akan ditambahkan di sini
          </div>
        </div>

      </div>
    </div>
  );
}