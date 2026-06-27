import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import lapanganData from "../../guest/data/lapangan.json";
import { supabase } from "../../services/supabase";
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
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
      <div className="text-center py-20">
        Lapangan tidak ditemukan
      </div>
    );
  }

  useEffect(() => {
    if (tanggal) {
      fetchBookedTimes();
    }
  }, [tanggal]);

 const fetchBookedTimes = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("jam_mulai,jam_selesai")
    .eq("lapangan_id", court.id)
    .eq("tanggal", tanggal)
    .eq("status", "approved"); // hanya approved

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

    // cek tanggal lewat
    if (tanggal < today) {
      throw new Error("Tanggal sudah lewat");
    }

    // cek jam lewat
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

        <div className="text-white mb-10">

          <h1 className="text-4xl font-bold">
            Booking {court.nama}
          </h1>

          <p className="text-blue-100 mt-2">
            Lengkapi data booking
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* gambar */}
          <div className="relative h-64">

            <img
              src={court.gambar}
              className="w-full h-full object-cover"
              alt=""
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-6 left-6 text-white">

              <h2 className="text-3xl font-bold">
                {court.nama}
              </h2>

              <p>{court.ukuran}</p>

            </div>

          </div>

          {/* form */}
          <div className="p-8">

            <h2 className="text-2xl font-bold text-green-600 mb-6">

              Rp {court.harga.toLocaleString("id-ID")} / jam

            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* TANGGAL */}
              <div>

                <label className="font-medium flex items-center gap-2 mb-2">

                  <FaCalendarAlt />
                  Tanggal Booking

                </label>

                <input
                  type="date"
                  value={tanggal}
                  min={today}
                  onChange={(e)=>
                    setTanggal(e.target.value)
                  }
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
                  onChange={(e)=>
                    setJam(e.target.value)
                  }
                  className="w-full border p-4 rounded-xl"
                  required
                >

                  <option value="">
                    Pilih Jam
                  </option>

                  {jadwalJam.map(
                    (item,index)=>(
                    <option
                      key={index}
                      value={item}
                      disabled={bookedTimes.includes(item)}
                    >
                      {item}
                      {bookedTimes.includes(item)
                        ? " (Sudah dibooking)"
                        : ""}
                    </option>
                  ))}

                </select>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                {loading
                  ? "Memproses..."
                  : "Konfirmasi Booking"}
              </button>

            </form>

          </div>

        </div>

      </div>

     {/* POPUP SUKSES */}
{showPopup && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">

    <div className="bg-white p-8 rounded-3xl w-[350px] text-center shadow-2xl">

      <FaCheckCircle
        className="mx-auto text-6xl text-green-500 mb-4"
      />

      <h2 className="text-2xl font-bold">
        Booking Berhasil 🎉
      </h2>

      <p className="text-gray-500 mt-2">
        Booking berhasil dikirim dan
        menunggu persetujuan admin
      </p>

      <button
        onClick={() => {
          setShowPopup(false);
          navigate("/pelanggan/riwayat");
        }}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
      >
        Lihat Riwayat
      </button>

    </div>

  </div>
)}

    </div>
  );
}