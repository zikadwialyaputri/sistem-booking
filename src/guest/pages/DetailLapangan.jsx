import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { supabase } from "../../lib/supabase";

export default function DetailLapangan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [court, setCourt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDetail();
  }, [id]);

  const getDetail = async () => {
    try {
      const { data, error } = await supabase
        .from("lapangan")
        .select(
          `
          *,
          fasilitas (*)
        `,
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setError("Lapangan tidak ditemukan");
        return;
      }

      setCourt(data);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan");
    }
  };

  const handleBooking = () => {
    navigate("/login");
  };

  if (error) {
    return <div className="text-red-600 text-center py-10">{error}</div>;
  }

  if (!court) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <img
          src={court.gambar}
          alt={court.nama}
          className="w-full h-[450px] object-cover"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6">{court.nama}</h1>

          <div className="space-y-3 text-lg">
            <p>
              <strong>Harga :</strong> Rp {court.harga.toLocaleString("id-ID")}{" "}
              / jam
            </p>

            <p>
              <strong>Ukuran :</strong> {court.ukuran}
            </p>

            <p>
              <strong>Kapasitas :</strong> {court.kapasitas}
            </p>

            <p>
              <strong>Jam Operasional :</strong> {court.jam_operasional}
            </p>
          </div>

          {/* FASILITAS */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Fasilitas</h2>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {court.fasilitas?.map((item) => (
                <li key={item.id}>{item.nama}</li>
              ))}
            </ul>
          </div>

          {/* BUTTON BOOKING */}
          <div className="mt-10">
            <button
              onClick={handleBooking}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-green-700 transition"
            >
              Booking Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
