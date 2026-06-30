import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import lapanganData from "../../guest/data/lapangan.json";
import { supabase } from "../../services/supabase";
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle
} from "react-icons/fa";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const court = lapanganData.find(
    (item) => item.id === Number(id)
  );

  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);

  // tanggal lokal Indonesia
  const today = new Date(
    new Date().getTime() -
      new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const jadwalJam = [
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
  ];

  if (!court) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-500 font-sans p-4">
        <FaTimesCircle size={40} className="text-rose-400 mb-3" />
        <p className="text-sm font-bold tracking-tight text-slate-700">Lapangan tidak ditemukan</p>
      </div>
    );
  }

  useEffect(() => {
    if (tanggal) {
      fetchBookedTimes();
      setJam(""); 
    }
  }, [tanggal]);

  const fetchBookedTimes = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("jam_mulai,jam_selesai")
      .eq("lapangan_id", court.id)
      .eq("tanggal", tanggal)
      .eq("status", "approved");

    if (error) {
      console.log(error);
      return;
    }

    const booked = data.map(
      (item) =>
        `${item.jam_mulai.slice(0, 5)} - ${item.jam_selesai.slice(0, 5)}`
    );

    setBookedTimes(booked);
  };

  const isTimePast = (slotJam) => {
    if (tanggal !== today) return false; 

    const [jamMulai] = slotJam.split(" - ");
    const [hours, minutes] = jamMulai.split(":").map(Number);
    
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (currentHours > hours) return true;
    if (currentHours === hours && currentMinutes >= minutes) return true;
    
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        throw new Error("User belum login");
      }

      const [jamMulai, jamSelesai] =
        jam.split(" - ");

      const now = new Date();

      const bookingDateTime =
        new Date(`${tanggal}T${jamMulai}`);

      if (tanggal < today) {
        throw new Error("Tanggal sudah lewat");
      }

      if (bookingDateTime <= now) {
        throw new Error("Jam sudah lewat");
      }

      const totalHarga = court.harga;

      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            user_id: user.id,
            lapangan_id: court.id,
            tanggal,
            jam_mulai: jamMulai,
            jam_selesai: jamSelesai,
            total: totalHarga,
            status: "pending",
          },
        ])
        .select();

      if (error) throw error;

      console.log("Booking berhasil:", data);
      setShowPopup(true);

    } catch (err) {
      console.log("ERROR:", err);
      setErrorMessage(
        err.message || "Terjadi kesalahan"
      );
      setShowErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-700 font-sans antialiased bg-[#f8fafc] p-4 md:p-8 relative">
      
      {/* GLOW DECORATION BACKGROUND */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* BANNER CAPSULE LUXURY */}
        <div className="relative h-60 md:h-64 bg-slate-950 flex flex-col justify-between p-8 md:p-12 rounded-[28px] overflow-hidden shadow-sm">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Arena Background"
            className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/95 via-slate-900/75 to-blue-950/45 pointer-events-none" />
          
          <div className="relative z-10 w-full flex flex-col justify-start items-start">
            <span className="uppercase tracking-widest text-[10px] font-bold bg-blue-500/20 text-blue-300 w-fit px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
              FORMULIR BOOKING
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none">
              Booking {court.nama}
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-3 font-medium max-w-md leading-relaxed opacity-90">
              Lengkapi informasi tanggal dan waktu sewa untuk mengirimkan permohonan reservasi Anda
            </p>
          </div>
        </div>

        {/* CONTAINER UTAMA FORM & DETAIL */}
        <div className="max-w-4xl mx-auto px-4 -mt-12 pb-16 relative z-20">
          <div className="bg-white rounded-[28px] shadow-xl shadow-slate-950/[0.02] border border-slate-200/60 overflow-hidden">
            
            {/* GAMBAR LAPANGAN HERO SECTIONS */}
            <div className="relative h-64 md:h-72 w-full bg-slate-900">
              <img
                src={court.gambar}
                className="w-full h-full object-cover opacity-85"
                alt={court.nama}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 md:left-8 text-white">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                  {court.nama}
                </h2>
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-bold mt-2">
                  <FaInfoCircle size={10} /> Dimensi: {court.ukuran}
                </div>
              </div>
            </div>

            {/* AREA FORM */}
            <div className="p-6 md:p-10">
              
              {/* DISPLAY HARGA */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 mb-8 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tarif Sewa Lapangan</span>
                <h2 className="text-xl md:text-2xl font-black text-emerald-600 tracking-tight">
                  Rp {court.harga.toLocaleString("id-ID")} <span className="text-xs text-emerald-500 font-medium font-sans">/ jam</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* PILIH TANGGAL */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <FaCalendarAlt size={12} className="text-slate-400" /> Tanggal Booking
                  </label>
                  <input
                    type="date"
                    value={tanggal}
                    min={today}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white font-medium transition-all outline-none"
                    required
                  />
                </div>

                {/* PILIH JAM SEWA */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <FaClock size={12} className="text-slate-400" /> Pilih Jam Tersedia
                  </label>
                  <select
                    value={jam}
                    onChange={(e) => setJam(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white font-medium transition-all outline-none cursor-pointer"
                    required
                  >
                    <option value="" className="text-slate-400">-- Klik untuk memilih jam sewa --</option>
                    {jadwalJam.map((item, index) => {
                      const isBooked = bookedTimes.includes(item);
                      const isPast = isTimePast(item);
                      const isDisabled = isBooked || isPast;

                      // Hanya tampilkan label gembok jika sudah dibooking orang lain
                      let statusLabel = isBooked ? " (sudah di booking)" : "";

                      return (
                        <option
                          key={index}
                          value={item}
                          disabled={isDisabled}
                          className={isDisabled ? "text-slate-400/70 bg-slate-50/50 font-normal italic" : "text-slate-700 font-medium"}
                        >
                          {item}{statusLabel}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* ERROR MESSAGE DARI STATE */}
                {errorMessage && (
                  <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold flex items-center gap-2">
                    <FaTimesCircle size={14} className="flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* BUTTON ACTIONS */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 md:flex-initial inline-flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Memproses Data..." : "Konfirmasi & Ajukan Booking"}
                  </button>
                </div>

              </form>

            </div>

          </div>
        </div>

      </div>

      {/* POPUP SUKSES */}
      {showPopup && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4">
          <div className="bg-white px-6 py-8 rounded-[24px] w-full max-w-[360px] text-center shadow-2xl border border-slate-100 flex flex-col items-center">
            
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4 shadow-sm">
              <FaCheckCircle size={32} />
            </div>

            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Booking Berhasil 🎉
            </h2>

            <p className="text-slate-500 text-xs font-medium mt-2 leading-relaxed max-w-[280px]">
              Permohonan sewa berhasil terkirim dan saat ini sedang menunggu tinjauan dari admin.
            </p>

            <button
              onClick={() => {
                setShowPopup(false);
                navigate("/pelanggan/riwayat");
              }}
              className="w-full mt-6 bg-slate-950 hover:bg-slate-900 text-white py-3 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Lihat Riwayat Booking
            </button>
          </div>
        </div>
      )}

    </div>
  );
}