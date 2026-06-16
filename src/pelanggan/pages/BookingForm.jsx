import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import lapanganData from "../../guest/data/lapangan.json";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const court = lapanganData.find((item) => item.id === Number(id));

  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // simulasi booking sukses
    alert("🎉 Booking berhasil dibuat!");

    navigate("/pelanggan/riwayat");
  };

  if (!court) {
    return <div>Lapangan tidak ditemukan</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">

      <h1 className="text-3xl font-bold mb-6">
        Booking {court.nama}
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow">

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TANGGAL */}
          <div>
            <label className="block mb-2 font-semibold">
              Pilih Tanggal
            </label>

            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full border p-3 rounded-xl"
              required
            />
          </div>

          {/* JAM */}
          <div>
            <label className="block mb-2 font-semibold">
              Pilih Jam
            </label>

            <select
              value={jam}
              onChange={(e) => setJam(e.target.value)}
              className="w-full border p-3 rounded-xl"
              required
            >
              <option value="">Pilih jam</option>
              <option>08:00 - 10:00</option>
              <option>10:00 - 12:00</option>
              <option>12:00 - 14:00</option>
              <option>14:00 - 16:00</option>
              <option>16:00 - 18:00</option>
              <option>18:00 - 20:00</option>
            </select>
          </div>

          {/* INFO */}
          <div className="text-gray-600 text-sm">
            <p>Lapangan: {court.nama}</p>
            <p>Harga: Rp {court.harga.toLocaleString("id-ID")} / jam</p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            Konfirmasi Booking
          </button>

        </form>
      </div>
    </div>
  );
}