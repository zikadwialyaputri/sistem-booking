import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import lapanganData from "../data/lapangan.json";

export default function DetailLapangan() {
  const { id } = useParams();

  const [court, setCourt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = lapanganData.find((item) => item.id === Number(id));

    if (!data) {
      setError("Lapangan tidak ditemukan");
      return;
    }

    setCourt(data);
  }, [id]);

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

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Fasilitas</h2>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {court.fasilitas.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
