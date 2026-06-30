import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import { supabase } from "../../services/supabase";

export default function BookingSaya() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [lapanganData, setLapanganData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLapangan();
  }, []);

  async function getLapangan() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("lapangan")
        .select("*");

      if (error) {
        console.log(error);
        return;
      }

      setLapanganData(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = lapanganData.filter((item) =>
    item.nama?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen text-slate-700 font-sans antialiased bg-[#f8fafc] p-4 md:p-8 relative">
      
      {/* BACKGROUND DECORATION BLURS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute top-80 right-0 w-96 h-96 bg-indigo-400/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* =========================================================
            BANNER 100% MATCHING DASHBOARD STYLE (PREMIUM & CANTIK)
            ========================================================= */}
        <div className="relative h-60 md:h-64 bg-slate-950 flex flex-col justify-between p-8 md:p-12 rounded-[28px] overflow-hidden shadow-sm">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Arena Background"
            className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/95 via-slate-900/75 to-blue-950/45 pointer-events-none" />
          
          <div className="relative z-10 w-full flex flex-col justify-start items-start">
            <span className="uppercase tracking-widest text-[10px] font-bold bg-blue-500/20 text-blue-300 w-fit px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
              SISTEM RESERVASI
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none">
              Booking Lapangan
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-3 font-medium max-w-md leading-relaxed opacity-90">
              Pilih lapangan yang ingin dipesan sesuai jadwal olahraga Anda
            </p>
          </div>
        </div>

        {/* STATISTIK & SECTIONS CONTAINER (Digeser sedikit ke atas untuk overlap estetik) */}
        <div className="px-2 md:px-4 -mt-10 relative z-20 space-y-6">
          
          {/* STATISTIK CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-950/[0.02] border border-slate-200/60 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <FaCalendarCheck size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Lapangan</p>
                <h2 className="text-2xl font-black text-slate-800 mt-0.5">{lapanganData.length}</h2>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-slate-950/[0.02] border border-slate-200/60 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <FaCheckCircle size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Tersedia</p>
                <h2 className="text-2xl font-black text-emerald-600 mt-0.5">{lapanganData.length}</h2>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-slate-950/[0.02] border border-slate-200/60 p-5 flex items-center gap-4 sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <FaClock size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Jam Operasional</p>
                <h2 className="text-lg font-black text-amber-600 mt-0.5">15:00 - 21:00 WIB</h2>
              </div>
            </div>
          </div>

          {/* SEARCH FIELD */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Cari nama lapangan di sini..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 px-5 py-3 rounded-xl shadow-md shadow-slate-950/[0.02] border border-slate-200 bg-white font-medium text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
            />
          </div>

          {/* MAIN CONTAINER DAFTAR LAPANGAN */}
          <div className="bg-white rounded-[28px] shadow-xl shadow-slate-950/[0.02] border border-slate-200/60 p-6 md:p-8">
            <h2 className="text-xl font-black text-slate-800 mb-6 tracking-tight border-b border-slate-100 pb-4">
              Daftar Pilihan Lapangan
            </h2>

            {loading ? (
              <div className="text-center py-16 text-sm font-bold text-slate-400 uppercase tracking-widest">
                Sedang memuat data lapangan...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length > 0 ? (
                  filtered.map((court) => (
                    <div
                      key={court.id}
                      className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-md shadow-slate-950/[0.02] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* WRAPPER GAMBAR */}
                      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                        <img
                          src={court.gambar || "/img/default-court.jpg"}
                          alt={court.nama}
                          className="w-full h-full object-cover"
                        />
                        {/* Gradasi gelap tipis di bawah agar teks kontras */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                        {/* PRICE BADGE */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm">
                          <p className="text-xs font-black text-emerald-600">
                            Rp {Number(court.harga || 0).toLocaleString("id-ID")}
                          </p>
                        </div>

                        {/* INFO UTAMA LAPANGAN (DI ATAS GAMBAR) */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-black text-xl tracking-tight leading-tight">
                            {court.nama}
                          </h3>
                          <p className="text-[11px] font-medium text-slate-200 mt-1 opacity-95">
                            Dimensi: {court.ukuran || "-"}
                          </p>
                        </div>
                      </div>

                      {/* CONTENT & ACTION */}
                      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Tersedia
                          </span>
                          <span className="text-slate-400 text-xs font-medium">
                            per jam penggunaan
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            navigate(`/pelanggan/booking/${court.id}`)
                          }
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs shadow-md shadow-blue-500/10 transition-all cursor-pointer text-center"
                        >
                          Booking Sekarang
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16 text-slate-400 font-medium text-sm">
                    Maaf, data lapangan yang Anda cari tidak ditemukan.
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}