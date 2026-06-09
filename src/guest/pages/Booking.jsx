import { useState, useEffect } from "react";
import BookingCard from "../components/BookingCard";
import lapanganData from "../data/lapangan.json";

export default function Booking() {
  const [courts, setCourts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filteredData = lapanganData.filter((court) =>
        court.nama.toLowerCase().includes(query.toLowerCase())
      );

      setCourts(filteredData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Booking Lapangan
          </h1>

          <p className="text-gray-500 max-w-2xl mx-auto">
            Pilih lapangan badminton yang tersedia dan lihat detail fasilitas
            sebelum melakukan pemesanan.
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Cari Lapangan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 mb-8 rounded-xl border bg-white"
        />

        {/* Loading */}
        {loading ? (
          <div className="text-center py-10 text-lg">
            Loading...
          </div>
        ) : courts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Lapangan tidak ditemukan
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10">
            {courts.map((court) => (
              <BookingCard
                key={court.id}
                id={court.id}
                image={court.gambar}
                title={court.nama}
                price={court.harga}
                description={`${court.ukuran} • ${court.kapasitas}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}