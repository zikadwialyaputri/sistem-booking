import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { supabase } from "../../services/supabase";
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaFileInvoiceDollar, 
  FaBuilding, 
  FaWallet, 
  FaClock, 
  FaUser 
} from "react-icons/fa";

export default function ReportDetail() {
  const { bulan } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const biayaPerBooking = 35000;

  useEffect(() => {
    fetchDetail();
  }, [bulan]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          tanggal,
          jam_mulai,
          jam_selesai,
          status,
          users(id, nama),
          lapangan(id, nama)
        `)
        .eq("status", "approved");

      if (error) {
        console.log("ERROR:", error);
        return;
      }

      const filtered = (data || []).filter((item) => {
        if (!item.tanggal) return false;

        const date = new Date(item.tanggal);
        if (isNaN(date)) return false;

        const bulanNama = date.toLocaleString("id-ID", {
          month: "long",
        });

        return bulanNama.toLowerCase() === bulan.toLowerCase();
      });

      setData(filtered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (angka) =>
    "Rp " + angka.toLocaleString("id-ID");

  const totalTransaksi = data.length;
  const totalPendapatan = totalTransaksi * biayaPerBooking;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans antialiased text-slate-700">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER HERO BANNER (Gaya Orders dengan integrasi Tombol Kembali) */}
        <div className="relative rounded-3xl overflow-hidden shadow-sm h-36 flex flex-col justify-center px-6 md:px-10 border border-slate-100">
          <img
            src="/img/badminton.jpg"
            alt="Badminton Court"
            className="absolute inset-0 w-full h-full object-cover select-none transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-blue-900/50" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full text-white">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Manajemen Laporan</span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight capitalize">Detail Laporan Bulanan</h1>
            </div>
            <Link
              to="/admin/reports"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white hover:text-slate-900 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 shadow-sm transition-all text-xs w-fit self-start sm:self-center"
            >
              <FaArrowLeft size={10} /> Kembali ke Laporan
            </Link>
          </div>
        </div>

        {/* METRICS STATS CARDS GRID (Symmetric 3-Column Layout milik Orders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* KARTU 1: PERIODE BULAN */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all duration-300">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Periode Laporan</span>
              <h2 className="text-2xl font-black capitalize text-slate-800 tracking-tight">{bulan}</h2>
            </div>
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/50">
              <FaCalendarAlt size={16} />
            </div>
          </div>

          {/* KARTU 2: TOTAL PENDAPATAN */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Pendapatan Omset</span>
              <h2 className="text-2xl font-black text-emerald-600 tracking-tight">{formatRupiah(totalPendapatan)}</h2>
            </div>
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
              <FaWallet size={16} />
            </div>
          </div>

          {/* KARTU 3: TOTAL TRANSAKSI */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all duration-300">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Konfirmasi Booking</span>
              <h2 className="text-2xl font-black text-indigo-600 tracking-tight">
                {totalTransaksi} <span className="text-xs font-bold text-slate-400 uppercase tracking-normal ml-1">Jadwal</span>
              </h2>
            </div>
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/50">
              <FaFileInvoiceDollar size={16} />
            </div>
          </div>

        </div>

        {/* LOG BOOKING TABLE CONTAINER */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* BOX HEADER */}
          <div className="p-6 border-b border-slate-100 bg-[#fafafa]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base tracking-tight">Rincian Log Sewa GOR</h3>
                <p className="text-xs text-slate-400 mt-0.5">Seluruh pemesanan lapangan yang berstatus sukses (Approved) pada bulan ini.</p>
              </div>
              <span className="hidden sm:inline-block bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-bold px-3 py-1 rounded-full">
                {data.length} Baris Data
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-3 text-slate-400">
              <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-semibold tracking-wide text-slate-400">Menyusun baris laporan...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="p-4 pl-8">Nama Pelanggan</th>
                    <th className="p-4">Identitas Lapangan</th>
                    <th className="p-4">Tanggal Jadwal</th>
                    <th className="p-4">Alokasi Durasi</th>
                    <th className="p-4 pr-8 text-right">Biaya Sewa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600 bg-white">
                  {data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                        
                        {/* PELANGGAN */}
                        <td className="p-4 pl-8 font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                              <FaUser size={10} />
                            </div>
                            <span>{item.users?.nama || "-"}</span>
                          </div>
                        </td>
                        
                        {/* LAPANGAN */}
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 font-semibold bg-blue-50/70 text-blue-600 border border-blue-100/40 px-2.5 py-1 rounded-lg text-xs">
                            <FaBuilding size={10} />
                            {item.lapangan?.nama || "-"}
                          </span>
                        </td>
                        
                        {/* TANGGAL MAIN */}
                        <td className="p-4 font-medium text-slate-700">
                          <div className="flex items-center gap-1.5">
                            <FaCalendarAlt size={11} className="text-slate-400" />
                            <span>
                              {new Date(item.tanggal).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </td>
                        
                        {/* DURASI JAM */}
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500 bg-slate-100/60 border border-slate-200/30 px-2 py-0.5 rounded-md w-fit">
                            <FaClock size={10} className="text-slate-400" />
                            {item.jam_mulai?.slice(0, 5)} - {item.jam_selesai?.slice(0, 5)}
                          </div>
                        </td>
                        
                        {/* BIAYA MASUK */}
                        <td className="p-4 pr-8 text-right font-bold text-emerald-600 text-base">
                          {formatRupiah(biayaPerBooking)}
                        </td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-20 text-slate-400 text-xs font-medium">
                        Tidak ada transaksi pemesanan berstatus disetujui pada bulan ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}