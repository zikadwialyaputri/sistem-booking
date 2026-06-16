import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import lapanganData from "../../guest/data/lapangan.json";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  if (!court) {
    return (
      <div className="text-center py-20">
        Lapangan tidak ditemukan
      </div>
    );
  }

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

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        {/* TITLE */}
        <div className="text-white mb-10">

          <h1 className="text-4xl font-bold">
            Booking {court.nama}
          </h1>

          <p className="text-blue-100 mt-2">
            Lengkapi data booking lapangan
          </p>

        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* IMAGE */}
          <div className="relative h-64">

            <img
              src={court.gambar}
              alt={court.nama}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-6 left-6 text-white">

              <h2 className="text-3xl font-bold">
                {court.nama}
              </h2>

              <p className="text-sm">
                {court.ukuran}
              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="p-8">

            <div className="mb-6">

              <p className="text-gray-500">
                Harga Sewa
              </p>

              <h2 className="text-2xl font-bold text-green-600">
                Rp {court.harga.toLocaleString("id-ID")} / jam
              </h2>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>

                <label className="font-medium flex items-center gap-2 mb-2">
                  <FaCalendarAlt />
                  Tanggal Booking
                </label>

                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) =>
                    setTanggal(e.target.value)
                  }
                  className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />

              </div>

              <div>

                <label className="font-medium flex items-center gap-2 mb-2">
                  <FaClock />
                  Pilih Jam
                </label>

                <select
                  value={jam}
                  onChange={(e) =>
                    setJam(e.target.value)
                  }
                  className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">
                    Pilih Jam
                  </option>

                  <option>15:00 - 16:00</option>
                  <option>16:00 - 17:00</option>
                  <option>17:00 - 18:00</option>
                  <option>18:00 - 19:00</option>
                  <option>19:00 - 20:00</option>
                  <option>20:00 - 21:00</option>

                </select>

              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                Konfirmasi Booking
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-3xl w-[350px] text-center shadow-2xl">

            <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-4"/>

            <h2 className="text-2xl font-bold">
              Booking Berhasil 🎉
            </h2>

            <p className="text-gray-500 mt-2">
              Booking lapangan berhasil dibuat
            </p>

            <button
              onClick={()=>{
                setShowPopup(false);
                navigate("/pelanggan/riwayat");
              }}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Lihat Riwayat
            </button>

          </div>

        </div>
      )}

    </div>
  );
}