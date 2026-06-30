import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

export default function StatusLapangan() {
  const [lapangan, setLapangan] = useState([]);
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan id lapangan mana saja yang sedang dibuka daftarnya
  const [expandedLapangan, setExpandedLapangan] = useState({});

  useEffect(() => {
    fetchBooking();
  }, []);

  // Fungsi pengubah status buka/tutup list jadwal
  const toggleExpand = (id) => {
    setExpandedLapangan((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("bookings").select(`
    id,
    tanggal,
    jam_mulai,
    jam_selesai,
    lapangan_id,
    status,
    users:users(id, nama)
  `);

      if (error) {
        console.log("ERROR:", error);
        return;
      }

      const now = new Date();

      const masterLapangan = [
        { id: 1, nama: "Lapangan 1", gambar: "/img/detail1.jpg" },
        { id: 2, nama: "Lapangan 2", gambar: "/img/detail2.jpg" },
      ];

      const hasil = masterLapangan.map((lap) => {
        const allValidBookings = (data || []).filter((item) => {
          if (!item.tanggal || !item.jam_selesai) return false;

          const status = String(item.status || "").toLowerCase();

          if (status !== "approved") {
            return false;
          }

          const selesai = new Date(`${item.tanggal}T${item.jam_selesai}`);

          return item.lapangan_id === lap.id && selesai >= now;
        });

        const processedBookings = allValidBookings
          .map((b) => {
            const mulai = new Date(`${b.tanggal}T${b.jam_mulai}`);
            const selesai = new Date(`${b.tanggal}T${b.jam_selesai}`);

            let status = "Tersedia";

            if (now >= mulai && now <= selesai) {
              status = "Sedang Digunakan";
            } else if (mulai > now) {
              status = "Akan Digunakan";
            }

            return { ...b, mulai, selesai, status };
          })
          .sort((a, b) => a.mulai - b.mulai);

        const totalAktif = processedBookings.filter(
          (b) => b.status === "Sedang Digunakan",
        ).length;
        const totalBookingMendatang = processedBookings.filter(
          (b) => b.status === "Akan Digunakan",
        ).length;
        const isKosongSaatIni = totalAktif === 0;

        return {
          ...lap,
          listBooking: processedBookings,
          stats: {
            aktif: totalAktif,
            booking: totalBookingMendatang,
            kosong: isKosongSaatIni,
          },
        };
      });

      setLapangan(hasil);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const statusColorConfig = (status) => {
    switch (status) {
      case "Sedang Digunakan":
        return {
          badge: "bg-rose-50 text-rose-600 border-rose-100",
          border: "border-l-rose-500",
        };
      case "Akan Digunakan":
        return {
          badge: "bg-amber-50 text-amber-700 border-amber-100",
          border: "border-l-amber-500",
        };
      default:
        return {
          badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
          border: "border-l-emerald-500",
        };
    }
  };

  return (
    <div className="min-h-screen text-slate-700 font-sans antialiased bg-[#f8fafc]">
      <div className="space-y-8">
        {/* HEADER HERO BANNER */}
        <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-8 md:p-12 min-h-[160px] flex flex-col justify-end shadow-md border border-slate-800/50">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Court"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none transform scale-100 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 px-3 py-1 rounded-full text-[11px] font-bold text-blue-400 uppercase tracking-widest backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />{" "}
              Realtime Live Monitor
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Status Penggunaan Lapangan
            </h1>
          </div>
        </div>

        {/* CONTENT MAIN */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-24 flex flex-col items-center justify-center space-y-4 text-slate-400 shadow-sm">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-bold tracking-wider uppercase text-slate-400/80">
              Sinkronisasi Jadwal GOR...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {lapangan.map((item) => {
              const isExpanded = !!expandedLapangan[item.id];
              // Tampilkan semua jadwal jika di-expand, jika tidak batasi hanya 3 teratas
              const renderedBookings = isExpanded
                ? item.listBooking
                : item.listBooking.slice(0, 3);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-[24px] shadow-sm border border-slate-200/50 hover:border-blue-300/70 hover:shadow-xl hover:shadow-blue-950/[0.02] transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* IMAGE COVER LAPANGAN */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.gambar}
                        alt={item.nama}
                        className="w-full h-full object-cover select-none transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                      <div className="absolute bottom-5 left-6 flex items-center gap-3 text-white">
                        <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
                          <FaMapMarkerAlt size={14} />
                        </div>
                        <div>
                          <h2 className="font-black text-xl tracking-tight leading-tight">
                            {item.nama}
                          </h2>
                          <p className="text-[11px] text-slate-300 font-medium tracking-wide mt-0.5">
                            Badminton Arena
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* BADGES STATUS SUMMARY */}
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex gap-2.5 flex-wrap items-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase border ${item.stats.aktif > 0 ? "bg-rose-50 text-rose-600 border-rose-100 shadow-sm" : "bg-slate-100 text-slate-400 border-transparent"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${item.stats.aktif > 0 ? "bg-rose-500 animate-pulse" : "bg-slate-400"}`}
                        />{" "}
                        {item.stats.aktif} Aktif
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase border ${item.stats.booking > 0 ? "bg-amber-50 text-amber-700 border-amber-100 shadow-sm" : "bg-slate-100 text-slate-400 border-transparent"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${item.stats.booking > 0 ? "bg-amber-500" : "bg-slate-400"}`}
                        />{" "}
                        {item.stats.booking} Booking
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase border ${item.stats.kosong ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm" : "bg-slate-100 text-slate-400 border-transparent"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${item.stats.kosong ? "bg-emerald-500" : "bg-slate-400"}`}
                        />{" "}
                        {item.stats.kosong ? "Kosong" : "Terisi"}
                      </span>
                    </div>

                    {/* LIST DETAILS ANTREAN JADWAL */}
                    <div className="p-6 space-y-4">
                      {renderedBookings.length > 0 ? (
                        renderedBookings.map((b, i) => {
                          const style = statusColorConfig(b.status);
                          return (
                            <div
                              key={i}
                              className={`border border-slate-100 border-l-4 ${style.border} rounded-xl p-4 bg-white hover:bg-slate-50/40 transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                            >
                              <div className="space-y-2.5 flex-1">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-[10px] px-2.5 py-0.5 rounded-md font-extrabold uppercase tracking-widest border ${style.badge}`}
                                  >
                                    {b.status}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500 font-medium">
                                  <div className="flex items-center gap-2">
                                    <FaCalendarAlt
                                      size={12}
                                      className="text-slate-400/80 flex-shrink-0"
                                    />
                                    <span className="text-slate-600">
                                      {b.tanggal}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 font-mono text-[11px]">
                                    <FaClock
                                      size={12}
                                      className="text-slate-400/80 flex-shrink-0"
                                    />
                                    <span className="text-slate-600 font-semibold">
                                      {b.jam_mulai?.slice(0, 5)} -{" "}
                                      {b.jam_selesai?.slice(0, 5)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="hidden sm:block h-8 w-[1px] bg-slate-100" />

                              {/* IDENTITAS USER */}
                              <div className="flex items-center gap-2.5 min-w-[140px] sm:justify-end">
                                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200/50 flex-shrink-0">
                                  <FaUser size={11} />
                                </div>
                                <div className="truncate text-left sm:text-right">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    Penyewa
                                  </p>
                                  <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                                    {b.users?.nama || "-"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-12 bg-emerald-50/10 border-2 border-dashed border-emerald-200/50 rounded-2xl space-y-1.5 p-6">
                          <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                            <FaCheckCircle size={16} />
                          </div>
                          <p className="text-emerald-600 font-bold text-sm tracking-tight">
                            Tidak Ada Antrean
                          </p>
                          <p className="text-xs text-slate-400 max-w-[240px] mx-auto">
                            Lapangan sedang kosong total dan belum ada list
                            booking mendatang yang terdaftar.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BUTTON ACTION (SUDAH BISA DI-KLIK) */}
                  {item.listBooking.length > 3 && (
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="mx-6 mb-6 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-center text-xs text-slate-500 font-bold flex items-center justify-center gap-1.5 hover:text-blue-600 hover:bg-blue-50/50 hover:border-blue-200 transition-all duration-200 cursor-pointer outline-none select-none w-[calc(100%-48px)]"
                    >
                      {isExpanded ? (
                        <>
                          Sembunyikan jadwal <FaChevronUp size={10} />
                        </>
                      ) : (
                        <>
                          Lihat {item.listBooking.length - 3} jadwal lainnya{" "}
                          <FaChevronDown size={10} />
                        </>
                      )}
                    </button>
                  )}
                  {item.listBooking.length <= 3 && <div className="mb-2" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
