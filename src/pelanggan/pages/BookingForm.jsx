import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import lapanganData from "../../guest/data/lapangan.json";
import { supabase } from "../../services/supabase";
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const court = lapanganData.find((item) => item.id === Number(id));

  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!court) {
    return <div className="text-center py-20">Lapangan tidak ditemukan</div>;
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  setErrorMessage("");
  setLoading(true);

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setErrorMessage("User belum login");
      setShowErrorPopup(true);
      setLoading(false);
      return;
    }

    const lapangan = court;
    const [jamMulai, jamSelesai] = jam.split(" - ");

    // ==========================
    // VALIDASI TANGGAL + JAM
    // ==========================

    const now = new Date();

    // tanggal sekarang format yyyy-mm-dd
    const today = now.toISOString().split("T")[0];

    // gabungkan tanggal booking + jam mulai
    const bookingDateTime = new Date(
      `${tanggal}T${jamMulai}`
    );

    // jika booking waktu yang sudah lewat
    if (bookingDateTime <= now) {
      setErrorMessage(
        "❌ Tidak bisa booking pada jam yang sudah lewat"
      );

      setShowErrorPopup(true);
      setLoading(false);
      return;
    }

    // jika tanggal sebelum hari ini
    if (tanggal < today) {
      setErrorMessage(
        "❌ Tidak bisa booking di tanggal yang sudah lewat"
      );

      setShowErrorPopup(true);
      setLoading(false);
      return;
    }

    // ==========================
    // CEK BENTROK JADWAL
    // ==========================

    const { data: existing, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("lapangan_id", lapangan.id)
      .eq("tanggal", tanggal)
      .in("status", ["pending", "approved"]);

    if (error) throw error;

    const isConflict = (existing || []).some((b) => {
      return (
        jamMulai < b.jam_selesai &&
        jamSelesai > b.jam_mulai
      );
    });

    if (isConflict) {
      setErrorMessage(
        "❌ Booking gagal! Jadwal bentrok, silakan pilih jam lain"
      );

      setShowErrorPopup(true);
      setLoading(false);
      return;
    }

    // ==========================
    // SIMPAN BOOKING
    // ==========================

    const { error: insertError } =
      await supabase
        .from("bookings")
        .insert([
          {
            user_id: user.id,
            lapangan_id: lapangan.id,
            tanggal,
            jam_mulai: jamMulai,
            jam_selesai: jamSelesai,
            status: "pending",
          },
        ]);

    if (insertError) throw insertError;

    setShowPopup(true);

  } catch (err) {

    setErrorMessage(
      err.message || "Terjadi kesalahan"
    );

    setShowErrorPopup(true);

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

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

        {/* TITLE */}
        <div className="text-white mb-10">
          <h1 className="text-4xl font-bold">Booking {court.nama}</h1>
          <p className="text-blue-100 mt-2">Lengkapi data booking lapangan</p>
        </div>

        {/* ERROR POPUP */}
        {showErrorPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[350px] text-center shadow-2xl border-l-8 border-red-500">

              <div className="text-5xl mb-3">❌</div>

              <h2 className="text-2xl font-bold text-red-600">
                Booking Gagal
              </h2>

              <p className="text-gray-600 mt-2">
                {errorMessage}
              </p>

              <button
                onClick={() => setShowErrorPopup(false)}
                className="w-full mt-6 bg-red-500 text-white py-3 rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* IMAGE */}
          <div className="relative h-64">
            <img
              src={court.gambar}
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-bold">{court.nama}</h2>
              <p className="text-sm">{court.ukuran}</p>
            </div>
          </div>

          {/* FORM */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-green-600 mb-6">
              Rp {court.harga.toLocaleString("id-ID")} / jam
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* TANGGAL */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-2">
                  <FaCalendarAlt />
                  Tanggal Booking
                </label>

                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full border p-4 rounded-xl"
                  required
                />
              </div>

              {/* JAM */}
              <div>
                <label className="font-medium flex items-center gap-2 mb-2">
                  <FaClock />
                  Pilih Jam
                </label>

                <select
                  value={jam}
                  onChange={(e) => setJam(e.target.value)}
                  className="w-full border p-4 rounded-xl"
                  required
                >
                  <option value="">Pilih Jam</option>
                  <option value="15:00 - 16:00">15:00 - 16:00</option>
                  <option value="16:00 - 17:00">16:00 - 17:00</option>
                  <option value="17:00 - 18:00">17:00 - 18:00</option>
                  <option value="18:00 - 19:00">18:00 - 19:00</option>
                  <option value="19:00 - 20:00">19:00 - 20:00</option>
                  <option value="20:00 - 21:00">20:00 - 21:00</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold"
              >
                {loading ? "Memproses..." : "Konfirmasi Booking"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl w-[350px] text-center shadow-2xl">

            <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />

            <h2 className="text-2xl font-bold">Booking Berhasil 🎉</h2>

            <p className="text-gray-500 mt-2">
              Booking berhasil disimpan ke sistem
            </p>

            <button
              onClick={() => {
                setShowPopup(false);
                navigate("/pelanggan/riwayat");
              }}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl"
            >
              Lihat Riwayat
            </button>
          </div>
        </div>
      )}

    </div>
  );
}